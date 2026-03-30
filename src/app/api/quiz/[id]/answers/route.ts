import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { answers } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTables();
    const { id } = await params;
    const sessionId = parseInt(id, 10);

    const result = await db
      .select()
      .from(answers)
      .where(eq(answers.sessionId, sessionId));

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
