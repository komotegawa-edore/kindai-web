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
}
