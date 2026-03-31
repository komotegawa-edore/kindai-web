"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/kindai", label: "近大英語（長文）" },
  { href: "/kindai-bunpou", label: "近大英語（文法）" },
  { href: "/books", label: "書籍一覧" },
  { href: "/blog", label: "ブログ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* PC: テキストリンク */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-text-light hover:text-primary transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* SP: ハンバーガー */}
      <button
        className="md:hidden p-2 -mr-2 text-text"
        onClick={() => setOpen(!open)}
        aria-label="メニューを開く"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* SP: ドロワー */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text font-medium py-2 hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
