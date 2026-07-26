"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setScrolled(currentScrollPos > 20);

      if (currentScrollPos > 100) {
        setVisible(prevScrollPos > currentScrollPos);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warmwhite/90 backdrop-blur-xl border-b border-graylight/80 shadow-md"
          : "bg-warmwhite/90 backdrop-blur-md border-b border-graylight/40"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        <Link href="/" className="flex items-center -my-6 transition-transform duration-300 hover:scale-105">
          <Logo height={110} />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-navy">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className="relative group py-2 tracking-wide transition-colors duration-300 hover:text-royal">
                {l.label}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-gold to-goldDark rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:9885034309"
            className="relative overflow-hidden bg-gradient-to-r from-gold via-[#E8C872] to-goldDark text-navy px-6 py-2.5 rounded-full text-sm font-bold border border-gold/60 shadow-[0_3px_15px_rgba(200,155,60,0.4)] hover:shadow-[0_5px_25px_rgba(200,155,60,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Call Now
          </a>
        </div>

        <button
          className="md:hidden text-navy text-2xl p-2 rounded-lg focus:outline-none transition-transform duration-300"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bg-warmwhite/95 backdrop-blur-2xl border-b border-graylight shadow-2xl transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 py-6 px-8" : "max-h-0 opacity-0 overflow-hidden py-0 px-8"
        }`}
      >
        <div className="flex flex-col gap-4">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium transition-colors duration-300 flex items-center justify-between py-2 border-b border-graylight/30 ${
                  isActive ? "text-gold font-semibold" : "text-navy hover:text-royal"
                }`}
              >
                {l.label}
                {isActive && <span className="w-2 h-2 rounded-full bg-gold" />}
              </Link>
            );
          })}
          <a
            href="tel:9885034309"
            className="mt-2 text-center bg-navy text-gold py-3 rounded-full text-sm font-medium border border-gold/30 shadow-md"
          >
            Call Now (9885034309)
          </a>
        </div>
      </div>
    </header>
  );
}