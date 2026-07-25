"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Invoice = { id: string; invoice_number: string; date: string; grand_total: number; status: string };

export default function PortalDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.push("/portal/login"); return; }
      setChecked(true);
      const email = data.session.user.email;
      const { data: rows } = await supabase
        .from("invoices")
        .select("id, invoice_number, date, grand_total, status")
        .eq("customer_email", email)
        .order("created_at", { ascending: false });
      if (rows) setInvoices(rows as Invoice[]);
      setLoading(false);
    });
  }, [router]);

  if (!checked) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 bg-warmwhite min-h-[80vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">My Project Portal</h1>
      <p className="text-xs sm:text-sm text-navy/60 mb-8">Track your interior project invoices and status here.</p>

      <div className="bg-white border-l-4 border-gold rounded-r-3xl p-6 mb-10 shadow-sm border border-graylight/80">
        <p className="text-xs text-navy/50 uppercase tracking-widest font-semibold mb-1">Current Project Status</p>
        <p className="text-lg font-bold text-navy">In Progress — Machine Production & Assembly</p>
      </div>

      <h2 className="text-lg font-bold text-navy mb-4">My Invoices</h2>
      {loading ? (
        <p className="text-xs text-navy/40">Loading invoice records...</p>
      ) : (
        <div className="bg-white border border-graylight/80 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Invoice #</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Date</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Total Amount</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Status</th>
                  <th className="text-right px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graylight/40">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-navy/30">
                      No invoices available for your account yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map((i) => (
                    <tr key={i.id} className="hover:bg-gold/5 transition-colors">
                      <td className="px-5 py-3.5 text-navy font-semibold">{i.invoice_number}</td>
                      <td className="px-5 py-3.5 text-navy/60">{new Date(i.date).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-3.5 text-navy font-semibold">₹{i.grand_total.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          i.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}>
                          {i.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/invoice?id=${i.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-royal transition-all shadow-sm"
                        >
                          <span>📥</span>
                          <span>Download PDF</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}