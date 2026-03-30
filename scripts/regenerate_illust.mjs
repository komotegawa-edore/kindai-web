#!/usr/bin/env node
/**
 * 透過が不十分だった3枚のイラストを再生成する
 * Usage: GOOGLE_API_KEY=xxx node scripts/regenerate_illust.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "illust");
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set");
  process.exit(1);
}

const COMMON_STYLE =
  "Flat vector illustration, pure white background only, simple modern style, soft pastel colors with blue #2563EB and orange #F97316 accents, no text anywhere, clean lines, no shadows, no gradients on background, suitable for web landing page, 512x512px";

const IMAGES = [
  {
    name: "hero-target.png",
    prompt: `A bullseye target with concentric circles (blue and orange) with an arrow hitting dead center. The target should float on a pure white background with absolutely no colored background behind it. No circular background shape. ${COMMON_STYLE}`,
  },
  {
    name: "service-book-app.png",
    prompt: `A closed textbook and a smartphone placed side by side on a pure white background. The book has a blue cover, the phone shows a simple app screen. No drop shadows, no ground plane, objects float on pure white. ${COMMON_STYLE}`,
  },
  {
    name: "step-exam.png",
    prompt: `A student's hands holding a smartphone showing a timer and exam questions on screen. Simple flat style on a pure white background. No shadows, no ground, objects float on pure white. ${COMMON_STYLE}`,
  },
];

async function generateImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
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
  const sharp = (await import("sharp")).default;

  const { data, info } = await sharp(inputBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  // より積極的に白〜薄灰を透過する
  const threshold = 230;

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

async function processOne(image) {
  const outPath = path.join(OUT_DIR, image.name);

  console.log(`  Generating ${image.name}...`);
  const rawBuf = await generateImage(image.prompt);
  console.log(`  Got ${(rawBuf.length / 1024).toFixed(0)}KB, removing white bg...`);
  const transparentBuf = await removeWhiteBg(rawBuf);
  fs.writeFileSync(outPath, transparentBuf);
  console.log(`  Saved ${image.name} (${(transparentBuf.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log(`Regenerating ${IMAGES.length} illustrations to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    try {
      await processOne(image);
    } catch (err) {
      console.error(`  FAIL ${image.name}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.log("\nDone!");
}

main();
