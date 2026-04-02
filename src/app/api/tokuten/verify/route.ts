import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { ensureTables } from "@/lib/init-db";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

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

    // レート制限: 同一メール+書籍で60秒以内の再送不可
    const recent = await sql`
      SELECT id FROM tokuten_verification_codes
      WHERE email = ${email}
        AND book_id = ${book.id}
        AND created_at > NOW() - INTERVAL '60 seconds'
      LIMIT 1
    `;
    if (recent.length > 0) {
      return NextResponse.json(
        { error: "認証コードは60秒に1回のみ送信できます。しばらくお待ちください。" },
        { status: 429 }
      );
    }

    // 6桁認証コード生成・保存（10分有効）
    const verificationCode = generateCode();
    await sql`
      INSERT INTO tokuten_verification_codes (email, book_id, code, expires_at)
      VALUES (${email}, ${book.id}, ${verificationCode}, NOW() + INTERVAL '10 minutes')
    `;

    // Resendでメール送信
    await resend.emails.send({
      from: "ドリレオ <noreply@edore-edu.com>",
      to: email,
      subject: `【ドリレオ】認証コード: ${verificationCode}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1e293b; margin-bottom: 8px;">メール認証コード</h2>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">
            「${book.name}」の購入者特典にアクセスするための認証コードです。
          </p>
          <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb;">
              ${verificationCode}
            </span>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">
            このコードは10分間有効です。心当たりがない場合はこのメールを無視してください。
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 11px;">ドリレオ (Drilleo)</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      slug: book.slug,
      bookName: book.name,
    });
  } catch (error) {
    console.error("Tokuten verify error:", error);
    return NextResponse.json(
      { error: "認証に失敗しました。しばらくしてからお試しください。" },
      { status: 500 }
    );
  }
}
