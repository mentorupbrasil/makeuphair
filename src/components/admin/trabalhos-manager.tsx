"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type TrabalhoFoto = { id: string; url: string; tipo: string; ordem: number };
type Trabalho = {
  id: string;
  instagram: string | null;
  clienteNome: string | null;
  ordem: number;
  destaqueHome: boolean;
  ativo: boolean;
  fotos: TrabalhoFoto[];
};

function formatInstagram(handle: string | null) {
  if (!handle) return null;
  const clean = handle.replace(/^@/, "").trim();
  return clean ? `@${clean}` : null;
}

export function TrabalhosManager({ initial }: { initial: Trabalho[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const form = new FormData(e.currentTarget);
    form.set("destaqueHome", form.get("destaqueHome") ? "true" : "false");

    const res = await fetch("/api/trabalhos", { method: "POST", body: form });
    setLoading(false);

    if (res.ok) {
      setMsg("Trabalho publicado no portfólio!");
      router.refresh();
      (e.target as HTMLFormElement).reset();
    } else {
      const data = await res.json();
      setMsg(data.error || "Erro no upload");
    }
  }

  async function updateTrabalho(id: string, data: Record<string, unknown>) {
    await fetch(`/api/trabalhos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Excluir este trabalho e todas as fotos?")) return;
    await fetch(`/api/trabalhos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="admin-card p-6">
        <h2 className="font-display text-xl font-light">Novo trabalho (cliente)</h2>
        <p className="mt-1 text-sm text-stone">
              Envie 2 fotos por cliente (ou 3). Vai para o portfólio abaixo na home.
          Marque &ldquo;Hero&rdquo; só se quiser no carrossel do topo.
        </p>
        <form onSubmit={handleUpload} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">
              Fotos (selecione 2 ou 3 de uma vez)
            </label>
            <input
              type="file"
              name="files"
              accept="image/*"
              multiple
              required
              className="field-editorial mt-1"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Instagram da cliente</label>
            <input name="instagram" placeholder="@laarahtavares" className="field-editorial mt-1" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Nome (opcional)</label>
            <input name="clienteNome" placeholder="Nome da cliente" className="field-editorial mt-1" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Ordem no portfólio</label>
            <input name="ordem" type="number" defaultValue={initial.length} className="field-editorial mt-1" />
          </div>
          <label className="flex items-center gap-2 self-end text-sm text-stone">
            <input type="checkbox" name="destaqueHome" />
            Mostrar no hero (topo do site)
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Publicar no portfólio"}
            </button>
          </div>
        </form>
        {msg && <p className={`mt-4 text-sm ${msg.includes("Erro") || msg.includes("Máximo") ? "text-red-600" : "text-gold"}`}>{msg}</p>}
      </div>

      <div className="space-y-6">
        {initial.map((t) => (
          <div key={t.id} className="admin-card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-medium">
                  {formatInstagram(t.instagram) || t.clienteNome || "Cliente"}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-stone">
                  Ordem {t.ordem}
                  {t.destaqueHome && " · Hero"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateTrabalho(t.id, { destaqueHome: !t.destaqueHome })}
                  className="border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-wider hover:bg-ivory-muted"
                >
                  {t.destaqueHome ? "Tirar do hero" : "Colocar no hero"}
                </button>
                <button
                  onClick={() => updateTrabalho(t.id, { ordem: Math.max(0, t.ordem - 1) })}
                  className="border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-wider"
                >
                  ↑
                </button>
                <button
                  onClick={() => updateTrabalho(t.id, { ordem: t.ordem + 1 })}
                  className="border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-wider"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="border border-red-200 px-3 py-1.5 text-[10px] uppercase tracking-wider text-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:max-w-xl">
              {t.fotos.map((f) => (
                <div key={f.id} className="relative aspect-[3/4] bg-ivory-muted">
                  <Image src={f.url} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {initial.length === 0 && <p className="text-stone">Nenhum trabalho no portfólio ainda.</p>}
      </div>
    </div>
  );
}
