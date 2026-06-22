"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type Midia = {
  id: string;
  url: string;
  tipo: string;
  titulo: string | null;
  destaqueHome: boolean;
  ordem: number;
  ativo: boolean;
};

export function MidiasManager({ initial }: { initial: Midia[] }) {
  const router = useRouter();
  const [midias, setMidias] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const form = new FormData(e.currentTarget);
    form.set("destaqueHome", form.get("destaqueHome") ? "true" : "false");

    const res = await fetch("/api/midias", { method: "POST", body: form });
    setLoading(false);
    if (res.ok) {
      setMsg("Upload realizado! A home foi atualizada.");
      router.refresh();
      (e.target as HTMLFormElement).reset();
    } else {
      const data = await res.json();
      setMsg(data.error || "Erro no upload");
    }
  }

  async function toggleDestaque(id: string, destaqueHome: boolean) {
    await fetch(`/api/midias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destaqueHome: !destaqueHome }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Excluir esta mídia?")) return;
    await fetch(`/api/midias/${id}`, { method: "DELETE" });
    setMidias((m) => m.filter((x) => x.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="admin-card p-6">
        <h2 className="font-display text-xl font-light">Upload de foto ou vídeo</h2>
        <p className="mt-1 text-sm text-stone">
          Arquivos marcados como &ldquo;Destaque na Home&rdquo; aparecem no carrossel principal do site.
        </p>
        <form onSubmit={handleUpload} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Arquivo</label>
            <input
              type="file"
              name="file"
              accept="image/*,video/mp4,video/webm"
              required
              className="mt-1 w-full border border-black/10 p-3 text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Título (opcional)</label>
            <input name="titulo" className="mt-1 w-full border border-black/10 p-3 text-sm" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone">Ordem</label>
            <input name="ordem" type="number" defaultValue={0} className="mt-1 w-full border border-black/10 p-3 text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="destaqueHome" defaultChecked />
            Destaque na Home (carrossel)
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Fazer upload"}
            </button>
          </div>
        </form>
        {msg && <p className="mt-4 text-sm text-gold">{msg}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {midias.map((m) => (
          <div key={m.id} className="admin-card overflow-hidden">
            <div className="relative aspect-[4/5] bg-ivory-muted">
              {m.tipo === "VIDEO" ? (
                <video src={m.url} className="h-full w-full object-cover" controls />
              ) : (
                <Image src={m.url} alt={m.titulo || ""} fill className="object-cover" />
              )}
            </div>
            <div className="space-y-2 p-4">
              <p className="text-sm font-medium">{m.titulo || "Sem título"}</p>
              <p className="text-[10px] uppercase tracking-wider text-stone">
                {m.tipo} · Ordem {m.ordem}
                {m.destaqueHome && " · ★ Home"}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => toggleDestaque(m.id, m.destaqueHome)}
                  className="border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-wider hover:bg-ivory-muted"
                >
                  {m.destaqueHome ? "Remover destaque" : "Destacar na Home"}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="border border-red-200 px-3 py-1.5 text-[10px] uppercase tracking-wider text-red-600 hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
        {midias.length === 0 && (
          <p className="text-stone col-span-full">Nenhuma mídia enviada ainda.</p>
        )}
      </div>
    </div>
  );
}
