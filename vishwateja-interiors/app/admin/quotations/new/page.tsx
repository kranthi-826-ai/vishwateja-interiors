"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

function QuotationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");
  const autoPrint = searchParams.get("print") === "true";

  const [quoteNumber, setQuoteNumber] = useState("QTN-2026-001");
  const [customer, setCustomer] = useState({ name: "", mobile: "", address: "" });
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<InvoiceItem[]>([newRow()]);
  const [materials, setMaterials] = useState([newMaterial()]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quoteId) {
      setLoading(true);
      supabase
        .from("quotations")
        .select("*")
        .eq("id", quoteId)
        .single()
        .then(({ data }) => {
          if (data) {
            setQuoteNumber(data.quote_number || "QTN-2026-001");
            setCustomer({
              name: data.customer_name || "",
              mobile: data.mobile || "",
              address: data.address || "",
            });
            if (data.created_at) {
              setDate(new Date(data.created_at).toISOString().slice(0, 10));
            }
            if (data.items && Array.isArray(data.items)) {
              setItems(data.items);
            }
            if (data.materials && Array.isArray(data.materials)) {
              setMaterials(data.materials.map((m: string) => ({ id: String(idCounter++), text: m })));
            }
            if (autoPrint) {
              setTimeout(() => window.print(), 500);
            }
          }
          setLoading(false);
        });
    } else {
      supabase
        .from("quotations")
        .select("quote_number")
        .order("created_at", { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) {
            const lastNum = parseInt(data[0].quote_number.split("-").pop() || "0");
            setQuoteNumber(`QTN-2026-${String(lastNum + 1).padStart(3, "0")}`);
          }
        });
    }
  }, [quoteId, autoPrint]);

  if (loading) return <p className="text-center py-20 text-navy/50 text-xs">Loading quotation details...</p>;

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
      setMsg("Enter customer name and mobile number.");
      return;
    }
    setSaving(true);
    setMsg("");

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

    let error;
    if (quoteId) {
      const { error: err } = await supabase.from("quotations").update({
        quote_number: quoteNumber,
        customer_id: customerId,
        customer_name: customer.name,
        mobile: customer.mobile,
        address: customer.address,
        items,
        materials: materials.map((m) => m.text).filter(Boolean),
        grand_total: grandTotal,
      }).eq("id", quoteId);
      error = err;
    } else {
      const { error: err } = await supabase.from("quotations").insert({
        quote_number: quoteNumber,
        customer_id: customerId,
        customer_name: customer.name,
        mobile: customer.mobile,
        address: customer.address,
        items,
        materials: materials.map((m) => m.text).filter(Boolean),
        grand_total: grandTotal,
        status: "Open",
      });
      error = err;
    }

    setSaving(false);
    if (error) {
      setMsg(`Error: ${error.message}`);
    } else {
      setMsg("✓ Quotation saved successfully.");
      setTimeout(() => router.push("/admin/quotations"), 800);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 print:py-0">
      <InvoiceHeader label="QUOTATION" />

      <div className="flex justify-between items-start mb-4 border-b border-navy/10 pb-4">
        <div>
          <p className="text-xs text-navy/60">Vishwateja Interiors · 9885034309 · Gajularamaram, Hyderabad</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-navy">{quoteNumber}</p>
          <p className="text-xs text-navy/60">{new Date(date).toLocaleDateString("en-IN")}</p>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-navy/50 mb-2 mt-6">Quotation To</p>
      <div className="grid sm:grid-cols-3 gap-3 mb-8 print:hidden">
        <input placeholder="Customer Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="border border-graylight/80 rounded-xl px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-gold" />
        <input placeholder="Mobile Number" value={customer.mobile} onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })} className="border border-graylight/80 rounded-xl px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-gold" />
        <input placeholder="Site Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="border border-graylight/80 rounded-xl px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:border-gold" />
      </div>

      <div className="hidden print:block mb-8 text-xs text-navy space-y-1 bg-graylight/20 p-4 rounded-xl">
        <p className="font-bold text-sm">{customer.name || "Customer"}</p>
        {customer.mobile && <p>Mobile: {customer.mobile}</p>}
        {customer.address && <p>Address: {customer.address}</p>}
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left px-4 py-3 rounded-l-xl font-medium">Description</th>
              <th className="text-center px-4 py-3 w-32 font-medium">Qty × Rate</th>
              <th className="text-right px-4 py-3 w-32 rounded-r-xl sm:rounded-r-none font-medium">Total</th>
              <th className="w-10 rounded-r-xl print:hidden"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graylight/40">
            {items.map((item) => (
              <tr key={item.id} className="text-xs">
                <td className="px-4 py-3">
                  <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} className="w-full focus:outline-none uppercase bg-transparent text-navy font-medium" placeholder="ITEM DESCRIPTION" />
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="number" value={item.qty || ""} onChange={(e) => updateItem(item.id, "qty", e.target.value)} className="w-12 text-center focus:outline-none bg-transparent" placeholder="Qty" />
                  <span className="mx-1 text-navy/40">×</span>
                  <input type="number" value={item.rate || ""} onChange={(e) => updateItem(item.id, "rate", e.target.value)} className="w-16 text-center focus:outline-none bg-transparent" placeholder="Rate" />
                </td>
                <td className="px-4 py-3 text-right font-semibold text-navy">₹{rowTotal(item).toLocaleString("en-IN")}</td>
                <td className="px-2 py-3 text-center print:hidden">
                  <button onClick={() => removeRow(item.id)} className="text-navy/40 hover:text-red-500 font-bold">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addRow} className="text-royal text-xs font-semibold mb-8 print:hidden hover:underline">+ Add Row</button>

      <div className="flex justify-end mb-10">
        <div className="w-full sm:w-72 flex justify-between bg-navy text-white px-4 py-3.5 rounded-xl font-bold text-sm shadow-md">
          <span>Estimated Total</span>
          <span className="text-gold">₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className="border-l-4 border-gold bg-gold/5 rounded-r-2xl p-5 mb-8">
        <p className="font-semibold text-xs text-navy uppercase tracking-wider mb-2">Materials & Scope Specifications</p>
        <div className="space-y-2">
          {materials.map((m) => (
            <div key={m.id} className="flex items-center gap-2 text-xs">
              <span className="text-gold">•</span>
              <input value={m.text} onChange={(e) => updateMaterial(m.id, e.target.value)} placeholder="e.g. 18mm BWP Plywood — used for Frames and Boxes" className="flex-1 focus:outline-none bg-transparent text-navy/80" />
              <button onClick={() => removeMaterial(m.id)} className="text-navy/40 hover:text-red-500 print:hidden">✕</button>
            </div>
          ))}
        </div>
        <button onClick={addMaterial} className="text-royal text-xs font-semibold mt-3 print:hidden hover:underline">+ Add Specification</button>
      </div>

      {msg && <p className="text-xs mb-4 font-semibold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 print:hidden">{msg}</p>}

      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-gold via-[#E8C872] to-goldDark text-navy font-bold px-6 py-2.5 rounded-full text-xs shadow-md hover:scale-105 transition-transform disabled:opacity-50">
          {saving ? "Saving..." : "Save Quotation"}
        </button>
        <button onClick={() => window.print()} className="bg-navy text-white font-medium px-6 py-2.5 rounded-full text-xs shadow-md hover:bg-royal transition-all duration-300 flex items-center gap-2">
          <span>📥</span>
          <span>Download / Print PDF</span>
        </button>
        {customer.mobile && (
          <a href={`https://wa.me/91${customer.mobile}?text=Hi ${customer.name || "Customer"}, here is your Vishwateja Interiors Quotation ${quoteNumber} for estimated total ₹${grandTotal.toLocaleString("en-IN")}`} target="_blank" rel="noopener noreferrer" className="border border-navy text-navy font-medium px-5 py-2.5 rounded-full text-xs hover:bg-navy hover:text-white transition-all duration-300 flex items-center gap-2">
            <span>💬</span>
            <span>Send via WhatsApp</span>
          </a>
        )}
      </div>
    </section>
  );
}

export default function QuotationPage() {
  return (
    <Suspense fallback={<p className="text-center py-20 text-navy/50 text-xs">Loading quotation...</p>}>
      <QuotationFormContent />
    </Suspense>
  );
}