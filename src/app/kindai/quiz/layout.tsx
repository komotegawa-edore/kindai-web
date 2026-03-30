import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "近大英語 スタートダッシュ診断｜ドリレオ",
  description:
    "近畿大学の英語入試に向けた弱点診断。文法・語彙・語法を20問でチェック。無料・登録不要・約5分。",
  openGraph: {
    title: "近大英語 スタートダッシュ診断｜ドリレオ",
    description:
      "近畿大学の英語入試に向けた弱点診断。文法・語彙・語法を20問でチェック。無料・登録不要・約5分。",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "近大英語 スタートダッシュ診断｜ドリレオ",
    description:
      "近畿大学の英語入試に向けた弱点診断。文法・語彙・語法を20問でチェック。無料・登録不要・約5分。",
    images: ["/ogp.png"],
  },
  robots: { index: true },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
