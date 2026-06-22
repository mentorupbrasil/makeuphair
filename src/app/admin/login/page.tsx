"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/public/logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), senha: form.get("senha") }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao entrar");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-muted p-6">
      <div className="w-full max-w-md border border-black/5 bg-white p-10">
        <div className="flex justify-center">
          <Logo href="" />
        </div>
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-stone">
          Painel administrativo
        </p>
        <p className="mt-2 text-center text-xs text-stone/80">
          Bianca, use seu e-mail e senha para gerenciar o site.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">E-mail</label>
            <input name="email" type="email" required className="mt-1 w-full border border-black/10 p-3 text-sm" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Senha</label>
            <input name="senha" type="password" required className="mt-1 w-full border border-black/10 p-3 text-sm" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink py-3.5 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
