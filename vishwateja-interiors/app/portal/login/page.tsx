"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

export default function PortalLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      return;
    }
    router.push("/portal/dashboard");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-graylight rounded-2xl p-8"
      >
        <h1 className="text-2xl font-semibold text-navy mb-1">
          {mode === "login" ? "Customer Login" : "Create Account"}
        </h1>
        <p className="text-sm text-navy/60 mb-6">
          Track your project status and invoices
        </p>

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

        <Button type="submit">{mode === "login" ? "Login" : "Sign Up"}</Button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="block mx-auto mt-4 text-sm text-royal hover:underline"
        >
          {mode === "login" ? "New here? Create an account" : "Already have an account? Login"}
        </button>
      </form>
    </section>
  );
}