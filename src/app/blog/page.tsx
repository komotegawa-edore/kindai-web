import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogList } from "@/lib/microcms";
import MobileNav from "@/components/MobileNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ブログ｜ドリレオ",
  description:
    "近大英語の対策法や勉強法、受験に役立つコラムを発信しています。",
  alternates: { canonical: "https://drilleo.edore-edu.com/blog" },
  openGraph: {
    title: "ブログ｜ドリレオ",
    description:
      "近大英語の対策法や勉強法、受験に役立つコラムを発信しています。",
  },
};

export default async function BlogListPage() {
  let blogs: Awaited<ReturnType<typeof getBlogList>>["contents"] = [];
  try {
    const res = await getBlogList();
    blogs = res.contents;
  } catch {
    // microCMS 未設定時やAPI障害時は空一覧を表示
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ブログ｜ドリレオ",
      description:
        "近大英語の対策法や勉強法、受験に役立つコラムを発信しています。",
      url: "https://drilleo.edore-edu.com/blog",
      publisher: { "@type": "Organization", name: "ドリレオ" },
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

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 md:py-16 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-10">ブログ</h1>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light text-lg mb-2">まだ記事がありません</p>
            <p className="text-text-light text-sm">近日公開予定です。お楽しみに！</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden block"
              >
                {blog.thumbnail ? (
                  <div className="aspect-[16/9] overflow-hidden bg-bg-gray">
                    <Image
                      src={blog.thumbnail.url}
                      alt={blog.title}
                      width={blog.thumbnail.width ?? 640}
                      height={blog.thumbnail.height ?? 360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-primary/5 flex items-center justify-center">
                    <span className="text-primary/30 text-4xl font-bold">D</span>
                  </div>
                )}
                <div className="p-5">
                  {blog.category && blog.category.length > 0 && (
                    <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                      {blog.category[0]}
                    </span>
                  )}
                  <h2 className="font-bold text-text group-hover:text-primary transition line-clamp-2 mb-2">
                    {blog.title}
                  </h2>
                  {blog.description && (
                    <p className="text-text-light text-sm line-clamp-2 mb-3">
                      {blog.description}
                    </p>
                  )}
                  <time className="text-xs text-text-light">
                    {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
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
