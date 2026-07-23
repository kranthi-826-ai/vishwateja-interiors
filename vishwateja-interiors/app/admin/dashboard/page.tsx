"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const [stats, setStats] = useState({ monthlyInvoiced: "₹0", pending: "₹0", recentLeads: "0" });

  useEffect(() => {
    const load = async () => {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: invoices } = await supabase.from("invoices").select("grand_total, status, created_at");

      const monthly = (invoices || [])
        .filter((i) => new Date(i.created_at) >= startOfMonth)
        .reduce((sum, i) => sum + Number(i.grand_total), 0);

      const pending = (invoices || [])
        .filter((i) => i.status === "Pending")
        .reduce((sum, i) => sum + Number(i.grand_total), 0);

      const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true });

      setStats({
        monthlyInvoiced: `₹${monthly.toLocaleString("en-IN")}`,
        pending: `₹${pending.toLocaleString("en-IN")}`,
        recentLeads: String(leadsCount || 0),
      });
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-sm text-navy/50 mt-1">Welcome back — here's what's happening today.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard label="This Month's Invoiced" value={stats.monthlyInvoiced} />
        <StatCard label="Pending Payments" value={stats.pending} />
        <StatCard label="Total Leads" value={stats.recentLeads} />
      </div>
    </div>
  );
}