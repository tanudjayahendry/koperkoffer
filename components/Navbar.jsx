"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-semibold ${
      pathname === path
        ? "bg-kk-yellow text-kk-text"
        : "text-kk-text hover:bg-kk-blue"
    }`;

  return (
    <nav className="w-full bg-white border-b border-kk-text/10 mb-6 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-kk-text text-lg">
          KoperKoffer
        </Link>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-kk-text"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden sm:flex gap-4">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/faq" className={linkClass("/faq")}>FAQ</Link>
          <Link href="/cara-titip" className={linkClass("/cara-titip")}>Cara Titip</Link>
          <Link href="/partner" className={linkClass("/partner")}>Partner</Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden flex flex-col gap-2 p-4 border-t border-kk-text/10 bg-white">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/faq" className={linkClass("/faq")}>FAQ</Link>
          <Link href="/cara-titip" className={linkClass("/cara-titip")}>Cara Titip</Link>
          <Link href="/partner" className={linkClass("/partner")}>Partner</Link>
        </div>
      )}
    </nav>
  );
}
