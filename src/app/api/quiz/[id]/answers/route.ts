import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { answers, examSessions } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables();
    const { id } = await params;

    // publicId → 内部ID を解決
    const [session] = await db
      .select({ id: examSessions.id })
      .from(examSessions)
      .where(eq(examSessions.publicId, id));

    if (!session) {
      return NextResponse.json(
        { error: "セッションが見つかりません" },
        { status: 404 }
      );
    }

    const result = await db
      .select()
      .from(answers)
      .where(eq(answers.sessionId, session.id));

    return NextResponse.json({
      answers: result.map((a) => ({
        questionNumber: a.questionNumber,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect,
      })),
    });
  } catch (error) {
    console.error("Failed to get quiz answers:", error);
    return NextResponse.json(
      { error: "解答データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
