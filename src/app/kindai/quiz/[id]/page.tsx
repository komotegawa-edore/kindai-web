"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface QuizQuestion {
  id: string;
  section: number;
  section_name: string;
  category: string;
  question: string;
  sentence_frame?: string;
  choices: Record<string, string>;
  points: number;
}

interface QuizSessionData {
  session: {
    id: number;
    publicId: string;
    nickname: string;
    problemId: string;
    maxScore: number;
  };
  quiz: {
    id: string;
    title: string;
    description: string;
    time_limit_seconds: number;
    questions: QuizQuestion[];
  };
  finished: boolean;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [data, setData] = useState<QuizSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/quiz/${sessionId}`);
        if (!res.ok) throw new Error("Failed to load quiz");
        const json: QuizSessionData = await res.json();
        if (json.finished) {
          router.replace(`/kindai/quiz/${sessionId}/result`);
          return;
        }
        setData(json);
      } catch {
        setError("診断データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // タイマー
  useEffect(() => {
    if (!data || submitting) return;
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(sec);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [data, submitting]);

  const handleSelect = useCallback((qNum: number, choice: string) => {
    setAnswers((prev) => ({ ...prev, [qNum]: choice }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!data || submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const submitted = data.quiz.questions.map((_, i) => ({
      questionNumber: i + 1,
      selected: answers[i + 1] ?? "",
    }));

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answers: submitted,
          timeSeconds: elapsed,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      router.push(`/kindai/quiz/${sessionId}/result`);
    } catch {
      setError("提出に失敗しました。もう一度お試しください。");
      setSubmitting(false);
    }
  }, [data, answers, sessionId, elapsed, submitting, router]);

  // 時間切れ自動提出
  const timeLimit = data?.quiz.time_limit_seconds ?? 600;
  useEffect(() => {
    if (elapsed >= timeLimit && !submitting && data) {
      handleSubmit();
    }
  }, [elapsed, timeLimit, submitting, data, handleSubmit]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light text-lg">読み込み中...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error || "データがありません"}</p>
          <Link href="/kindai/quiz" className="text-primary underline">
            診断トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, timeLimit - elapsed);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isUrgent = remaining <= 60;
  const answeredCount = Object.keys(answers).length;
  const totalCount = data.quiz.questions.length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー + タイマー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <span className="font-bold text-sm md:text-base">スタートダッシュ診断</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/70">
              {answeredCount}/{totalCount}問
            </span>
            <div
              className={`font-mono text-lg font-bold ${isUrgent ? "text-accent-light animate-pulse" : ""}`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6">
        {/* 設問一覧 */}
        <div className="space-y-6 mb-8">
          {data.quiz.questions.map((q, i) => {
            const qNum = i + 1;
            const choiceKeys = Object.keys(q.choices);

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-border p-5 md:p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-primary text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                    {qNum}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs text-primary/70 font-medium">
                      {q.section_name}
                    </span>
                    <p className="text-sm md:text-base font-medium mt-0.5">
                      {q.question}
                    </p>
                    {q.sentence_frame && (
                      <p className="text-sm text-text-light mt-1 font-mono bg-bg-gray rounded px-3 py-1.5">
                        {q.sentence_frame}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2 ml-10">
                  {choiceKeys.map((key) => {
                    const selected = answers[qNum] === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelect(qNum, key)}
                        className={`text-left px-4 py-2.5 rounded-lg border text-sm transition ${
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
        </div>

        {/* 提出ボタン */}
        <div className="text-center pb-12">
          <p className="text-sm text-text-light mb-3">
            {answeredCount < totalCount
              ? `未回答: ${totalCount - answeredCount}問`
              : "全問回答済み"}
          </p>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-accent text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-accent-light transition disabled:opacity-50 shadow-lg shadow-accent/25"
          >
            {submitting ? "採点中..." : "診断結果を見る"}
          </button>
        </div>
      </main>
    </div>
  );
}
