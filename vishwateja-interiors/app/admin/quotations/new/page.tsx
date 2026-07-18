"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  InvoiceItem,
  rowTotal,
  calcSubtotal,
  calcGST,
  calcGrandTotal,
} from "@/lib/calculations";

let idCounter = 0;
const newRow = (): InvoiceItem => ({
  id: String(idCounter++),
  description: "",
  qty: 0,
  rate: 0,
});

export default function QuotationPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "" });
  const [items, setItems] = useState<InvoiceItem[]>([newRow()]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const subtotal = calcSubtotal(items);
  const grandTotal = calcGrandTotal(subtotal);

  const updateItem = (id: string, field: keyof InvoiceItem, value: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, [field]: field === "description" ? value : Number(value) || 0 }
          : i
      )
    );
  };

  const addRow = () => setItems((prev) => [...prev, newRow()]);
  const removeRow = (id: string) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  const handleSave = async () => {
    if (!customer.name || !customer.mobile) {
      setMsg("Enter customer name and mobile.");
      return;
    }
    setSaving(true);

    const { data: last } = await supabase
      .from("quotations")
      .select("quote_number")
      .order("created_at", { ascending: false })
      .limit(1);
    const lastNum = last?.[0]
      ? parseInt(last[0].quote_number.split("-").pop() || "0")
      : 0;
    const quoteNumber = `QTN-2026-${String(lastNum + 1).padStart(3, "0")}`;

    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("mobile", customer.mobile)
      .maybeSingle();

    let customerId = existing?.id;
    if (!customerId) {
      const { data: newCustomer } = await supabase
        .from("customers")
        .insert({ name: customer.name, mobile: customer.mobile, address: customer.address })
        .select("id")
        .single();
      customerId = newCustomer?.id;
    }

    const { error } = await supabase.from("quotations").insert({
      quote_number: quoteNumber,
      customer_id: customerId,
      customer_name: customer.name,
      mobile: customer.mobile,
      items,
      grand_total: grandTotal,
      status: "Open",
    });

    setSaving(false);
    if (error) {
      setMsg(`Error: ${error.message}`);
    } else {
      router.push("/admin/quotations");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-navy mb-8">New Quotation</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <input
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal"
        />
        <input
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
          className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal"
        />
        <input
          placeholder="Site Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal"
        />
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-navy text-white text-sm">
            <th className="text-left px-4 py-3 rounded-l-lg">Description</th>
            <th className="text-center px-4 py-3 w-24">Qty</th>
            <th className="text-center px-4 py-3 w-28">Rate</th>
            <th className="text-right px-4 py-3 w-32">Total</th>
            <th className="w-10 rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-graylight text-sm">
              <td className="px-4 py-3">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="w-full focus:outline-none"
                  placeholder="Item description"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  value={item.qty || ""}
                  onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                  className="w-full text-center focus:outline-none"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  value={item.rate || ""}
                  onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                  className="w-full text-center focus:outline-none"
                />
              </td>
              <td className="px-4 py-3 text-right">
                ₹{rowTotal(item).toLocaleString("en-IN")}
              </td>
              <td className="px-2 py-3 text-center">
                <button onClick={() => removeRow(item.id)} className="text-navy/40 hover:text-red-500">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} className="text-royal text-sm font-medium mb-10">
        + Add Row
      </button>

      <div className="flex justify-end mb-10">
        <div className="w-full sm:w-72 flex justify-between bg-navy text-white px-4 py-3 rounded-lg font-semibold">
          <span>Grand Total</span>
          <span>₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      {msg && <p className="text-sm mb-4 text-navy">{msg}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-royal text-white px-6 py-3 rounded-full font-medium hover:bg-navy transition-colors duration-300 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Quotation"}
      </button>
    </section>
  );
}