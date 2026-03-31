import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListResponse } from "microcms-js-sdk";

// microCMS クライアント（env未設定時はビルドを壊さないよう遅延初期化）
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (_client) return _client;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) {
    throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required");
  }
  _client = createClient({ serviceDomain, apiKey });
  return _client;
}

// カテゴリ型（microCMS リレーション）
export type BlogCategory = {
  id: string;
  name: string;
};

// Blog 型定義
export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  thumbnail?: MicroCMSImage;
  category?: BlogCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

const noCache = { cache: "no-store" as RequestCache };

/** ブログ一覧取得 */
export async function getBlogList(
  limit = 20,
  offset = 0,
): Promise<MicroCMSListResponse<Blog>> {
  return getClient().getList<Blog>({
    endpoint: "blogs",
    queries: { limit, offset, orders: "-publishedAt" },
    customRequestInit: noCache,
  });
}

/** スラッグ指定で1件取得 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await getClient().getList<Blog>({
    endpoint: "blogs",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
    customRequestInit: noCache,
  });
  return res.contents[0] ?? null;
}

/** generateStaticParams 用：全スラッグ取得 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const res = await getClient().getList<Blog>({
    endpoint: "blogs",
    queries: { fields: "slug", limit: 100 },
    customRequestInit: noCache,
  });
  return res.contents.map((b) => b.slug);
}

/** サイトマップ用：slug + updatedAt */
export async function getBlogSlugsForSitemap(): Promise<
  { slug: string; updatedAt: string }[]
> {
  const res = await getClient().getList<Blog>({
    endpoint: "blogs",
    queries: { fields: "slug,updatedAt", limit: 100 },
    customRequestInit: noCache,
  });
  return res.contents.map((b) => ({ slug: b.slug, updatedAt: b.updatedAt }));
}
