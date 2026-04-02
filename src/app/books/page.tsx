import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "書籍一覧｜ドリレオ",
  description:
    "ドリレオの書籍一覧。近畿大学の英語入試に特化した長文読解ドリル・文法・語法ドリルをラインナップ。",
  alternates: { canonical: "https://drilleo.edore-edu.com/books" },
  openGraph: {
    title: "書籍一覧｜ドリレオ",
    description:
      "ドリレオの書籍一覧。近畿大学の英語入試に特化した長文読解ドリル・文法・語法ドリルをラインナップ。",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ドリレオ 書籍一覧",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "近大英語 長文読解ドリル",
          description:
            "近畿大学の英語入試を徹底分析。本番と同じ形式の長文読解を全25回分収録。全問解説・全文和訳付き。",
          image: "https://drilleo.edore-edu.com/images/book-preview/cover-front.png",
          brand: { "@type": "Brand", name: "ドリレオ" },
          url: "https://drilleo.edore-edu.com/kindai",
          offers: [
            {
              "@type": "Offer",
              name: "ペーパーバック版",
              price: 1580,
              priceCurrency: "JPY",
              availability: "https://schema.org/InStock",
            },
          ],
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "近大英語 文法・語法ドリル",
          description:
            "近畿大学の英語入試 大問III〜VIに完全特化。文法・語法・同意文・語彙・整序英作文を全20回分収録。全問解説付き。",
          image: "https://drilleo.edore-edu.com/images/book-preview/cover-bunpou.jpg",
          brand: { "@type": "Brand", name: "ドリレオ" },
          url: "https://drilleo.edore-edu.com/kindai-bunpou",
          offers: [
            {
              "@type": "Offer",
              name: "ペーパーバック版",
              price: 1580,
              priceCurrency: "JPY",
              availability: "https://schema.org/InStock",
            },
          ],
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
        name: "書籍一覧",
        item: "https://drilleo.edore-edu.com/books",
      },
    ],
  },
];

export default function BooksPage() {
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
                  <span className="font-bold text-text">ペーパーバック版</span> ¥1,580
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href="https://www.amazon.co.jp/dp/B0GVMW86MN?&linkCode=ll2&tag=frontriver0b-22&linkId=f7bb7943e3d7a61495f83e9f2e956915&ref_=as_li_ss_tl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25 flex-1"
                >
                  Amazonで購入
                </a>
              </div>
              <Link
                href="/kindai"
                className="mt-3 text-center text-sm text-accent font-medium hover:underline"
              >
                詳細ページを見る &rarr;
              </Link>
            </div>
          </div>

          {/* 2冊目: 近大英語 文法・語法ドリル */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="bg-bg-gray px-6 py-8">
              <div className="flex justify-center">
                <Image
                  src="/images/book-preview/cover-bunpou.jpg"
                  alt="近大英語 文法・語法ドリル 表紙"
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
                近大英語 文法・語法ドリル
              </h2>
              <ul className="text-sm text-text-light space-y-1.5 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  大問III〜VI（文法・同意文・語彙・整序）に完全特化
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  全20回分（1回21問）収録
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold mt-0.5">&#10003;</span>
                  全問解説付き
                </li>
              </ul>
              <div className="text-sm text-text-light mb-5">
                <p>
                  <span className="font-bold text-text">ペーパーバック版</span> ¥1,580
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href="#"
                  className="bg-primary text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-primary-light transition text-center shadow-lg shadow-primary/25 flex-1"
                >
                  Amazonで購入
                </a>
              </div>
              <Link
                href="/kindai-bunpou"
                className="mt-3 text-center text-sm text-accent font-medium hover:underline"
              >
                詳細ページを見る &rarr;
              </Link>
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
