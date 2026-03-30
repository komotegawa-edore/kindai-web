import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "近大英語 長文読解ドリル｜ドリレオ",
  description:
    "近畿大学の英語入試を徹底分析。本番と同じ形式の長文読解を全25回分収録。全問解説・全文和訳付き。無料Web模試も。",
  alternates: { canonical: "https://drilleo.edore-edu.com/kindai" },
  openGraph: {
    title: "近大英語 長文読解ドリル｜ドリレオ",
    description:
      "近畿大学の英語入試を徹底分析。本番と同じ形式の長文読解を全25回分収録。全問解説・全文和訳付き。無料Web模試も。",
  },
};

const faqItems = [
  {
    q: "この書籍はどんな人におすすめですか？",
    a: "近畿大学の英語入試を受験予定の方に。特に赤本を解き終えてさらに演習量を増やしたい方、長文読解に苦手意識がある方、本番形式に慣れたい方に最適です。",
  },
  {
    q: "近大の英語入試はどのような形式ですか？",
    a: "試験時間60分・100点満点の完全マークシート方式。大問7題構成、難易度は共通テスト同等（やや易〜標準）。",
  },
  {
    q: "書籍にはどんな問題が収録されていますか？",
    a: "大問7（長文読解）形式の問題を全25回分。1回あたり約400語の英文＋設問7問。全問に解説・全文和訳・語注付き。",
  },
  {
    q: "問題は過去問ですか？",
    a: "いいえ、すべてオリジナル問題。傾向分析に基づき作成、人間による品質チェック済み。",
  },
  {
    q: "Web模試は無料ですか？",
    a: "アカウント登録不要で完全無料。ニックネームを入力するだけで制限時間30分の模試を受験可能。即時採点・全問解説。",
  },
  {
    q: "ランキングにはどのような情報が表示されますか？",
    a: "ニックネーム、スコア、解答時間のみ。個人情報は公開されません。",
  },
  {
    q: "Kindle版とペーパーバック版の違いは？",
    a: "内容は同じ。Kindle版はスマホ・タブレット、ペーパーバック版は紙の書籍。",
  },
  {
    q: "他の大問の問題集もありますか？",
    a: "現在は大問7（長文読解）のみ。配点最高の重要パート。他の大問も今後検討中。",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "近大英語 長文読解ドリル",
    description:
      "近畿大学の英語入試を徹底分析。本番と同じ形式の長文読解を全25回分収録。",
    brand: { "@type": "Brand", name: "ドリレオ" },
    image: "https://drilleo.edore-edu.com/images/book-preview/cover-front.png",
    offers: [
      {
        "@type": "Offer",
        name: "ペーパーバック版",
        price: 1580,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Kindle版",
        price: 780,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      },
    ],
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
    ],
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

export default function Home() {
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
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/books" className="text-text-light hover:text-primary transition">
              書籍
            </Link>
            <a href="#mock-exam" className="text-text-light hover:text-primary transition">
              模試
            </a>
            <a href="#faq" className="text-text-light hover:text-primary transition">
              FAQ
            </a>
            <Link href="/kindai/quiz" className="text-text-light hover:text-primary transition">
              診断クイズ
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーロー — 表紙メイン */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* テキスト */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                近畿大学 英語入試に特化した問題集
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-text">
                <span className="text-primary">近大英語</span>
                <br />
                長文読解ドリル
              </h1>
              <p className="text-base md:text-lg text-text-light mb-3 max-w-lg">
                出題傾向を徹底分析。本番と同じ形式の長文読解を
                <span className="font-bold text-text">全25回分</span>収録。
              </p>
              <p className="text-base md:text-lg text-text-light mb-8 max-w-lg">
                <span className="font-bold text-text">全問解説・全文和訳付き</span>で
                独学でも着実にスコアアップ。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="#"
                  className="bg-primary text-white font-bold px-8 py-3.5 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25"
                >
                  Amazonで購入
                </a>
                <a
                  href="#mock-exam"
                  className="border-2 border-accent text-accent font-bold px-8 py-3.5 rounded-lg hover:bg-accent/5 transition text-center"
                >
                  無料で模試を受ける
                </a>
              </div>
            </div>

            {/* 表紙ビジュアル */}
            <div className="md:w-1/2 flex justify-center relative">
              {/* 装飾円 */}
              <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] bg-primary/5 rounded-full -top-10 -right-10" />
              <div className="absolute w-44 h-44 bg-accent/5 rounded-full bottom-0 -left-8" />

              <div className="relative z-10 flex items-end gap-0">
                {/* 問題ページ（後ろ） */}
                <div className="hidden md:block relative -mr-16 mb-6 z-0">
                  <Image
                    src="/images/book-preview/round1-009.png"
                    alt="第1回の問題ページ"
                    width={280}
                    height={396}
                    className="w-40 h-auto rounded shadow-lg border border-border/50"
                    style={{ transform: "rotate(-6deg)" }}
                  />
                </div>

                {/* 表紙（メイン） */}
                <div className="relative z-10" style={{ perspective: "1000px" }}>
                  <Image
                    src="/images/book-preview/cover-front.png"
                    alt="近大英語 長文読解ドリル 表紙"
                    width={400}
                    height={566}
                    className="w-52 md:w-64 lg:w-72 h-auto rounded-lg shadow-2xl"
                    style={{ transform: "rotateY(-6deg)" }}
                    priority
                  />
                  {/* バッジ */}
                  <div className="absolute -top-3 -right-3 bg-accent text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                    全25回収録
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                    全問解説付き
                  </div>
                </div>

                {/* 設問ページ（後ろ） */}
                <div className="hidden md:block relative -ml-12 mb-10 z-0">
                  <Image
                    src="/images/book-preview/round1-010.png"
                    alt="第1回の設問ページ"
                    width={280}
                    height={396}
                    className="w-36 h-auto rounded shadow-lg border border-border/50"
                    style={{ transform: "rotate(4deg)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数字バー */}
      <section className="bg-primary text-white py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold">25</p>
            <p className="text-sm text-white/70 mt-1">回分の長文演習</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">7</p>
            <p className="text-sm text-white/70 mt-1">問 / 1回あたり</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">400</p>
            <p className="text-sm text-white/70 mt-1">語の英文読解</p>
          </div>
        </div>
      </section>

      {/* 書籍の特徴 */}
      <section id="book" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            書籍の特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="/images/icon-target.png"
              title="近大特化"
              description="近畿大学の英語入試を徹底分析。出題形式・難易度・頻出テーマに完全対応。"
            />
            <FeatureCard
              icon="/images/icon-checklist.png"
              title="全25回の演習"
              description="1回あたり約400語の英文＋設問7問。多彩なテーマで実践力を養成。"
            />
            <FeatureCard
              icon="/images/icon-explanation.png"
              title="丁寧な解説"
              description="全問に解説・全文和訳・語注付き。理解しながら学力を伸ばせます。"
            />
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illust/reason-check.png"
              alt="合格チェックマーク"
              width={120}
              height={120}
              className="w-20 h-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            この問題集が選ばれる理由
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <ReasonCard
              title="近大入試に完全対応"
              description="出題形式・語数・設問数を忠実に再現。本番と同じ感覚で演習できます。"
            />
            <ReasonCard
              title="全問に丁寧な解説・全文和訳"
              description="解答の根拠を示した解説と英文全体の和訳で、独学でもしっかり理解。"
            />
            <ReasonCard
              title="過去問の「次」の一冊"
              description="赤本を解き終えた後の追加演習に最適。さらなる実践力を身につけます。"
            />
            <ReasonCard
              title="Web模試との連携"
              description="書籍と同じ形式の問題をWeb模試で無料体験。タイマー付きで実戦練習。"
            />
          </div>
        </div>
      </section>

      {/* 試し読み */}
      <section id="preview" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            試し読み
          </h2>
          <p className="text-center text-text-light mb-12">
            第1回「人工知能と社会」の問題ページをご覧いただけます
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: "/images/book-preview/title-001.png", label: "表紙" },
              { src: "/images/book-preview/toc-005.png", label: "目次" },
              { src: "/images/book-preview/round1-009.png", label: "第1回 英文" },
              { src: "/images/book-preview/round1-010.png", label: "第1回 設問" },
            ].map((page) => (
              <div key={page.label}>
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition">
                  <Image
                    src={page.src}
                    alt={page.label}
                    width={400}
                    height={566}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-text-light text-center mt-2">
                  {page.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模試体験セクション */}
      <section id="mock-exam" className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            近大英語模試を体験しよう
          </h2>
          <p className="text-center text-text-light mb-12 max-w-2xl mx-auto">
            書籍と同じ長文読解問題をWebで無料体験。
            解答後にアカウント登録すると、成績の記録・ランキング参加ができます。
          </p>

          {/* 3ステップ */}
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            <StepCard
              step={1}
              title="問題を解く"
              description="長文を読み、制限時間30分で全7問の設問に解答。本番さながらのタイマー付き。"
            />
            <StepCard
              step={2}
              title="スコアと解説を確認"
              description="採点結果を即時表示。全問の正誤・解説・全文和訳で復習できます。"
            />
            <StepCard
              step={3}
              title="ランキングで競う"
              description="アカウント登録で成績を保存。全国の近大志望者とスコアを競い合おう。"
            />
          </div>

          {/* 実際の画面イメージ */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-sm md:max-w-lg mx-auto mb-14">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-800 bg-gray-800">
                <Image
                  src="/images/mock-1.PNG"
                  alt="模試画面 — 長文読解"
                  width={390}
                  height={844}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-text-light text-center mt-3">長文を読む</p>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-800 bg-gray-800">
                <Image
                  src="/images/mock-2.PNG"
                  alt="模試画面 — 設問に解答"
                  width={390}
                  height={844}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-text-light text-center mt-3">設問に解答する</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10 text-center max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-bold text-text mb-2">
              アカウント登録不要で<span className="text-accent">今すぐ</span>挑戦できます
            </p>
            <ul className="text-sm text-text-light space-y-2 mb-8 inline-block text-left">
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                登録なしで模試を受験可能
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                解答後すぐにスコア・解説を確認
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold mt-0.5">&#10003;</span>
                アカウント登録で成績保存＆ランキング参加
              </li>
            </ul>
            <div>
              <Link
                href="/kindai/exam"
                className="inline-block bg-accent text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
              >
                無料で模試を受けてみる
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 大問構成 */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            近大英語の大問構成
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-border">
            <table className="w-full text-left">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">大問</th>
                  <th className="px-6 py-3 font-semibold">形式</th>
                  <th className="px-6 py-3 font-semibold hidden sm:table-cell">配点</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["1", "会話文・空所補充", "各2点"],
                  ["2", "中文の空所補充", "各2点"],
                  ["3", "文法・語法", "各2点"],
                  ["4", "同意文の選択", "各2点"],
                  ["5", "語彙力", "各2点"],
                  ["6", "整序英作文", "各2点"],
                  ["7", "長文読解", "各3〜4点"],
                ].map(([num, format, points]) => (
                  <tr key={num} className="hover:bg-bg-gray/50">
                    <td className="px-6 py-3 font-bold text-primary">大問{num}</td>
                    <td className="px-6 py-3">{format}</td>
                    <td className="px-6 py-3 hidden sm:table-cell">{points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-text-light mt-6 text-sm">
            試験時間60分 / 100点満点 / 完全マークシート方式
          </p>
        </div>
      </section>

      {/* 傾向と対策 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            近大英語の傾向と対策
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-text mb-3">試験の概要</h3>
              <p className="text-text-light text-sm leading-relaxed">
                近畿大学の英語入試は、試験時間60分・100点満点の完全マークシート方式です。大問は7題構成で、難易度は共通テスト同等（やや易〜標準）。幅広い分野からバランスよく出題されますが、合否を分けるのは配点の高い長文読解です。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">長文読解（大問7）の攻略</h3>
              <p className="text-text-light text-sm leading-relaxed">
                大問7の長文読解は1問あたり3〜4点と配点が最も高く、合否を左右するパートです。英文は500〜600語程度で、社会・科学・文化など多様なテーマから出題されます。設問は段落指定形式が多く、該当箇所を素早く見つける力が求められます。日頃から400〜600語程度の英文を繰り返し読み、段落ごとの要旨をつかむ練習をしておきましょう。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">効果的な学習法</h3>
              <p className="text-text-light text-sm leading-relaxed">
                まずは書籍で長文読解を繰り返し演習し、時間配分の感覚を身につけましょう。1回あたり15〜20分を目安に解き、解説と和訳で理解を深めます。ある程度自信がついたら、Web模試でタイマー付きの実戦練習に挑戦。本番と同じ緊張感の中で実力を確認し、弱点を把握して効率的に対策を進めましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon購入 */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">書籍を購入する</h2>
          <p className="text-lg text-white/80 mb-8">
            Amazonで好評発売中。Kindle版・ペーパーバック版をお選びいただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition">
              Kindle版を購入
            </a>
            <a href="#" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition">
              ペーパーバック版を購入
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
      <div className="mb-4 flex justify-center">
        <Image src={icon} alt={title} width={56} height={56} className="w-14 h-14" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-primary">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ReasonCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-text mb-1">{title}</h3>
          <p className="text-text-light text-sm leading-relaxed">{description}</p>
        </div>
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
