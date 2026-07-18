"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/dashboard/DataTable";

// TEMPORARY placeholder rows — replace with Supabase query filtered by logged-in customer's email/mobile
const myInvoices = [
  { invoice: "VTI-2026-001", date: "13-05-2026", total: "₹68,550", status: "Paid" },
];

export default function PortalDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/portal/login");
      } else {
        setChecked(true);
      }
    });
  }, [router]);

  if (!checked) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-navy mb-2">My Project</h1>
      <p className="text-sm text-navy/60 mb-8">
        Track your invoices and project status here.
      </p>

      <div className="bg-white border border-graylight rounded-2xl p-6 mb-10">
        <p className="text-sm text-navy/60 mb-1">Current Status</p>
        <p className="text-xl font-semibold text-navy">In Progress — Site Measurement Complete</p>
      </div>

      <h2 className="text-lg font-medium text-navy mb-4">My Invoices</h2>
      <DataTable
        columns={[
          { key: "invoice", label: "Invoice #" },
          { key: "date", label: "Date" },
          { key: "total", label: "Total" },
          { key: "status", label: "Status" },
        ]}
        rows={myInvoices}
      />
    </section>
  );
}