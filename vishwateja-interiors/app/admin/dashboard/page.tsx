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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Executive Overview</h1>
        <p className="text-xs text-navy/50 mt-1 font-light">Welcome back — here is your real-time studio financial summary.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard label="This Month's Invoiced" value={stats.monthlyInvoiced} />
        <StatCard label="Pending Revenue" value={stats.pending} />
        <StatCard label="Total Leads Captured" value={stats.recentLeads} />
      </div>
    </div>
  );
}