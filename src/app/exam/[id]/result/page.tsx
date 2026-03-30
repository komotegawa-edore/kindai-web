"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ExamResult {
  session: {
    id: number;
    userId: number;
    nickname: string;
    problemId: string;
    score: number;
    maxScore: number;
    timeSeconds: number;
    finishedAt: string;
    isRegistered: boolean;
  };
  problem: {
    id: string;
    passage: string;
    translation?: string;
    questions: {
      question_number: number;
      question_type?: string;
      paragraph?: number;
      question: string;
      choices: Record<string, string>;
      answer: string | string[];
      explanation: string;
      points: number;
    }[];
    vocabulary?: { word: string; meaning: string }[];
  };
  finished: boolean;
}

export default function ResultPage() {
  const params = useParams();
  const sessionId = Number(params.id);
  const [data, setData] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});
  const [showRegister, setShowRegister] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [examRes, answersRes] = await Promise.all([
          fetch(`/api/exam/${sessionId}`),
          fetch(`/api/exam/${sessionId}/answers`),
        ]);
        if (!examRes.ok) throw new Error("Failed to load");
        const examData: ExamResult = await examRes.json();

        if (!examData.finished) {
          window.location.href = `/exam/${sessionId}`;
          return;
        }

        setData(examData);

        if (answersRes.ok) {
          const ans = await answersRes.json();
          const map: Record<number, { selected: string; isCorrect: boolean }> =
            {};
          for (const a of ans.answers) {
            map[a.questionNumber] = {
              selected: a.selectedAnswer,
              isCorrect: a.isCorrect,
            };
          }
          setUserAnswers(map);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sessionId]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setRegLoading(true);
    setRegError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data.session.userId,
          email: regEmail,
          password: regPassword,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setRegError(result.error || "登録に失敗しました");
        return;
      }
      setRegSuccess(true);
    } catch {
      setRegError("登録に失敗しました。もう一度お試しください。");
    } finally {
      setRegLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light text-lg">読み込み中...</p>
      </div>
    );
  }

  if (!data || !data.finished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">結果データが見つかりません</p>
      </div>
    );
  }

  const { session, problem } = data;
  const percentage = Math.round((session.score / session.maxScore) * 100);
  const minutes = Math.floor(session.timeSeconds / 60);
  const seconds = session.timeSeconds % 60;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 512 512" className="shrink-0">
              <rect width="512" height="512" rx="96" fill="white"/>
              <circle cx="256" cy="256" r="180" fill="#2563EB" opacity="0.15"/>
              <circle cx="256" cy="256" r="80" fill="#F97316"/>
              <circle cx="256" cy="256" r="36" fill="white"/>
            </svg>
            <span className="font-bold text-lg">ドリレオ</span>
          </Link>
          <Link
            href="/leaderboard"
            className="text-white/80 hover:text-white text-sm"
          >
            ランキング
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-8">
        {/* スコアカード */}
        <div className="bg-white rounded-xl border border-border p-8 text-center mb-6">
          <p className="text-sm text-text-light mb-2">
            {session.nickname} さんの結果
          </p>
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            {session.score}
            <span className="text-2xl text-text-light">
              / {session.maxScore}
            </span>
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div>
              <span className="text-text-light">正答率</span>
              <p className="text-lg font-bold text-primary">{percentage}%</p>
            </div>
            <div>
              <span className="text-text-light">解答時間</span>
              <p className="text-lg font-bold text-primary">
                {minutes}分{String(seconds).padStart(2, "0")}秒
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/leaderboard"
              className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-light transition"
            >
              ランキングを見る
            </Link>
            <Link
              href="/exam"
              className="border border-primary text-primary font-bold px-6 py-3 rounded-lg hover:bg-primary/5 transition"
            >
              もう一度挑戦
            </Link>
          </div>
        </div>

        {/* アカウント登録バナー */}
        {!session.isRegistered && !regSuccess && (
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
            {!showRegister ? (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-text mb-1">
                    記録を保存しませんか？
                  </p>
                  <p className="text-sm text-text-light">
                    アカウント登録すると、成績の記録・履歴閲覧・ランキング参加ができます。
                  </p>
                </div>
                <button
                  onClick={() => setShowRegister(true)}
                  className="bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent-light transition shrink-0"
                >
                  無料でアカウント登録
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="max-w-sm mx-auto">
                <h3 className="font-bold text-lg text-center mb-4">
                  アカウント登録
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      パスワード（6文字以上）
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="6文字以上"
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                {regError && (
                  <p className="text-error text-sm mt-2 text-center">
                    {regError}
                  </p>
                )}
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="flex-1 border border-border text-text-light font-bold py-2.5 rounded-lg hover:bg-bg-gray transition text-sm"
                  >
                    あとで
                  </button>
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="flex-1 bg-accent text-white font-bold py-2.5 rounded-lg hover:bg-accent-light transition text-sm disabled:opacity-50"
                  >
                    {regLoading ? "登録中..." : "登録する"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {regSuccess && (
          <div className="bg-success/10 border border-success/30 rounded-xl p-6 mb-8 text-center">
            <p className="font-bold text-success">
              アカウント登録が完了しました！
            </p>
            <p className="text-sm text-text-light mt-1">
              次回からメールアドレスでログインできます。
            </p>
          </div>
        )}

        {/* 長文（折りたたみ） */}
        <details className="bg-white rounded-xl border border-border mb-8">
          <summary className="px-6 py-4 cursor-pointer font-bold text-primary">
            長文を確認する
          </summary>
          <div className="px-6 pb-6">
            <div className="text-sm leading-7 whitespace-pre-wrap mb-6">
              {problem.passage}
            </div>
            {problem.translation && (
              <div className="bg-bg-gray rounded-lg p-4">
                <p className="text-xs font-bold text-primary mb-2">全文和訳</p>
                <div className="text-sm leading-7 whitespace-pre-wrap text-text-light">
                  {problem.translation}
                </div>
              </div>
            )}
            {problem.vocabulary && problem.vocabulary.length > 0 && (
              <div className="mt-4 bg-bg-gray rounded-lg p-4">
                <p className="text-xs font-bold text-primary mb-2">語注</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                  {problem.vocabulary.map((v) => (
                    <div key={v.word}>
                      <span className="font-semibold">{v.word}</span>
                      <span className="text-text-light ml-2">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </details>

        {/* 設問ごとの解説 */}
        <h2 className="text-xl font-bold text-primary mb-4">解答と解説</h2>
        <div className="space-y-6 mb-12">
          {problem.questions.map((q) => {
            const ua = userAnswers[q.question_number];
            const correctAnswer = q.answer;
            const userSelected = ua?.selected ?? "";
            const isCorrect = ua?.isCorrect ?? false;

            return (
              <div
                key={q.question_number}
                className={`bg-white rounded-xl border p-6 ${
                  isCorrect ? "border-success/50" : "border-error/50"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isCorrect ? "bg-success" : "bg-error"
                    }`}
                  >
                    {q.question_number}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{q.question}</p>
                    <p className="text-xs text-text-light">
                      配点: {q.points}点 /
                      {isCorrect ? " 正解!" : " 不正解"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 ml-11 mb-4">
                  {Object.entries(q.choices).map(([key, text]) => {
                    const isAnswer = Array.isArray(correctAnswer)
                      ? correctAnswer.includes(key)
                      : correctAnswer === key;
                    const isUserChoice = userSelected.includes(key);

                    let style = "border-border bg-white";
                    if (isAnswer) {
                      style = "border-success bg-success/5 text-success";
                    } else if (isUserChoice && !isAnswer) {
                      style = "border-error bg-error/5 text-error line-through";
                    }

                    return (
                      <div
                        key={key}
                        className={`px-4 py-3 rounded-lg border text-sm ${style}`}
                      >
                        <span className="font-bold mr-2">{key}.</span>
                        {text}
                        {isAnswer && (
                          <span className="ml-2 text-xs font-bold">
                            [正解]
                          </span>
                        )}
                        {isUserChoice && !isAnswer && (
                          <span className="ml-2 text-xs font-bold">
                            [あなたの解答]
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="ml-11 bg-bg-gray rounded-lg p-4">
                  <p className="text-xs font-bold text-primary mb-1">解説</p>
                  <p className="text-sm leading-relaxed text-text-light">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-primary-dark text-white/60 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
