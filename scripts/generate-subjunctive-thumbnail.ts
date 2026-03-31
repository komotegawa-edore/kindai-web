#!/usr/bin/env npx tsx
/**
 * 仮定法ブログ記事のサムネイルを生成する
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-subjunctive-thumbnail.ts
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

const prompt = `Create a blog thumbnail image (1200x630px, 16:9 aspect ratio) for a Japanese educational blog post.

Title text to display on the image: "仮定法がゼロからわかる"
Subtitle text: "初心者向け完全ガイド"

Design:
- Background: soft gradient from light blue (#EBF4FF) to white
- A visual fork/split in the center: left path labeled "現実" (reality) in blue, right path labeled "想像" (imagination) in orange, representing the core concept of subjunctive mood
- A thought bubble or cloud icon on the right side suggesting imagination/hypothetical thinking
- The title "仮定法がゼロからわかる" in bold dark navy text, large and prominent
- The subtitle "初心者向け完全ガイド" in a rounded blue (#2563EB) badge
- Clean, modern Japanese blog thumbnail style
- Blue (#2563EB) and orange (#F97316) accent colors
- The English text "If I were..." faintly visible in the background as a decorative element`;

async function main() {
  const outPath = path.join(OUT_DIR, "subjunctive-mood-beginner.png");
  console.log("Generating subjunctive mood thumbnail...");

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
      const buf = Buffer.from(part.inlineData.data!, "base64");
      fs.writeFileSync(outPath, buf);
      console.log(`Saved subjunctive-mood-beginner.png (${(buf.length / 1024).toFixed(0)}KB)`);
      return;
    }
  }
  throw new Error("No image data in response");
}

main().catch((err) => {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
});
