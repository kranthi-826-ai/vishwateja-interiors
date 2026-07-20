"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoginPage) return; // don't check auth on the login page itself

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecked(true);
      }
    });
  }, [router, isLoginPage]);

  // Login page renders immediately, no auth check, no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked) return null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-graylight/30 min-h-screen p-8">{children}</main>
    </div>
  );
}