"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Invoice = {
  id: string;
  invoice_number: string;
  customer_name: string;
  mobile?: string;
  date: string;
  grand_total: number;
  status: string;
};

const statuses = ["Paid", "Pending", "Partial"];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from("invoices")
      .select("id, invoice_number, customer_name, mobile, date, grand_total, status")
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
      i.customer_name?.toLowerCase().includes(query.toLowerCase()) ||
      i.invoice_number?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">Invoices</h1>
          <p className="text-xs text-navy/50 mt-1">{invoices.length} total records issued</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            placeholder="Search by name or invoice #"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-graylight/80 rounded-2xl px-4 py-2.5 text-xs text-navy bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 shadow-sm w-full sm:w-64"
          />
          <Link
            href="/invoice"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-[#E8C872] to-goldDark text-navy font-bold px-5 py-2.5 rounded-2xl text-xs shadow-md hover:scale-105 transition-transform"
          >
            <span>+</span>
            <span>Create Invoice</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-navy/40">Loading invoice records...</p>
      ) : (
        <div className="bg-white border border-graylight/80 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Invoice #</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Customer</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Date</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Amount</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Status</th>
                  <th className="text-right px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graylight/40">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-14 text-navy/30">
                      No matching invoice records found
                    </td>
                  </tr>
                ) : (
                  filtered.map((i) => (
                    <tr key={i.id} className="hover:bg-gold/5 transition-colors duration-200">
                      <td className="px-5 py-3.5 text-navy font-semibold">{i.invoice_number}</td>
                      <td className="px-5 py-3.5 text-navy/80 font-medium">{i.customer_name}</td>
                      <td className="px-5 py-3.5 text-navy/60">{new Date(i.date).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-3.5 text-navy font-semibold">₹{i.grand_total.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3.5">
                        <select
                          value={i.status}
                          onChange={(e) => updateStatus(i.id, e.target.value)}
                          className={`text-xs px-3 py-1 rounded-full border-none focus:outline-none font-semibold cursor-pointer shadow-sm ${
                            i.status === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : i.status === "Partial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-graylight/70 text-navy/70"
                          }`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/invoice?id=${i.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy text-white text-xs font-medium hover:bg-royal transition-all shadow-sm"
                            title="View and Download PDF Invoice"
                          >
                            <span>📥</span>
                            <span>Download / Print</span>
                          </Link>
                          {i.mobile && (
                            <a
                              href={`https://wa.me/91${i.mobile}?text=Hi ${i.customer_name}, here is your Vishwateja Interiors invoice ${i.invoice_number} for ₹${i.grand_total.toLocaleString("en-IN")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all"
                              title="Share via WhatsApp"
                            >
                              💬
                            </a>
                          )}
                        </div>
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