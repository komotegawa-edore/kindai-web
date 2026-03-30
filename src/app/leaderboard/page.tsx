"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LeaderboardEntry {
  id: number;
  nickname: string;
  problemId: string;
  score: number;
  maxScore: number;
  timeSeconds: number;
  finishedAt: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/leaderboard");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setEntries(data.results);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}分${String(s).padStart(2, "0")}秒`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            Drilleo
          </Link>
          <Link
            href="/exam"
            className="text-white/80 hover:text-white text-sm"
          >
            模試を受ける
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
          ランキング
        </h1>

        {loading ? (
          <p className="text-center text-text-light">読み込み中...</p>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-light mb-4">
              まだ記録がありません
            </p>
            <Link
              href="/exam"
              className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent-light transition"
            >
              最初の挑戦者になる
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold w-16 text-center">
                    順位
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold">
                    ニックネーム
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-center">
                    スコア
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-center hidden sm:table-cell">
                    解答時間
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry, i) => (
                  <tr
                    key={entry.id}
                    className={`hover:bg-bg-gray/50 ${i < 3 ? "font-semibold" : ""}`}
                  >
                    <td className="px-4 md:px-6 py-3 text-center">
                      {i === 0 && (
                        <span className="text-xl" role="img" aria-label="1st">
                          🥇
                        </span>
                      )}
                      {i === 1 && (
                        <span className="text-xl" role="img" aria-label="2nd">
                          🥈
                        </span>
                      )}
                      {i === 2 && (
                        <span className="text-xl" role="img" aria-label="3rd">
                          🥉
                        </span>
                      )}
                      {i >= 3 && (
                        <span className="text-text-light">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-3">{entry.nickname}</td>
                    <td className="px-4 md:px-6 py-3 text-center">
                      <span className="text-primary font-bold">
                        {entry.score}
                      </span>
                      <span className="text-text-light text-sm">
                        /{entry.maxScore}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-center hidden sm:table-cell text-text-light">
                      {entry.timeSeconds != null
                        ? formatTime(entry.timeSeconds)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-primary-dark text-white/60 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 Drilleo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
