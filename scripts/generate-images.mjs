#!/usr/bin/env node
/**
 * Gemini API で LP用イラストを生成し、public/images/ に保存する
 * Usage: GOOGLE_API_KEY=xxx node scripts/generate-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images");
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const IMAGES = [
  {
    name: "hero.png",
    prompt:
      "A cheerful Japanese male high school student wearing a navy blue school uniform (gakuran), sitting at a desk studying English with a textbook open. He is smiling confidently and making a fist pump gesture showing determination. Modern flat illustration style with clean bold lines, vector art aesthetic. Color palette: navy blue (#00408B), crimson red (#C41E3A), white. Pure white background. No text anywhere in the image.",
  },
  {
    name: "icon-target.png",
    prompt:
      "A simple flat icon: a bullseye target with an arrow hitting dead center. A small university building silhouette behind the target. Navy blue (#00408B) and crimson red (#C41E3A) only. Minimal clean vector icon style. Pure white background. No text. Square composition.",
  },
  {
    name: "icon-checklist.png",
    prompt:
      "A simple flat icon: a clipboard with a checklist showing 7 items all with checkmarks. Navy blue (#00408B) clipboard, crimson red (#C41E3A) checkmarks. Minimal clean vector icon style. Pure white background. No text. Square composition.",
  },
  {
    name: "icon-explanation.png",
    prompt:
      "A simple flat icon: an open book with a glowing lightbulb floating above it, representing understanding and detailed explanation. Navy blue (#00408B) book, crimson red (#C41E3A) and yellow lightbulb. Minimal clean vector icon style. Pure white background. No text. Square composition.",
  },
  {
    name: "exam-cta.png",
    prompt:
      "Two Japanese high school students (one male one female) in navy blue school uniforms, looking at a smartphone screen together with excited expressions. The screen shows a ranking list. Modern flat illustration style, clean lines, vector art. Color palette: navy blue (#00408B), crimson red (#C41E3A), white, light gray. Pure white background. No text in the image.",
  },
];

async function generateImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No parts in response");

  for (const part of parts) {
    if (part.inlineData) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }
  throw new Error("No image data in response");
}

async function removeWhiteBg(inputBuf) {
  // sharp を使って白背景を透過に
  const sharp = (await import("sharp")).default;

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
      pixels[i + 3] = 0; // alpha を 0 に
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function processOne(image) {
  const outPath = path.join(OUT_DIR, image.name);
  if (fs.existsSync(outPath)) {
    console.log(`  SKIP ${image.name} (already exists)`);
    return;
  }

  console.log(`  Generating ${image.name}...`);
  const rawBuf = await generateImage(image.prompt);
  console.log(`  Got ${(rawBuf.length / 1024).toFixed(0)}KB, removing white bg...`);
  const transparentBuf = await removeWhiteBg(rawBuf);
  fs.writeFileSync(outPath, transparentBuf);
  console.log(`  Saved ${image.name} (${(transparentBuf.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log(`Generating ${IMAGES.length} images to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    try {
      await processOne(image);
    } catch (err) {
      console.error(`  FAIL ${image.name}: ${err.message}`);
    }
    // Rate limit対策
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\nDone!");
}

main();
