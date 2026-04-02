import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { ensureTables } from "@/lib/init-db";

export async function POST(request: Request) {
  try {
    await ensureTables();

    const body = await request.json();
    const code = body.code?.trim().toUpperCase();
    const email = body.email?.trim().toLowerCase();

    if (!code) {
      return NextResponse.json(
        { error: "アクセスコードを入力してください" },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // アクセスコードで書籍を検索
    const books = await sql`
      SELECT id, slug, name, audio_count FROM tokuten_books WHERE access_code = ${code}
    `;

    if (books.length === 0) {
      return NextResponse.json(
        { error: "アクセスコードが正しくありません。書籍に記載されたコードをご確認ください。" },
        { status: 401 }
      );
    }

    const book = books[0];

    // ユーザー登録（同じメール＋書籍の組み合わせは重複しない）
    await sql`
      INSERT INTO tokuten_users (email, book_id)
      VALUES (${email}, ${book.id})
      ON CONFLICT DO NOTHING
    `;

    // トークン生成（slug + ランダムUUID）
    const token = randomUUID();

    return NextResponse.json({
      token,
      slug: book.slug,
      bookName: book.name,
      audioCount: book.audio_count,
    });
  } catch (error) {
    console.error("Tokuten verify error:", error);
    return NextResponse.json(
      { error: "認証に失敗しました。しばらくしてからお試しください。" },
      { status: 500 }
    );
  }
}
