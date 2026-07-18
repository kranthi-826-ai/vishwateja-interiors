"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin/dashboard");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border border-graylight rounded-2xl p-8"
      >
        <h1 className="text-2xl font-semibold text-navy mb-1">Admin Login</h1>
        <p className="text-sm text-navy/60 mb-6">Vishwateja Interiors</p>

        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-graylight rounded-xl px-4 py-3 focus:outline-none focus:border-royal"
          />
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}