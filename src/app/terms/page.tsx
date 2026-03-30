import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "利用規約｜ドリレオ",
  description: "ドリレオの利用規約です。",
  alternates: { canonical: "https://drilleo.edore-edu.com/terms" },
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-text mb-10">利用規約</h1>
        <div className="prose prose-lg max-w-none prose-headings:text-text">
          <p>この利用規約（以下「本規約」）は、ドリレオ（以下「当サービス」）の利用に関する条件を定めるものです。ご利用前に必ずお読みください。</p>

          <h2>第1条（適用）</h2>
          <p>本規約は、当サービスのすべてのユーザーに適用されます。ユーザーは、本規約に同意したうえで当サービスを利用するものとします。</p>

          <h2>第2条（サービス内容）</h2>
          <p>当サービスは、大学入試に特化した問題集（書籍）およびWeb模試を提供するサービスです。コンテンツの内容・形式は予告なく変更する場合があります。</p>

          <h2>第3条（禁止事項）</h2>
          <p>ユーザーは以下の行為を行ってはならないものとします。</p>
          <ul>
            <li>当サービスのコンテンツの無断転載・複製・再配布</li>
            <li>不正アクセスやサーバーへの過度な負荷をかける行為</li>
            <li>他のユーザーへの迷惑行為</li>
            <li>法令に違反する行為</li>
            <li>その他、運営が不適切と判断する行為</li>
          </ul>

          <h2>第4条（免責事項）</h2>
          <p>当サービスが提供する情報の正確性・完全性について、保証するものではありません。当サービスの利用により生じたいかなる損害についても、運営は責任を負いません。</p>

          <h2>第5条（知的財産権）</h2>
          <p>当サービスに掲載されているコンテンツ（問題文・解説・イラスト等）の知的財産権は、運営または正当な権利者に帰属します。</p>

          <h2>第6条（規約の変更）</h2>
          <p>運営は、必要に応じて本規約を変更できるものとします。変更後の利用規約は、当サービス上に掲示した時点で効力を生じます。</p>

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
