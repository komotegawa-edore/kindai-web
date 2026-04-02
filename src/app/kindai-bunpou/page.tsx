import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "近大英語 文法・語法ドリル｜ドリレオ",
  description:
    "近畿大学の英語入試 大問III〜VIに完全特化。文法・語法・同意文・語彙・整序英作文を全20回分収録。全問解説付き。",
  alternates: { canonical: "https://drilleo.edore-edu.com/kindai-bunpou" },
  openGraph: {
    title: "近大英語 文法・語法ドリル｜ドリレオ",
    description:
      "近畿大学の英語入試 大問III〜VIに完全特化。文法・語法・同意文・語彙・整序英作文を全20回分収録。全問解説付き。",
  },
};

const faqItems = [
  {
    q: "この書籍はどんな人におすすめですか？",
    a: "近畿大学の英語入試を受験予定の方に。特に文法・語法パート（大問III〜VI）を集中的に演習したい方、基礎点を確実に取りたい方に最適です。",
  },
  {
    q: "長文読解ドリルとの違いは？",
    a: "長文読解ドリルは大問VII（長文読解）に特化しています。本書は大問III（文法・語法）、大問IV（同意文）、大問V（語彙）、大問VI（整序英作文）の4つの大問をまとめて演習できる問題集です。",
  },
  {
    q: "1回分のボリュームはどれくらいですか？",
    a: "1回あたり21問（文法・語法8問＋同意文4問＋語彙5問＋整序英作文4問）。20〜30分程度で解ける分量です。",
  },
  {
    q: "問題は過去問ですか？",
    a: "いいえ、すべてオリジナル問題です。近畿大学の出題傾向を徹底分析し、本番と同じ形式・難易度で作成しています。",
  },
  {
    q: "長文読解ドリルと両方やったほうがいいですか？",
    a: "はい。文法・語法ドリルで基礎点（大問III〜VI）を固め、長文読解ドリルで配点最大の大問VIIを攻略する、というセット学習が最も効果的です。",
  },
  {
    q: "どのレベルから始められますか？",
    a: "共通テスト同等（やや易〜標準）の難易度です。基礎的な文法知識があれば取り組めます。解説も丁寧なので、復習しながら学力を伸ばせます。",
  },
  {
    q: "書籍はどこで購入できますか？",
    a: "Amazonでペーパーバック版（紙の書籍）を販売しています。",
  },
  {
    q: "無料の診断テストはありますか？",
    a: "はい、近大英語の基礎力をチェックできる「スタートダッシュ診断」を無料でご利用いただけます。登録不要で結果に応じたおすすめ書籍もご案内します。",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "近大英語 文法・語法ドリル",
    description:
      "近畿大学の英語入試 大問III〜VIに完全特化。文法・語法・同意文・語彙・整序英作文を全20回分収録。",
    brand: { "@type": "Brand", name: "ドリレオ" },
    image: "https://drilleo.edore-edu.com/images/book-preview/cover-bunpou.jpg",
    offers: [
      {
        "@type": "Offer",
        name: "ペーパーバック版",
        price: 1580,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        url: "https://www.amazon.co.jp/dp/B0GVRG65V3?&linkCode=ll2&tag=frontriver0b-22&linkId=2459913aee4afeea5353a161603a4afd&ref_=as_li_ss_tl",
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "JP",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 2,
              unitCode: "d",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 3,
              unitCode: "d",
            },
          },
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: "JPY",
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "JP",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
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
        name: "近大英語 文法・語法ドリル",
        item: "https://drilleo.edore-edu.com/kindai-bunpou",
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

export default function KindaiBunpouPage() {
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
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/books" className="text-text-light hover:text-primary transition">
              書籍
            </Link>
            <Link href="/kindai" className="text-text-light hover:text-primary transition">
              長文読解ドリル
            </Link>
            <a href="#faq" className="text-text-light hover:text-primary transition">
              FAQ
            </a>
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* テキスト */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                近畿大学 英語入試 大問III〜VIに特化
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-text">
                <span className="text-primary">近大英語</span>
                <br />
                文法・語法ドリル
              </h1>
              <p className="text-base md:text-lg text-text-light mb-3 max-w-lg">
                文法・語法・同意文・語彙・整序英作文を
                <span className="font-bold text-text">全20回分</span>収録。
              </p>
              <p className="text-base md:text-lg text-text-light mb-8 max-w-lg">
                <span className="font-bold text-text">全問解説付き</span>で
                基礎点を確実にスコアアップ。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://www.amazon.co.jp/dp/B0GVRG65V3?&linkCode=ll2&tag=frontriver0b-22&linkId=2459913aee4afeea5353a161603a4afd&ref_=as_li_ss_tl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white font-bold px-8 py-3.5 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25"
                >
                  Amazonで購入
                </a>
                <Link
                  href="/kindai"
                  className="border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-lg hover:bg-primary/5 transition text-center"
                >
                  長文読解ドリルも見る
                </Link>
              </div>
            </div>

            {/* 表紙ビジュアル */}
            <div className="md:w-1/2 flex justify-center relative">
              <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] bg-primary/5 rounded-full -top-10 -right-10" />
              <div className="absolute w-44 h-44 bg-accent/5 rounded-full bottom-0 -left-8" />

              <div className="relative z-10">
                <div className="relative" style={{ perspective: "1000px" }}>
                  <Image
                    src="/images/book-preview/cover-bunpou.jpg"
                    alt="近大英語 文法・語法ドリル 表紙"
                    width={400}
                    height={566}
                    className="w-52 md:w-64 lg:w-72 h-auto rounded-lg shadow-2xl"
                    style={{ transform: "rotateY(-6deg)" }}
                    priority
                  />
                  <div className="absolute -top-3 -right-3 bg-accent text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                    全20回収録
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                    大問III〜VI
                  </div>
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
            <p className="text-3xl md:text-4xl font-bold">20</p>
            <p className="text-sm text-white/70 mt-1">回分の演習</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">21</p>
            <p className="text-sm text-white/70 mt-1">問 / 1回あたり</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">4</p>
            <p className="text-sm text-white/70 mt-1">大問に対応</p>
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
              description="近畿大学の大問III〜VIを徹底分析。出題形式・難易度・頻出テーマに完全対応。"
            />
            <FeatureCard
              icon="/images/icon-checklist.png"
              title="4大問一括演習"
              description="文法・語法・同意文・語彙・整序英作文を1回分にまとめて演習。本番の流れで解ける。"
            />
            <FeatureCard
              icon="/images/icon-explanation.png"
              title="全問解説付き"
              description="すべての問題に丁寧な解説付き。なぜその答えになるのか、根拠を明確に示しています。"
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
              title="基礎点を確実に取る"
              description="大問III〜VIは各2点×計21問。ここを確実に得点することが合格への近道です。"
            />
            <ReasonCard
              title="短文〜整序の幅広い対応"
              description="文法・語法・同意文・語彙・整序英作文の4パートをバランスよく演習できます。"
            />
            <ReasonCard
              title="過去問じゃないから気軽に演習"
              description="オリジナル問題なので、過去問と並行して、あるいは過去問に取り組む前の実力チェックにも最適です。"
            />
            <ReasonCard
              title="長文読解ドリルとの連携"
              description="本書で基礎点を固め、長文読解ドリルで配点最大の大問VIIを攻略。セットで使えば近大英語を完全カバー。長文読解ドリルには購入者特典のネイティブ音声も付いています。"
            />
          </div>
        </div>
      </section>

      {/* 1回分の構成 */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            1回分の構成
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { section: "大問III", name: "文法・語法", count: "8問", color: "bg-primary" },
              { section: "大問IV", name: "同意文", count: "4問", color: "bg-primary-light" },
              { section: "大問V", name: "語彙", count: "5問", color: "bg-accent" },
              { section: "大問VI", name: "整序英作文", count: "4問", color: "bg-success" },
            ].map((item) => (
              <div key={item.section} className="bg-white rounded-xl border border-border shadow-sm p-5 text-center">
                <div className={`inline-block ${item.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                  {item.section}
                </div>
                <h3 className="font-bold text-text mb-1">{item.name}</h3>
                <p className="text-2xl font-bold text-primary">{item.count}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-text-light mt-6 text-sm">
            1回あたり合計21問 / 目安時間20〜30分
          </p>
        </div>
      </section>

      {/* 大問構成テーブル */}
      <section className="bg-bg-gray py-16 md:py-24">
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
                  <th className="px-6 py-3 font-semibold hidden sm:table-cell">対応</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { num: "1", format: "会話文・空所補充", points: "各2点", covered: false },
                  { num: "2", format: "中文の空所補充", points: "各2点", covered: false },
                  { num: "3", format: "文法・語法", points: "各2点", covered: true },
                  { num: "4", format: "同意文の選択", points: "各2点", covered: true },
                  { num: "5", format: "語彙力", points: "各2点", covered: true },
                  { num: "6", format: "整序英作文", points: "各2点", covered: true },
                  { num: "7", format: "長文読解", points: "各3〜4点", covered: false },
                ].map((row) => (
                  <tr key={row.num} className={row.covered ? "bg-primary/5" : "hover:bg-bg-gray/50"}>
                    <td className="px-6 py-3 font-bold text-primary">大問{row.num}</td>
                    <td className="px-6 py-3">{row.format}</td>
                    <td className="px-6 py-3 hidden sm:table-cell">{row.points}</td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      {row.covered ? (
                        <span className="inline-block bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full">
                          本書で対応
                        </span>
                      ) : row.num === "7" ? (
                        <Link href="/kindai" className="text-primary text-xs font-bold hover:underline">
                          長文読解ドリル
                        </Link>
                      ) : (
                        <span className="text-text-light text-xs">準備中</span>
                      )}
                    </td>
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
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            文法・語法パートの傾向と対策
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-text mb-3">大問III：文法・語法（8問）</h3>
              <p className="text-text-light text-sm leading-relaxed">
                短文の空所補充形式で、基本的な文法事項と語法が問われます。時制・仮定法・関係詞・準動詞・接続詞・前置詞などが頻出。標準的な問題が中心なので、基礎を固めれば確実に得点できるパートです。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">大問IV：同意文の選択（4問）</h3>
              <p className="text-text-light text-sm leading-relaxed">
                与えられた英文と同じ意味の文を選ぶ問題です。語彙力に加え、構文の言い換えパターンを知っておくことが重要です。受動態⇔能動態、同義語・反意語の知識が求められます。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">大問V：語彙（5問）</h3>
              <p className="text-text-light text-sm leading-relaxed">
                文脈に合う適切な語を選ぶ問題です。基本的な語彙力が試されますが、紛らわしい選択肢が含まれることも。日頃から単語帳だけでなく、文脈の中で語彙を学ぶ習慣をつけましょう。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">大問VI：整序英作文（4問）</h3>
              <p className="text-text-light text-sm leading-relaxed">
                語句を正しい順序に並べ替えて英文を完成させる問題です。構文の知識と英語の語順感覚が求められます。SVO / SVOC / SVOO などの基本文型を意識しながら解くのがコツです。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text mb-3">効果的な学習法</h3>
              <p className="text-text-light text-sm leading-relaxed">
                本書の1回分（21問）を20〜30分を目安に解き、解説で理解を深めましょう。間違えた問題は解説を読んだ後に時間を空けて再挑戦すると定着します。全20回を2周すれば、近大の文法・語法パートは自信を持って臨めるはずです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* スタートダッシュ診断 */}
      <section className="bg-bg-gray py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4 mx-auto block text-center">
            無料・登録不要・約5分
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
            まずは弱点をチェック！
          </h2>
          <p className="text-center text-text-light mb-10 max-w-2xl mx-auto">
            文法・語彙・語法の20問であなたの弱点を無料診断。
            カテゴリ別のスコアで、何を優先的に学習すべきかがわかります。
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">弱点がわかる</h3>
              <p className="text-text-light text-sm">カテゴリ別にスコアを診断。自分の弱点が一目でわかります。</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">学習の優先順位がわかる</h3>
              <p className="text-text-light text-sm">診断結果から、優先すべき学習分野を提案します。</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-text mb-1">無料で5分</h3>
              <p className="text-text-light text-sm">登録不要で今すぐ受験。たった5分で診断完了。</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/kindai/quiz"
              className="inline-block bg-accent text-white font-bold text-lg px-12 py-4 rounded-lg hover:bg-accent-light transition shadow-lg shadow-accent/25"
            >
              無料でスタートダッシュ診断を受ける
            </Link>
          </div>
        </div>
      </section>

      {/* Amazon購入 */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">書籍を購入する</h2>
          <p className="text-lg text-white/80 mb-8">
            Amazonで好評発売中。ペーパーバック版（紙の書籍）をお届けします。
          </p>
          <a
            href="https://www.amazon.co.jp/dp/B0GVRG65V3?&linkCode=ll2&tag=frontriver0b-22&linkId=2459913aee4afeea5353a161603a4afd&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          >
            Amazonで購入する
          </a>
          <p className="text-white/60 text-sm mt-6">
            長文読解ドリルとセットで使うとさらに効果的です
          </p>
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
