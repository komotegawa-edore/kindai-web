import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, examSessions } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getQuizData } from "@/lib/problems";

export async function POST(request: Request) {
  try {
    await ensureTables();

    const body = await request.json();
    const nickname = body.nickname?.trim();
    if (!nickname || nickname.length > 20) {
      return NextResponse.json(
        { error: "ニックネームは1〜20文字で入力してください" },
        { status: 400 }
      );
    }

    const quiz = getQuizData();
    if (!quiz) {
      return NextResponse.json(
        { error: "クイズデータがありません" },
        { status: 500 }
      );
    }

    // ユーザー作成
    const [userResult] = await db
      .insert(users)
      .values({ nickname })
      .returning();

    // セッション作成
    const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const [session] = await db
      .insert(examSessions)
      .values({
        userId: userResult.id,
        problemId: quiz.id,
        examType: "quiz",
        maxScore,
      })
      .returning();

    return NextResponse.json({
      sessionId: session.id,
      quizId: quiz.id,
    });
  } catch (error) {
    console.error("Failed to start quiz:", error);
    return NextResponse.json(
      { error: "診断の開始に失敗しました" },
      { status: 500 }
    );
  }
}
