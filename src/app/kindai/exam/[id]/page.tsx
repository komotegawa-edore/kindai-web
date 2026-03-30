"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  question_number: number;
  question_type?: string;
  paragraph?: number;
  question: string;
  choices: Record<string, string>;
  points: number;
}

interface ExamData {
  session: {
    id: number;
    publicId: string;
    nickname: string;
    problemId: string;
    maxScore: number;
  };
  problem: {
    id: string;
    passage: string;
    questions: Question[];
    target_time_seconds: number;
  };
  finished: boolean;
}

const TIME_LIMIT = 1800; // 30分

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/exam/${sessionId}`);
        if (!res.ok) throw new Error("Failed to load exam");
        const data: ExamData = await res.json();
        if (data.finished) {
          router.replace(`/kindai/exam/${sessionId}/result`);
          return;
        }
        setExamData(data);
      } catch {
        setError("模試データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // タイマー
  useEffect(() => {
    if (!examData || submitting) return;
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const sec = Math.floor((now - startTimeRef.current) / 1000);
      setElapsed(sec);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examData, submitting]);

  const handleSelect = useCallback(
    (qNum: number, choice: string, isMulti: boolean) => {
      setAnswers((prev) => {
        if (isMulti) {
          const current = (prev[qNum] as string[]) || [];
          if (current.includes(choice)) {
            return { ...prev, [qNum]: current.filter((c) => c !== choice) };
          }
          if (current.length >= 2) return prev; // 最大2つ
          return { ...prev, [qNum]: [...current, choice] };
        }
        return { ...prev, [qNum]: choice };
      });
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!examData) return;
    if (submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const submitted = examData.problem.questions.map((q) => ({
      questionNumber: q.question_number,
      selected: answers[q.question_number] ?? "",
    }));

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answers: submitted,
          timeSeconds: elapsed,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      router.push(`/kindai/exam/${sessionId}/result`);
    } catch {
      setError("提出に失敗しました。もう一度お試しください。");
      setSubmitting(false);
    }
  }, [examData, answers, sessionId, elapsed, submitting, router]);

  // 時間切れ自動提出
  useEffect(() => {
    if (elapsed >= TIME_LIMIT && !submitting && examData) {
      handleSubmit();
    }
  }, [elapsed, submitting, examData, handleSubmit]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light text-lg">読み込み中...</p>
      </div>
    );
  }

  if (error || !examData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error || "データがありません"}</p>
          <Link href="/kindai/exam" className="text-primary underline">
            模試トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, TIME_LIMIT - elapsed);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isUrgent = remaining <= 60;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー + タイマー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold">近大英語模試</span>
          <div
            className={`font-mono text-lg font-bold ${isUrgent ? "text-accent-light animate-pulse" : ""}`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-6">
        {/* 長文 */}
        <section className="bg-white rounded-xl border border-border p-6 md:p-8 mb-8">
          <h2 className="text-sm font-bold text-primary mb-4">
            次の英文を読み、以下の設問に答えなさい。
          </h2>
          <div className="text-sm md:text-base leading-7 whitespace-pre-wrap">
            {examData.problem.passage}
          </div>
        </section>

        {/* 設問 */}
        <section className="space-y-6 mb-8">
          {examData.problem.questions.map((q) => {
            const isMultiAnswer = Object.keys(q.choices).length > 4;
            const choiceKeys = Object.keys(q.choices);

            return (
              <div
                key={q.question_number}
                className="bg-white rounded-xl border border-border p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {q.question_number}
                  </span>
                  <p className="text-sm md:text-base font-medium">
                    {q.question}
                    {isMultiAnswer && (
                      <span className="text-accent text-xs ml-2">
                        （2つ選べ）
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid gap-2 ml-11">
                  {choiceKeys.map((key) => {
                    const selected = isMultiAnswer
                      ? ((answers[q.question_number] as string[]) || []).includes(key)
                      : answers[q.question_number] === key;

                    return (
                      <button
                        key={key}
                        onClick={() =>
                          handleSelect(q.question_number, key, isMultiAnswer)
                        }
                        className={`text-left px-4 py-3 rounded-lg border text-sm transition ${
                          selected
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : "border-border hover:border-primary/30 hover:bg-bg-gray/50"
                        }`}
                      >
                        <span className="font-bold mr-2">{key}.</span>
                        {q.choices[key]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* 提出ボタン */}
        <div className="text-center pb-12">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-accent text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-accent-light transition disabled:opacity-50"
          >
            {submitting ? "採点中..." : "解答を提出する"}
          </button>
        </div>
      </main>
    </div>
  );
}
