/**
 * 仮定法ブログ記事を microCMS に下書き投稿するスクリプト
 * 使い方: node scripts/post-blog-subjunctive.mjs
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
const SITE = "https://drilleo.edore-edu.com";

const blog = {
  title: "仮定法とは？イラストでわかる英語の「もしも」の世界【初心者向け】",
  slug: "subjunctive-mood-beginner",
  description:
    "仮定法がわからない人向けに、直説法との違いから仮定法過去・仮定法過去完了・I wish・as if まで、例文たっぷりでゼロから解説します。",
  content: `
<h2>はじめに：仮定法って何がムズかしいの？</h2>
<p>英文法の中でも「仮定法」は<strong>つまずく人が多いテーマNo.1</strong>です。</p>
<p>つまずく理由はシンプルで、<strong>日本語にない感覚</strong>だからです。</p>
<p>日本語では「もし明日雨が降ったら」も「もし自分が鳥だったら」も、同じ「もし〜たら」で言えてしまいます。でも英語では、この2つを<strong>文法的に区別</strong>します。</p>
<ul>
  <li><strong>現実にありえること</strong> → 直説法（ふつうの if 文）</li>
  <li><strong>現実とちがうこと・想像の話</strong> → 仮定法</li>
</ul>
<p>この記事では「仮定法って何？」というところから、入試に出るパターンまで<strong>ゼロから</strong>解説します。</p>

<figure>
  <img src="${SITE}/images/blog/subjunctive-indicative-comparison.png" alt="直説法 vs 仮定法の分岐図" width="1200" />
</figure>

<h2>1. まず「直説法」を確認しよう</h2>
<p>仮定法を理解するには、まず<strong>ふつうの if 文（直説法）</strong>を押さえておく必要があります。</p>
<blockquote>
  <p><strong>If it rains tomorrow, I will stay home.</strong><br>（明日雨が降ったら、家にいるよ。）</p>
</blockquote>
<p>これは「明日雨が降るかもしれない」という<strong>現実にありえる話</strong>ですよね。</p>
<p>ポイントは時制です。</p>
<table>
  <thead><tr><th>部分</th><th>時制</th></tr></thead>
  <tbody>
    <tr><td>if 節</td><td><strong>現在形</strong>（rains）</td></tr>
    <tr><td>主節</td><td><strong>will + 動詞の原形</strong>（will stay）</td></tr>
  </tbody>
</table>
<p>「明日の話なのに現在形？」と思うかもしれませんが、英語では <strong>if 節の中では未来のことも現在形で書く</strong> というルールがあります。これは仮定法とは関係なく、ふつうの文法ルールです。</p>

<h2>2. 仮定法過去 ―「今〜だったらなぁ」</h2>
<p>ここからが本題です。</p>
<blockquote>
  <p><strong>If I were a bird, I would fly to you.</strong><br>（もし私が鳥だったら、あなたのところへ飛んでいくのに。）</p>
</blockquote>
<p>これは「実際には鳥じゃない」ですよね。<strong>現実とちがうことを想像している</strong>わけです。</p>
<p>この「現実とちがう想像」を表すとき、英語では <strong>時制を1つ過去にズラす</strong> というルールがあります。これが仮定法です。</p>

<h3>仮定法過去の形</h3>
<table>
  <thead><tr><th>部分</th><th>形</th></tr></thead>
  <tbody>
    <tr><td>if 節</td><td><strong>過去形</strong>（were / had / knew など）</td></tr>
    <tr><td>主節</td><td><strong>would + 動詞の原形</strong></td></tr>
  </tbody>
</table>
<p><strong>「過去形を使っているけど、意味は現在の話」</strong> というのが最大のポイントです。</p>
<p>名前が「仮定法<strong>過去</strong>」なのでややこしいですが、過去の話をしているわけではありません。<strong>過去形を使って「現実とのズレ」を表現している</strong>のです。</p>

<h3>were の特別ルール</h3>
<p>仮定法では、主語が I / he / she / it でも <strong>were</strong> を使います。</p>
<blockquote>
  <p><strong>If I were</strong> you, I would apologize.<br>（もし私があなたなら、謝るだろう。）</p>
</blockquote>
<blockquote>
  <p><strong>If he were</strong> here, he would help us.<br>（もし彼がここにいたら、手伝ってくれるのに。）</p>
</blockquote>
<p>口語では was を使う人もいますが、入試では <strong>were が正解</strong> になります。</p>

<h3>例文で感覚をつかもう</h3>
<table>
  <thead><tr><th>英文</th><th>和訳</th><th>現実</th></tr></thead>
  <tbody>
    <tr><td>If I had a car, I would drive to school.</td><td>車があったら学校まで運転するのに。</td><td>車を持っていない</td></tr>
    <tr><td>If I knew her number, I would call her.</td><td>彼女の番号を知っていたら電話するのに。</td><td>番号を知らない</td></tr>
    <tr><td>If I were rich, I would travel the world.</td><td>お金持ちだったら世界を旅するのに。</td><td>お金持ちではない</td></tr>
  </tbody>
</table>
<p>すべて「<strong>今の現実と違うこと</strong>」を言っているのがわかりますね。</p>

<h2>3. 仮定法過去完了 ―「あのとき〜だったらなぁ」</h2>
<p>仮定法過去が「今の話」だったのに対し、<strong>過去のことを振り返って「あのときこうだったら…」と言いたいとき</strong>は、さらに時制を1つ過去にズラします。</p>
<blockquote>
  <p><strong>If I had studied harder, I would have passed the exam.</strong><br>（もっと勉強していたら、試験に受かっていたのに。）</p>
</blockquote>
<p>これは「実際には勉強しなかったから落ちた」という<strong>過去の後悔</strong>ですね。</p>

<h3>仮定法過去完了の形</h3>
<table>
  <thead><tr><th>部分</th><th>形</th></tr></thead>
  <tbody>
    <tr><td>if 節</td><td><strong>had + 過去分詞</strong>（had studied）</td></tr>
    <tr><td>主節</td><td><strong>would have + 過去分詞</strong>（would have passed）</td></tr>
  </tbody>
</table>

<h3>例文で感覚をつかもう</h3>
<table>
  <thead><tr><th>英文</th><th>和訳</th><th>現実（過去）</th></tr></thead>
  <tbody>
    <tr><td>If I had left earlier, I would have caught the train.</td><td>もっと早く出ていたら電車に間に合ったのに。</td><td>早く出なかった</td></tr>
    <tr><td>If it had not rained, we would have played baseball.</td><td>雨が降らなかったら野球をしていたのに。</td><td>雨が降った</td></tr>
    <tr><td>If she had known the truth, she would have been angry.</td><td>真実を知っていたら彼女は怒っていただろう。</td><td>真実を知らなかった</td></tr>
  </tbody>
</table>

<h2>4. 2つの仮定法を並べて整理</h2>
<p>ここまでの内容を表にまとめます。</p>
<table>
  <thead><tr><th></th><th>仮定法過去</th><th>仮定法過去完了</th></tr></thead>
  <tbody>
    <tr><td><strong>意味</strong></td><td>今の現実と違う想像</td><td>過去の現実と違う想像</td></tr>
    <tr><td><strong>if 節</strong></td><td>過去形</td><td>had + 過去分詞</td></tr>
    <tr><td><strong>主節</strong></td><td>would + 動詞の原形</td><td>would have + 過去分詞</td></tr>
    <tr><td><strong>例</strong></td><td>If I were a bird, ...</td><td>If I had studied harder, ...</td></tr>
  </tbody>
</table>
<p><strong>覚え方：現実から時制を1つズラす</strong></p>
<ul>
  <li>今の話 → 現在形を過去形にズラす → 仮定法過去</li>
  <li>過去の話 → 過去形をさらに過去（大過去）にズラす → 仮定法過去完了</li>
</ul>

<figure>
  <img src="${SITE}/images/blog/subjunctive-tense-shift.png" alt="時制ズラしのイメージ図" width="1200" />
</figure>

<h2>5. I wish 〜 ―「〜だったらいいのに」</h2>
<p>仮定法は if 文だけではありません。<strong>I wish</strong> のあとにも仮定法が使われます。</p>

<h3>今のことへの願望（仮定法過去）</h3>
<blockquote>
  <p><strong>I wish I were taller.</strong><br>（もっと背が高かったらいいのに。）</p>
</blockquote>
<blockquote>
  <p><strong>I wish I had more time.</strong><br>（もっと時間があればいいのに。）</p>
</blockquote>
<p>I wish のあとに<strong>過去形</strong>が来ていますが、意味は<strong>今の話</strong>です。</p>

<h3>過去のことへの後悔（仮定法過去完了）</h3>
<blockquote>
  <p><strong>I wish I had studied harder.</strong><br>（もっと勉強しておけばよかった。）</p>
</blockquote>
<blockquote>
  <p><strong>I wish I had not said that.</strong><br>（あんなこと言わなければよかった。）</p>
</blockquote>
<p>I wish のあとに <strong>had + 過去分詞</strong> が来ると、<strong>過去への後悔</strong>の意味になります。</p>

<h2>6. as if / as though 〜 ―「まるで〜のように」</h2>
<blockquote>
  <p><strong>He talks as if he knew everything.</strong><br>（彼はまるで何でも知っているかのように話す。）</p>
</blockquote>
<p>実際には何でも知っているわけではないので、仮定法過去（knew）が使われています。</p>
<blockquote>
  <p><strong>She looked as if she had seen a ghost.</strong><br>（彼女はまるで幽霊を見たかのような顔をしていた。）</p>
</blockquote>
<p>「幽霊を見た」のは主節（looked）より前の時点なので、仮定法過去完了（had seen）です。</p>

<h2>7. without 〜 / but for 〜 ―「〜がなかったら」</h2>
<p>if 節を使わずに仮定法を表す表現もあります。</p>
<blockquote>
  <p><strong>Without water, we could not survive.</strong><br>= If it were not for water, we could not survive.<br>（水がなかったら、生きていけない。）</p>
</blockquote>
<blockquote>
  <p><strong>But for your help, I would have failed.</strong><br>= If it had not been for your help, I would have failed.<br>（あなたの助けがなかったら、失敗していた。）</p>
</blockquote>
<table>
  <thead><tr><th>表現</th><th>書き換え</th></tr></thead>
  <tbody>
    <tr><td>without 〜</td><td>if it were not for 〜（現在）</td></tr>
    <tr><td>but for 〜</td><td>if it had not been for 〜（過去）</td></tr>
  </tbody>
</table>

<h2>8. 入試でよく出る！仮定法の見分け方</h2>
<p>入試問題で仮定法が出てきたとき、最初にやるべきことは <strong>「現実の話か、想像の話か」を判断する</strong> ことです。</p>

<h3>チェックポイント</h3>
<ol>
  <li><strong>if 節の動詞が過去形</strong> → 仮定法過去の可能性あり</li>
  <li><strong>主節に would / could / might</strong> がある → 仮定法のサイン</li>
  <li><strong>I wish / as if / without</strong> が文中にある → 仮定法</li>
  <li><strong>if 節が had + 過去分詞</strong> → 仮定法過去完了</li>
</ol>

<figure>
  <img src="${SITE}/images/blog/subjunctive-flowchart.png" alt="仮定法の見分けフローチャート" width="1000" />
</figure>

<h3>練習問題</h3>
<p>次の空所に入る語を選んでみましょう。</p>
<p><strong>Q1.</strong> If I _____ enough money, I would buy a new laptop.<br>（A）have （B）had （C）will have （D）have had</p>
<p><strong>Q2.</strong> I wish I _____ at the party last night.<br>（A）am （B）were （C）had been （D）would be</p>
<p><strong>Q3.</strong> He speaks as if he _____ a native speaker.<br>（A）is （B）were （C）has been （D）will be</p>

<h3>解答と解説</h3>
<p><strong>Q1. 正解：（B）had</strong></p>
<p>主節に would があるので仮定法過去。if 節は過去形の had が正解。「お金があったら新しいノートパソコンを買うのに（実際にはお金がない）」</p>
<p><strong>Q2. 正解：（C）had been</strong></p>
<p>last night（昨夜）なので過去の話。I wish + 仮定法過去完了で had been が正解。「昨夜パーティーにいればよかった」</p>
<p><strong>Q3. 正解：（B）were</strong></p>
<p>as if のあとは仮定法。実際にはネイティブではないので仮定法過去。were が正解。「まるでネイティブスピーカーのように話す」</p>

<h2>まとめ</h2>
<table>
  <thead><tr><th>ポイント</th><th>内容</th></tr></thead>
  <tbody>
    <tr><td>仮定法の本質</td><td>現実と違うことを「時制のズレ」で表す</td></tr>
    <tr><td>仮定法過去</td><td>今の想像 → if + 過去形, would + 原形</td></tr>
    <tr><td>仮定法過去完了</td><td>過去の想像 → if + had + p.p., would have + p.p.</td></tr>
    <tr><td>I wish</td><td>願望・後悔 → 仮定法過去 or 仮定法過去完了</td></tr>
    <tr><td>as if</td><td>「まるで〜のように」 → 仮定法</td></tr>
    <tr><td>見分けのコツ</td><td>would / could / might が主節にあれば仮定法を疑う</td></tr>
  </tbody>
</table>
<p>仮定法は「時制をズラす」というたった1つのルールがわかれば、実はシンプルです。まずはこの記事の例文を何度も音読して、感覚をつかんでいきましょう。</p>

<hr>

<p>近大英語の文法問題を実際に解いてみたい方は、<a href="${SITE}/kindai-bunpou"><strong>文法・語法ドリル</strong></a>で練習できます。仮定法を含む近大頻出の文法事項を、本番と同じ4択形式で演習できます。</p>
<p><a href="${SITE}/kindai/quiz"><strong>近大英語 スタートダッシュ診断を受ける（無料・5分）</strong></a></p>
  `.trim(),
};

async function main() {
  console.log("microCMS にブログ記事を下書き投稿中...\n");
  console.log(`タイトル: ${blog.title}`);
  console.log(`スラッグ: ${blog.slug}\n`);

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
  console.log(`microCMS 管理画面で確認・編集してください。`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
