import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { ensureTables } from "@/lib/init-db";

export async function POST(request: Request) {
  try {
    await ensureTables();

    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const slug = body.slug?.trim();
    const verificationCode = body.verificationCode?.trim();
    const marketingOptIn = !!body.marketingOptIn;

    if (!email || !slug || !verificationCode) {
      return NextResponse.json(
        { error: "必要な情報が不足しています" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // 書籍をslugで検索
    const books = await sql`
      SELECT id, slug, name, audio_count FROM tokuten_books WHERE slug = ${slug}
    `;
    if (books.length === 0) {
      return NextResponse.json(
        { error: "書籍が見つかりません" },
        { status: 404 }
      );
    }
    const book = books[0];

    // 認証コードを検証
    const codes = await sql`
      SELECT id FROM tokuten_verification_codes
      WHERE email = ${email}
        AND book_id = ${book.id}
        AND code = ${verificationCode}
        AND verified_at IS NULL
        AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (codes.length === 0) {
      return NextResponse.json(
        { error: "認証コードが正しくないか、有効期限が切れています" },
        { status: 401 }
      );
    }

    // コードを使用済みにする
    await sql`
      UPDATE tokuten_verification_codes SET verified_at = NOW() WHERE id = ${codes[0].id}
    `;

    // ユーザーをUPSERT（メール認証完了）
    const users = await sql`
      INSERT INTO tokuten_users (email, book_id, marketing_opt_in, verified_at)
      VALUES (${email}, ${book.id}, ${marketingOptIn}, NOW())
      ON CONFLICT (email, book_id)
      DO UPDATE SET
        marketing_opt_in = ${marketingOptIn},
        verified_at = NOW()
      RETURNING id
    `;
    const userId = users[0].id;

    // セッショントークン発行（90日有効）
    const token = randomUUID();
    await sql`
      INSERT INTO tokuten_sessions (token, user_id, book_id, expires_at)
      VALUES (${token}, ${userId}, ${book.id}, NOW() + INTERVAL '90 days')
    `;

    return NextResponse.json({
      token,
      slug: book.slug,
      bookName: book.name,
      audioCount: book.audio_count,
    });
  } catch (error) {
    console.error("Tokuten confirm error:", error);
    return NextResponse.json(
      { error: "認証に失敗しました。しばらくしてからお試しください。" },
      { status: 500 }
    );
  }
}
