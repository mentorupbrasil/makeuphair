"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField, Input } from "@/components/ui/input";
import { BRAND } from "@/lib/brand";

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
      body: JSON.stringify({
        email: form.get("email"),
        senha: form.get("senha"),
      }),
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
    <div className="flex min-h-screen items-center justify-center bg-brand-bg-dark p-4">
      <Card className="w-full max-w-md border-brand-cream/20">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src={BRAND.assets.logoPrimary}
            alt={BRAND.fullName}
            width={180}
            height={180}
            className="h-32 w-auto object-contain"
          />
          <p className="mt-3 text-xs uppercase tracking-widest text-brand-taupe">
            Painel administrativo
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="E-mail" htmlFor="email">
            <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
          </FormField>
          <FormField label="Senha" htmlFor="senha">
            <Input id="senha" name="senha" type="password" required placeholder="••••••••" />
          </FormField>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
