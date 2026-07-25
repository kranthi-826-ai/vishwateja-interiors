"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Quote = {
  id: string;
  quote_number: string;
  customer_name: string;
  mobile?: string;
  created_at: string;
  grand_total: number;
  status: string;
};

export default function QuotationsPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const { data } = await supabase
      .from("quotations")
      .select("id, quote_number, customer_name, mobile, created_at, grand_total, status")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data as Quote[]);
    setLoading(false);
  };

  const convertToInvoice = async (q: Quote) => {
    const { data: fullQuote } = await supabase
      .from("quotations")
      .select("*")
      .eq("id", q.id)
      .single();
    if (!fullQuote) return;

    const { data: lastInvoice } = await supabase
      .from("invoices")
      .select("invoice_number")
      .order("created_at", { ascending: false })
      .limit(1);
    const lastNum = lastInvoice?.[0]
      ? parseInt(lastInvoice[0].invoice_number.split("-").pop() || "0")
      : 0;
    const newInvoiceNumber = `VTI-2026-${String(lastNum + 1).padStart(3, "0")}`;

    const subtotal = fullQuote.grand_total / 1.18;
    const { data: newInv } = await supabase.from("invoices").insert({
      invoice_number: newInvoiceNumber,
      customer_id: fullQuote.customer_id,
      customer_name: fullQuote.customer_name,
      mobile: fullQuote.mobile,
      date: new Date().toISOString().slice(0, 10),
      items: fullQuote.items,
      subtotal: Math.round(subtotal),
      gst: Math.round(fullQuote.grand_total - subtotal),
      grand_total: fullQuote.grand_total,
      status: "Pending",
    }).select("id").single();

    await supabase.from("quotations").update({ status: "Converted" }).eq("id", q.id);
    fetchQuotes();

    if (newInv?.id) {
      window.location.href = `/invoice?id=${newInv.id}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">Quotations</h1>
          <p className="text-xs text-navy/50 mt-1">{quotes.length} total estimates issued</p>
        </div>
        <Link
          href="/admin/quotations/new"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-[#E8C872] to-goldDark text-navy font-bold px-5 py-2.5 rounded-2xl text-xs shadow-md hover:scale-105 transition-transform w-full sm:w-auto"
        >
          <span>+</span>
          <span>New Quotation</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-xs text-navy/50">Loading quotations...</p>
      ) : (
        <div className="bg-white border border-graylight/80 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Quote #</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Customer</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Date</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Total</th>
                  <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Status</th>
                  <th className="text-right px-5 py-3.5 font-medium uppercase tracking-wider text-[11px] text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graylight/40">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-14 text-navy/30">
                      No quotations created yet
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-gold/5 transition-colors duration-200">
                      <td className="px-5 py-3.5 text-navy font-semibold">{q.quote_number}</td>
                      <td className="px-5 py-3.5 text-navy/80 font-medium">{q.customer_name}</td>
                      <td className="px-5 py-3.5 text-navy/60">
                        {new Date(q.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-5 py-3.5 text-navy font-semibold">
                        ₹{q.grand_total.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            q.status === "Converted"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/quotations/new?id=${q.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-navy text-white text-xs font-medium hover:bg-royal transition-all shadow-sm"
                            title="View and Download PDF Quotation"
                          >
                            <span>📥</span>
                            <span>Download / Print</span>
                          </Link>
                          {q.status === "Open" && (
                            <button
                              onClick={() => convertToInvoice(q)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-royal text-white text-xs font-semibold rounded-xl hover:bg-navy transition-all shadow-sm"
                              title="Convert Quotation to Invoice"
                            >
                              <span>🧾</span>
                              <span>Convert to Invoice</span>
                            </button>
                          )}
                          {q.mobile && (
                            <a
                              href={`https://wa.me/91${q.mobile}?text=Hi ${q.customer_name}, here is your Vishwateja Interiors quotation ${q.quote_number} for total ₹${q.grand_total.toLocaleString("en-IN")}`}
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