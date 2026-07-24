"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/layout/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/get-quote", label: "Get Quote" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-warmwhite/90 backdrop-blur border-b border-graylight overflow-visible">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        {/* Logo is taller than the navbar; negative vertical margin lets it overflow
            top/bottom without stretching the header's own height */}
        <Link href="/" className="flex items-center -my-6">
          <Logo height={110} />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-navy">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="relative group py-1">
              {l.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-gold transition-all duration-300 ${pathname === l.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>
          ))}
        </nav>

        <a
          href="tel:9885034309"
          className="hidden md:inline-block bg-navy text-gold px-5 py-2 rounded-full text-sm font-medium hover:bg-goldDark hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Call Now
        </a>

        <button
          className="md:hidden text-navy text-2xl transition-transform duration-300"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      <nav
        className={`md:hidden flex flex-col gap-4 px-6 text-navy overflow-hidden transition-all duration-300 bg-warmwhite ${open ? "max-h-96 pb-6 pt-2" : "max-h-0"
          }`}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}