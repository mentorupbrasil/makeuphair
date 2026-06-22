"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Depoimento = {
  id: string;
  nome: string;
  texto: string;
  estrelas: number;
  ativo: boolean;
  ordem: number;
};

export function DepoimentosManager({ initial }: { initial: Depoimento[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/depoimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: fd.get("nome"),
        texto: fd.get("texto"),
        estrelas: fd.get("estrelas"),
        ordem: fd.get("ordem"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      router.refresh();
    }
  }

  async function toggleAtivo(id: string, ativo: boolean) {
    await fetch(`/api/depoimentos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ativo: !ativo }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Remover este depoimento?")) return;
    await fetch(`/api/depoimentos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory"
        >
          + Novo depoimento
        </button>
      ) : (
        <form onSubmit={handleCreate} className="admin-card mt-4 grid gap-4 p-6 md:grid-cols-2">
          <h2 className="font-display text-xl md:col-span-2">Adicionar depoimento real</h2>
          <input
            name="nome"
            placeholder="Nome completo (ex: Carla Mendes)"
            required
            className="border border-black/10 p-3 text-sm md:col-span-2"
          />
          <textarea
            name="texto"
            placeholder="Depoimento da cliente"
            required
            rows={3}
            className="border border-black/10 p-3 text-sm md:col-span-2"
          />
          <input
            name="estrelas"
            type="number"
            min={1}
            max={5}
            defaultValue={5}
            placeholder="Estrelas"
            className="border border-black/10 p-3 text-sm"
          />
          <input
            name="ordem"
            type="number"
            defaultValue={0}
            placeholder="Ordem"
            className="border border-black/10 p-3 text-sm"
          />
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" disabled={loading} className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory">
              {loading ? "Salvando..." : "Publicar no site"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="border border-black/10 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em]">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {initial.map((d) => (
          <div key={d.id} className="admin-card flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-medium">{d.nome}</p>
              <p className="mt-2 max-w-xl text-sm italic leading-relaxed text-stone">&ldquo;{d.texto}&rdquo;</p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-stone">
                {d.ativo ? "Visível no site" : "Oculto"} · {d.estrelas} estrelas
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleAtivo(d.id, d.ativo)}
                className="border border-black/10 px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-ivory-muted"
              >
                {d.ativo ? "Ocultar" : "Publicar"}
              </button>
              <button
                onClick={() => remove(d.id)}
                className="border border-red-200 px-4 py-2 text-[10px] uppercase tracking-wider text-red-600 hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        {initial.length === 0 && (
          <p className="text-stone">
            Nenhum depoimento cadastrado. A seção só aparece no site quando você adicionar depoimentos reais.
          </p>
        )}
      </div>
    </div>
  );
}
