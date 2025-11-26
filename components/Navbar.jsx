"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const linkBase =
    "text-sm font-medium tracking-wide px-3 py-2 rounded-md transition";

  const desktopLinkClass = (path) =>
    `${linkBase} ${
      isActive(path)
        ? "text-kk-cream bg-kk-border"
        : "text-kk-muted hover:text-kk-cream hover:bg-kk-border/60"
    }`;

  const mobileLinkClass = (path) =>
    `${linkBase} ${
      isActive(path)
        ? "text-kk-cream bg-kk-border"
        : "text-kk-muted hover:text-kk-cream hover:bg-kk-border/60"
    }`;

  return (
    <nav className="w-full border-b border-kk-border/70 bg-kk-navy/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-kk-muted">
            KOPER
          </span>
          <span className="w-[1px] h-4 bg-kk-border" />
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-kk-muted">
            KOFFER
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/" className={desktopLinkClass("/")}>
            Home
          </Link>
          <Link href="/faq" className={desktopLinkClass("/faq")}>
            FAQ
          </Link>
          <Link href="/cara-titip" className={desktopLinkClass("/cara-titip")}>
            Cara Titip
          </Link>
          <Link href="/partner" className={desktopLinkClass("/partner")}>
            Partner
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-kk-muted"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-kk-border/70 bg-kk-navy px-4 pb-3 flex flex-col gap-1">
          <Link href="/" className={mobileLinkClass("/")}>
            Home
          </Link>
          <Link href="/faq" className={mobileLinkClass("/faq")}>
            FAQ
          </Link>
          <Link href="/cara-titip" className={mobileLinkClass("/cara-titip")}>
            Cara Titip
          </Link>
          <Link href="/partner" className={mobileLinkClass("/partner")}>
            Partner
          </Link>
        </div>
      )}
    </nav>
  );
}
