import { neon } from "@neondatabase/serverless";

export async function ensureTables() {
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nickname TEXT NOT NULL,
      email TEXT,
      password_hash TEXT,
      is_registered BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS exam_sessions (
      id SERIAL PRIMARY KEY,
      public_id TEXT NOT NULL DEFAULT '',
      user_id INTEGER NOT NULL REFERENCES users(id),
      problem_id TEXT NOT NULL,
      exam_type TEXT NOT NULL DEFAULT 'reading',
      score INTEGER,
      max_score INTEGER,
      time_seconds INTEGER,
      started_at TIMESTAMP NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMP
    )
  `;
  // 既存テーブルに exam_type カラムがない場合に追加
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'exam_sessions' AND column_name = 'exam_type'
      ) THEN
        ALTER TABLE exam_sessions ADD COLUMN exam_type TEXT NOT NULL DEFAULT 'reading';
      END IF;
    END $$
  `;
  // 既存テーブルに public_id カラムがない場合に追加
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'exam_sessions' AND column_name = 'public_id'
      ) THEN
        ALTER TABLE exam_sessions ADD COLUMN public_id TEXT NOT NULL DEFAULT '';
      END IF;
    END $$
  `;
  // public_id が空の既存行にUUIDを割り当て
  await sql`
    UPDATE exam_sessions SET public_id = gen_random_uuid()::text WHERE public_id = ''
  `;
  // ユニークインデックス（まだなければ作成）
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_exam_sessions_public_id ON exam_sessions(public_id) WHERE public_id != ''
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      session_id INTEGER NOT NULL REFERENCES exam_sessions(id),
      question_number INTEGER NOT NULL,
      selected_answer TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL DEFAULT false
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tokuten_books (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      access_code TEXT NOT NULL UNIQUE,
      audio_count INTEGER NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tokuten_users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      book_id INTEGER NOT NULL REFERENCES tokuten_books(id),
      marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
      verified_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  // 既存 tokuten_users に marketing_opt_in がなければ追加
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tokuten_users' AND column_name = 'marketing_opt_in'
      ) THEN
        ALTER TABLE tokuten_users ADD COLUMN marketing_opt_in BOOLEAN NOT NULL DEFAULT false;
      END IF;
    END $$
  `;
  // verified_at を nullable に変更（既存テーブル対応）
  await sql`
    ALTER TABLE tokuten_users ALTER COLUMN verified_at DROP NOT NULL
  `;
  await sql`
    ALTER TABLE tokuten_users ALTER COLUMN verified_at DROP DEFAULT
  `;
  // email + book_id のユニークインデックス
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_tokuten_users_email_book ON tokuten_users(email, book_id)
  `;
  // 認証コードテーブル
  await sql`
    CREATE TABLE IF NOT EXISTS tokuten_verification_codes (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      book_id INTEGER NOT NULL REFERENCES tokuten_books(id),
      code TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      verified_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  // セッションテーブル
  await sql`
    CREATE TABLE IF NOT EXISTS tokuten_sessions (
      id SERIAL PRIMARY KEY,
      token TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL REFERENCES tokuten_users(id),
      book_id INTEGER NOT NULL REFERENCES tokuten_books(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMP NOT NULL
    )
  `;
  // 初期データ: 近大長文読解ドリル
  await sql`
    INSERT INTO tokuten_books (slug, name, access_code, audio_count)
    VALUES ('kindai-reading', '近大英語 長文読解ドリル', 'KINDAI-READING-2026', 25)
    ON CONFLICT (slug) DO NOTHING
  `;
}
