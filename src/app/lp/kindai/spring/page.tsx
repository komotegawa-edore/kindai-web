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
          0%   { transform: translateY(-10%) translateX(0) rotate(0deg); opacity: 1; }
          25%  { transform: translateY(25%) translateX(15px) rotate(90deg); opacity: 1; }
          50%  { transform: translateY(50%) translateX(-10px) rotate(180deg); opacity: 0.8; }
          75%  { transform: translateY(75%) translateX(20px) rotate(270deg); opacity: 0.6; }
          100% { transform: translateY(110%) translateX(5px) rotate(360deg); opacity: 0; }
        }
        .sakura-petal {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(ellipse at 30% 30%, #fcc, #f9a8c9);
          border-radius: 50% 0 50% 50%;
          opacity: 0;
          animation: sakura-fall linear infinite;
          pointer-events: none;
        }
      `}} />

      {/* 1. Hero */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden relative">
        {/* 桜の花びら */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="sakura-petal"
            style={{
              left: `${8 + i * 7.5}%`,
              animationDuration: `${4 + (i % 5) * 1.5}s`,
              animationDelay: `${(i * 0.7) % 5}s`,
              width: `${8 + (i % 4) * 4}px`,
              height: `${8 + (i % 4) * 4}px`,
            }}
          />
        ))}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                春の新学期キャンペーン
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-text">
                <span className="text-primary">近大英語</span>、
                <br />
                どこから始める？
              </h1>
              <p className="text-lg md:text-xl text-text-light mb-2">
                <span className="font-bold text-text">5分</span>
                でわかる弱点診断
              </p>
              <p className="text-sm text-text-light mb-8 max-w-md">
                近畿大学の英語入試に必要な力を、カテゴリ別にチェック。
                今の自分の弱点を知って、効率的に対策を始めよう。
              </p>
              <Link
                href="/kindai/quiz"
                className="inline-block bg-accent text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
              >
                診断をスタートする（無料・5分）
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center relative">
              <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-primary/5 rounded-full -top-8 -right-8" />
              <div className="absolute w-36 h-36 bg-accent/5 rounded-full bottom-0 -left-4" />
              <Image
                src="/images/illust/lp-spring-hero.png"
                alt="桜の中を走り出す受験生"
                width={640}
                height={640}
                className="relative z-10 w-64 md:w-80 h-auto"
                priority
              />
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
              emoji="📚"
              title="何から手をつけていいかわからない"
              description="大問が7つもあって範囲が広い。どこから始めれば効率的なの？"
            />
            <PainCard
              emoji="❓"
              title="自分の弱点がわからない"
              description="文法？語彙？長文？なんとなく苦手だけど、具体的にどこが弱いの？"
            />
            <PainCard
              emoji="😰"
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
              <div className="space-y-4 mb-8">
                <MeritItem
                  icon="✅"
                  title="無料・登録不要"
                  description="ニックネームだけですぐスタート。個人情報の入力は一切不要。"
                />
                <MeritItem
                  icon="⏱️"
                  title="たった5分で完了"
                  description="厳選20問のクイズ形式。スキマ時間にサクッと受けられる。"
                />
                <MeritItem
                  icon="📊"
                  title="カテゴリ別に弱点がわかる"
                  description="文法・語彙・読解など、分野ごとの得点率で弱点を可視化。"
                />
              </div>
              <div className="text-center md:text-left">
                <Link
                  href="/kindai/quiz"
                  className="inline-block bg-accent text-white font-bold px-8 py-3.5 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
                >
                  今すぐ診断する（無料）
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
              className="inline-block bg-accent text-white font-bold px-8 py-3.5 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
            >
              自分の弱点を診断する
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
              title="Web模試で仕上げ"
              description="本番形式のWeb模試で時間配分と実力を最終チェック。"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kindai/quiz"
              className="inline-block bg-accent text-white font-bold px-8 py-3.5 rounded-lg hover:bg-accent-light transition text-center shadow-lg shadow-accent/25"
            >
              まずは診断から始めよう
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
                className="inline-block bg-accent text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
              >
                スタートダッシュ診断を受ける（無料）
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
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-text mb-2">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function MeritItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
      <div>
        <h3 className="font-bold text-text mb-0.5">{title}</h3>
        <p className="text-text-light text-sm leading-relaxed">{description}</p>
      </div>
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
