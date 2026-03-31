"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface QuizQuestion {
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

interface QuizResult {
  session: {
    id: number;
    publicId: string;
    nickname: string;
    problemId: string;
    score: number;
    maxScore: number;
    timeSeconds: number;
    finishedAt: string;
  };
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
  finished: boolean;
}

// カテゴリ別スコア
interface CategoryScore {
  correct: number;
  total: number;
}

// 弱点コメント生成
function getWeaknessComment(category: string, correct: number, total: number): string | null {
  const rate = total > 0 ? correct / total : 0;
  if (rate >= 0.8) return null; // 十分な力がある → コメント不要
  if (rate < 0.6) {
    const advice: Record<string, string> = {
      "文法・語法": "関係詞・時制・使役動詞・譲歩構文などの文法事項を体系的に復習しましょう。",
      "語彙": "英単語帳で頻出語彙をしっかり覚えましょう。定義から単語を推測する練習も効果的です。",
      "同意文": "慣用表現の意味を正確に押さえましょう。同意文書き換えのパターン演習も有効です。",
      "整序英作文": "基本的な文法構造（分詞構文・関係詞節・慣用表現）を意識して英文を組み立てる練習をしましょう。",
    };
    return `「${category}」が弱点です。${advice[category] || "優先的に学習しましょう。"}`;
  }
  // 60%〜79%
  return `「${category}」はあと少し。ケアレスミスに注意しましょう。`;
}

