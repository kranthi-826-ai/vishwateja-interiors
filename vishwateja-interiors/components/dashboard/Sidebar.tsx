"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-navy text-white min-h-screen flex flex-col justify-between p-6 border-r border-gold/10 relative overflow-hidden">
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

      <div className="relative z-10 pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-xs text-white/50 hover:text-gold transition-colors duration-300 text-left flex items-center gap-2 p-2 rounded-xl hover:bg-white/5"
        >
          <span>←</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}