import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drilleo.edore-edu.com"),
  title: "ドリレオ — 大学別特化型 問題集 & 模試",
  description:
    "大学別に特化した問題集と模試アプリ。近畿大学の英語入試から対応開始。",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "ドリレオ",
    locale: "ja_JP",
    title: "ドリレオ — 大学別特化型 問題集 & 模試",
    description: "大学別に特化した問題集と模試アプリ。近畿大学の英語入試から対応開始。",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ドリレオ — 大学別特化型 問題集 & 模試",
    description: "大学別に特化した問題集と模試アプリ。近畿大学の英語入試から対応開始。",
    images: ["/ogp.png"],
  },
  other: {
    "theme-color": "#2563EB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
