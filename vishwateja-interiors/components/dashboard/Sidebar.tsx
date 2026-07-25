"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "◧" },
  { href: "/admin/invoices", label: "Invoices", icon: "🧾" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/quotations", label: "Quotations", icon: "📄" },
  { href: "/admin/pricing", label: "Pricing", icon: "💰" },
  { href: "/admin/leads", label: "Leads", icon: "📥" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden sticky top-0 z-40 bg-navy text-white px-4 py-3 flex items-center justify-between border-b border-gold/20 shadow-md">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-gold text-lg">✨</span>
          <div>
            <p className="text-sm font-bold tracking-wide">
              VISHWATEJA <span className="text-gold font-normal">Admin</span>
            </p>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 focus:outline-none transition-colors"
          aria-label="Toggle admin navigation"
        >
          {mobileOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* Mobile Nav Drawer Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Nav Drawer */}
      <div
        className={`md:hidden fixed top-12 left-0 right-0 z-40 bg-navy text-white p-5 border-b border-gold/20 shadow-2xl transition-all duration-300 ${
          mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="grid grid-cols-2 gap-2 mb-4">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-sm">{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
          <a href="/" target="_blank" className="text-xs text-gold/80 hover:underline">
            View Live Site →
          </a>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 font-medium px-3 py-1 rounded-lg bg-white/5"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy text-white min-h-screen flex-col justify-between p-6 border-r border-gold/10 relative overflow-hidden shrink-0">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-royal/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-10 pt-2 border-b border-white/10 pb-6">
            <Link href="/admin/dashboard" className="block">
              <p className="text-lg font-bold tracking-wide">
                VISHWATEJA <span className="text-gold font-normal">Admin</span>
              </p>
              <p className="text-[10px] text-white/40 tracking-widest uppercase mt-0.5">Management Portal</p>
            </Link>
          </div>

          <nav className="space-y-1.5">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/30 shadow-sm"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-sm opacity-90">{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="w-full text-xs text-white/50 hover:text-gold transition-colors duration-300 text-left flex items-center gap-2 p-2 rounded-xl hover:bg-white/5"
          >
            <span>←</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}