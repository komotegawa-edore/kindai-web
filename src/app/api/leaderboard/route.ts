import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examSessions, users } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { eq, desc, asc, isNotNull } from "drizzle-orm";

export async function GET() {
  try {
    await ensureTables();

    const results = await db
      .select({
        id: examSessions.publicId,
        nickname: users.nickname,
        problemId: examSessions.problemId,
        score: examSessions.score,
        maxScore: examSessions.maxScore,
        timeSeconds: examSessions.timeSeconds,
        finishedAt: examSessions.finishedAt,
      })
      .from(examSessions)
      .innerJoin(users, eq(examSessions.userId, users.id))
      .where(isNotNull(examSessions.finishedAt))
      .orderBy(desc(examSessions.score), asc(examSessions.timeSeconds))
      .limit(100);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Failed to get leaderboard:", error);
    return NextResponse.json(
      { error: "ランキングの取得に失敗しました" },
      { status: 500 }
    );
  }
}
