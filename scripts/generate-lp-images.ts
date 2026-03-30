#!/usr/bin/env npx tsx
/**
 * Gemini API で春LP用イラストを6枚生成し、public/images/illust/ に保存する
 * クロマキー緑背景で生成 → sharp で透過処理
 *
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-lp-images.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "illust");
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: API_KEY });

const COMMON_STYLE =
  "Flat vector illustration, pure white background, simple modern style, soft pastel colors (blue #2563EB, orange #F97316 accents), no text, clean lines, suitable for web landing page";

const IMAGES = [
  {
    name: "lp-spring-hero.png",
    prompt: `A cheerful Japanese high school student in a school uniform running forward energetically with cherry blossom petals flying around. The student looks determined and excited about starting something new. Spring atmosphere. ${COMMON_STYLE} 640x640px.`,
  },
  {
    name: "lp-spring-worried.png",
    prompt: `A Japanese high school student sitting at a desk looking confused and worried, with question marks floating above their head. Textbooks and notes scattered on the desk. The student is scratching their head in confusion. ${COMMON_STYLE} 320x320px.`,
  },
  {
    name: "lp-spring-quiz-phone.png",
    prompt: `A hand holding a smartphone displaying a quiz or diagnostic test screen with multiple choice options. The screen shows a progress bar and question numbers. Clean and modern UI feel. ${COMMON_STYLE} 400x400px.`,
  },
  {
    name: "lp-spring-diagnosis.png",
    prompt: `A diagnostic report or results card showing a bar chart with different category scores (some high, some low). A magnifying glass hovering over the weak areas. Data visualization style. ${COMMON_STYLE} 400x400px.`,
  },
  {
    name: "lp-spring-roadmap.png",
    prompt: `A winding uphill path from bottom-left to top-right, with cherry blossoms at the start and a graduation cap / trophy at the top. Milestone markers along the path showing progress steps. Journey metaphor. ${COMMON_STYLE} 640x320px.`,
  },
  {
    name: "lp-spring-timeline.png",
    prompt: `A horizontal calendar timeline from April to January, with the April section highlighted and glowing to show "start now". An arrow pointing to the current month. Urgency and planning concept. ${COMMON_STYLE} 480x320px.`,
  },
];

async function generateImage(prompt: string): Promise<Buffer> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
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

async function removeWhiteBg(inputBuf: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(inputBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  const threshold = 240; // 白に近いピクセルを透過

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r > threshold && g > threshold && b > threshold) {
      pixels[i + 3] = 0;
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function processOne(image: { name: string; prompt: string }) {
  const outPath = path.join(OUT_DIR, image.name);
  if (fs.existsSync(outPath)) {
    console.log(`  SKIP ${image.name} (already exists)`);
    return;
  }

  console.log(`  Generating ${image.name}...`);
  const rawBuf = await generateImage(image.prompt);
  console.log(
    `  Got ${(rawBuf.length / 1024).toFixed(0)}KB, removing white bg...`
  );
  const transparentBuf = await removeWhiteBg(rawBuf);
  fs.writeFileSync(outPath, transparentBuf);
  console.log(
    `  Saved ${image.name} (${(transparentBuf.length / 1024).toFixed(0)}KB)`
  );
}

async function main() {
  console.log(`Generating ${IMAGES.length} LP illustrations to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    try {
      await processOne(image);
    } catch (err) {
      console.error(
        `  FAIL ${image.name}: ${err instanceof Error ? err.message : err}`
      );
    }
    // Rate limit対策
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.log("\nDone!");
}

main();
