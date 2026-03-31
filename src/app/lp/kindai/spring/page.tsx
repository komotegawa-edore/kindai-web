import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "近大英語 スタートダッシュ診断｜5分で弱点がわかる無料クイズ｜ドリレオ",
  description:
    "近畿大学の英語入試に向けて、5分で今の実力と弱点がわかる無料診断。登録不要ですぐ受験可能。カテゴリ別の結果で効率的な学習計画を立てよう。",
  alternates: { canonical: "https://drilleo.edore-edu.com/lp/kindai/spring" },
  openGraph: {
    title: "近大英語 スタートダッシュ診断｜5分で弱点がわかる無料クイズ",
    description:
      "近畿大学の英語入試に向けて、5分で今の実力と弱点がわかる無料診断。登録不要ですぐ受験可能。",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "近大英語 スタートダッシュ診断",
    description:
      "近畿大学の英語入試に向けて、5分で弱点がわかる無料診断クイズ。",
    url: "https://drilleo.edore-edu.com/lp/kindai/spring",
    isPartOf: {
      "@type": "WebSite",
      name: "ドリレオ",
      url: "https://drilleo.edore-edu.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ドリレオ",
        item: "https://drilleo.edore-edu.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "近大英語",
        item: "https://drilleo.edore-edu.com/kindai",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "スタートダッシュ診断",
        item: "https://drilleo.edore-edu.com/lp/kindai/spring",
      },
    ],
  },
];

