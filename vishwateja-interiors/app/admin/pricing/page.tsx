"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

type Rate = { id: string; service_name: string; rate: number };

export default function PricingPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("pricing")
      .select("*")
      .order("service_name")
      .then(({ data }) => {
        if (data) setRates(data as Rate[]);
        setLoading(false);
      });
  }, []);

  const updateRate = (id: string, value: string) => {
    setRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rate: Number(value) || 0 } : r))
    );
    setSaved(false);
  };

  const handleSave = async () => {
    for (const r of rates) {
      await supabase.from("pricing").update({ rate: r.rate }).eq("id", r.id);
    }
    setSaved(true);
  };

  if (loading) return <p className="text-xs text-navy/50">Loading base rate configurations...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Base Pricing Configurator</h1>
        <p className="text-xs text-navy/60 mt-1 font-light">
          Update base rates per sqft/unit — changes propagate live to the public Cost Estimator.
        </p>
      </div>

      <div className="bg-white border border-graylight/80 rounded-3xl p-8 max-w-xl space-y-4 shadow-lg">
        {rates.map((r) => (
          <div key={r.id} className="flex items-center justify-between py-2 border-b border-graylight/30 last:border-0">
            <label className="text-xs sm:text-sm font-medium text-navy">{r.service_name}</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-navy/50">₹</span>
              <input
                type="number"
                value={r.rate}
                onChange={(e) => updateRate(r.id, e.target.value)}
                className="w-36 border border-graylight/80 rounded-xl px-4 py-2 text-right text-xs font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center gap-4">
        <Button onClick={handleSave} variant="primary" className="px-8">
          Save All Rates
        </Button>
        {saved && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">✓ Pricing Saved & Live</span>}
      </div>
    </div>
  );
}