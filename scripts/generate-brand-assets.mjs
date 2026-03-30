import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// favicon用アイコンSVG（角丸正方形+ターゲット）
const iconSvg = readFileSync(join(publicDir, "icon.svg"), "utf-8");

// favicon 32x32
await sharp(Buffer.from(iconSvg))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, "favicon-32x32.png"));
console.log("Created favicon-32x32.png");

// favicon 16x16
await sharp(Buffer.from(iconSvg))
  .resize(16, 16)
  .png()
  .toFile(join(publicDir, "favicon-16x16.png"));
console.log("Created favicon-16x16.png");

// Apple touch icon 180x180
await sharp(Buffer.from(iconSvg))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));
console.log("Created apple-touch-icon.png");

// Android icon 192x192
await sharp(Buffer.from(iconSvg))
  .resize(192, 192)
  .png()
  .toFile(join(publicDir, "icon-192.png"));
console.log("Created icon-192.png");

// OGP画像 1200x630
const ogpSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <!-- 背景グラデーション -->
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E3A5F"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- ターゲットアイコン（大きめ） -->
  <circle cx="600" cy="240" r="100" fill="white" opacity="0.15"/>
  <circle cx="600" cy="240" r="75" fill="#2563EB"/>
  <circle cx="600" cy="240" r="58" fill="white" opacity="0.2"/>
  <circle cx="600" cy="240" r="42" fill="#F97316"/>
  <circle cx="600" cy="240" r="18" fill="white"/>

  <!-- ブランド名 -->
  <text x="600" y="400" text-anchor="middle" font-family="'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Arial, sans-serif" font-size="72" font-weight="700" fill="white">ドリレオ</text>

  <!-- サブテキスト -->
  <text x="600" y="460" text-anchor="middle" font-family="'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Arial, sans-serif" font-size="28" fill="white" opacity="0.7">大学別特化型 問題集 &amp; 模試</text>

  <!-- URL -->
  <text x="600" y="570" text-anchor="middle" font-family="monospace" font-size="22" fill="white" opacity="0.4">drilleo.edore-edu.com</text>
</svg>`;

await sharp(Buffer.from(ogpSvg))
  .resize(1200, 630)
  .png()
  .toFile(join(publicDir, "ogp.png"));
console.log("Created ogp.png");

console.log("All brand assets generated!");
