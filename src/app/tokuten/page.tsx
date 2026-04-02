"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TokutenPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/tokuten/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "認証に失敗しました");
        setLoading(false);
        return;
      }

      // 認証情報をlocalStorageに保存
      localStorage.setItem(
        `tokuten_${data.slug}`,
        JSON.stringify({
          token: data.token,
          email,
          bookName: data.bookName,
          audioCount: data.audioCount,
          verifiedAt: new Date().toISOString(),
        })
      );

      router.push(`/tokuten/${data.slug}`);
    } catch {
      setError("通信エラーが発生しました。しばらくしてからお試しください。");
      setLoading(false);
    }
  }

  return (
    <>
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 512 512" className="shrink-0">
              <rect width="512" height="512" rx="96" fill="#2563EB"/>
              <circle cx="256" cy="256" r="180" fill="white" opacity="0.2"/>
              <circle cx="256" cy="256" r="140" fill="#2563EB"/>
              <circle cx="256" cy="256" r="110" fill="white" opacity="0.3"/>
              <circle cx="256" cy="256" r="80" fill="#F97316"/>
              <circle cx="256" cy="256" r="36" fill="white"/>
            </svg>
            <span className="font-bold text-primary-dark text-lg">ドリレオ</span>
          </Link>
        </div>
      </header>

      <main className="min-h-[80vh] flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">購入者限定特典</h1>
            <p className="text-text-light text-sm">
              書籍に記載されたアクセスコードとメールアドレスを入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="code" className="block text-sm font-bold text-text mb-1.5">
                アクセスコード
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="例: KINDAI-READING-2026"
                className="w-full px-4 py-3 border border-border rounded-lg text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary uppercase tracking-wider"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-text mb-1.5">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-border rounded-lg text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                required
              />
              <p className="text-xs text-text-light mt-1.5">
                特典の利用確認にのみ使用します。第三者への提供はありません。
              </p>
            </div>

            {error && (
              <div className="bg-error/10 text-error text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "認証中..." : "特典ページにアクセス"}
            </button>
          </form>

          <p className="text-center text-text-light text-xs mt-8">
            アクセスコードは書籍の巻末に記載されています。
          </p>
        </div>
      </main>

      <footer className="bg-primary-dark text-white/60 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition">利用規約</Link>
            <Link href="/privacy" className="hover:text-white transition">プライバシーポリシー</Link>
          </div>
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
