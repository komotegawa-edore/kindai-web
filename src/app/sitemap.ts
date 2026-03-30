import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drilleo.edore-edu.com";
  return [
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
  ];
}
