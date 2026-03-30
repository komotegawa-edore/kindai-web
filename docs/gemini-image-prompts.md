# Gemini 画像生成プロンプト集 — 近大ドリル LP用イラスト

生成後、背景透過処理を行い `public/images/` に配置する。
推奨ツール: remove.bg / Photoshop / GIMP など

---

## 1. ヒーローイラスト（hero.png）
**配置**: ヒーローセクション右側
**サイズ目安**: 600×600px（正方形、透過PNG）

```
A cheerful Japanese high school student (male, wearing a navy blue school uniform) sitting at a desk studying English with a textbook and notebook. The student is smiling confidently and raising a fist in determination. Flat illustration style, clean lines, minimal detail, modern vector art style. Color palette: navy blue (#00408B), crimson red (#C41E3A), and white accents. No background, suitable for transparent PNG. No text in the image.
```

---

## 2. 書籍3Dモックアップ用の表紙（book-cover.png）
**配置**: 書籍紹介セクション
**サイズ目安**: 400×600px

```
A professional Japanese study guide book cover design. Title area at top in large bold navy blue text space. Subtitle area in crimson red. Clean, academic design with geometric patterns in navy blue and white. B5 format vertical book cover. Modern minimal style with subtle diagonal stripe pattern in the background. No actual text needed - just the layout and design elements.
```

※ 表紙テキストは後から Canva/Figma で重ねる

---

## 3. 特徴アイコン — 近大特化（icon-target.png）
**配置**: 書籍の特徴カード1
**サイズ目安**: 200×200px（透過PNG）

```
A simple flat icon illustration of a target/bullseye with an arrow hitting the center, surrounded by a university building silhouette. Navy blue (#00408B) and crimson red (#C41E3A) color scheme. Clean minimal vector style, no background, suitable for transparent PNG. No text.
```

---

## 4. 特徴アイコン — 全7大問対応（icon-checklist.png）
**配置**: 書籍の特徴カード2
**サイズ目安**: 200×200px（透過PNG）

```
A simple flat icon illustration of a checklist with 7 items, all checked with checkmarks. The checklist is on a clipboard. Navy blue (#00408B) and crimson red (#C41E3A) color scheme. Clean minimal vector style, no background, suitable for transparent PNG. No text.
```

---

## 5. 特徴アイコン — 丁寧な解説（icon-explanation.png）
**配置**: 書籍の特徴カード3
**サイズ目安**: 200×200px（透過PNG）

```
A simple flat icon illustration of an open book with a magnifying glass and a lightbulb above it, representing detailed explanations and understanding. Navy blue (#00408B) and crimson red (#C41E3A) color scheme. Clean minimal vector style, no background, suitable for transparent PNG. No text.
```

---

## 6. 模試CTAイラスト（exam-cta.png）
**配置**: 模試CTAセクション
**サイズ目安**: 500×400px（透過PNG）

```
Two Japanese high school students (one male, one female, wearing navy blue school uniforms) looking at a smartphone screen showing a ranking/leaderboard, both looking excited and competitive. Flat illustration style, clean lines, modern vector art. Color palette: navy blue (#00408B), crimson red (#C41E3A), white, and light gray. No background, suitable for transparent PNG. No text in the image.
```

---

## 7. ランキングイラスト（ranking.png）
**配置**: 模試CTAセクションの補助、またはランキングページ
**サイズ目安**: 400×300px（透過PNG）

```
A trophy podium (1st, 2nd, 3rd place) with abstract student silhouettes standing on it. Confetti falling around them. Flat illustration style, celebratory mood. Color palette: navy blue (#00408B), gold (#FFD700), crimson red (#C41E3A). No background, suitable for transparent PNG. No text.
```

---

## 生成→配置ワークフロー

1. **Gemini** でプロンプトを入力して画像生成
2. **背景透過**: remove.bg または画像編集ツールで透過PNG化
3. `public/images/` に配置:
   ```
   public/images/hero.png
   public/images/book-cover.png
   public/images/icon-target.png
   public/images/icon-checklist.png
   public/images/icon-explanation.png
   public/images/exam-cta.png
   public/images/ranking.png
   ```
4. LP（`src/app/page.tsx`）で `<Image>` コンポーネントで読み込み
