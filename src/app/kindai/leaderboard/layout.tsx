import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "近大英語模試 ランキング｜ドリレオ",
  description:
    "ドリレオの近大英語模試ランキング。全国の近大志望者とスコアを競い合おう。",
  alternates: {
    canonical: "https://drilleo.edore-edu.com/kindai/leaderboard",
  },
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
