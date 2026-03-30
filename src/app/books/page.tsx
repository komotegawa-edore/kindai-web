import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "書籍一覧｜ドリレオ",
  description:
    "ドリレオの書籍一覧。近畿大学の英語入試に特化した問題集をラインナップ。",
  alternates: { canonical: "https://drilleo.edore-edu.com/books" },
  openGraph: {
    title: "書籍一覧｜ドリレオ",
    description:
      "ドリレオの書籍一覧。近畿大学の英語入試に特化した問題集をラインナップ。",
  },
};

export default function BooksPage() {
  return (
    <>
      {/* ナビ */}
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
          <MobileNav />
        </div>
      </header>

      {/* タイトル */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text">書籍一覧</h1>
          <p className="text-text-light mt-3">
            大学別に特化した問題集で、志望校合格を狙い撃ち。
          </p>
        </div>
      </section>

      {/* 書籍カード一覧 */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* 1冊目: 近大英語 長文読解ドリル */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="bg-bg-gray px-6 py-8">
              <div className="flex justify-center">
                <Image
                  src="/images/book-preview/cover-front.png"
                  alt="近大英語 長文読解ドリル 表紙"
                  width={400}
                  height={566}
                  className="w-36 md:w-44 h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full">
                  発売中
                </span>
              </div>
              <h2 className="text-xl font-bold text-text mb-3">
                近大英語 長文読解ドリル
              </h2>
              <ul className="text-sm text-text-light space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  本番と同じ形式の長文読解を全25回分収録
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  全問解説・全文和訳・語注付き
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  近畿大学の英語入試に完全特化
                </li>
              </ul>
              <div className="text-sm text-text-light mb-5">
                <p>
                  <span className="font-bold text-text">Kindle版</span> ¥780
                  <span className="mx-2 text-border">|</span>
                  <span className="font-bold text-text">ペーパーバック版</span> ¥1,580
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href="#"
                  className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25 flex-1"
                >
                  Kindle版を購入
                </a>
                <a
                  href="#"
                  className="border-2 border-primary text-primary font-bold text-sm px-6 py-3 rounded-lg hover:bg-primary/5 transition text-center flex-1"
                >
                  ペーパーバック版を購入
                </a>
              </div>
              <Link
                href="/kindai/exam"
                className="mt-3 text-center text-sm text-accent font-medium hover:underline"
              >
                無料Web模試を受けてみる &rarr;
              </Link>
            </div>
          </div>

          {/* 2冊目: プレ近大（準備中） */}
          <div className="bg-white/60 rounded-2xl border border-border/60 overflow-hidden flex flex-col opacity-75">
            <div className="bg-bg-gray flex justify-center items-center py-8">
              <div className="w-40 md:w-48 h-56 md:h-68 bg-white rounded-lg shadow-md border border-border flex items-center justify-center">
                <span className="text-text-light text-4xl font-bold">?</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-bg-gray text-text-light text-xs font-bold px-2.5 py-1 rounded-full">
                  準備中
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-light mb-3">
                プレ近大 英語ドリル
              </h2>
              <ul className="text-sm text-text-light space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-text-light font-bold mt-0.5">&#8226;</span>
                  近大英語の基礎固めに最適
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-light font-bold mt-0.5">&#8226;</span>
                  文法・語法・語彙を中心に演習
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-light font-bold mt-0.5">&#8226;</span>
                  長文読解ドリルの前にやるべき一冊
                </li>
              </ul>
              <div className="mt-auto">
                <Link
                  href="/kindai/quiz"
                  className="inline-block text-sm text-primary font-medium hover:underline"
                >
                  まずは無料の診断クイズに挑戦 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
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