export default function QuizResultPage() {
  const params = useParams();
  const sessionId = params.id as string;
  const [data, setData] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [quizRes, answersRes] = await Promise.all([
          fetch(`/api/quiz/${sessionId}`),
          fetch(`/api/quiz/${sessionId}/answers`),
        ]);
        if (!quizRes.ok) throw new Error("Failed to load");
        const quizData: QuizResult = await quizRes.json();

        if (!quizData.finished) {
          window.location.href = `/kindai/quiz/${sessionId}`;
          return;
        }

        setData(quizData);

        if (answersRes.ok) {
          const ans = await answersRes.json();
          const map: Record<number, { selected: string; isCorrect: boolean }> = {};
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

  const { session, quiz } = data;
  const totalQuestions = quiz.questions.length;
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const minutes = Math.floor(session.timeSeconds / 60);
  const seconds = session.timeSeconds % 60;

  // カテゴリ別集計
  const categoryScores: Record<string, CategoryScore> = {};
  quiz.questions.forEach((q, i) => {
    const qNum = i + 1;
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category].total++;
    if (userAnswers[qNum]?.isCorrect) {
      categoryScores[q.category].correct++;
    }
  });

  // 弱点コメント
  const weaknessComments: string[] = [];
  for (const [cat, score] of Object.entries(categoryScores)) {
    const comment = getWeaknessComment(cat, score.correct, score.total);
    if (comment) weaknessComments.push(comment);
  }

  const overallStrong = percentage >= 80;

  // X共有テキスト
  const shareText = `近大英語スタートダッシュ診断で${correctCount}/${totalQuestions}問正解（${percentage}%）でした！`;
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/kindai/quiz` : "https://drilleo.edore-edu.com/kindai/quiz";
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

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
            href="/kindai"
            className="text-white/80 hover:text-white text-sm"
          >
            トップ
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-8">
        {/* 1. 総合スコア */}
        <div className="bg-white rounded-xl border border-border p-8 text-center mb-6">
          <p className="text-sm text-text-light mb-2">
            {session.nickname} さんの診断結果
          </p>
          <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
            {correctCount}
            <span className="text-2xl text-text-light">
              / {totalQuestions}問正解
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
        </div>

        {/* 2. カテゴリ別診断 */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-bold text-primary mb-4">カテゴリ別診断</h2>
          <div className="space-y-3">
            {Object.entries(categoryScores).map(([category, score]) => {
              const rate = score.total > 0 ? score.correct / score.total : 0;
              return (
                <div key={category} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24 shrink-0 text-text">
                    {category}
                  </span>
                  <div className="flex gap-1 flex-1">
                    {Array.from({ length: score.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          i < score.correct
                            ? "bg-success text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {i < score.correct ? "\u25CF" : "\u25CB"}
                      </div>
                    ))}
                  </div>
                  <span className={`text-sm font-bold shrink-0 ${
                    rate >= 0.8 ? "text-success" : rate >= 0.6 ? "text-primary" : "text-error"
                  }`}>
                    {score.correct}/{score.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. 弱点コメント */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-bold text-primary mb-4">診断コメント</h2>
          {overallStrong && weaknessComments.length === 0 ? (
            <div className="bg-success/10 rounded-lg p-4">
              <p className="text-sm text-success font-medium">
                基礎力は十分です！長文読解ドリルで実戦力を磨きましょう。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {overallStrong && (
                <div className="bg-success/10 rounded-lg p-4">
                  <p className="text-sm text-success font-medium">
                    全体の正答率は高いです。細かい弱点を潰してさらにスコアアップしましょう。
                  </p>
                </div>
              )}
              {weaknessComments.map((comment, i) => (
                <div key={i} className="bg-accent/5 rounded-lg p-4">
                  <p className="text-sm text-text">{comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. 書籍CTA */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-6 md:p-8 mb-6">
          {percentage <= 60 ? (
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <Image
                src="/images/book-preview/cover-bunpou.jpg"
                alt="近大英語 文法・語法ドリル 表紙"
                width={400}
                height={566}
                className="w-32 h-auto rounded-lg shadow-xl shrink-0"
              />
              <div>
                <h2 className="text-lg font-bold text-text mb-2">
                  まずは文法・語法で基礎固め！
                </h2>
                <p className="text-sm text-text-light mb-2">
                  大問III〜VI（文法・語法・同意文・語彙・整序英作文）の基礎をしっかり固めることで、近大英語のスコアは大きく伸びます。
                </p>
                <p className="text-sm text-text-light mb-4">
                  過去問ではないオリジナル問題だから、気軽に近大形式の演習を始められます。全20回・全問解説付き。
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/kindai-bunpou"
                    className="inline-block bg-accent text-white font-bold px-8 py-3 rounded-lg hover:bg-accent-light transition text-center shadow-lg shadow-accent/25"
                  >
                    文法・語法ドリルを見る
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <Image
                src="/images/book-preview/cover-front.png"
                alt="近大英語 長文読解ドリル 表紙"
                width={400}
                height={566}
                className="w-32 h-auto rounded-lg shadow-xl shrink-0"
              />
              <div>
                <h2 className="text-lg font-bold text-text mb-2">
                  基礎力は十分！次は長文読解
                </h2>
                <p className="text-sm text-text-light mb-2">
                  近大英語で最も配点が高いのは長文読解（大問VII）。
                  全25回分の長文読解ドリルで実戦力を磨きましょう。
                </p>
                <p className="text-sm text-text-light mb-4">
                  全問解説・全文和訳付きで、独学でもスコアアップ。
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/kindai"
                    className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25"
                  >
                    長文読解ドリルを見る
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. 書籍紹介（表紙画像付き） */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-bold text-primary mb-4 text-center">近大英語対策の書籍</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/kindai" className="group text-center">
              <Image
                src="/images/book-preview/cover-front.png"
                alt="近大英語 長文読解ドリル"
                width={400}
                height={566}
                className="w-28 h-auto mx-auto rounded-lg shadow-lg group-hover:shadow-xl transition"
              />
              <p className="text-sm font-bold text-text mt-3 group-hover:text-primary transition">長文読解ドリル</p>
              <p className="text-xs text-text-light mt-1">全25回・全問解説付き</p>
            </Link>
            <Link href="/kindai-bunpou" className="group text-center">
              <Image
                src="/images/book-preview/cover-bunpou.jpg"
                alt="近大英語 文法・語法ドリル"
                width={400}
                height={566}
                className="w-28 h-auto mx-auto rounded-lg shadow-lg group-hover:shadow-xl transition"
              />
              <p className="text-sm font-bold text-text mt-3 group-hover:text-primary transition">文法・語法ドリル</p>
              <p className="text-xs text-text-light mt-1">全20回・大問III〜VI対応</p>
            </Link>
          </div>
        </div>

        {/* 6. X共有ボタン */}
        <div className="text-center mb-8">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェア
          </a>
        </div>

        {/* 7. 全問解答・解説（折りたたみ） */}
        <div className="mb-12">
          <button
            onClick={() => setShowExplanations(!showExplanations)}
            className="w-full bg-white rounded-xl border border-border px-6 py-4 font-bold text-primary flex items-center justify-between"
          >
            <span>全問の解答・解説を見る</span>
            <svg
              className={`w-5 h-5 text-text-light transition-transform ${showExplanations ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showExplanations && (
            <div className="space-y-4 mt-4">
              {quiz.questions.map((q, i) => {
                const qNum = i + 1;
                const ua = userAnswers[qNum];
                const isCorrect = ua?.isCorrect ?? false;
                const userSelected = ua?.selected ?? "";

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border p-5 ${
                      isCorrect ? "border-success/50" : "border-error/50"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span
                        className={`text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isCorrect ? "bg-success" : "bg-error"
                        }`}
                      >
                        {qNum}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs text-text-light">
                          {q.section_name} / {q.category}
                        </span>
                        <p className="text-sm font-medium mt-0.5">{q.question}</p>
                        {q.sentence_frame && (
                          <p className="text-sm text-text-light mt-1 font-mono bg-bg-gray rounded px-3 py-1.5">
                            {q.sentence_frame}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-1.5 ml-10 mb-3">
                      {Object.entries(q.choices).map(([key, text]) => {
                        const isAnswer = q.answer === key;
                        const isUserChoice = userSelected === key;

                        let style = "border-border bg-white";
                        if (isAnswer) {
                          style = "border-success bg-success/5 text-success";
                        } else if (isUserChoice && !isAnswer) {
                          style = "border-error bg-error/5 text-error line-through";
                        }

                        return (
                          <div
                            key={key}
                            className={`px-3 py-2 rounded-lg border text-sm ${style}`}
                          >
                            <span className="font-bold mr-2">{key}.</span>
                            {text}
                            {isAnswer && (
                              <span className="ml-2 text-xs font-bold">[正解]</span>
                            )}
                            {isUserChoice && !isAnswer && (
                              <span className="ml-2 text-xs font-bold">[あなたの解答]</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="ml-10 bg-bg-gray rounded-lg p-3">
                      <p className="text-xs font-bold text-primary mb-1">解説</p>
                      <p className="text-sm leading-relaxed text-text-light">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-primary-dark text-white/60 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition">利用規約</Link>
            <Link href="/privacy" className="hover:text-white transition">プライバシーポリシー</Link>
          </div>
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
