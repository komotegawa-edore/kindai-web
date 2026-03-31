#!/usr/bin/env npx tsx
/**
 * 6つの文法ブログ記事のサムネイルを一括生成する
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-grammar-thumbnails.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "blog");
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: API_KEY });

const IMAGES = [
  {
    name: "relative-pronouns-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "関係代名詞がゼロからわかる"
Subtitle text: "who・which・thatの使い分け"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: Two sentence boxes being connected by a bridge or link icon labeled "who"
- The title "関係代名詞がゼロからわかる" in bold dark navy text, large and prominent
- The subtitle "who・which・thatの使い分け" in a rounded blue (#2563EB) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "participles-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "分詞・分詞構文がわかる"
Subtitle text: "現在分詞 vs 過去分詞"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: Left side shows "-ing" in blue with an active/running figure icon, right side shows "-ed" in orange with a passive/receiving figure icon
- The title "分詞・分詞構文がわかる" in bold dark navy text, large and prominent
- The subtitle "現在分詞 vs 過去分詞" in a rounded orange (#F97316) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "perfect-tense-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "現在完了 vs 過去形の違い"
Subtitle text: "時制をタイムラインで理解"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: A horizontal timeline with "過去" on the left and "現在" on the right, with a bridge/arrow connecting them labeled "have + p.p."
- The title "現在完了 vs 過去形の違い" in bold dark navy text, large and prominent
- The subtitle "時制をタイムラインで理解" in a rounded blue (#2563EB) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "infinitive-gerund-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "不定詞と動名詞の使い分け"
Subtitle text: "to do vs -ing 完全ガイド"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: Left side "to do" with a forward arrow (future), right side "-ing" with a circular arrow (ongoing/habit), split by a divider
- The title "不定詞と動名詞の使い分け" in bold dark navy text, large and prominent
- The subtitle "to do vs -ing 完全ガイド" in a rounded orange (#F97316) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "comparatives-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "比較級・最上級が完全にわかる"
Subtitle text: "原級・比較級・最上級を攻略"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: Three ascending steps/bars like a podium, labeled "原級 (as...as)", "比較級 (-er/more)", "最上級 (-est/most)" from left to right, increasing in height
- The title "比較級・最上級が完全にわかる" in bold dark navy text, large and prominent
- The subtitle "原級・比較級・最上級を攻略" in a rounded blue (#2563EB) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "conjunctions-prepositions-beginner.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "接続詞と前置詞の違いがわかる"
Subtitle text: "紛らわしいペアを整理"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- Visual: Left side shows "接続詞" in blue with "S+V" blocks, right side shows "前置詞" in orange with "名詞" block. A "vs" or comparison icon in the center
- Pairs like "because vs because of" shown as small labels
- The title "接続詞と前置詞の違いがわかる" in bold dark navy text, large and prominent
- The subtitle "紛らわしいペアを整理" in a rounded orange (#F97316) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
];

async function generateImage(prompt: string): Promise<Buffer> {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No parts in response");

  for (const part of parts) {
    if (part.inlineData) {
      return Buffer.from(part.inlineData.data!, "base64");
    }
  }
  throw new Error("No image data in response");
}

async function main() {
  console.log(`Generating ${IMAGES.length} thumbnails to ${OUT_DIR}\n`);

  for (let i = 0; i < IMAGES.length; i++) {
    const image = IMAGES[i];
    const outPath = path.join(OUT_DIR, image.name);

    if (fs.existsSync(outPath)) {
      console.log(`  [${i + 1}/${IMAGES.length}] SKIP ${image.name} (already exists)`);
      continue;
    }

    console.log(`  [${i + 1}/${IMAGES.length}] Generating ${image.name}...`);
    try {
      const buf = await generateImage(image.prompt);
      fs.writeFileSync(outPath, buf);
      console.log(
        `  [${i + 1}/${IMAGES.length}] Saved ${image.name} (${(buf.length / 1024).toFixed(0)}KB)`
      );
    } catch (err) {
      console.error(
        `  [${i + 1}/${IMAGES.length}] FAIL ${image.name}: ${err instanceof Error ? err.message : err}`
      );
    }
  }
  console.log("\nDone!");
}

main();
