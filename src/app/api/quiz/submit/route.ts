import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examSessions, answers } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getQuizData } from "@/lib/problems";
import { eq } from "drizzle-orm";

interface SubmittedAnswer {
  questionNumber: number;
  selected: string;
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

    if (!session || session.examType !== "quiz") {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    if (session.finishedAt) {
      return NextResponse.json(
        { error: "この診断はすでに提出済みです" },
        { status: 400 }
      );
    }

    const quiz = getQuizData();
    if (!quiz) {
      return NextResponse.json(
        { error: "クイズデータが見つかりません" },
        { status: 500 }
      );
    }

    // 採点 + カテゴリ別集計
    let totalScore = 0;
    const categoryMap: Record<string, { correct: number; total: number }> = {};
    const results: {
      questionNumber: number;
      selected: string;
      correct: string;
      isCorrect: boolean;
      points: number;
      category: string;
    }[] = [];

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const questionNumber = i + 1;
      const sub = submitted.find((a) => a.questionNumber === questionNumber);
      const selected = sub?.selected ?? "";

      const isCorrect = selected === q.answer;
      if (isCorrect) totalScore += q.points;

      // カテゴリ集計
      if (!categoryMap[q.category]) {
        categoryMap[q.category] = { correct: 0, total: 0 };
      }
      categoryMap[q.category].total++;
      if (isCorrect) categoryMap[q.category].correct++;

      results.push({
        questionNumber,
        selected,
        correct: q.answer,
        isCorrect,
        points: q.points,
        category: q.category,
      });

      // DB保存
      await db.insert(answers).values({
        sessionId: session.id,
        questionNumber,
        selectedAnswer: selected,
        isCorrect,
      });
    }

    // セッション更新
    const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    await db
      .update(examSessions)
      .set({
        score: totalScore,
        maxScore,
        timeSeconds,
        finishedAt: new Date(),
      })
      .where(eq(examSessions.id, session.id));

    return NextResponse.json({
      score: totalScore,
      maxScore,
      timeSeconds,
      categoryScores: categoryMap,
      results,
    });
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    return NextResponse.json(
      { error: "採点に失敗しました" },
      { status: 500 }
    );
  }
}
