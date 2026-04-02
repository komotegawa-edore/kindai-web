import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "ドリレオ — 志望校を狙い撃ち｜大学別特化型 問題集 & 無料診断",
  description:
    "大学別に特化した問題集と無料Web診断で合格をつかみ取ろう。近畿大学の英語入試から対応中。",
  alternates: { canonical: "https://drilleo.edore-edu.com" },
  openGraph: {
    title: "ドリレオ — 志望校を狙い撃ち｜大学別特化型 問題集 & 無料診断",
    description:
      "大学別に特化した問題集と無料Web診断で合格をつかみ取ろう。近畿大学の英語入試から対応中。",
  },
};

const faqItems = [
  {
    q: "ドリレオとはどんなサービスですか？",
    a: "大学別に特化した問題集（書籍）と無料Web診断を組み合わせた受験対策サービスです。各大学の出題傾向を徹底的に分析し、本番と同じ形式のオリジナル問題を収録しています。現在は近畿大学の英語に対応しており、今後、関西大学・立命館大学なども順次対応予定です。",
  },
  {
    q: "無料診断とは何ですか？",
    a: "アカウント登録不要・完全無料の「スタートダッシュ診断」です。近大英語の基礎力を手軽にチェックでき、結果に応じておすすめの書籍を提案します。まずは診断で自分の実力を確認してみましょう。",
  },
  {
    q: "書籍はどこで購入できますか？",
    a: "Amazonでペーパーバック版（紙の書籍）を販売しています。",
  },
  {
    q: "問題は過去問ですか？",
    a: "いいえ、すべてオリジナル問題です。各大学の過去の出題傾向を徹底分析したうえで作成しており、過去問をそのまま掲載しているわけではありません。過去問集を解き終えた後の追加演習にも最適です。",
  },
  {
    q: "現在対応している大学・科目は何ですか？",
    a: "近畿大学の英語入試に対応しています。長文読解ドリル（全25回）と文法・語法ドリル（全20回）の2冊の書籍、および無料のスタートダッシュ診断をご利用いただけます。関西大学・立命館大学の英語についても準備中です。",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ドリレオ",
    url: "https://drilleo.edore-edu.com",
    logo: "https://drilleo.edore-edu.com/icon-192.png",
    description: "大学別に特化した問題集と無料診断",
    parentOrganization: {
      "@type": "Organization",
      name: "edore",
      url: "https://www.edore-edu.com/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ドリレオ",
    alternateName: ["Drilleo", "drilleo"],
    url: "https://drilleo.edore-edu.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
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
          <MobileNav />
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-text">
                <span className="text-primary">志望校</span>だけに絞った
                <br />
                問題集 & 無料診断
              </h1>
              <p className="text-lg md:text-xl text-text-light mb-2 max-w-lg">
                志望校に特化した問題集（書籍）& 無料Web診断
              </p>
              <p className="text-sm text-text-light max-w-lg leading-relaxed">
                各大学の出題傾向を徹底分析し、本番と同じ形式のオリジナル問題を収録。
                書籍で繰り返し演習し、無料診断で弱点を把握。合格をつかみ取ろう。
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center items-end gap-4">
              {/* 書籍表紙: 長文読解ドリル */}
              <a href="https://www.amazon.co.jp/dp/B0GVMW86MN?&linkCode=ll2&tag=frontriver0b-22&linkId=f7bb7943e3d7a61495f83e9f2e956915&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" className="relative block hover:scale-105 transition-transform">
                <Image
                  src="/images/book-preview/cover-front.png"
                  alt="近大英語 長文読解ドリル 表紙"
                  width={400}
                  height={566}
                  className="w-28 md:w-36 h-auto rounded-lg shadow-xl"
                  style={{ transform: "rotateY(-4deg)" }}
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  長文
                </div>
              </a>
              {/* 書籍表紙: 文法・語法ドリル */}
              <a href="https://www.amazon.co.jp/dp/B0GVRG65V3?&linkCode=ll2&tag=frontriver0b-22&linkId=2459913aee4afeea5353a161603a4afd&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" className="relative block hover:scale-105 transition-transform">
                <Image
                  src="/images/book-preview/cover-bunpou.jpg"
                  alt="近大英語 文法・語法ドリル 表紙"
                  width={400}
                  height={566}
                  className="w-28 md:w-36 h-auto rounded-lg shadow-xl"
                  style={{ transform: "rotateY(-4deg)" }}
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  文法
                </div>
              </a>
              {/* 無料診断 */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-800 bg-gray-800 w-24 md:w-32">
                  <Image
                    src="/images/mock-spring.PNG"
                    alt="スタートダッシュ診断 結果画面"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-success text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  診断
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ドリレオとは */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            ドリレオとは
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-3/5">
              <p className="text-text-light leading-relaxed mb-4">
                ドリレオは、大学入試に特化した「書籍」と「無料Web診断」を組み合わせた新しいかたちの受験対策サービスです。
              </p>
              <p className="text-text-light leading-relaxed mb-4">
                一般的な参考書は幅広い大学を対象にしていますが、ドリレオは各大学の出題傾向・形式・難易度を徹底的に分析し、その大学だけに的を絞ったオリジナル問題を収録しています。
              </p>
              <p className="text-text-light leading-relaxed">
                過去問をそのまま掲載するのではなく、傾向分析にもとづいて作成されたオリジナル問題なので、過去問集を解き終わった後の追加演習としても最適です。
              </p>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <Image
                src="/images/illust/hero-target.png"
                alt="ターゲットを狙い撃ちするイラスト"
                width={320}
                height={320}
                className="w-48 md:w-56 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            使い方
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/illust/step-select.png"
                  alt="志望校を選ぶ"
                  width={160}
                  height={160}
                  className="w-28 h-auto"
                />
              </div>
              <div className="w-10 h-10 bg-primary text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-text">志望校を選ぶ</h3>
              <p className="text-text-light text-sm leading-relaxed">
                対応大学の中から自分の志望校を選びましょう。大学ごとに問題集・無料診断が用意されています。
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/illust/step-study.png"
                  alt="書籍で演習する"
                  width={160}
                  height={160}
                  className="w-28 h-auto"
                />
              </div>
              <div className="w-10 h-10 bg-primary text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-text">書籍で演習する</h3>
              <p className="text-text-light text-sm leading-relaxed">
                Amazonで問題集を購入し、繰り返し演習。全問に解説・和訳付きだから、独学でも安心。
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/illust/step-exam.png"
                  alt="無料診断で実力チェック"
                  width={160}
                  height={160}
                  className="w-28 h-auto"
                />
              </div>
              <div className="w-10 h-10 bg-primary text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-text">無料診断で実力チェック</h3>
              <p className="text-text-light text-sm leading-relaxed">
                無料のスタートダッシュ診断で近大英語の基礎力をチェック。結果に応じたおすすめ書籍もわかる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 近大英語の例 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4 mx-auto block text-center">
            近畿大学 英語 — 対応中
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-text">
            たとえば「近大英語」では
          </h2>
          <p className="text-center text-text-light mb-12 max-w-2xl mx-auto">
            近畿大学の英語入試を徹底分析。長文読解ドリル＆文法・語法ドリルの2冊と、
            無料Web診断を組み合わせた学習で、効率的に合格力を高めます。
          </p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* 書籍プレビュー */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 text-center">書籍（2冊）</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <a href="https://www.amazon.co.jp/dp/B0GVMW86MN?&linkCode=ll2&tag=frontriver0b-22&linkId=f7bb7943e3d7a61495f83e9f2e956915&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                    <Image
                      src="/images/book-preview/cover-front.png"
                      alt="近大英語 長文読解ドリル 表紙"
                      width={400}
                      height={566}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xs text-text-light text-center mt-2">長文読解ドリル</p>
                </a>
                <a href="https://www.amazon.co.jp/dp/B0GVRG65V3?&linkCode=ll2&tag=frontriver0b-22&linkId=2459913aee4afeea5353a161603a4afd&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                    <Image
                      src="/images/book-preview/cover-bunpou.jpg"
                      alt="近大英語 文法・語法ドリル 表紙"
                      width={400}
                      height={566}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xs text-text-light text-center mt-2">文法・語法ドリル</p>
                </a>
              </div>
              <ul className="text-sm text-text-light mt-4 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  長文読解ドリル：全25回（約400語 × 7問）
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  文法・語法ドリル：全20回（大問III〜VI × 21問）
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  全問解説付き
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  購入者特典：ネイティブ音声付き（長文読解ドリル）
                </li>
              </ul>
            </div>

            {/* 無料診断 */}
            <div>
              <h3 className="text-lg font-bold text-accent mb-4 text-center">スタートダッシュ診断（無料）</h3>
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 max-w-sm mx-auto">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-center text-text font-bold mb-2">近大英語の基礎力をチェック</p>
                <p className="text-center text-text-light text-sm mb-4">
                  登録不要・無料で今すぐ受けられます。結果に応じておすすめの書籍もご案内。
                </p>
                <Link
                  href="/kindai/quiz"
                  className="block bg-accent text-white font-bold text-sm py-3 rounded-lg hover:bg-accent-light transition text-center shadow-lg shadow-accent/25"
                >
                  無料で診断を受ける &rarr;
                </Link>
              </div>
              <ul className="text-sm text-text-light mt-4 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  アカウント登録不要・完全無料
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  結果に応じたおすすめ書籍を提案
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              href="/kindai"
              className="inline-block bg-primary text-white font-bold px-8 py-3.5 rounded-lg hover:bg-primary-light transition shadow-lg shadow-primary/25 text-center"
            >
              長文読解ドリル &rarr;
            </Link>
            <Link
              href="/kindai-bunpou"
              className="inline-block border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-lg hover:bg-primary/5 transition text-center"
            >
              文法・語法ドリル &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 対応大学 */}
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/kindai-emblem.jpg"
                    alt="近畿大学 校章"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text group-hover:text-primary transition">
                    近畿大学
                  </h3>
                  <p className="text-xs text-text-light">英語</p>
                </div>
              </div>
              <p className="text-sm text-text-light mb-4">
                長文読解ドリル＆文法・語法ドリルの2冊。書籍 & 無料診断で近大英語を完全攻略。
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
      <section className="py-16 md:py-24">
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
              <h3 className="text-lg font-bold mb-2 text-accent">無料診断で弱点チェック</h3>
              <p className="text-text-light text-sm leading-relaxed">
                登録不要・完全無料のスタートダッシュ診断。結果に応じておすすめ書籍もわかる。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-success">全問解説付き</h3>
              <p className="text-text-light text-sm leading-relaxed">
                すべての問題に丁寧な解説を収録。独学でも安心して学習を進められる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illust/faq-thinking.png"
              alt="よくある質問"
              width={120}
              height={120}
              className="w-20 h-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            よくある質問
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="bg-white rounded-xl border border-border shadow-sm group"
              >
                <summary className="px-6 py-4 cursor-pointer font-bold text-text flex items-center justify-between list-none">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 text-text-light shrink-0 ml-4 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-text-light text-sm leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
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
