import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { ensureTables } from "@/lib/init-db";

export async function GET(request: Request) {
  try {
    await ensureTables();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "トークンがありません" },
        { status: 401 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    const sessions = await sql`
      SELECT s.book_id, b.slug, b.name, b.audio_count
      FROM tokuten_sessions s
      JOIN tokuten_books b ON b.id = s.book_id
      WHERE s.token = ${token}
        AND s.expires_at > NOW()
      LIMIT 1
    `;

    if (sessions.length === 0) {
      return NextResponse.json(
        { valid: false, error: "セッションが無効または期限切れです" },
        { status: 401 }
      );
    }

    const session = sessions[0];

    return NextResponse.json({
      valid: true,
      slug: session.slug,
      bookName: session.name,
      audioCount: session.audio_count,
    });
  } catch (error) {
    console.error("Tokuten validate error:", error);
    return NextResponse.json(
      { valid: false, error: "検証に失敗しました" },
      { status: 500 }
    );
  }
}
