"use client";
import { useEffect, useState } from "react";
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
const newRow = (): InvoiceItem => ({ id: String(idCounter++), description: "", qty: 0, rate: 0 });
const newMaterial = () => ({ id: String(idCounter++), text: "" });

export default function InvoicePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("VTI-2026-001");
  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "", email: "" });
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<InvoiceItem[]>([newRow()]);
  const [materials, setMaterials] = useState([newMaterial()]);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Admin-only guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecked(true);
      }
    });
  }, [router]);

  useEffect(() => {
    supabase
      .from("invoices")
      .select("invoice_number")
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const lastNum = parseInt(data[0].invoice_number.split("-").pop() || "0");
          setInvoiceNumber(`VTI-2026-${String(lastNum + 1).padStart(3, "0")}`);
        }
      });
  }, []);

  if (!checked) return null;

  const subtotal = calcSubtotal(items);
  const gst = calcGST(subtotal);
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
      setSavedMsg("Please enter customer name and mobile before saving.");
      return;
    }
    setSaving(true);
    setSavedMsg("");

    const { data: existing } = await supabase.from("customers").select("id").eq("mobile", customer.mobile).maybeSingle();
    let customerId = existing?.id;
    if (!customerId) {
      const { data: newCustomer } = await supabase
        .from("customers")
        .insert({ name: customer.name, mobile: customer.mobile, address: customer.address, email: customer.email })
        .select("id")
        .single();
      customerId = newCustomer?.id;
    }

    const { error } = await supabase.from("invoices").insert({
      invoice_number: invoiceNumber,
      customer_id: customerId,
      customer_name: customer.name,
      customer_email: customer.email,
      mobile: customer.mobile,
      address: customer.address,
      date,
      items,
      materials: materials.map((m) => m.text).filter(Boolean),
      subtotal,
      gst,
      grand_total: grandTotal,
      status: "Pending",
    });

    setSaving(false);
    setSavedMsg(error ? `Error: ${error.message}` : "✓ Invoice saved.");
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 print:py-0">
      <div className="flex justify-between items-start mb-2 print:mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-navy">VISHWATEJA INTERIORS</h1>
          <p className="text-sm text-navy/60">9885034309 · Gajularamaram, Hyderabad</p>
        </div>
        <div className="text-right">
          <p className="text-xs tracking-widest text-royal font-semibold mb-1">INVOICE</p>
          <p className="font-medium text-navy">{invoiceNumber}</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="text-sm text-navy/70 border-none text-right print:hidden" />
        </div>
      </div>

      <p className="text-xs uppercase tracking-widest text-navy/50 mb-2 mt-8">Bill To</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 print:hidden">
        <input placeholder="Customer Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
        <input placeholder="Mobile Number" value={customer.mobile} onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
        <input placeholder="Email (for portal login)" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
        <input placeholder="Site Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal" />
      </div>
      <div className="hidden print:block mb-8 text-sm text-navy">
        <p><strong>{customer.name}</strong></p>
        <p>{customer.mobile}</p>
        <p>{customer.address}</p>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-navy text-white text-sm">
            <th className="text-left px-4 py-3 rounded-l-lg">Description</th>
            <th className="text-center px-4 py-3 w-32">Qty × Rate</th>
            <th className="text-right px-4 py-3 w-32">Total</th>
            <th className="w-10 rounded-r-lg print:hidden"></th>
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
              <td className="px-2 py-3 text-center print:hidden">
                <button onClick={() => removeRow(item.id)} className="text-navy/40 hover:text-red-500">✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="text-royal text-sm font-medium mb-10 print:hidden">+ Add Row</button>

      <div className="flex justify-end mb-10">
        <div className="w-full sm:w-72 space-y-2 text-sm">
          <div className="flex justify-between text-navy/70"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between text-navy/70"><span>GST (18%)</span><span>₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></div>
          <div className="flex justify-between bg-navy text-white px-4 py-3 rounded-lg font-semibold mt-3"><span>Grand Total</span><span>₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></div>
        </div>
      </div>

      <div className="border-l-4 border-royal bg-graylight/40 rounded-r-xl p-6 mb-10">
        <p className="font-semibold text-navy mb-3">Materials Used & Specifications</p>
        <div className="space-y-2">
          {materials.map((m) => (
            <div key={m.id} className="flex items-center gap-2 text-sm">
              <span className="text-navy/40">•</span>
              <input value={m.text} onChange={(e) => updateMaterial(m.id, e.target.value)} placeholder="e.g. 18mm Gurjan Plywood — used for Frames and Boxes" className="flex-1 focus:outline-none bg-transparent text-navy/80" />
              <button onClick={() => removeMaterial(m.id)} className="text-navy/40 hover:text-red-500 print:hidden">✕</button>
            </div>
          ))}
        </div>
        <button onClick={addMaterial} className="text-royal text-sm font-medium mt-3 print:hidden">+ Add Material</button>
      </div>

      <p className="text-xs text-navy/50 mb-6">Thank you for choosing Vishwateja Interiors. Payment due within 7 days. Warranty terms apply as per agreement.</p>

      {savedMsg && <p className="text-sm mb-4 text-navy print:hidden">{savedMsg}</p>}

      <div className="flex flex-wrap gap-4 print:hidden">
        <button onClick={handleSave} disabled={saving} className="bg-royal text-white px-6 py-3 rounded-full font-medium hover:bg-navy transition-colors duration-300 disabled:opacity-50">
          {saving ? "Saving..." : "Save Invoice"}
        </button>
        <button onClick={() => window.print()} className="bg-navy text-white px-6 py-3 rounded-full font-medium hover:bg-royal transition-colors duration-300">
          Download / Print PDF
        </button>
        <a href={`https://wa.me/91${customer.mobile}?text=Hi ${customer.name}, here is your invoice ${invoiceNumber} — Grand Total ₹${grandTotal.toLocaleString("en-IN")}`} target="_blank" className="border border-navy text-navy px-6 py-3 rounded-full font-medium hover:bg-navy hover:text-white transition-colors duration-300">
          Send via WhatsApp
        </a>
      </div>
    </section>
  );
}