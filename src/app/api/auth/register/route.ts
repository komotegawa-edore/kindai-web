import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { ensureTables } from "@/lib/init-db";
import { hashPassword } from "@/lib/password";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    await ensureTables();

    const body = await request.json();
    const { userId, email, password } = body as {
      userId: number;
      email: string;
      password: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードを入力してください" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "パスワードは6文字以上で入力してください" },
        { status: 400 }
      );
    }

    // メールアドレス重複チェック
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 }
      );
    }

    // ユーザー更新（ゲストユーザー → 登録ユーザーに昇格）
    const passwordHash = hashPassword(password);

    await db.update(users)
      .set({
        email,
        passwordHash,
        isRegistered: true,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: "アカウント登録に失敗しました" },
      { status: 500 }
    );
  }
}
