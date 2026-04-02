import { pgTable, serial, text, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

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
  publicId: text("public_id").notNull(),
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

export const tokutenBooks = pgTable("tokuten_books", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  accessCode: text("access_code").notNull().unique(),
  audioCount: integer("audio_count").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tokutenUsers = pgTable("tokuten_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  bookId: integer("book_id")
    .notNull()
    .references(() => tokutenBooks.id),
  marketingOptIn: boolean("marketing_opt_in").notNull().default(false),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("idx_tokuten_users_email_book").on(table.email, table.bookId),
]);

export const tokutenVerificationCodes = pgTable("tokuten_verification_codes", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  bookId: integer("book_id")
    .notNull()
    .references(() => tokutenBooks.id),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tokutenSessions = pgTable("tokuten_sessions", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  userId: integer("user_id")
    .notNull()
    .references(() => tokutenUsers.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => tokutenBooks.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
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
