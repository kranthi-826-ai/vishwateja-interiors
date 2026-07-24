"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

const bhkAreaMultiplier: Record<string, number> = {
  "1BHK": 1, "2BHK": 2, "3BHK": 3, "4BHK": 4, "5BHK": 5, "6BHK": 6,
};

type Rate = { service_name: string; rate: number };

export default function CostEstimator() {
  const [bhk, setBhk] = useState("2BHK");
  const [selected, setSelected] = useState<string[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("pricing").select("service_name, rate").then(({ data }) => {
      if (data) setRates(data as Rate[]);
      setLoading(false);
    });
  }, []);

  const toggleService = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const getRate = (name: string) => rates.find((r) => r.service_name === name)?.rate || 0;
  const multiplier = bhkAreaMultiplier[bhk];
  const base = selected.reduce((sum, s) => sum + getRate(s), 0) * (multiplier / 2);
  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.15);

  if (loading) {
    return (
      <div className="bg-white border border-graylight/80 rounded-3xl p-8 shadow-xl text-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs text-navy/50 tracking-wider uppercase">Loading Configurator...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-graylight/80 rounded-3xl p-8 sm:p-10 shadow-xl hover:border-gold/30 transition-all duration-500">
      <div className="flex items-center justify-between border-b border-graylight/60 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-navy">Instant Cost Configurator</h3>
          <p className="text-xs text-navy/50 mt-1 font-light">Select property scale & required modular services</p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
      </div>

      {/* Property Type Pills */}
      <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-3">
        1. Select Property Configuration
      </label>
      <div className="flex flex-wrap gap-2.5 mb-8">
        {Object.keys(bhkAreaMultiplier).map((b) => (
          <button
            key={b}
            onClick={() => setBhk(b)}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              bhk === b
                ? "bg-navy text-gold shadow-md scale-105 border border-gold/40 font-semibold"
                : "bg-warmwhite text-navy border border-graylight hover:bg-gold/10 hover:border-gold/30"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Services Pills */}
      <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-3">
        2. Select Modular Scope
      </label>
      <div className="flex flex-wrap gap-2.5 mb-8">
        {rates.map((r) => {
          const isSelected = selected.includes(r.service_name);
          return (
            <button
              key={r.service_name}
              onClick={() => toggleService(r.service_name)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-gradient-to-r from-gold to-goldDark text-navy shadow-md font-semibold scale-105"
                  : "bg-warmwhite text-navy/80 border border-graylight hover:bg-gold/10 hover:border-gold/30"
              }`}
            >
              <span>{isSelected ? "✓" : "+"}</span>
              <span>{r.service_name}</span>
            </button>
          );
        })}
      </div>

      {/* Calculation Display */}
      {selected.length > 0 ? (
        <div className="bg-navy text-white rounded-2xl p-6 mb-8 border border-gold/30 shadow-xl animate-[fadeInUp_0.4s_ease]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gold uppercase tracking-widest font-medium">Estimated Investment Range</p>
            <span className="text-[10px] text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full">{bhk} Selection</span>
          </div>
          <p className="text-3xl font-bold text-white tracking-tight">
            ₹{low.toLocaleString("en-IN")} – ₹{high.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-white/60 mt-3 border-t border-white/10 pt-3 font-light">
            *Indicative estimate based on standard calibrated BWP plywood & laminate options. Final quote verified post site measurement.
          </p>
        </div>
      ) : (
        <div className="bg-warmwhite rounded-2xl p-6 mb-8 border border-dashed border-graylight text-center">
          <p className="text-xs text-navy/50 font-light">Select at least one modular service above to calculate estimate.</p>
        </div>
      )}

      <Button href="/get-quote#lead-form" variant="primary" className="w-full py-3.5 text-sm">
        Request Exact Site Quotation →
      </Button>
    </div>
  );
}