import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ドリレオ — 志望校を狙い撃ち｜大学別特化型 問題集 & 模試",
  description:
    "大学別に特化した問題集と模試で合格をつかみ取ろう。近畿大学の英語入試から対応中。",
  alternates: { canonical: "https://drilleo.edore-edu.com" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ドリレオ",
    url: "https://drilleo.edore-edu.com",
    logo: "https://drilleo.edore-edu.com/icon-192.png",
    description: "大学別に特化した問題集と模試アプリ",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ドリレオ",
    url: "https://drilleo.edore-edu.com",
  },
];

export default function DrilleoTopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <div className="flex justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 512 512" className="shrink-0">
              <rect width="512" height="512" rx="96" fill="#2563EB"/>
              <circle cx="256" cy="256" r="180" fill="white" opacity="0.2"/>
              <circle cx="256" cy="256" r="140" fill="#2563EB"/>
              <circle cx="256" cy="256" r="110" fill="white" opacity="0.3"/>
              <circle cx="256" cy="256" r="80" fill="#F97316"/>
              <circle cx="256" cy="256" r="36" fill="white"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-text">
            <span className="text-primary">志望校</span>を狙い撃ち。
          </h1>
          <p className="text-lg md:text-xl text-text-light mb-2 max-w-2xl mx-auto">
            大学別に特化した問題集 & 模試アプリ
          </p>
          <p className="text-sm text-text-light max-w-2xl mx-auto">
            各大学の出題傾向を徹底分析。本番と同じ形式の演習で、合格をつかみ取ろう。
          </p>
        </div>
      </section>

      {/* 大学カード */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-text">
            対応大学
          </h2>
          <p className="text-center text-text-light mb-12">
            学びたい大学を選んでスタート
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 近畿大学（対応中） */}
            <Link
              href="/kindai"
              className="group bg-white rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all p-6 block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">近</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text group-hover:text-primary transition">
                    近畿大学
                  </h3>
                  <p className="text-xs text-text-light">英語</p>
                </div>
              </div>
              <p className="text-sm text-text-light mb-4">
                長文読解ドリル全25回分。書籍 & Web模試で近大英語を完全攻略。
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-block bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full">
                  対応中
                </span>
                <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                  詳しく見る &rarr;
                </span>
              </div>
            </Link>

            {/* Coming Soon: 関西大学 */}
            <div className="bg-white/60 rounded-xl border border-border/60 p-6 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-bg-gray rounded-lg flex items-center justify-center">
                  <span className="text-text-light font-bold text-lg">関</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-light">関西大学</h3>
                  <p className="text-xs text-text-light">英語</p>
                </div>
              </div>
              <p className="text-sm text-text-light mb-4">
                関大英語の傾向に特化した問題集を準備中です。
              </p>
              <span className="inline-block bg-bg-gray text-text-light text-xs font-bold px-2.5 py-1 rounded-full">
                Coming Soon
              </span>
            </div>

            {/* Coming Soon: 立命館大学 */}
            <div className="bg-white/60 rounded-xl border border-border/60 p-6 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-bg-gray rounded-lg flex items-center justify-center">
                  <span className="text-text-light font-bold text-lg">立</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-light">立命館大学</h3>
                  <p className="text-xs text-text-light">英語</p>
                </div>
              </div>
              <p className="text-sm text-text-light mb-4">
                立命館英語の傾向に特化した問題集を準備中です。
              </p>
              <span className="inline-block bg-bg-gray text-text-light text-xs font-bold px-2.5 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ドリレオの特徴 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            ドリレオの特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary">大学別に特化</h3>
              <p className="text-text-light text-sm leading-relaxed">
                各大学の出題傾向を徹底分析。形式・難易度・頻出テーマに完全対応した問題を収録。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-accent">Web模試で実力チェック</h3>
              <p className="text-text-light text-sm leading-relaxed">
                本番さながらのタイマー付き模試をWebで無料体験。即時採点で弱点を把握。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-success">ランキングで競う</h3>
              <p className="text-text-light text-sm leading-relaxed">
                同じ志望校の受験生とスコアを競い合おう。モチベーション維持に最適。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-primary-dark text-white/60 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
