import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/microcms";
import MobileNav from "@/components/MobileNav";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "記事が見つかりません｜ドリレオ" };

  const title = `${blog.title}｜ドリレオ ブログ`;
  const description = blog.description ?? blog.title;

  return {
    title,
    description,
    alternates: {
      canonical: `https://drilleo.edore-edu.com/blog/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      ...(blog.thumbnail && { images: [{ url: blog.thumbnail.url }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(blog.thumbnail && { images: [blog.thumbnail.url] }),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await headers(); // SSR を強制
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.title,
      description: blog.description ?? blog.title,
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      author: { "@type": "Organization", name: "ドリレオ" },
      publisher: {
        "@type": "Organization",
        name: "ドリレオ",
        logo: {
          "@type": "ImageObject",
          url: "https://drilleo.edore-edu.com/icon-192.png",
        },
      },
      mainEntityOfPage: `https://drilleo.edore-edu.com/blog/${blog.slug}`,
      ...(blog.thumbnail && { image: blog.thumbnail.url }),
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
          name: "ブログ",
          item: "https://drilleo.edore-edu.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blog.title,
          item: `https://drilleo.edore-edu.com/blog/${blog.slug}`,
        },
      ],
    },
  ];

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

      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 md:py-16 w-full">
        {/* パンくず */}
        <nav className="text-sm text-text-light mb-8">
          <Link href="/" className="hover:text-primary transition">ホーム</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary transition">ブログ</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{blog.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* 記事本文（左カラム） */}
          <div className="lg:flex-1 min-w-0">
            {/* サムネイル */}
            {blog.thumbnail && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
                <Image
                  src={blog.thumbnail.url}
                  alt={blog.title}
                  width={blog.thumbnail.width ?? 960}
                  height={blog.thumbnail.height ?? 540}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            {/* カテゴリ・日付 */}
            <div className="flex items-center gap-3 mb-4">
              {blog.category && blog.category.length > 0 && (
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {blog.category[0]}
                </span>
              )}
              <time className="text-sm text-text-light">
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-text mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* 本文 */}
            <article
              className="prose prose-lg max-w-none prose-headings:text-text prose-a:text-primary prose-strong:text-text"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* サイドバー（右カラム：PC のみ表示） */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* 近大英語 CTA */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <p className="font-bold text-text mb-2">近大英語の対策を始めよう</p>
                <p className="text-text-light text-sm mb-4">
                  長文読解ドリル全25回分で近大英語を完全攻略。
                </p>
                <Link
                  href="/kindai"
                  className="inline-block w-full text-center bg-primary text-white font-bold px-4 py-2.5 rounded-lg hover:bg-primary-light transition text-sm"
                >
                  詳細を見る &rarr;
                </Link>
              </div>

              {/* ブログ一覧へ */}
              <div className="bg-white border border-border rounded-xl p-6">
                <p className="font-bold text-text mb-3">ブログ記事一覧</p>
                <Link
                  href="/blog"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  すべての記事を見る &rarr;
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* CTA バナー（スマホ用：サイドバーが非表示のため下部に表示） */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-xl p-8 text-center lg:hidden">
          <p className="font-bold text-lg text-text mb-2">近大英語の対策を始めよう</p>
          <p className="text-text-light text-sm mb-6">
            長文読解ドリル全25回分で、近大英語を完全攻略。
          </p>
          <Link
            href="/kindai"
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-light transition shadow-lg shadow-primary/25"
          >
            近大英語の詳細を見る &rarr;
          </Link>
        </div>
      </main>

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
