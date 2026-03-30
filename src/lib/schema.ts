import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  email: text("email"),
  passwordHash: text("password_hash"),
  isRegistered: boolean("is_registered").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const examSessions = pgTable("exam_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  problemId: text("problem_id").notNull(),
  examType: text("exam_type").notNull().default("reading"),
  score: integer("score"),
  maxScore: integer("max_score"),
  timeSeconds: integer("time_seconds"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  finishedAt: timestamp("finished_at"),
});

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => examSessions.id),
  questionNumber: integer("question_number").notNull(),
  selectedAnswer: text("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
});
