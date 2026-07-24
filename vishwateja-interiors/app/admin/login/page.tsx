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
    <section className="min-h-screen bg-navy flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-royal/40 rounded-full blur-[140px] pointer-events-none" />

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/5 border border-gold/30 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl relative z-10 text-white"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-gold uppercase tracking-widest font-medium">Studio Management</span>
          <h1 className="text-3xl font-bold text-white mt-1">Admin Portal</h1>
          <p className="text-xs text-white/50 mt-1 font-light">Vishwateja Interiors</p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="admin@vishwatejainteriors.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
            />
          </div>
        </div>

        {error && <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl mb-6 text-center">{error}</p>}

        <Button type="submit" variant="primary" className="w-full py-3.5 text-sm">
          Authenticate & Access Portal →
        </Button>
      </form>
    </section>
  );
}