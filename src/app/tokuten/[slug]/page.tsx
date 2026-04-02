"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface TokutenAuth {
  token: string;
  email: string;
  bookName: string;
  audioCount: number;
  verifiedAt: string;
}

interface TrackMeta {
  number: number;
  label: string;
  theme: string;
  src: string;
  downloadUrl: string;
}

// 書籍ごとの回テーマ（タグの先頭を使用）
const TRACK_THEMES: Record<string, string[]> = {
  "kindai-reading": [
    "人工知能と社会",
    "宇宙探査の最前線",
    "再生可能エネルギー",
    "睡眠と健康の科学",
    "海洋プラスチック問題",
    "ボランティア活動の意義",
    "多言語社会の課題",
    "フードロスと持続可能な食",
    "読書離れとデジタルメディア",
    "スポーツと国際交流",
    "都市農業の可能性",
    "絶滅危惧種の保護",
    "気候変動と日常生活",
    "森林保全と地域社会",
    "水資源の危機",
    "オンライン教育の発展",
    "異文化理解と留学",
    "成長マインドセットの効果",
    "音楽教育と脳の発達",
    "コミュニケーション能力の重要性",
    "伝統工芸の継承",
    "博物館の役割と進化",
    "写真技術の歴史と影響",
    "世界の祭りと文化的意義",
    "建築デザインと暮らし",
  ],
};

export default function TokutenSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [auth, setAuth] = useState<TokutenAuth | null>(null);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`tokuten_${slug}`);
    if (!stored) {
      router.push("/tokuten");
      return;
    }

    let parsed: TokutenAuth;
    try {
      parsed = JSON.parse(stored);
    } catch {
      router.push("/tokuten");
      return;
    }

    // サーバー側でトークンを検証
    fetch("/api/tokuten/validate", {
      headers: { Authorization: `Bearer ${parsed.token}` },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem(`tokuten_${slug}`);
          router.push("/tokuten");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.valid) {
          setAuth({
            ...parsed,
            bookName: data.bookName,
            audioCount: data.audioCount,
          });
          setChecked(true);
        }
      })
      .catch(() => {
        router.push("/tokuten");
      });
  }, [slug, router]);

  if (!checked || !auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light">読み込み中...</p>
      </div>
    );
  }

  const themes = TRACK_THEMES[slug] || [];
  const tracks: TrackMeta[] = Array.from({ length: auth.audioCount }, (_, i) => {
    const num = i + 1;
    const padded = String(num).padStart(3, "0");
    const audioUrl = `/api/tokuten/audio/${slug}/${padded}.mp3?token=${auth.token}`;
    return {
      number: num,
      label: `第${num}回`,
      theme: themes[i] || "",
      src: audioUrl,
      downloadUrl: audioUrl,
    };
  });

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

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* ヘッダー情報 */}
        <div className="mb-8">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            購入者限定特典
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
            {auth.bookName}
          </h1>
          <p className="text-text-light text-sm">
            全{auth.audioCount}回分のネイティブ音声を再生・ダウンロードできます
          </p>
        </div>

        {/* 使い方ヒント */}
        <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 mb-8">
          <h2 className="font-bold text-text text-sm mb-2">音声の活用方法</h2>
          <ul className="text-text-light text-sm space-y-1">
            <li>- リスニング力の強化に：英文を見ずに音声だけで内容を把握</li>
            <li>- 音読練習のお手本に：音声に合わせてシャドーイング</li>
            <li>- 通学中のスキマ学習に：ダウンロードしてオフライン再生</li>
          </ul>
        </div>

        {/* 音声一覧 */}
        <div className="space-y-3">
          {tracks.map((track) => (
            <AudioTrack
              key={track.number}
              track={track}
              isPlaying={playingTrack === track.number}
              onPlay={() => setPlayingTrack(track.number)}
              onPause={() => setPlayingTrack(null)}
            />
          ))}
        </div>

        {/* レビュー依頼バナー */}
        <div className="mt-12 bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
          <h2 className="font-bold text-text mb-2">この書籍はいかがでしたか？</h2>
          <p className="text-text-light text-sm mb-4">
            Amazonレビューにご感想をお寄せいただけると大変励みになります。
          </p>
          <a
            href="https://www.amazon.co.jp/dp/B0GVMW86MN?&linkCode=ll2&tag=frontriver0b-22&linkId=f7bb7943e3d7a61495f83e9f2e956915&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white font-bold px-6 py-2.5 rounded-lg hover:bg-accent-light transition text-sm"
          >
            Amazonでレビューを書く
          </a>
        </div>

        {/* クロスセルバナー */}
        <Link
          href="/kindai-bunpou"
          className="mt-6 block bg-primary/5 border border-primary/20 rounded-xl p-5 hover:bg-primary/10 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-primary mb-1">文法・語法ドリルもチェック</p>
              <p className="text-sm text-text-light">
                大問III〜VIを全20回分収録。長文読解ドリルとあわせてご活用ください。
              </p>
            </div>
            <span className="text-primary text-lg font-bold group-hover:translate-x-1 transition-transform shrink-0 ml-4">
              &rarr;
            </span>
          </div>
        </Link>
      </main>

      <footer className="bg-primary-dark text-white/60 py-8 mt-16">
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

function AudioTrack({
  track,
  isPlaying,
  onPlay,
  onPause,
}: {
  track: TrackMeta;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* 回番号 */}
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-sm">{track.label}</span>
        </div>

        {/* テーマ＋コントロール */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-text text-sm truncate">{track.theme}</p>
          <audio
            src={track.src}
            className="w-full mt-2 h-8"
            controls
            controlsList="noplaybackrate"
            preload="none"
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onPause}
          />
        </div>

        {/* ダウンロード */}
        <a
          href={track.downloadUrl}
          download={`${track.label}.mp3`}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-bg-gray transition"
          title="ダウンロード"
        >
          <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
