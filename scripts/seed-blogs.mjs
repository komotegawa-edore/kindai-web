/**
 * microCMS にブログ記事を3件投稿するスクリプト
 * 使い方: node scripts/seed-blogs.mjs
 *
 * 前提: .env.local に MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY が設定済みで、
 *       APIキーに POST 権限があること
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local を手動パース
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key.trim()] = rest.join("=").trim();
}

const SERVICE_DOMAIN = env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = env.MICROCMS_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error("MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を .env.local に設定してください");
  process.exit(1);
}

const API_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`;

const blogs = [
  {
    title: "近大英語 長文読解で8割取るための3つのコツ",
    slug: "kindai-reading-tips",
    description:
      "近畿大学の英語入試で最も配点が高い長文読解（大問7）。本番で8割以上を狙うための具体的な読み方・解き方を3つのポイントに絞って解説します。",
    category: ["近大英語"],
    content: `
<h2>はじめに</h2>
<p>近畿大学の英語入試は全7大問・100点満点のマークシート方式。中でも<strong>大問7の長文読解は1問あたり3〜4点</strong>と最も配点が高く、合否を左右する最重要パートです。</p>
<p>この記事では、近大英語の長文読解で安定して8割以上を取るための3つのコツを紹介します。</p>

<h2>コツ1：段落ごとに要旨をつかむ</h2>
<p>近大の長文は500〜600語程度で、社会・科学・文化など幅広いテーマから出題されます。設問は「第○段落によると…」という<strong>段落指定形式</strong>が多いのが特徴です。</p>
<p>そのため、英文を読むときは<strong>段落ごとにキーワードや主張をメモする習慣</strong>をつけましょう。各段落の1〜2文目（トピックセンテンス）に注目すると、要旨をすばやくつかめます。</p>

<h2>コツ2：設問を先に読む</h2>
<p>長文を最初から最後まで読んでから設問に取りかかると、結局もう一度読み直すことになり、時間のロスが大きくなります。</p>
<p><strong>設問と選択肢を先に目を通し</strong>、「何を聞かれているか」を把握してから本文を読みましょう。探すべき情報が明確になるため、読解スピードが格段に上がります。</p>

<h2>コツ3：時間配分を意識する</h2>
<p>近大英語は60分で全7大問を解く必要があります。大問1〜6に時間をかけすぎると、配点が高い長文読解に十分な時間を確保できません。</p>
<p>目安として<strong>大問1〜6を30分以内</strong>で仕上げ、<strong>長文読解に20〜25分</strong>を確保するのが理想です。日頃から時間を計って演習し、ペース感覚を身につけましょう。</p>

<h2>まとめ</h2>
<p>近大英語の長文読解で高得点を取るには、①段落要旨の把握、②設問先読み、③時間配分の3つが鍵です。これらを意識して演習を重ねれば、本番でも安定した得点が期待できます。</p>
<p>ドリレオの<a href="/kindai">近大英語 長文読解ドリル</a>は、本番と同じ形式の問題を全25回分収録。全問解説・全文和訳付きで効率的に実力アップできます。</p>
    `.trim(),
  },
  {
    title: "受験勉強のモチベーションを維持する5つの方法",
    slug: "study-motivation-tips",
    description:
      "長い受験勉強を乗り越えるにはモチベーション管理が不可欠。科学的根拠に基づいた、やる気を持続させる5つの実践的な方法を紹介します。",
    category: ["勉強法"],
    content: `
<h2>はじめに</h2>
<p>受験勉強は数ヶ月から1年以上に及ぶ長期戦。「やる気が出ない」「集中できない」と感じることは誰にでもあります。大切なのは、モチベーションは「自然に湧くもの」ではなく<strong>「仕組みで維持するもの」</strong>だと理解することです。</p>

<h2>1. 目標を「小さく・具体的に」分割する</h2>
<p>「志望校に合格する」という大きな目標だけでは、日々の行動に結びつきにくいもの。<strong>週単位・日単位の小さな目標</strong>に分割しましょう。</p>
<p>例：「今週は近大英語の長文読解を5回分解く」「今日は第3回の復習を完了させる」など、達成が確認できる具体的な目標にするのがポイントです。</p>

<h2>2. 勉強した記録を「見える化」する</h2>
<p>カレンダーに学習時間を記録したり、解いた問題数をノートにメモしたりして、<strong>努力の蓄積を可視化</strong>しましょう。「これだけやった」という実感がモチベーションの源になります。</p>

<h2>3. 環境を変える</h2>
<p>同じ場所でずっと勉強していると、マンネリ化してやる気が低下します。<strong>図書館、カフェ、自習室など場所を変える</strong>だけで気分転換になり、集中力が回復します。</p>

<h2>4. 仲間と競い合う</h2>
<p>一人で黙々と勉強するのは孤独なもの。同じ志望校を目指す仲間と<strong>進捗を共有したり、模試のスコアを競い合う</strong>ことで、健全な競争心が生まれます。</p>
<p>ドリレオの<a href="/kindai/leaderboard">Web模試ランキング</a>を使えば、全国の近大志望者とスコアを競えます。</p>

<h2>5. 適度に休む</h2>
<p>休息なしに勉強し続けると、効率が低下し燃え尽きの原因になります。<strong>ポモドーロ・テクニック</strong>（25分集中＋5分休憩）や、週に1日は完全オフにするなど、意識的に休む時間を確保しましょう。</p>

<h2>まとめ</h2>
<p>モチベーション維持の秘訣は、目標の細分化・記録の可視化・環境変化・仲間との競争・適度な休息の5つ。これらを実践しながら、志望校合格に向けて一歩ずつ進んでいきましょう。</p>
    `.trim(),
  },
  {
    title: "近大英語の出題傾向と効率的な対策スケジュール",
    slug: "kindai-english-schedule",
    description:
      "近畿大学の英語入試の出題傾向を大問別に分析し、残り3ヶ月・半年・1年の時期別に最適な学習スケジュールを提案します。",
    category: ["近大英語"],
    content: `
<h2>近大英語の試験概要</h2>
<p>まずは試験の基本情報を押さえましょう。</p>
<ul>
  <li><strong>試験時間</strong>：60分</li>
  <li><strong>配点</strong>：100点満点</li>
  <li><strong>解答形式</strong>：完全マークシート（4〜5択）</li>
  <li><strong>大問数</strong>：7題（約40問）</li>
  <li><strong>難易度</strong>：共通テスト同等（やや易〜標準）</li>
</ul>

<h2>大問別の出題傾向</h2>
<h3>大問1：会話文の空所補充</h3>
<p>日常的な会話の流れを理解し、適切な表現を選ぶ問題。会話特有の表現（慣用句・応答パターン）の知識がカギです。</p>

<h3>大問2：中文の空所補充</h3>
<p>約150語の短い文章の空所を埋める問題。文法力と文脈把握力の両方が求められます。</p>

<h3>大問3：文法・語法</h3>
<p>短文の空所補充。時制、関係詞、仮定法、分詞構文などの頻出文法事項を確実に押さえましょう。</p>

<h3>大問4：同意文の選択</h3>
<p>与えられた文と同じ意味の選択肢を選ぶ問題。パラフレーズ（言い換え）の力が試されます。</p>

<h3>大問5：語彙力</h3>
<p>単語・熟語の意味を問う問題。ターゲット1900やシス単レベルの語彙で十分対応可能です。</p>

<h3>大問6：整序英作文</h3>
<p>語句を正しい順序に並べ替える問題。文法知識に加え、自然な英語の語順感覚が必要です。</p>

<h3>大問7：長文読解</h3>
<p>500〜600語の英文を読み、設問に答える問題。<strong>配点が最も高く</strong>（各3〜4点）、合否を分ける最重要パートです。</p>

<h2>時期別の対策スケジュール</h2>

<h3>残り1年（高2冬〜高3冬）</h3>
<ol>
  <li><strong>基礎固め期（〜夏）</strong>：文法の総復習＋単語帳1冊を完成</li>
  <li><strong>演習期（夏〜秋）</strong>：大問別に問題演習を開始。近大形式に慣れる</li>
  <li><strong>実戦期（秋〜冬）</strong>：過去問＋近大特化問題集で時間配分を調整</li>
</ol>

<h3>残り半年（高3夏〜）</h3>
<ol>
  <li><strong>弱点克服期（〜10月）</strong>：模試の結果から弱点を特定し集中強化</li>
  <li><strong>実戦演習期（11月〜）</strong>：過去問と問題集を時間を計って解く</li>
</ol>

<h3>残り3ヶ月（高3秋〜）</h3>
<p>もう基礎に戻る時間はありません。<strong>配点の高い長文読解に全力集中</strong>しつつ、文法・語彙の確認を並行して行いましょう。</p>

<h2>まとめ</h2>
<p>近大英語は出題パターンが安定しており、対策がしやすい試験です。大問別の傾向を理解し、時期に応じた学習計画を立てれば、効率的にスコアアップできます。</p>
<p>ドリレオの<a href="/kindai">近大英語 長文読解ドリル</a>で、配点最高の大問7を徹底攻略しましょう。</p>
    `.trim(),
  },
];

async function createBlog(blog) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY,
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create "${blog.title}": ${res.status} ${text}`);
  }
  const data = await res.json();
  console.log(`✓ 作成完了: ${blog.title} (id: ${data.id})`);
  return data;
}

async function main() {
  console.log("microCMS にブログ記事を投稿中...\n");
  for (const blog of blogs) {
    await createBlog(blog);
  }
  console.log("\n完了！ microCMS 管理画面で記事を確認してください。");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
