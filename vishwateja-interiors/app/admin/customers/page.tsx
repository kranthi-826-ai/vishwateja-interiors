"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DataTable from "@/components/dashboard/DataTable";

type Customer = {
  id: string;
  name: string;
  mobile: string;
  address: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("customers")
      .select("id, name, mobile, address")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setCustomers(data as Customer[]);
        setLoading(false);
      });
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const rows = filtered.map((c) => ({
    name: c.name,
    mobile: c.mobile,
    address: c.address || "-",
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-navy">Customers</h1>
        <input
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-graylight rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-royal w-64"
        />
      </div>

      {loading ? (
        <p className="text-navy/50">Loading customers...</p>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "mobile", label: "Mobile" },
            { key: "address", label: "Address" },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}