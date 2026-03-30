"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ExamEntryPage() {
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
      const res = await fetch("/api/exam/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: trimmed }),
      });
      if (!res.ok) throw new Error("Failed to start exam");
      const data = await res.json();
      router.push(`/exam/${data.sessionId}`);
    } catch {
      setError("模試の開始に失敗しました。もう一度お試しください。");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            近大ドリル
          </Link>
          <Link
            href="/leaderboard"
            className="text-white/80 hover:text-white text-sm"
          >
            ランキング
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <h1 className="text-2xl font-bold text-primary mb-2 text-center">
              近大英語模試
            </h1>
            <p className="text-text-light text-center mb-8 text-sm">
              長文読解問題（大問7形式）をランダムに1題出題します。
              <br />
              制限時間30分で挑戦しましょう！
            </p>

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
                  placeholder="ランキングに表示される名前"
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
                className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-light transition disabled:opacity-50"
              >
                {loading ? "準備中..." : "模試を開始する"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
