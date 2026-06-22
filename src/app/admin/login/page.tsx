"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { FormField, Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-900 to-stone-800 p-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-rose-500" />
          <CardTitle>MakeupHair — Admin</CardTitle>
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
