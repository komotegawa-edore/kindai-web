#!/usr/bin/env npx tsx
/**
 * 6つの文法ブログ記事用の図解画像を一括生成する
 * Usage: GOOGLE_API_KEY=xxx npx tsx scripts/generate-grammar-diagrams.ts
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
  // ===== 関係代名詞 (3枚) =====
  {
    name: "relative-pronoun-basic.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about English relative pronouns.

Title: "関係代名詞＝2つの文を1つにする接着剤"

Show two separate sentences at the top:
- Sentence 1: "I have a friend." (in a blue box)
- Sentence 2: "He lives in Tokyo." (in a separate blue box)

An arrow pointing down with the label "who でつなぐ" in a green circle

Below, one combined sentence in an orange box:
"I have a friend who lives in Tokyo."
With "who lives in Tokyo" underlined or highlighted, and a label "関係代名詞節" pointing to it.
Also show "a friend" labeled as "先行詞"

Style: White background, clean infographic, rounded boxes, blue (#2563EB) and orange (#F97316) accents, bold Japanese sans-serif text.`,
  },
  {
    name: "relative-pronoun-cases.png",
    prompt: `Create a clean educational diagram (1200x800px) for a Japanese blog about English relative pronouns.

Title: "関係代名詞の格の使い分け"

Show 3 rows comparing the three cases:

Row 1 (Blue, #2563EB):
Label: "主格" (Subject case)
Rule: "先行詞 = 関係詞節の中で主語"
人 → who / that
物 → which / that
Example: "the man who lives here"

Row 2 (Orange, #F97316):
Label: "目的格" (Object case)
Rule: "先行詞 = 関係詞節の中で目的語"
人 → whom / that / 省略OK
物 → which / that / 省略OK
Example: "the book (which) I read"

Row 3 (Green, #16A34A):
Label: "所有格" (Possessive)
Rule: "先行詞 = 関係詞節の中で所有"
人も物も → whose
Example: "the girl whose bag is red"

Style: White background, clean table/card layout, color-coded rows, bold Japanese sans-serif text.`,
  },
  {
    name: "relative-pronoun-flowchart.png",
    prompt: `Create a clean flowchart (1000x1000px) for a Japanese blog about English relative pronouns.

Title: "関係代名詞の見分けフローチャート"

STEP 1 (gray box): "空所のあとの形は？"
- "動詞が続く（S が欠けている）" → Blue box: "主格（who / which / that）"
- "S+V が続く（O が欠けている）" → Orange box: "目的格（whom / which / that）※省略OK"
- "名詞が続く（所有が欠けている）" → Green box: "所有格（whose）"

Then from 主格 and 目的格:
Sub-question: "先行詞は人？物？"
- 人 → who / whom
- 物 → which
- どちらも → that

Style: White background, clean flowchart with rounded boxes and arrows, color-coded: blue for 主格, orange for 目的格, green for 所有格, bold Japanese sans-serif text.`,
  },

  // ===== 分詞・分詞構文 (3枚) =====
  {
    name: "participle-present-vs-past.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about English participles.

Title: "現在分詞 vs 過去分詞"

Two columns side by side:

LEFT (Blue, #2563EB):
Label: "現在分詞（-ing）"
Meaning: "〜している（能動）"
Arrow showing: 主語 → 動作する
Example: "a sleeping baby" = 眠っている赤ちゃん
Example: "The movie was exciting." = 映画がワクワクさせる

RIGHT (Orange, #F97316):
Label: "過去分詞（-ed / p.p.）"
Meaning: "〜された（受動）"
Arrow showing: 主語 ← 動作される
Example: "a broken window" = 割られた窓
Example: "I was excited." = 私がワクワクさせられた

Center divider with key insight:
"する側 = -ing / される側 = p.p."

Style: White background, clean comparison layout, blue and orange accent colors, bold Japanese sans-serif text.`,
  },
  {
    name: "participle-emotions.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about English participles with emotion verbs.

Title: "感情動詞の分詞：-ing と -ed の使い分け"

Show a clear visual:
- Center: A movie icon (or object) with an arrow pointing RIGHT to a person icon
- Arrow label: "感情を引き起こす"
- Movie side: "-ing（物の性質）" in blue
- Person side: "-ed（人の感情）" in orange

Below, example pairs in two columns:
| -ing（原因・物の性質） | -ed（結果・人の感情） |
| exciting（ワクワクさせる）| excited（ワクワクした）|
| surprising（驚かせる）| surprised（驚いた）|
| boring（退屈させる）| bored（退屈した）|
| interesting（興味を引く）| interested（興味がある）|

Key rule at bottom:
"物・出来事が主語 → -ing / 人が主語 → -ed"

Style: White background, clean infographic, blue (#2563EB) and orange (#F97316) accents, bold Japanese sans-serif text.`,
  },
  {
    name: "participle-flowchart.png",
    prompt: `Create a clean flowchart (1000x1000px) for a Japanese blog about English participles.

Title: "分詞の見分けフローチャート"

STEP 1 (gray box): "主語（修飾される名詞）と動詞の関係は？"

Two branches:
- "主語が動作をする（能動）" → Blue box: "現在分詞（-ing）"
  Note: "例：a running boy（走っている少年）"
- "主語が動作をされる（受動）" → Orange box: "過去分詞（-ed / p.p.）"
  Note: "例：a broken cup（割られたカップ）"

STEP 2 (gray box): "感情動詞の場合"
- "原因（物・出来事）が主語" → Blue: "-ing"
- "感情を感じる人が主語" → Orange: "-ed"

Style: White background, clean flowchart with rounded boxes and arrows, blue for -ing, orange for -ed/p.p., bold Japanese sans-serif text.`,
  },

  // ===== 時制・完了形 (3枚) =====
  {
    name: "tense-past-vs-perfect.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about English tenses.

Title: "過去形 vs 現在完了形"

Show a horizontal timeline with "過去" on the left and "現在" on the right.

TOP section (Blue, #2563EB):
Label: "過去形"
A dot on the timeline at a past point, labeled "I lost my key."
Text: "過去の一点で完結。今はどうか不明。"
The dot is disconnected from 現在.

BOTTOM section (Orange, #F97316):
Label: "現在完了形"
An arrow/line stretching FROM a past point TO the present, labeled "I have lost my key."
Text: "過去の出来事が今に影響。今もカギがない！"
The line connects to 現在.

Key insight in center:
"現在完了 = 過去と現在をつなぐ橋"

Style: White background, clean timeline diagram, blue and orange accents, bold Japanese sans-serif text.`,
  },
  {
    name: "tense-perfect-three-uses.png",
    prompt: `Create a clean educational diagram (1200x800px) for a Japanese blog about English present perfect tense.

Title: "現在完了の3つの用法"

Show 3 cards/sections with timelines:

Card 1 (Blue, #2563EB):
Label: "完了「〜したところだ」"
Timeline: action completed just before NOW
Keywords: just, already, yet
Example: "I have just finished my homework."

Card 2 (Orange, #F97316):
Label: "経験「〜したことがある」"
Timeline: dots at various past points, arrow to NOW
Keywords: ever, never, before, once, twice
Example: "I have been to Paris twice."

Card 3 (Green, #16A34A):
Label: "継続「ずっと〜している」"
Timeline: continuous line from past point to NOW
Keywords: for, since
Example: "I have lived here for 10 years."

Each card has a small timeline illustration showing the concept visually.

Style: White background, 3-card layout, color-coded, bold Japanese sans-serif text.`,
  },
  {
    name: "tense-past-perfect-timeline.png",
    prompt: `Create a clean educational diagram (1200x600px) for a Japanese blog about English past perfect tense.

Title: "過去完了形のタイムライン"

Show a horizontal timeline with 3 points:
- Left: "大過去（had + p.p.）"
- Center: "過去（過去形）"
- Right: "現在"

Below the timeline:
Example sentence: "When I arrived at the station, the train had already left."

Visual:
- At "大過去" point: "電車が出発した（had left）" with a train icon
- At "過去" point: "駅に着いた（arrived）" with a person icon
- Arrow showing had left happened BEFORE arrived

Key insight:
"過去完了 = 過去のある時点よりさらに前の出来事"

Style: White background, clean timeline, blue for 過去完了/大過去, gray for 過去, bold Japanese sans-serif text.`,
  },

  // ===== 不定詞と動名詞 (3枚) =====
  {
    name: "infinitive-three-uses.png",
    prompt: `Create a clean educational diagram (1200x800px) for a Japanese blog about English infinitives.

Title: "to不定詞の3用法"

Show 3 sections:

Section 1 (Blue, #2563EB):
Label: "名詞的用法「〜すること」"
Role: 主語・目的語・補語になる
Example: "To study English is fun." / "I want to go."
Icon: A noun/block icon

Section 2 (Orange, #F97316):
Label: "形容詞的用法「〜するための」"
Role: 直前の名詞を修飾する
Example: "I need something to drink."
Icon: An adjective/arrow pointing to noun

Section 3 (Green, #16A34A):
Label: "副詞的用法「〜するために」"
Role: 動詞・形容詞を修飾（目的・原因・結果）
Example: "I went to the store to buy milk."
Icon: An adverb/purpose arrow

Style: White background, 3-card vertical layout, color-coded, bold Japanese sans-serif text, each with a simple icon.`,
  },
  {
    name: "infinitive-vs-gerund.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about infinitives vs gerunds.

Title: "不定詞 vs 動名詞の使い分け"

Two columns:

LEFT (Blue, #2563EB):
Label: "to不定詞"
Direction: → 未来・これから（forward arrow）
Nuance: "これからすること・意志"
Verbs: want, hope, decide, plan, promise
Example: "I decided to study abroad."（留学することを決めた）

RIGHT (Orange, #F97316):
Label: "動名詞（-ing）"
Direction: ← 過去・すでに（backward arrow or present circle）
Nuance: "すでにしていること・習慣・一般的な行為"
Verbs: enjoy, finish, mind, avoid, give up
Example: "I enjoy playing tennis."（テニスを楽しんでいる）

Center divider with timeline:
Past ← -ing | to → Future

Key rule: "未来志向 → to / 過去・現在志向 → -ing"

Style: White background, clean comparison, blue and orange accents, timeline arrow in center, bold Japanese sans-serif text.`,
  },
  {
    name: "infinitive-gerund-flowchart.png",
    prompt: `Create a clean flowchart (1000x1000px) for a Japanese blog about infinitives and gerunds.

Title: "不定詞・動名詞の見分けフローチャート"

STEP 1 (gray box): "動詞は何？"

Three branches:
- "want/hope/decide/plan/promise/agree" → Blue box: "to不定詞のみ"
  Note: "未来・意志系の動詞"
- "enjoy/finish/mind/avoid/give up/stop/deny" → Orange box: "動名詞のみ"
  Note: "メガフェプス系の動詞"
- "remember/forget/try/stop" → Green box: "両方OK（意味が変わる！）"

From Green box:
Sub-question: "意味の違いは？"
- "remember to do = これから忘れずに〜する"
- "remember -ing = 〜したことを覚えている"

Style: White background, clean flowchart, blue for to不定詞, orange for 動名詞, green for 両方, bold Japanese sans-serif text.`,
  },

  // ===== 比較表現 (3枚) =====
  {
    name: "comparison-three-levels.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about English comparatives.

Title: "比較の3つの級"

Show 3 levels visually like steps or podium:

Level 1 (bottom, Blue, #2563EB):
Label: "原級（as ... as）"
Meaning: "Aと同じくらい〜"
Example: "Tom is as tall as Ken."
Visual: Two equal height bars

Level 2 (middle, Orange, #F97316):
Label: "比較級（-er / more ...）"
Meaning: "Aより〜"
Example: "Tom is taller than Ken."
Visual: One bar slightly higher than another

Level 3 (top, Green, #16A34A):
Label: "最上級（-est / most ...）"
Meaning: "最も〜"
Example: "Tom is the tallest in his class."
Visual: One bar highest among three

Style: White background, clean stepped/podium layout, color-coded levels, bold Japanese sans-serif text.`,
  },
  {
    name: "comparison-formation.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about how to form comparatives and superlatives.

Title: "比較級・最上級の作り方"

Show a decision flowchart:

Question: "形容詞・副詞の音節数は？"

Branch 1: "1音節（short words）"
→ "-er / -est をつける"
Examples: tall → taller → tallest, big → bigger → biggest

Branch 2: "2音節以上（long words）"
→ "more / most をつける"
Examples: beautiful → more beautiful → most beautiful

Branch 3: "不規則変化"
→ Show a small table:
good → better → best
bad → worse → worst
many/much → more → most
little → less → least

Note at bottom: "2音節の -y で終わる語は y→ier/iest (easy → easier → easiest)"

Style: White background, clean flowchart/decision tree, blue (#2563EB) and orange (#F97316) accents, bold Japanese sans-serif text.`,
  },
  {
    name: "comparison-rewrite.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about comparison sentence rewrites.

Title: "比較の書き換えパターン"

Show a triangle or circular relationship between 3 forms:

Top: "最上級" (Superlative) in Green
"Tom is the tallest in his class."

Left: "比較級" (Comparative) in Orange
"Tom is taller than any other student in his class."

Right: "原級" (Positive) in Blue
"No other student in his class is as tall as Tom."

Arrows connecting all three with "=" signs, showing they mean the same thing.

Below, a key pattern box:
最上級 = No other ... as ~ as ... = 比較級 than any other ...

Style: White background, clean triangle/circular diagram, green/orange/blue color coding, bold Japanese sans-serif text.`,
  },

  // ===== 接続詞・前置詞 (3枚) =====
  {
    name: "conjunction-vs-preposition.png",
    prompt: `Create a clean educational diagram (1200x700px) for a Japanese blog about conjunctions vs prepositions.

Title: "接続詞 vs 前置詞の違い"

Two columns:

LEFT (Blue, #2563EB):
Label: "接続詞"
Rule: "後ろに S+V（文）が来る"
Visual: Box labeled "接続詞" + Box labeled "S + V ..."
Examples:
- because + S+V
- although + S+V
- while + S+V
Example sentence: "Because it rained, we stayed home."

RIGHT (Orange, #F97316):
Label: "前置詞"
Rule: "後ろに 名詞 が来る"
Visual: Box labeled "前置詞" + Box labeled "名詞"
Examples:
- because of + 名詞
- despite + 名詞
- during + 名詞
Example sentence: "Because of the rain, we stayed home."

Key insight at bottom:
"後ろが S+V → 接続詞 / 後ろが名詞 → 前置詞"

Style: White background, clean comparison, blue and orange accents, bold Japanese sans-serif text.`,
  },
  {
    name: "conjunction-preposition-check.png",
    prompt: `Create a clean educational diagram (1200x800px) for a Japanese blog about confusing conjunction/preposition pairs.

Title: "紛らわしいペア一覧"

Show a comparison table with 3 pairs:

Pair 1:
接続詞: "because + S+V"（〜なので）
前置詞: "because of + 名詞"（〜のせいで）
Example: "because it was cold" vs "because of the cold"

Pair 2:
接続詞: "although / though + S+V"（〜だけれども）
前置詞: "despite / in spite of + 名詞"（〜にもかかわらず）
Example: "although it rained" vs "despite the rain"

Pair 3:
接続詞: "while + S+V"（〜の間に）
前置詞: "during + 名詞"（〜の間に）
Example: "while I was sleeping" vs "during my sleep"

Color coding: Blue for 接続詞 side, Orange for 前置詞 side.
Each pair in a card with clear visual separation.

Style: White background, clean card/table layout, blue (#2563EB) and orange (#F97316) accents, bold Japanese sans-serif text.`,
  },
  {
    name: "conjunction-preposition-flowchart.png",
    prompt: `Create a clean flowchart (1000x1000px) for a Japanese blog about conjunctions and prepositions.

Title: "接続詞・前置詞の見分けフローチャート"

STEP 1 (gray box): "空所の後ろの形は？"

Two branches:
- "S + V（主語+動詞）が続く" → Blue box: "接続詞を選ぶ！"
  Examples: because / although / while / when / if
- "名詞（句）が続く" → Orange box: "前置詞を選ぶ！"
  Examples: because of / despite / during / in spite of

STEP 2 (gray box): "文の意味は？"
- "理由" → because (接) / because of (前)
- "譲歩" → although (接) / despite (前)
- "時" → while (接) / during (前)

Style: White background, clean flowchart with rounded boxes and arrows, blue for 接続詞, orange for 前置詞, bold Japanese sans-serif text.`,
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
  console.log(`Generating ${IMAGES.length} grammar diagrams to ${OUT_DIR}\n`);

  for (let i = 0; i < IMAGES.length; i++) {
    const image = IMAGES[i];
    const outPath = path.join(OUT_DIR, image.name);

    // Skip if already exists
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
