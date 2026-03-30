import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜ドリレオ",
  description: "ドリレオのプライバシーポリシーです。",
  alternates: { canonical: "https://drilleo.edore-edu.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      {/* ナビ */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 512 512" className="shrink-0">
              <rect width="512" height="512" rx="96" fill="#2563EB"/>
              <circle cx="256" cy="256" r="180" fill="white" opacity="0.2"/>
              <circle cx="256" cy="256" r="140" fill="#2563EB"/>
              <circle cx="256" cy="256" r="110" fill="white" opacity="0.3"/>
              <circle cx="256" cy="256" r="80" fill="#F97316"/>
              <circle cx="256" cy="256" r="36" fill="white"/>
            </svg>
            <span className="font-bold text-primary-dark text-lg">ドリレオ</span>
          </Link>
          <MobileNav />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 md:py-16 w-full">
        <h1 className="text-3xl font-bold text-text mb-10">プライバシーポリシー</h1>
        <div className="prose prose-lg max-w-none prose-headings:text-text">
          <p>ドリレオ（以下「当サービス」）は、ユーザーの個人情報の保護に努めます。本プライバシーポリシーでは、当サービスにおける個人情報の取り扱いについて説明します。</p>

          <h2>1. 収集する情報</h2>
          <p>当サービスでは、以下の情報を収集する場合があります。</p>
          <ul>
            <li>ニックネーム（ランキング表示用）</li>
            <li>模試の解答データ・スコア</li>
            <li>アクセスログ（IPアドレス、ブラウザ情報、閲覧ページ等）</li>
          </ul>

          <h2>2. 情報の利用目的</h2>
          <p>収集した情報は以下の目的で利用します。</p>
          <ul>
            <li>サービスの提供・運営・改善</li>
            <li>ランキング機能の提供</li>
            <li>利用状況の分析</li>
            <li>お問い合わせへの対応</li>
          </ul>

          <h2>3. 第三者への提供</h2>
          <p>法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。</p>

          <h2>4. アクセス解析ツール</h2>
          <p>当サービスでは、利用状況を分析するためにアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。</p>

          <h2>5. セキュリティ</h2>
          <p>当サービスは、収集した情報の漏洩・紛失・改ざんを防止するため、適切なセキュリティ対策を講じます。</p>

          <h2>6. ポリシーの変更</h2>
          <p>本ポリシーの内容は、必要に応じて変更する場合があります。変更後のポリシーは、当サービス上に掲示した時点で効力を生じます。</p>

          <h2>7. お問い合わせ</h2>
          <p>個人情報の取り扱いに関するお問い合わせは、サービス内のお問い合わせフォームよりご連絡ください。</p>

          <p className="text-text-light text-sm mt-10">2026年3月30日 制定</p>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-primary-dark text-white/60 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition">利用規約</Link>
            <Link href="/privacy" className="hover:text-white transition">プライバシーポリシー</Link>
          </div>
          <p>&copy; 2026 ドリレオ (Drilleo). All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
