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

  if (loading) return <p className="text-navy/50">Loading rates...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy mb-2">Pricing</h1>
      <p className="text-sm text-navy/60 mb-8">
        Update base rates daily — changes reflect instantly on the public Cost Estimator.
      </p>

      <div className="bg-white border border-graylight rounded-2xl p-6 max-w-lg space-y-4">
        {rates.map((r) => (
          <div key={r.id} className="flex items-center justify-between">
            <label className="text-sm text-navy">{r.service_name}</label>
            <input
              type="number"
              value={r.rate}
              onChange={(e) => updateRate(r.id, e.target.value)}
              className="w-32 border border-graylight rounded-lg px-3 py-2 text-right focus:outline-none focus:border-royal"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button onClick={handleSave}>Save Rates</Button>
        {saved && <span className="text-sm text-green-600">✓ Saved</span>}
      </div>
    </div>
  );
}