export default function SpringLPPage() {
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
            <svg
              width="28"
              height="28"
              viewBox="0 0 512 512"
              className="shrink-0"
            >
              <rect width="512" height="512" rx="96" fill="#2563EB" />
              <circle cx="256" cy="256" r="180" fill="white" opacity="0.2" />
              <circle cx="256" cy="256" r="140" fill="#2563EB" />
              <circle cx="256" cy="256" r="110" fill="white" opacity="0.3" />
              <circle cx="256" cy="256" r="80" fill="#F97316" />
              <circle cx="256" cy="256" r="36" fill="white" />
            </svg>
            <span className="font-bold text-primary-dark text-lg">
              ドリレオ
            </span>
          </Link>
          <MobileNav />
        </div>
      </header>

      {/* 桜アニメーション */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sakura-fall {
          0%   { top: -5%; transform: translateX(0) rotate(0deg) scale(1); opacity: 0; }
          5%   { opacity: 0.9; }
          25%  { transform: translateX(20px) rotate(90deg) scale(0.95); opacity: 0.9; }
          50%  { transform: translateX(-15px) rotate(200deg) scale(0.9); opacity: 0.7; }
          75%  { transform: translateX(25px) rotate(290deg) scale(0.85); opacity: 0.5; }
          100% { top: 105%; transform: translateX(10px) rotate(400deg) scale(0.8); opacity: 0; }
        }
        .sakura-petal {
          position: absolute;
          top: -5%;
          background: radial-gradient(ellipse at 30% 30%, #fcc, #f9a8c9);
          border-radius: 50% 0 50% 50%;
          opacity: 0;
          animation: sakura-fall ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }
      `}} />

      {/* 1. Hero */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden relative">
        {/* 桜の花びら */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="sakura-petal"
            style={{
              left: `${5 + i * 6}%`,
              animationDuration: `${5 + (i % 5) * 2}s`,
              animationDelay: `${(i * 0.8) % 6}s`,
              width: `${8 + (i % 4) * 3}px`,
              height: `${8 + (i % 4) * 3}px`,
            }}
          />
        ))}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                春の新学期キャンペーン
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-text">
                近大英語、
                <br />
                <span className="text-primary">5分</span>で弱点がわかる。
              </h1>
              <p className="text-base md:text-lg text-text-light mb-3 max-w-md">
                20問の診断クイズで、文法・語彙・読解の
                <span className="font-bold text-text">どこが弱いか</span>が一目でわかる。
              </p>
              <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5 text-xs font-medium text-text-light">
                  <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                  無料
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5 text-xs font-medium text-text-light">
                  <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                  登録不要
                </span>
                <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 text-xs font-bold text-accent">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
                  たった5分
                </span>
              </div>
              <Link
                href="/kindai/quiz"
                className="group relative inline-block bg-gradient-to-r from-accent to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl hover:from-orange-500 hover:to-accent transition-all shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  今すぐ診断スタート
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </span>
              </Link>
            </div>

            {/* 右側: スマホスクショ + 浮かぶ結果カード */}
            <div className="md:w-1/2 flex justify-center relative">
              <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-primary/5 rounded-full -top-8 -right-8" />
              <div className="absolute w-40 h-40 bg-accent/5 rounded-full bottom-4 -left-6" />

              <div className="relative z-10">
                {/* スマホフレーム — 診断結果スクショ */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-800 w-48 md:w-56">
                  <Image
                    src="/images/mock-spring.PNG"
                    alt="診断結果画面 — カテゴリ別診断"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 悩み共感 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illust/lp-spring-worried.png"
              alt="悩む受験生"
              width={320}
              height={320}
              className="w-24 md:w-28 h-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            こんな悩み、ありませんか？
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon={<PainIconBooks />}
              title="何から手をつけていいかわからない"
              description="大問が7つもあって範囲が広い。どこから始めれば効率的なの？"
            />
            <PainCard
              icon={<PainIconQuestion />}
              title="自分の弱点がわからない"
              description="文法？語彙？長文？なんとなく苦手だけど、具体的にどこが弱いの？"
            />
            <PainCard
              icon={<PainIconWorry />}
              title="周りとの差が気になる"
              description="みんなどのくらいのレベル？自分は遅れてない？不安が尽きない。"
            />
          </div>
        </div>
      </section>

      {/* 3. 解決策（診断紹介） */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-2/5 flex justify-center">
              <Image
                src="/images/illust/lp-spring-quiz-phone.png"
                alt="スマホで診断"
                width={400}
                height={400}
                className="w-48 md:w-56 h-auto"
              />
            </div>
            <div className="md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary text-center md:text-left">
                まずは5分で「今の自分」を知ろう
              </h2>
              <div className="space-y-5 mb-8">
                <MeritItem
                  icon={<MeritIconShield />}
                  title="無料・登録不要"
                  description="ニックネームだけですぐスタート。個人情報の入力は一切不要。"
                />
                <MeritItem
                  icon={<MeritIconClock />}
                  title="たった5分で完了"
                  description="厳選20問のクイズ形式。スキマ時間にサクッと受けられる。"
                  highlight
                />
                <MeritItem
                  icon={<MeritIconChart />}
                  title="カテゴリ別に弱点がわかる"
                  description="文法・語彙・読解など、分野ごとの得点率で弱点を可視化。"
                />
              </div>
              {/* 5分バッジ */}
              <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
                <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
                  <span className="text-accent font-bold text-sm">所要時間たったの5分</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <Link
                  href="/kindai/quiz"
                  className="group relative inline-block bg-gradient-to-r from-accent to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl hover:from-orange-500 hover:to-accent transition-all shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-2">
                    今すぐ診断する（無料）
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 診断の流れ */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text">
            診断の流れ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="ニックネームを入力"
              description="好きなニックネームを入れるだけ。メール登録やSNSログインは不要。"
            />
            <StepCard
              step={2}
              title="20問に解答する"
              description="文法・語彙・読解の厳選20問。4択形式でサクサク解答。"
            />
            <StepCard
              step={3}
              title="結果を確認"
              description="カテゴリ別のスコアと弱点を即表示。おすすめの学習法もわかる。"
            />
          </div>
        </div>
      </section>

      {/* 5. 結果サンプル */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illust/lp-spring-diagnosis.png"
              alt="診断レポート"
              width={400}
              height={400}
              className="w-24 md:w-28 h-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-text">
            こんな結果がわかります
          </h2>
          <p className="text-center text-text-light mb-12">
            カテゴリ別のスコアで、あなたの強み・弱みを可視化
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            <ResultSample
              name="Aさん"
              comment="語彙が弱点"
              scores={[
                { label: "文法", pct: 80, color: "bg-primary" },
                { label: "語彙", pct: 35, color: "bg-red-400" },
                { label: "読解", pct: 70, color: "bg-primary" },
              ]}
            />
            <ResultSample
              name="Bさん"
              comment="文法が弱点"
              scores={[
                { label: "文法", pct: 30, color: "bg-red-400" },
                { label: "語彙", pct: 75, color: "bg-primary" },
                { label: "読解", pct: 65, color: "bg-primary" },
              ]}
            />
          </div>

          <div className="text-center">
            <Link
              href="/kindai/quiz"
              className="group relative inline-block bg-gradient-to-r from-accent to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl hover:from-orange-500 hover:to-accent transition-all shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                自分の弱点を診断する
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. 学習ロードマップ */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illust/lp-spring-roadmap.png"
              alt="学習ロードマップ"
              width={640}
              height={320}
              className="w-48 md:w-64 h-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-text">
            診断のあとは？学習ロードマップ
          </h2>
          <p className="text-center text-text-light mb-12">
            弱点を把握したら、ステップごとに力をつけていこう
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <RoadmapCard
              step={1}
              title="弱点を把握"
              description="診断クイズで自分の得意・不得意を把握する。"
              highlight
            />
            <RoadmapCard
              step={2}
              title="基礎固め"
              description="弱点カテゴリを中心に、文法・語彙の基礎を固める。"
            />
            <RoadmapCard
              step={3}
              title="長文読解演習"
              description="書籍『近大英語 長文読解ドリル』で実践的な演習を重ねる。"
            />
            <RoadmapCard
              step={4}
              title="診断で実力チェック"
              description="無料のスタートダッシュ診断で弱点を把握し、仕上げにつなげよう。"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kindai/quiz"
              className="group inline-block bg-gradient-to-r from-accent to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl hover:from-orange-500 hover:to-accent transition-all text-center shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2 justify-center">
                まずは診断から始めよう
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </span>
            </Link>
            <Link
              href="/books"
              className="inline-block border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-lg hover:bg-primary/5 transition text-center"
            >
              書籍の詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 今始める理由 */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* 数字バー */}
          <div className="bg-primary text-white rounded-2xl py-8 px-6 mb-12">
            <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold">60</p>
                <p className="text-sm text-white/70 mt-1">分の試験時間</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">7</p>
                <p className="text-sm text-white/70 mt-1">大問の構成</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">100</p>
                <p className="text-sm text-white/70 mt-1">点満点</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text text-center md:text-left">
                春からのスタートダッシュが
                <br />
                <span className="text-primary">合格を決める</span>
              </h2>
              <p className="text-text-light leading-relaxed mb-4">
                近大英語は大問7題・60分。範囲は文法・語彙・読解と幅広く、一朝一夕では対策できません。
              </p>
              <p className="text-text-light leading-relaxed mb-4">
                だからこそ、<span className="font-bold text-text">春のうちに弱点を把握</span>して、
                夏までに基礎を固めることが大切です。
              </p>
              <p className="text-text-light leading-relaxed">
                早く始めた分だけ、余裕をもって本番に臨めます。
                まずは5分の診断から、最初の一歩を踏み出しましょう。
              </p>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <Image
                src="/images/illust/lp-spring-timeline.png"
                alt="4月から1月までのタイムライン"
                width={480}
                height={320}
                className="w-56 md:w-64 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. 最終CTA */}
      <section className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
              近大英語、<span className="text-primary">今</span>から始めよう
            </h2>

            <ul className="text-sm text-text-light space-y-3 mb-8 inline-block text-left">
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                完全無料・登録不要
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                たった5分で完了
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                カテゴリ別の弱点診断
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                結果に合わせた学習アドバイス
              </li>
            </ul>

            <div className="mb-4">
              <Link
                href="/kindai/quiz"
                className="group inline-block bg-gradient-to-r from-accent to-orange-500 text-white font-bold text-lg px-12 py-5 rounded-xl hover:from-orange-500 hover:to-accent transition-all shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5 animate-pulse hover:animate-none"
              >
                <span className="flex items-center gap-2">
                  スタートダッシュ診断を受ける（無料）
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </span>
              </Link>
            </div>

            <Link
              href="/books"
              className="text-sm text-primary font-medium hover:underline"
            >
              書籍の詳細はこちら &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-primary-dark text-white/60 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition">
              利用規約
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              プライバシーポリシー
            </Link>
          </div>
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

/* ── Inline Components ── */

function PainCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-bold text-text mb-2">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function MeritItem({
  icon,
  title,
  description,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 rounded-xl p-4 ${highlight ? "bg-accent/5 border border-accent/20" : ""}`}>
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="font-bold text-text mb-0.5">{title}</h3>
        <p className="text-text-light text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* SVG Icons — Pain Cards */

function PainIconBooks() {
  return (
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  );
}

function PainIconQuestion() {
  return (
    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
      </svg>
    </div>
  );
}

function PainIconWorry() {
  return (
    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  );
}

/* SVG Icons — Merit Items */

function MeritIconShield() {
  return (
    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  );
}

function MeritIconClock() {
  return (
    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
        <path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" />
      </svg>
    </div>
  );
}

function MeritIconChart() {
  return (
    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-primary text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-lg font-bold mb-2 text-text">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ResultSample({
  name,
  comment,
  scores,
}: {
  name: string;
  comment: string;
  scores: { label: string; pct: number; color: string }[];
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-bold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-bold text-text text-sm">{name}</p>
          <p className="text-xs text-red-500">{comment}</p>
        </div>
      </div>
      <div className="space-y-3">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-light">{s.label}</span>
              <span className="font-bold text-text">{s.pct}%</span>
            </div>
            <div className="h-2.5 bg-bg-gray rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${s.color}`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapCard({
  step,
  title,
  description,
  highlight,
}: {
  step: number;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        highlight
          ? "bg-accent/5 border-accent/30"
          : "bg-white border-border shadow-sm"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center mb-3 ${
          highlight
            ? "bg-accent text-white"
            : "bg-primary/10 text-primary"
        }`}
      >
        {step}
      </div>
      <h3 className="font-bold text-text mb-1 text-sm">{title}</h3>
      <p className="text-text-light text-xs leading-relaxed">{description}</p>
    </div>
  );
}
