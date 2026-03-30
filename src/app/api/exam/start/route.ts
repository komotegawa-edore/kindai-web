import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, examSessions } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { getAllReadingProblems } from "@/lib/problems";

export async function POST(request: Request) {
  try {
    ensureTables();

    const body = await request.json();
    const nickname = body.nickname?.trim();
    if (!nickname || nickname.length > 20) {
      return NextResponse.json(
        { error: "ニックネームは1〜20文字で入力してください" },
        { status: 400 }
      );
    }

    // ランダムに問題を選択
    const problems = getAllReadingProblems();
    if (problems.length === 0) {
      return NextResponse.json(
        { error: "問題データがありません" },
        { status: 500 }
      );
    }
    const problem = problems[Math.floor(Math.random() * problems.length)];

    // ユーザー作成
    const userResult = db
      .insert(users)
      .values({ nickname })
      .returning()
      .get();

    // セッション作成
    const maxScore = problem.questions.reduce((sum, q) => sum + q.points, 0);
    const session = db
      .insert(examSessions)
      .values({
        userId: userResult.id,
        problemId: problem.id,
        maxScore,
      })
      .returning()
      .get();

    return NextResponse.json({
      sessionId: session.id,
      problemId: problem.id,
    });
  } catch (error) {
    console.error("Failed to start exam:", error);
    return NextResponse.json(
      { error: "模試の開始に失敗しました" },
      { status: 500 }
    );
  }
}
