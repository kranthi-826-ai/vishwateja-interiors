"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/quotations", label: "Quotations" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/leads", label: "Leads" },
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
        <p className="font-semibold text-lg mb-10">VISHWATEJA <span className="text-white/50">Admin</span></p>
        <nav className="space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
                pathname === l.href ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-white/60 hover:text-white text-left"
      >
        Logout
      </button>
    </aside>
  );
}