#!/usr/bin/env npx tsx
/**
 * Gemini API でブログサムネイルを生成する
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-blog-thumbnail.ts
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
    name: "kindai-english-by-section.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "近大英語の大問別攻略法"
Subtitle text: "全7大問を徹底解説"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- 7 numbered blocks or cards (I〜VII) arranged in a row, each with a different icon (speech bubble, grammar, vocabulary, etc.)
- The title "近大英語の大問別攻略法" in bold dark navy text, large and prominent
- The subtitle "全7大問を徹底解説" in a rounded blue (#2563EB) badge
- A target/bullseye icon suggesting strategy
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "kindai-english-passing-score.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "近大英語の合格最低点は？"
Subtitle text: "学部別ボーダーと目標点"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- A bar chart showing score levels with a red line marking the passing threshold
- Numbers "70" "80" "90" visible on the chart axis
- The title "近大英語の合格最低点は？" in bold dark navy text, large and prominent
- The subtitle "学部別ボーダーと目標点" in a rounded orange (#F97316) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "kindai-english-textbooks.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "近大英語 おすすめ参考書"
Subtitle text: "厳選5冊"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- 5 colorful book spines standing upright in a row, each with a different pastel color
- A checkmark or star badge on the recommended books
- The title "近大英語 おすすめ参考書" in bold dark navy text, large and prominent
- The subtitle "厳選5冊" in a rounded orange (#F97316) badge with number 5 emphasized
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors`,
  },
  {
    name: "kindai-english-time-strategy.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "近大英語 配点と時間配分の戦略"
Subtitle text: "何割取れば受かる？"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- A stopwatch/timer showing 60 minutes and a pie chart divided into sections showing time allocation
- The number "80%" displayed prominently as a target score
- The title "近大英語 配点と時間配分の戦略" in bold dark navy text, large and prominent
- The subtitle "何割取れば受かる？" in a rounded orange (#F97316) badge
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
  console.log(`Generating blog thumbnails to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    const outPath = path.join(OUT_DIR, image.name);
    console.log(`  Generating ${image.name}...`);
    try {
      const buf = await generateImage(image.prompt);
      fs.writeFileSync(outPath, buf);
      console.log(`  Saved ${image.name} (${(buf.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(
        `  FAIL ${image.name}: ${err instanceof Error ? err.message : err}`
      );
    }
  }
  console.log("\nDone!");
}

main();
