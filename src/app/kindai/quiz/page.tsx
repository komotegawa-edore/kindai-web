"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuizEntryPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError("ニックネームを入力してください");
      return;
    }
    if (trimmed.length > 20) {
      setError("ニックネームは20文字以内で入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: trimmed }),
      });
      if (!res.ok) throw new Error("Failed to start quiz");
      const data = await res.json();
      router.push(`/kindai/quiz/${data.sessionId}`);
    } catch {
      setError("診断の開始に失敗しました。もう一度お試しください。");
      setLoading(false);
    }
  }

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

      <main className="flex-1 px-4 md:px-6">
        {/* ヒーローセクション */}
        <section className="max-w-2xl mx-auto pt-12 pb-8 text-center">
          <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            無料・登録不要・約5分
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-text">
            <span className="text-primary">近大英語</span>
            <br />
            スタートダッシュ診断
          </h1>
          <p className="text-text-light mb-8 max-w-lg mx-auto">
            文法・語彙・語法の20問で、近大英語の弱点をチェック。
            <br className="hidden sm:block" />
            新学期の学習のスタートダッシュを切ろう！
          </p>
        </section>

        {/* ニックネーム入力フォーム */}
        <section className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <form onSubmit={handleStart} className="space-y-6">
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-semibold mb-2"
                >
                  ニックネーム
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="結果画面に表示される名前"
                  maxLength={20}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {error && (
                <p className="text-error text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-light transition disabled:opacity-50 shadow-lg shadow-accent/25"
              >
                {loading ? "準備中..." : "診断をスタートする"}
              </button>
            </form>
          </div>
        </section>

        {/* 特徴3つ */}
        <section className="max-w-3xl mx-auto pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">弱点がわかる</h3>
              <p className="text-text-light text-sm">カテゴリ別にスコアを診断。自分の弱点が一目でわかります。</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">何を勉強すべきかわかる</h3>
              <p className="text-text-light text-sm">診断結果から、優先すべき学習分野を提案します。</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">無料で5分</h3>
              <p className="text-text-light text-sm">登録不要で今すぐ受験。たった5分で診断完了。</p>
            </div>
          </div>
        </section>
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
