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

  useEffect(() => {
    fetchInvoices();
  }, []);

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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-navy">Invoices</h1>
        <input
          placeholder="Search by name or invoice #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-graylight rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-royal w-64"
        />
      </div>

      {loading ? (
        <p className="text-navy/50">Loading invoices...</p>
      ) : (
        <div className="bg-white border border-graylight rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-5 py-3 font-medium">Invoice #</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Total</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-navy/40">
                    No records yet.
                  </td>
                </tr>
              ) : (
                filtered.map((i) => (
                  <tr key={i.id} className="border-t border-graylight">
                    <td className="px-5 py-3 text-navy/80">{i.invoice_number}</td>
                    <td className="px-5 py-3 text-navy/80">{i.customer_name}</td>
                    <td className="px-5 py-3 text-navy/80">
                      {new Date(i.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-navy/80">
                      ₹{i.grand_total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={i.status}
                        onChange={(e) => updateStatus(i.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-none focus:outline-none ${
                          i.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : i.status === "Partial"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-graylight text-navy/70"
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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