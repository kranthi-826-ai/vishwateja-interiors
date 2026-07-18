"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/dashboard/DataTable";

type Invoice = {
  invoice_number: string;
  date: string;
  grand_total: number;
  status: string;
};

export default function PortalDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.push("/portal/login");
        return;
      }
      setChecked(true);

      const email = data.session.user.email;
      const { data: rows } = await supabase
        .from("invoices")
        .select("invoice_number, date, grand_total, status")
        .eq("customer_email", email)
        .order("created_at", { ascending: false });

      if (rows) setInvoices(rows as Invoice[]);
      setLoading(false);
    });
  }, [router]);

  if (!checked) return null;

  const rows = invoices.map((i) => ({
    invoice: i.invoice_number,
    date: new Date(i.date).toLocaleDateString("en-IN"),
    total: `₹${i.grand_total.toLocaleString("en-IN")}`,
    status: i.status,
  }));

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-navy mb-2">My Project</h1>
      <p className="text-sm text-navy/60 mb-8">
        Track your invoices and project status here.
      </p>

      <h2 className="text-lg font-medium text-navy mb-4">My Invoices</h2>
      {loading ? (
        <p className="text-navy/50">Loading...</p>
      ) : (
        <DataTable
          columns={[
            { key: "invoice", label: "Invoice #" },
            { key: "date", label: "Date" },
            { key: "total", label: "Total" },
            { key: "status", label: "Status" },
          ]}
          rows={rows}
        />
      )}
    </section>
  );
}