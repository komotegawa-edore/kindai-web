#!/usr/bin/env node
/**
 * Gemini API でLP用イラストを生成し、public/images/illust/ に保存する
 * Usage: GOOGLE_API_KEY=xxx node scripts/generate_illust.mjs
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

fs.mkdirSync(OUT_DIR, { recursive: true });

const COMMON_STYLE =
  "Flat vector illustration, transparent background, simple modern style, soft pastel colors (blue #2563EB, orange #F97316 accents), no text, clean lines, suitable for web landing page, 512x512px";

const IMAGES = [
  {
    name: "hero-target.png",
    prompt: `A bullseye target with an arrow hitting dead center, representing precision and focus on university entrance exams. ${COMMON_STYLE}`,
  },
  {
    name: "service-book-app.png",
    prompt: `A textbook and a smartphone app side by side, representing a combination of print study materials and digital mock exams. ${COMMON_STYLE}`,
  },
  {
    name: "step-select.png",
    prompt: `A student browsing and selecting from a list of universities on a tablet screen, representing choosing a target school. ${COMMON_STYLE}`,
  },
  {
    name: "step-study.png",
    prompt: `A student sitting at a desk studying with an open textbook, taking notes, focused and diligent. ${COMMON_STYLE}`,
  },
  {
    name: "step-exam.png",
    prompt: `A student holding a smartphone taking an online exam with a timer displayed on the screen. ${COMMON_STYLE}`,
  },
  {
    name: "reason-check.png",
    prompt: `A large checkmark inside a circle with a graduation cap above it, representing passing and success. ${COMMON_STYLE}`,
  },
  {
    name: "faq-thinking.png",
    prompt: `A student with a thinking pose and a question mark floating above their head, representing curiosity and FAQ. ${COMMON_STYLE}`,
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
  const threshold = 240;

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
  console.log(`Generating ${IMAGES.length} illustrations to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    try {
      await processOne(image);
    } catch (err) {
      console.error(`  FAIL ${image.name}: ${err.message}`);
    }
    // Rate limit対策
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.log("\nDone!");
}

main();
