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
    <aside className="w-64 bg-navy text-white min-h-screen flex flex-col justify-between p-6">
      <div>
        <div className="mb-10">
          <p className="font-semibold text-lg">
            VISHWATEJA <span className="text-gold">Admin</span>
          </p>
        </div>
        <nav className="space-y-1">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-gold/15 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base opacity-80">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-white/50 hover:text-gold transition-colors duration-300 text-left"
      >
        ← Logout
      </button>
    </aside>
  );
}