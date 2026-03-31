#!/usr/bin/env npx tsx
/**
 * Gemini API でブログ記事内の解説図を生成する
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-blog-diagrams.ts
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
    name: "subjunctive-indicative-comparison.png",
    prompt: `Create a clean educational diagram image (1200x800px) for a Japanese blog article explaining English grammar.

This diagram compares "直説法" (Indicative) vs "仮定法" (Subjunctive) in English.

Layout:
- Title at top: 「もし〜たら」は2種類ある！
- Below the title, a fork/branch splitting into LEFT and RIGHT paths

LEFT side (blue theme, #2563EB):
- Header label: "現実にありえる" (Could happen)
- Box title: "直説法"
- Example sentence: "If it rains tomorrow, I will stay home."
- Japanese: 明日雨が降ったら、家にいるよ。
- Small note: → ありえる話 ✓

RIGHT side (orange theme, #F97316):
- Header label: "現実と違う想像" (Against reality)
- Box title: "仮定法"
- Example sentence: "If I were a bird, I would fly to you."
- Japanese: もし鳥だったら、飛んでいくのに。
- Small note: → ありえない話 ✗

Style:
- White background
- Clean, minimal infographic style
- Rounded rectangle cards
- Clear Japanese text (bold, sans-serif)
- The fork/branch from the top should use arrows or lines
- Blue (#2563EB) for indicative, Orange (#F97316) for subjunctive
- The English example sentences should be clearly readable
- Bold the key verb forms: "rains" / "will" on the left, "were" / "would" on the right`,
  },
  {
    name: "subjunctive-tense-shift.png",
    prompt: `Create a clean educational diagram image (1200x700px) for a Japanese blog article explaining English subjunctive mood.

This diagram shows the concept "仮定法 = 時制を1つ過去にズラす" (Subjunctive = shift tense one step back).

Layout:
- Title at top: "仮定法＝時制を1つ過去にズラす"

- A horizontal timeline arrow going from left to right, with 3 points marked:
  Left: "大過去 (had + p.p.)"
  Center: "過去 (過去形)"
  Right: "現在 (現在形)"

- Below the timeline, two horizontal arrows pointing LEFT (backward):

  Arrow 1 (blue, #2563EB):
  Label: "仮定法過去"
  Starting from "現在" pointing back to "過去"
  Description: "今のことを想像 → 過去形で書く"
  Example: If I were a bird ... (実際は鳥じゃない)

  Arrow 2 (orange, #F97316):
  Label: "仮定法過去完了"
  Starting from "過去" pointing back to "大過去"
  Description: "過去のことを想像 → had + p.p. で書く"
  Example: If I had studied ... (実際は勉強しなかった)

Style:
- White background
- Clean infographic / diagram style
- Rounded pill badges for "仮定法過去" and "仮定法過去完了"
- Large bold arrows showing the backward shift
- Japanese text in bold sans-serif
- Blue (#2563EB) and Orange (#F97316) as accent colors
- The backward arrows should be prominent and visually convey "shifting back in time"`,
  },
  {
    name: "subjunctive-flowchart.png",
    prompt: `Create a clean educational flowchart image (1000x1000px) for a Japanese blog article about English subjunctive mood.

Title at top: "仮定法の見分けフローチャート"

Flowchart steps:

STEP 1 (gray rounded box):
Question: "主節に would / could / might がある？ または I wish / as if がある？"

Two branches:
- "No" → Red box: "直説法（ふつうの文）" with note "if + 現在形, will + 原形"
- "Yes" → Green box: "仮定法！" with arrow down to Step 2

STEP 2 (gray rounded box):
Question: "if 節の動詞の形は？"

Two branches:
- "過去形" → Blue (#2563EB) box: "仮定法過去" with note "今の現実と違う想像"
- "had + p.p." → Orange (#F97316) box: "仮定法過去完了" with note "過去の現実と違う想像"

Style:
- White background
- Clean flowchart style with rounded rectangle nodes
- Arrows connecting the boxes clearly
- Color coding: gray for questions, red for 直説法, green for 仮定法 detection, blue for 仮定法過去, orange for 仮定法過去完了
- Japanese text in bold sans-serif
- Easy to follow top-to-bottom flow
- Each result box should be clearly distinct`,
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
  console.log(`Generating blog diagrams to ${OUT_DIR}\n`);
  for (const image of IMAGES) {
    const outPath = path.join(OUT_DIR, image.name);
    console.log(`  Generating ${image.name}...`);
    try {
      const buf = await generateImage(image.prompt);
      fs.writeFileSync(outPath, buf);
      console.log(
        `  Saved ${image.name} (${(buf.length / 1024).toFixed(0)}KB)`
      );
    } catch (err) {
      console.error(
        `  FAIL ${image.name}: ${err instanceof Error ? err.message : err}`
      );
    }
  }
  console.log("\nDone!");
}

main();
