"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/dashboard/DataTable";

type Lead = {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  service: string;
  home_type?: string;
  material_quality?: string;
  budget_range?: string;
  pincode?: string;
  verified?: boolean;
  message: string;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLeads(data as Lead[]);
        setLoading(false);
      });
  }, []);

  const rows = leads.map((l) => ({
    name: l.name,
    contact: `${l.mobile}${l.email ? ` | ${l.email}` : ""}`,
    type: l.home_type ? `${l.home_type} (${l.material_quality || "Std"})` : (l.service || "-"),
    budget: l.budget_range || "-",
    verified: l.verified ? "✅ Yes" : "Unverified",
    message: l.message || "-",
    date: new Date(l.created_at).toLocaleDateString("en-IN"),
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy mb-6">Leads & Enquiries</h1>
      {loading ? (
        <p className="text-navy/50">Loading leads...</p>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "contact", label: "Contact (Mobile / Email)" },
            { key: "type", label: "Home & Scope" },
            { key: "budget", label: "Budget Range" },
            { key: "verified", label: "OTP Status" },
            { key: "message", label: "Details / Message" },
            { key: "date", label: "Date" },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}