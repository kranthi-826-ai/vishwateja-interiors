"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

type Quote = {
  id: string;
  quote_number: string;
  customer_name: string;
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
      .select("id, quote_number, customer_name, created_at, grand_total, status")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data as Quote[]);
    setLoading(false);
  };

  const convertToInvoice = async (q: Quote) => {
    // Fetch full quote (items) to carry over
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
    await supabase.from("invoices").insert({
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
    });

    await supabase.from("quotations").update({ status: "Converted" }).eq("id", q.id);
    fetchQuotes();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-navy">Quotations</h1>
        <Button href="/admin/quotations/new">+ New Quotation</Button>
      </div>

      {loading ? (
        <p className="text-navy/50">Loading quotations...</p>
      ) : (
        <div className="bg-white border border-graylight rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-5 py-3 font-medium">Quote #</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Total</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-navy/40">
                    No quotations yet.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="border-t border-graylight">
                    <td className="px-5 py-3 text-navy/80">{q.quote_number}</td>
                    <td className="px-5 py-3 text-navy/80">{q.customer_name}</td>
                    <td className="px-5 py-3 text-navy/80">
                      {new Date(q.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-navy/80">
                      ₹{q.grand_total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          q.status === "Converted"
                            ? "bg-green-100 text-green-700"
                            : "bg-graylight text-navy/70"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {q.status === "Open" && (
                        <button
                          onClick={() => convertToInvoice(q)}
                          className="text-royal text-sm font-medium hover:underline"
                        >
                          Convert to Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}