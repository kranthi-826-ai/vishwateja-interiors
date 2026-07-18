"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/dashboard/DataTable";

type Lead = {
  id: string;
  name: string;
  mobile: string;
  service: string;
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
    mobile: l.mobile,
    service: l.service || "-",
    message: l.message || "-",
    date: new Date(l.created_at).toLocaleDateString("en-IN"),
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy mb-6">Leads</h1>
      {loading ? (
        <p className="text-navy/50">Loading leads...</p>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "mobile", label: "Mobile" },
            { key: "service", label: "Service" },
            { key: "message", label: "Message" },
            { key: "date", label: "Date" },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}