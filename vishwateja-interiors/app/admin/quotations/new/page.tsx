"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import {
  InvoiceItem,
  rowTotal,
  calcSubtotal,
  calcGrandTotal,
} from "@/lib/calculations";

let idCounter = 0;
const newRow = (): InvoiceItem => ({ id: String(idCounter++), description: "", qty: 0, rate: 0 });
const newMaterial = () => ({ id: String(idCounter++), text: "" });

export default function QuotationPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "" });
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<InvoiceItem[]>([newRow()]);
  const [materials, setMaterials] = useState([newMaterial()]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const subtotal = calcSubtotal(items);
  const grandTotal = calcGrandTotal(subtotal);

  const updateItem = (id: string, field: keyof InvoiceItem, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: field === "description" ? value : Number(value) || 0 } : i))
    );
  };
  const addRow = () => setItems((prev) => [...prev, newRow()]);
  const removeRow = (id: string) => setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  const updateMaterial = (id: string, value: string) =>
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, text: value } : m)));
  const addMaterial = () => setMaterials((prev) => [...prev, newMaterial()]);
  const removeMaterial = (id: string) =>
    setMaterials((prev) => (prev.length > 1 ? prev.filter((m) => m.id !== id) : prev));

  const handleSave = async () => {
    if (!customer.name || !customer.mobile) {
      setMsg("Enter customer name and mobile.");
      return;
    }
    setSaving(true);

    const { data: last } = await supabase.from("quotations").select("quote_number").order("created_at", { ascending: false }).limit(1);
    const lastNum = last?.[0] ? parseInt(last[0].quote_number.split("-").pop() || "0") : 0;
    const quoteNumber = `QTN-2026-${String(lastNum + 1).padStart(3, "0")}`;

    const { data: existing } = await supabase.from("customers").select("id").eq("mobile", customer.mobile).maybeSingle();
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
      materials: materials.map((m) => m.text).filter(Boolean),
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
    <section className="max-w-4xl mx-auto px-6 py-16 print:py-0">
      <InvoiceHeader label="QUOTATION" />

      <div className="flex justify-between items-start mb-2 px-1">
        <p className="text-sm text-navy/60">9885034309 · Gajularamaram, Hyderabad</p>
        <p className="text-sm text-navy/70">{new Date(date).toLocaleDateString("en-IN")}</p>
      </div>

      <p className="text-xs uppercase tracking-widest text-navy/50 mb-2 mt-8">Quotation To</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <input placeholder="Customer Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
        <input placeholder="Mobile Number" value={customer.mobile} onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
        <input placeholder="Site Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-navy text-white text-sm">
            <th className="text-left px-4 py-3 rounded-l-lg">Description</th>
            <th className="text-center px-4 py-3 w-32">Qty × Rate</th>
            <th className="text-right px-4 py-3 w-32">Total</th>
            <th className="w-10 rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-graylight text-sm">
              <td className="px-4 py-3">
                <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="w-full focus:outline-none uppercase" placeholder="Item description" />
              </td>
              <td className="px-4 py-3 text-center">
                <input type="number" value={item.qty || ""} onChange={(e) => updateItem(item.id, "qty", e.target.value)} className="w-14 text-center focus:outline-none" />
                <span className="mx-1">×</span>
                <input type="number" value={item.rate || ""} onChange={(e) => updateItem(item.id, "rate", e.target.value)} className="w-16 text-center focus:outline-none" />
              </td>
              <td className="px-4 py-3 text-right font-medium">₹{rowTotal(item).toLocaleString("en-IN")}</td>
              <td className="px-2 py-3 text-center">
                <button onClick={() => removeRow(item.id)} className="text-navy/40 hover:text-red-500">✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="text-royal text-sm font-medium mb-10">+ Add Row</button>

      <div className="flex justify-end mb-10">
        <div className="w-full sm:w-72 flex justify-between bg-navy text-white px-4 py-3 rounded-lg font-semibold">
          <span>Total</span>
          <span>₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className="border-l-4 border-royal bg-graylight/40 rounded-r-xl p-6 mb-10">
        <p className="font-semibold text-navy mb-3">Materials Used & Specifications</p>
        <div className="space-y-2">
          {materials.map((m) => (
            <div key={m.id} className="flex items-center gap-2 text-sm">
              <span className="text-navy/40">•</span>
              <input value={m.text} onChange={(e) => updateMaterial(m.id, e.target.value)} placeholder="e.g. 18mm Gurjan Plywood — used for Frames and Boxes" className="flex-1 focus:outline-none bg-transparent text-navy/80" />
              <button onClick={() => removeMaterial(m.id)} className="text-navy/40 hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
        <button onClick={addMaterial} className="text-royal text-sm font-medium mt-3">+ Add Material</button>
      </div>

      {msg && <p className="text-sm mb-4 text-navy">{msg}</p>}

      <button onClick={handleSave} disabled={saving} className="bg-royal text-white px-6 py-3 rounded-full font-medium hover:bg-navy transition-colors duration-300 disabled:opacity-50">
        {saving ? "Saving..." : "Save Quotation"}
      </button>
    </section>
  );
}