import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examSessions, answers } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getReadingProblem } from "@/lib/problems";
import { eq } from "drizzle-orm";

interface SubmittedAnswer {
  questionNumber: number;
  selected: string | string[];
}

export async function POST(request: Request) {
  try {
    await ensureTables();

    const body = await request.json();
    const { sessionId: publicId, answers: submitted, timeSeconds } = body as {
      sessionId: string;
      answers: SubmittedAnswer[];
      timeSeconds: number;
    };

    // セッション取得（publicIdで検索）
    const [session] = await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.publicId, publicId));

    if (!session) {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    if (session.finishedAt) {
      return NextResponse.json(
        { error: "この模試はすでに提出済みです" },
        { status: 400 }
      );
    }

    // 問題データ取得
    const problem = getReadingProblem(session.problemId);
    if (!problem) {
      return NextResponse.json(
        { error: "問題データが見つかりません" },
        { status: 500 }
      );
    }

    // 採点
    let totalScore = 0;
    const results: {
      questionNumber: number;
      selected: string;
      correct: string | string[];
      isCorrect: boolean;
      points: number;
    }[] = [];

    for (const q of problem.questions) {
      const sub = submitted.find(
        (a) => a.questionNumber === q.question_number
      );
      const selected = sub?.selected ?? "";

      let isCorrect = false;
      if (Array.isArray(q.answer)) {
        // 複数選択（7択から2つ選ぶ形式）
        const selectedArr = Array.isArray(selected) ? selected : [selected];
        isCorrect =
          selectedArr.length === q.answer.length &&
          selectedArr.every((s: string) => q.answer.includes(s));
      } else {
        isCorrect = selected === q.answer;
      }

      if (isCorrect) totalScore += q.points;

      results.push({
        questionNumber: q.question_number,
        selected: Array.isArray(selected) ? selected.join(",") : selected,
        correct: q.answer,
        isCorrect,
        points: q.points,
      });

      // DB保存
      await db.insert(answers)
        .values({
          sessionId: session.id,
          questionNumber: q.question_number,
          selectedAnswer: Array.isArray(selected)
            ? selected.join(",")
            : (selected as string),
          isCorrect,
        });
    }

    // セッション更新
    await db.update(examSessions)
      .set({
        score: totalScore,
        timeSeconds,
        finishedAt: new Date(),
      })
      .where(eq(examSessions.id, session.id));

    return NextResponse.json({
      score: totalScore,
      maxScore: session.maxScore,
      timeSeconds,
      results,
    });
  } catch (error) {
    console.error("Failed to submit exam:", error);
    return NextResponse.json(
      { error: "採点に失敗しました" },
      { status: 500 }
    );
  }
}
