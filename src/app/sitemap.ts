import type { MetadataRoute } from "next";
import { getBlogSlugsForSitemap } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://drilleo.edore-edu.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2026-03-30",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kindai`,
      lastModified: "2026-03-30",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kindai/leaderboard`,
      lastModified: "2026-03-30",
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2026-03-30",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-03-30",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2026-03-30",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // microCMS からブログ記事を取得
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogSlugsForSitemap();
    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // microCMS 障害時もビルドを壊さない
  }

  return [...staticPages, ...blogPages];
}
