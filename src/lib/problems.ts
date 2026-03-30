import fs from "fs";
import path from "path";

// 問題データの型定義
export interface ReadingProblem {
  id: string;
  university: string;
  subject: string;
  section: number;
  section_name: string;
  type: string;
  difficulty: number;
  passage: string;
  translation?: string;
  questions: ReadingQuestion[];
  tags: string[];
  target_time_seconds: number;
  is_ai_generated: boolean;
  is_reviewed: boolean;
  created_at: string;
  vocabulary?: { word: string; meaning: string }[];
}

export interface ReadingQuestion {
  question_number: number;
  question_type?: string;
  paragraph?: number;
  question: string;
  choices: Record<string, string>;
  answer: string | string[];
  explanation: string;
  points: number;
}

// 全問題一覧を取得
export function getAllReadingProblems(): ReadingProblem[] {
  const dir = path.join(process.cwd(), "data/problems/q7_reading");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      return JSON.parse(raw) as ReadingProblem;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

// ID指定で1問取得
export function getReadingProblem(id: string): ReadingProblem | undefined {
  const all = getAllReadingProblems();
  return all.find((p) => p.id === id);
}

// 問題番号（q7_001 → 1）を抽出
export function getProblemNumber(id: string): number {
  const match = id.match(/q7_(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// --- 診断クイズ ---

export interface QuizQuestion {
  id: string;
  section: number;
  section_name: string;
  category: string;
  question: string;
  sentence_frame?: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  points: number;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  time_limit_seconds: number;
  questions: QuizQuestion[];
}

export function getQuizData(quizId: string = "kindai_2026spring"): QuizData | undefined {
  const filePath = path.join(process.cwd(), `data/quiz/${quizId}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as QuizData;
}
