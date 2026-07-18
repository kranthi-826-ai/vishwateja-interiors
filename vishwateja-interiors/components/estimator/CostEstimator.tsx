"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

const bhkAreaMultiplier: Record<string, number> = {
  "1BHK": 1,
  "2BHK": 2,
  "3BHK": 3,
  "4BHK": 4,
  "5BHK": 5,
  "6BHK": 6,
};

type Rate = { service_name: string; rate: number };

export default function CostEstimator() {
  const [bhk, setBhk] = useState("2BHK");
  const [selected, setSelected] = useState<string[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("pricing")
      .select("service_name, rate")
      .then(({ data }) => {
        if (data) setRates(data as Rate[]);
        setLoading(false);
      });
  }, []);

  const toggleService = (s: string) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const getRate = (name: string) =>
    rates.find((r) => r.service_name === name)?.rate || 0;

  const multiplier = bhkAreaMultiplier[bhk];
  const base =
    selected.reduce((sum, s) => sum + getRate(s), 0) * (multiplier / 2);
  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.15);

  if (loading) {
    return <p className="text-navy/50">Loading estimator...</p>;
  }

  return (
    <div className="bg-graylight/40 rounded-2xl p-8">
      <h3 className="text-xl font-semibold text-navy mb-6">Cost Estimator</h3>

      <label className="block text-sm font-medium text-navy mb-2">Property Type</label>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(bhkAreaMultiplier).map((b) => (
          <button
            key={b}
            onClick={() => setBhk(b)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              bhk === b ? "bg-navy text-white" : "bg-white text-navy border border-graylight"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <label className="block text-sm font-medium text-navy mb-2">Services Needed</label>
      <div className="flex flex-wrap gap-2 mb-8">
        {rates.map((r) => (
          <button
            key={r.service_name}
            onClick={() => toggleService(r.service_name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              selected.includes(r.service_name)
                ? "bg-royal text-white"
                : "bg-white text-navy border border-graylight"
            }`}
          >
            {r.service_name}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="bg-white rounded-xl p-6 mb-6">
          <p className="text-sm text-navy/60 mb-1">Estimated Cost</p>
          <p className="text-2xl font-semibold text-navy">
            ₹{low.toLocaleString("en-IN")} – ₹{high.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-navy/50 mt-2">
            Estimate only. Final quote provided after site visit.
          </p>
        </div>
      )}

      <Button href="/get-quote#lead-form">Get Exact Quote</Button>
    </div>
  );
}