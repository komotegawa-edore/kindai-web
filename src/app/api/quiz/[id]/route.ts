import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examSessions, users } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getQuizData } from "@/lib/problems";
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

    if (!session || session.examType !== "quiz") {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    const quiz = getQuizData();
    if (!quiz) {
      return NextResponse.json(
        { error: "クイズデータが見つかりません" },
        { status: 500 }
      );
    }

    // 解答済みの場合は結果も含める
    if (session.finishedAt) {
      return NextResponse.json({
        session: {
          ...session,
          nickname: user?.nickname,
        },
        quiz,
        finished: true,
      });
    }

    // 未解答の場合は正答・解説を除外
    const sanitizedQuestions = quiz.questions.map((q) => ({
      id: q.id,
      section: q.section,
      section_name: q.section_name,
      category: q.category,
      question: q.question,
      sentence_frame: q.sentence_frame,
      choices: q.choices,
      points: q.points,
    }));

    return NextResponse.json({
      session: { ...session, nickname: user?.nickname },
      quiz: {
        ...quiz,
        questions: sanitizedQuestions,
      },
      finished: false,
    });
  } catch (error) {
    console.error("Failed to get quiz:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
