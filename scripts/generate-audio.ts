/**
 * ElevenLabs TTS で長文読解パッセージの音声を生成する
 *
 * 使い方:
 *   ELEVENLABS_API_KEY=sk-xxx npx tsx scripts/generate-audio.ts
 *
 * オプション:
 *   --slug kindai-reading   書籍スラッグ (デフォルト: kindai-reading)
 *   --voice <voice_id>      ElevenLabs Voice ID (デフォルト: 21m00Tcm4TlvDq8ikWAM = Rachel)
 *   --start 1               開始番号 (途中から再開する場合)
 *   --end 25                終了番号
 */

import fs from "fs";
import path from "path";

const API_BASE = "https://api.elevenlabs.io/v1";
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel - clear, neutral English

interface ProblemData {
  id: string;
  passage: string;
  tags: string[];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) {
    opts[args[i].replace(/^--/, "")] = args[i + 1];
  }
  return {
    slug: opts.slug || "kindai-reading",
    voiceId: opts.voice || DEFAULT_VOICE_ID,
    start: parseInt(opts.start || "1", 10),
    end: parseInt(opts.end || "25", 10),
  };
}

function getDataDir(slug: string): string {
  const map: Record<string, string> = {
    "kindai-reading": "data/problems/q7_reading",
  };
  const dir = map[slug];
  if (!dir) {
    throw new Error(`Unknown slug: ${slug}. Add mapping to getDataDir().`);
  }
  return path.join(process.cwd(), dir);
}

function loadPassage(dataDir: string, num: number): ProblemData {
  const padded = String(num).padStart(3, "0");
  const filePath = path.join(dataDir, `q7_${padded}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function cleanPassage(passage: string): string {
  return passage
    .replace(/__(.+?)__/g, "$1") // Remove markdown bold markers
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

async function generateAudio(
  text: string,
  voiceId: string,
  apiKey: string
): Promise<Buffer> {
  const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.6,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs API error (${res.status}): ${err}`);
  }

  const arrayBuf = await res.arrayBuffer();
  return Buffer.from(arrayBuf);
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("Error: ELEVENLABS_API_KEY environment variable is required");
    process.exit(1);
  }

  const { slug, voiceId, start, end } = parseArgs();
  const dataDir = getDataDir(slug);
  const outDir = path.join(process.cwd(), "public", "audio", slug);

  // 出力ディレクトリ作成
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Generating audio for: ${slug}`);
  console.log(`Voice ID: ${voiceId}`);
  console.log(`Range: ${start} - ${end}`);
  console.log(`Output: ${outDir}\n`);

  for (let num = start; num <= end; num++) {
    const padded = String(num).padStart(3, "0");
    const outPath = path.join(outDir, `${padded}.mp3`);

    // 既に存在する場合はスキップ
    if (fs.existsSync(outPath)) {
      console.log(`[${padded}] Already exists, skipping`);
      continue;
    }

    try {
      const problem = loadPassage(dataDir, num);
      const text = cleanPassage(problem.passage);
      const theme = problem.tags?.[0] || "";

      console.log(`[${padded}] Generating: ${theme} (${text.length} chars)...`);

      const audioBuffer = await generateAudio(text, voiceId, apiKey);
      fs.writeFileSync(outPath, audioBuffer);

      const sizeMB = (audioBuffer.length / 1024 / 1024).toFixed(1);
      console.log(`[${padded}] Saved: ${sizeMB} MB`);

      // API レート制限を考慮して少し待機
      if (num < end) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.error(`[${padded}] Error:`, err);
      console.error(`  Retry with: --start ${num}`);
      process.exit(1);
    }
  }

  console.log("\nDone! All audio files generated.");
}

main();
