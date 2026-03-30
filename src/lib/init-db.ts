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
      user_id INTEGER NOT NULL REFERENCES users(id),
      problem_id TEXT NOT NULL,
      score INTEGER,
      max_score INTEGER,
      time_seconds INTEGER,
      started_at TIMESTAMP NOT NULL DEFAULT NOW(),
      finished_at TIMESTAMP
    )
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
