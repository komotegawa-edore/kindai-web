import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examSessions, users } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getReadingProblem } from "@/lib/problems";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables();
    const { id } = await params;
    const sessionId = parseInt(id, 10);

    const [session] = await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.id, sessionId));

    if (!session) {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    const problem = getReadingProblem(session.problemId);
    if (!problem) {
      return NextResponse.json(
        { error: "問題データが見つかりません" },
        { status: 500 }
      );
    }

    // 解答済みの場合は結果も含める
    if (session.finishedAt) {
      return NextResponse.json({
        session: {
          ...session,
          nickname: user?.nickname,
          isRegistered: user?.isRegistered ?? false,
        },
        problem,
        finished: true,
      });
    }

    // 未解答の場合は正答・解説を除外
    const sanitizedQuestions = problem.questions.map((q) => ({
      question_number: q.question_number,
      question_type: q.question_type,
      paragraph: q.paragraph,
      question: q.question,
      choices: q.choices,
      points: q.points,
    }));

    return NextResponse.json({
      session: { ...session, nickname: user?.nickname },
      problem: {
        ...problem,
        questions: sanitizedQuestions,
        translation: undefined,
        vocabulary: undefined,
      },
      finished: false,
    });
  } catch (error) {
    console.error("Failed to get exam:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
