import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "近大英語模試を受ける｜ドリレオ",
  description:
    "近畿大学の英語入試形式の長文読解模試を無料で体験。制限時間30分、即時採点。",
  robots: { index: false },
};

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
