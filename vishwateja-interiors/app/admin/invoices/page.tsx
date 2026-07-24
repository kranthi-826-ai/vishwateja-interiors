"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Invoice = {
  id: string;
  invoice_number: string;
  customer_name: string;
  date: string;
  grand_total: number;
  status: string;
};

const statuses = ["Paid", "Pending", "Partial"];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchInvoices(); }, []);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("id, invoice_number, customer_name, date, grand_total, status")
      .order("created_at", { ascending: false });
    if (data) setInvoices(data as Invoice[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("invoices").update({ status }).eq("id", id);
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const filtered = invoices.filter(
    (i) =>
      i.customer_name.toLowerCase().includes(query.toLowerCase()) ||
      i.invoice_number.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Invoices</h1>
          <p className="text-xs text-navy/50 mt-1">{invoices.length} total records issued</p>
        </div>
        <input
          placeholder="Search by name or invoice #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-graylight/80 rounded-2xl px-5 py-2.5 text-xs text-navy bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 w-full sm:w-72 shadow-sm"
        />
      </div>

      {loading ? (
        <p className="text-xs text-navy/40">Loading invoice records...</p>
      ) : (
        <div className="bg-white border border-graylight/80 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs text-white/70">Invoice #</th>
                  <th className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs text-white/70">Customer</th>
                  <th className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs text-white/70">Date</th>
                  <th className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs text-white/70">Total Amount</th>
                  <th className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs text-white/70">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graylight/40">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-14 text-navy/30">No matching invoice records found</td></tr>
                ) : (
                  filtered.map((i) => (
                    <tr key={i.id} className="hover:bg-gold/5 transition-colors duration-200">
                      <td className="px-6 py-4 text-navy font-semibold">{i.invoice_number}</td>
                      <td className="px-6 py-4 text-navy/80">{i.customer_name}</td>
                      <td className="px-6 py-4 text-navy/60">{new Date(i.date).toLocaleDateString("en-IN")}</td>
                      <td className="px-6 py-4 text-navy font-medium">₹{i.grand_total.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4">
                        <select
                          value={i.status}
                          onChange={(e) => updateStatus(i.id, e.target.value)}
                          className={`text-xs px-3.5 py-1.5 rounded-full border-none focus:outline-none font-semibold cursor-pointer shadow-sm ${
                            i.status === "Paid" ? "bg-emerald-100 text-emerald-800"
                            : i.status === "Partial" ? "bg-amber-100 text-amber-800"
                            : "bg-graylight/70 text-navy/70"
                          }`}
                        >
                          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}