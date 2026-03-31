/**
 * 6つの文法ブログ記事を microCMS に一括下書き投稿するスクリプト
 * Usage: node scripts/post-grammar-blogs.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local を手動パース
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key.trim()] = rest.join("=").trim();
}

const SERVICE_DOMAIN = env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = env.MICROCMS_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error(
    "MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を .env.local に設定してください"
  );
  process.exit(1);
}

const API_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`;
const SITE = "https://drilleo.edore-edu.com";

/**
 * マークダウンファイルを読み込んでメタデータとHTMLに変換する
 */
function parseBlogMarkdown(filePath) {
  const raw = readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  // 1行目: # タイトル
  const title = lines[0].replace(/^#\s+/, "").trim();

  // メタデータを抽出
  let slug = "";
  let description = "";
  let bodyStartLine = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("slug:")) {
      slug = line.replace("slug:", "").trim();
    } else if (line.startsWith("description:")) {
      description = line.replace("description:", "").trim();
    } else if (line === "---") {
      bodyStartLine = i + 1;
      break;
    }
  }

  // 本文をマークダウンからHTMLに変換
  let body = lines.slice(bodyStartLine).join("\n").trim();

  // 末尾の CTA セクション（--- 以降）を統一した CTA に置換
  const lastHrIndex = body.lastIndexOf("\n---\n");
  if (lastHrIndex !== -1) {
    body = body.slice(0, lastHrIndex);
  }

  // 画像パスを絶対URLに変換
  body = body.replace(
    /!\[([^\]]*)\]\(\/images\/blog\/([^)]+)\)/g,
    `<figure>\n  <img src="${SITE}/images/blog/$2" alt="$1" width="1200" />\n</figure>`
  );

  // マークダウン → HTML 変換
  let html = marked.parse(body);

  // 統一CTA追加
  html += `
<hr>
<p>近大英語の文法問題を実際に解いてみたい方は、<a href="${SITE}/kindai-bunpou"><strong>文法・語法ドリル</strong></a>で練習できます。</p>
<p><a href="${SITE}/kindai/quiz"><strong>近大英語 スタートダッシュ診断を受ける（無料・5分）</strong></a></p>`;

  return { title, slug, description, content: html.trim() };
}

const BLOG_FILES = [
  "blog-07-relative-pronouns.md",
  "blog-08-participles.md",
  "blog-09-perfect-tense.md",
  "blog-10-infinitive-gerund.md",
  "blog-11-comparatives.md",
  "blog-12-conjunctions-prepositions.md",
];

async function postDraft(blog) {
  const res = await fetch(`${API_URL}?status=draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY,
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }

  return res.json();
}

async function main() {
  console.log("6つの文法ブログ記事を microCMS に下書き投稿します\n");

  const docsDir = resolve(__dirname, "../docs");

  for (let i = 0; i < BLOG_FILES.length; i++) {
    const file = BLOG_FILES[i];
    const filePath = resolve(docsDir, file);

    console.log(`  [${i + 1}/${BLOG_FILES.length}] ${file}`);

    try {
      const blog = parseBlogMarkdown(filePath);
      console.log(`    タイトル: ${blog.title}`);
      console.log(`    スラッグ: ${blog.slug}`);

      const data = await postDraft(blog);
      console.log(`    → 投稿完了 (id: ${data.id})\n`);
    } catch (err) {
      console.error(
        `    → 失敗: ${err instanceof Error ? err.message : err}\n`
      );
    }
  }

  console.log("完了！microCMS 管理画面で確認してください。");
  console.log("※ サムネイル画像・カテゴリ・図解画像は管理画面から手動で設定してください。");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
