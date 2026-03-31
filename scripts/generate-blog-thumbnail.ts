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
    name: "kindai-english-spring-schedule.png",
    prompt: `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "春から始める 近大英語の勉強スケジュール"
Subtitle text: "2026年度最新版"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- A few cherry blossom petals scattered decoratively in the corners
- A stylized monthly calendar/planner illustration in the center-left area showing months from 4月 to 1月 with colorful progress blocks
- An open English textbook and pencil illustration beside the calendar
- The title text "春から始める 近大英語の勉強スケジュール" in bold dark navy text (#1E293B), large and prominent
- The subtitle "2026年度最新版" in a rounded orange (#F97316) badge/pill shape
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors
- Professional and trustworthy feel, targeting high school students preparing for university exams`,
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
