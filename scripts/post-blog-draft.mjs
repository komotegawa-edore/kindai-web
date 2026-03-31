/**
 * microCMS にブログ記事を下書き投稿するスクリプト
 * 使い方: node scripts/post-blog-draft.mjs
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
  console.error(
    "MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を .env.local に設定してください"
  );
  process.exit(1);
}

const API_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`;

const blog = {
  title: "春から始める近大英語の勉強スケジュール【2026年度最新版】",
  slug: "kindai-english-spring-schedule",
  description:
    "近畿大学の英語入試を春からどう対策する？大問別の配点・時間配分・難易度を踏まえ、4月〜1月の具体的な学習スケジュールを月単位で解説します。",
  content: `
<h2>近大英語の試験概要をおさらい</h2>
<p>近畿大学の英語入試は、全学部統一日程・一般入試ともに同じ形式で出題されます。まずは基本スペックを押さえましょう。</p>
<ul>
  <li><strong>試験時間</strong>：60分</li>
  <li><strong>満点</strong>：100点</li>
  <li><strong>問題数</strong>：全7大問・41問</li>
  <li><strong>解答形式</strong>：全問マークシート（4択が中心）</li>
</ul>
<p>最大の特徴は<strong>文法・語法系の大問が6つもある</strong>こと。大問1〜6は文法・語彙の知識を直接問う問題で、大問7だけが長文読解です。つまり、基礎的な英語力をまんべんなく身につければ高得点が狙える、対策しやすい試験と言えます。</p>

<h2>大問別の配点・時間配分・難易度</h2>
<p>効率的に勉強するには、各大問の「重さ」を知ることが大切です。</p>
<table>
  <thead>
    <tr><th>大問</th><th>出題形式</th><th>問題数</th><th>配点</th><th>目安時間</th><th>難易度</th></tr>
  </thead>
  <tbody>
    <tr><td>I</td><td>会話文の空所補充</td><td>6問</td><td>12点</td><td>6分</td><td>やや易〜標準</td></tr>
    <tr><td>II</td><td>中文の空所補充</td><td>6問</td><td>12点</td><td>5分</td><td>標準</td></tr>
    <tr><td>III</td><td>文法・語法（短文空所補充）</td><td>8問</td><td>16点</td><td>3〜4分</td><td>標準</td></tr>
    <tr><td>IV</td><td>同意文選択</td><td>4問</td><td>8点</td><td>6分</td><td>標準〜やや難</td></tr>
    <tr><td>V</td><td>語彙（定義→単語）</td><td>5問</td><td>10点</td><td>3分</td><td>やや易〜標準</td></tr>
    <tr><td>VI</td><td>語句整序（並べ替え）</td><td>4問</td><td>16点</td><td>6分</td><td>標準〜やや難</td></tr>
    <tr><td>VII</td><td>長文読解</td><td>8問</td><td>26点</td><td>20〜25分</td><td>標準</td></tr>
  </tbody>
</table>
<p>注目すべきポイントは3つあります。</p>

<h3>1. 長文読解（大問VII）の配点が最も高い</h3>
<p>8問で26点。1問あたり3〜4点と、他の大問の2点と比べて重い配点です。ここを落とすと一気に苦しくなります。</p>

<h3>2. 文法・語法（大問III）と語句整序（大問VI）が各16点</h3>
<p>大問IIIは8問×2点、大問VIは4問×4点。どちらも文法力がカギです。特に大問VIは1問あたりの配点が高いので、ケアレスミスは致命的です。</p>

<h3>3. 大問I〜VIを35分以内に終わらせたい</h3>
<p>長文読解に20〜25分を確保するために、前半6大問はテンポよく解く必要があります。1問にかけられる時間は1分前後です。</p>

<h2>春から始める月別スケジュール</h2>
<p>ここからが本題です。4月から入試本番の1月まで、月ごとに何をすべきかを具体的に示します。</p>

<h3>4月〜5月：基礎固め期（単語・文法の土台づくり）</h3>
<p>春は基礎力を固める最も大事な時期です。ここで土台を作れるかどうかで、秋以降の伸びが大きく変わります。</p>
<p><strong>単語</strong></p>
<ul>
  <li>単語帳を1冊決めて毎日コツコツ取り組む</li>
  <li>目標：共通テストレベル（約1,200〜1,500語）を完成させる</li>
  <li>1日50〜100語のペースで、何周も回して定着させる</li>
</ul>
<p><strong>文法</strong></p>
<ul>
  <li>文法の参考書を1冊通読する（全範囲を一通り把握する）</li>
  <li>時制・関係詞・仮定法・分詞・不定詞・動名詞は近大頻出なので重点的に</li>
  <li>この時期は「理解」が目的。問題を解くのは次のステップ</li>
</ul>
<p><strong>やること</strong></p>
<ul>
  <li>単語帳を毎日回す（朝or寝る前にルーティン化）</li>
  <li>文法参考書を1周する</li>
  <li>英語に毎日触れる習慣をつくる</li>
</ul>
<blockquote><p>まだ近大英語の問題を見たことがない人は、この段階で一度過去問をざっと眺めてみましょう。「こういう問題が出るんだ」とゴールを知っておくと、日々の勉強に目的意識が生まれます。</p></blockquote>

<h3>6月〜7月：文法演習期（インプット→アウトプット）</h3>
<p>基礎文法を理解したら、問題演習でアウトプットに移ります。</p>
<p><strong>文法・語法</strong></p>
<ul>
  <li>文法問題集で演習を開始する</li>
  <li>間違えた問題は必ず解説を読み、なぜその答えになるかを説明できるようにする</li>
  <li>「正解・不正解」ではなく「ポイントが意識できたかどうか」で区別する</li>
</ul>
<p><strong>単語・熟語</strong></p>
<ul>
  <li>単語帳2〜3周目に入る</li>
  <li>熟語帳にも着手する（近大は熟語の出題が多い）</li>
  <li>大問IVの同意文選択や大問VIの語句整序では熟語・構文の知識が直接問われる</li>
</ul>
<p><strong>やること</strong></p>
<ul>
  <li>文法問題集を1日10〜20問ペース</li>
  <li>単語帳の反復継続</li>
  <li>熟語帳を開始</li>
</ul>

<h3>8月：集中演習期（夏休みを最大活用）</h3>
<p>まとまった時間が取れる夏休みは、一気に実力を引き上げるチャンスです。</p>
<p><strong>文法の総仕上げ</strong></p>
<ul>
  <li>文法問題集を2周目に入る（苦手分野を集中的に）</li>
  <li>品詞の識別と文構造の把握を意識する（近大の大問II・IIIで特に重要）</li>
</ul>
<p><strong>長文読解の導入</strong></p>
<ul>
  <li>短めの英文（300〜400語）から読解練習を始める</li>
  <li>段落ごとに要旨をつかむ読み方を意識する</li>
  <li>設問を先に読んでから本文に取りかかる習慣をつける</li>
</ul>
<p><strong>大問別対策の開始</strong></p>
<ul>
  <li>近大の過去問を大問別にバラして、1日1〜2大問ずつ解いてみる</li>
  <li>時間を計って解くことで、本番のペース感覚をつかむ</li>
</ul>
<p><strong>やること</strong></p>
<ul>
  <li>午前：文法問題集の反復</li>
  <li>午後：長文読解の練習 + 大問別の過去問演習</li>
  <li>寝る前：単語・熟語の確認</li>
</ul>

<h3>9月〜10月：実戦演習期（近大形式に慣れる）</h3>
<p>夏までの基礎力を、近大の出題形式に合わせて磨いていく時期です。</p>
<p><strong>大問別の攻略</strong></p>
<ul>
  <li><strong>大問I（会話文）</strong>：会話の流れを意識し、空所の前後と次の発言に注目する</li>
  <li><strong>大問II（中文空所補充）</strong>：品詞の識別がカギ。選択肢の品詞を最初に確認する</li>
  <li><strong>大問III（文法・語法）</strong>：動詞の文型・語法・熟語の問題か、品詞・文構造の問題かを見極める</li>
  <li><strong>大問IV（同意文選択）</strong>：設問の英文を正しく解釈してから選択肢を消去法で絞る</li>
  <li><strong>大問V（語彙）</strong>：英語の定義を正確に読み取り、大体の見当をつけてから例文で確認</li>
  <li><strong>大問VI（語句整序）</strong>：熟語・構文の知識 + 文構造の把握。前からダメなら後ろから解くのも手</li>
</ul>
<p><strong>長文読解の強化</strong></p>
<ul>
  <li>500〜600語レベルの英文に毎日1本取り組む</li>
  <li>段落指定型の設問に慣れる（「第○段落によると…」形式）</li>
  <li>選択肢を吟味する際は、本文の該当箇所と具体的に照らし合わせる</li>
</ul>
<p><strong>やること</strong></p>
<ul>
  <li>過去問を大問別に解く → 弱点を特定して集中強化</li>
  <li>時間配分の練習（大問I〜VIを35分以内が目標）</li>
  <li>長文読解を毎日1本</li>
</ul>

<h3>11月〜12月：総合演習期（本番シミュレーション）</h3>
<p>ここからは本番を想定した総合演習に入ります。</p>
<p><strong>過去問の通し演習</strong></p>
<ul>
  <li>60分で全7大問を通して解く練習を週2〜3回</li>
  <li>時間配分、解く順番、マークシートの塗り方まで本番通りに</li>
  <li>解き終わったら必ず復習し、間違えた問題のパターンを分析</li>
</ul>
<p><strong>弱点の最終補強</strong></p>
<ul>
  <li>通し演習で浮かび上がった弱点を集中的に潰す</li>
  <li>特に配点の高い大問VII（長文）と大問III・VI（文法系）を優先</li>
  <li>単語・熟語は最後まで毎日確認を継続</li>
</ul>
<p><strong>目標スコア</strong></p>
<ul>
  <li>合格ラインは年度・学部により異なるが、英語は<strong>70〜75%（70〜75点）</strong>が一つの目安</li>
  <li>安定合格を目指すなら<strong>80%（80点）以上</strong>を狙いたい</li>
  <li>基礎がしっかりしていれば十分到達可能な水準</li>
</ul>
<p><strong>やること</strong></p>
<ul>
  <li>過去問の通し演習を週2〜3回</li>
  <li>弱点分野の集中補強</li>
  <li>単語・熟語の最終確認</li>
</ul>

<h3>1月：直前期（調整と確認）</h3>
<p>入試本番直前の1月は、新しいことに手を出さず、これまでの学習の総仕上げに集中します。</p>
<p><strong>最終確認</strong></p>
<ul>
  <li>過去問で間違えた問題を総復習</li>
  <li>頻出文法事項のチェックリストを作って最終確認</li>
  <li>時間配分の最終調整（本番と同じ60分で2〜3回通し演習）</li>
</ul>
<p><strong>メンタル管理</strong></p>
<ul>
  <li>睡眠時間を確保し、生活リズムを整える</li>
  <li>「やってきたことを信じる」マインドで臨む</li>
</ul>

<h2>まず自分の弱点を知ることから</h2>
<p>ここまで月別のスケジュールを紹介しましたが、最も大切なのは<strong>「今の自分はどこが弱いのか」を正確に把握すること</strong>です。</p>
<p>弱点がわからないまま闇雲に勉強しても、効率は上がりません。逆に、自分の弱点さえわかれば、やるべきことが明確になり、限られた時間を最大限に活用できます。</p>
<p>ドリレオでは、近大英語に特化した<strong>無料の弱点診断クイズ</strong>を公開しています。20問・約5分で、文法・語彙・読解のカテゴリ別にあなたの弱点を可視化します。登録不要ですぐに受けられるので、勉強計画を立てる前にぜひ試してみてください。</p>
<p><a href="https://drilleo.edore-edu.com/kindai/quiz"><strong>近大英語 スタートダッシュ診断を受ける（無料・5分）</strong></a></p>

<h2>近大英語は「基礎の徹底」で8割取れる</h2>
<p>近大英語は難問・奇問がほとんど出ません。出題パターンが安定しており、基礎的な単語・文法・読解力をバランスよく身につければ、8割以上を十分に狙える試験です。</p>
<p>大切なのは、春からコツコツ積み上げること。この記事で紹介したスケジュールを参考に、今日から一歩を踏み出しましょう。</p>
<p><a href="https://drilleo.edore-edu.com/books">書籍の詳細はこちら</a></p>
  `.trim(),
};

async function main() {
  console.log("microCMS にブログ記事を下書き投稿中...\n");
  console.log(`タイトル: ${blog.title}`);
  console.log(`スラッグ: ${blog.slug}\n`);

  // ?status=draft で下書き投稿
  const res = await fetch(`${API_URL}?status=draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY,
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`投稿失敗: ${res.status} ${text}`);
  }

  const data = await res.json();
  console.log(`下書き投稿完了! (id: ${data.id})`);
  console.log(
    `microCMS 管理画面で確認・編集してください。`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
