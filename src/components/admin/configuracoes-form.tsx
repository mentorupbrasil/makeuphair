"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DIAS = [
  { i: 0, label: "Dom" },
  { i: 1, label: "Seg" },
  { i: 2, label: "Ter" },
  { i: 3, label: "Qua" },
  { i: 4, label: "Qui" },
  { i: 5, label: "Sex" },
  { i: 6, label: "Sáb" },
];

type Perfil = {
  id: string;
  nome: string;
  bio: string | null;
  endereco: string | null;
  telefone: string | null;
  instagram: string | null;
  whatsapp: string | null;
  diasDisponiveis: string;
  horaInicio: string;
  horaFim: string;
  intervaloMin: number;
};

export function ConfiguracoesForm({ perfil }: { perfil: Perfil | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const diasAtivos = perfil?.diasDisponiveis.split(",").map(Number) ?? [1, 2, 3, 4, 5, 6];
  const [dias, setDias] = useState<number[]>(diasAtivos);

  function toggleDia(i: number) {
    setDias((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort()));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/perfil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: fd.get("nome"),
        bio: fd.get("bio"),
        endereco: fd.get("endereco"),
        telefone: fd.get("telefone"),
        instagram: fd.get("instagram"),
        whatsapp: fd.get("whatsapp"),
        horaInicio: fd.get("horaInicio"),
        horaFim: fd.get("horaFim"),
        intervaloMin: fd.get("intervaloMin"),
        diasDisponiveis: dias.join(","),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <div className="admin-card grid gap-4 p-6 md:grid-cols-2">
        <h2 className="font-display text-xl md:col-span-2">Perfil público</h2>
        <input name="nome" defaultValue={perfil?.nome ?? ""} placeholder="Nome" required className="field-editorial" />
        <input name="telefone" defaultValue={perfil?.telefone ?? ""} placeholder="Telefone" className="field-editorial" />
        <input name="whatsapp" defaultValue={perfil?.whatsapp ?? ""} placeholder="WhatsApp" className="field-editorial" />
        <input name="instagram" defaultValue={perfil?.instagram ?? ""} placeholder="Instagram (@ ou URL)" className="field-editorial" />
        <input name="endereco" defaultValue={perfil?.endereco ?? ""} placeholder="Endereço" className="field-editorial md:col-span-2" />
        <textarea name="bio" defaultValue={perfil?.bio ?? ""} placeholder="Bio (aparece na home)" rows={3} className="field-editorial md:col-span-2" />
      </div>

      <div className="admin-card grid gap-4 p-6 md:grid-cols-2">
        <h2 className="font-display text-xl md:col-span-2">Horários de atendimento</h2>
        <input name="horaInicio" type="time" defaultValue={perfil?.horaInicio ?? "08:00"} required className="field-editorial" />
        <input name="horaFim" type="time" defaultValue={perfil?.horaFim ?? "18:00"} required className="field-editorial" />
        <input name="intervaloMin" type="number" defaultValue={perfil?.intervaloMin ?? 15} placeholder="Intervalo (min)" className="field-editorial" />
        <div className="md:col-span-2">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-stone">Dias disponíveis</p>
          <div className="flex flex-wrap gap-2">
            {DIAS.map(({ i, label }) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleDia(i)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition ${
                  dias.includes(i) ? "bg-ink text-ivory" : "border border-black/10 text-stone"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-50">
          {loading ? "Salvando..." : "Salvar configurações"}
        </button>
        {saved && <span className="text-sm text-emerald-600">Salvo com sucesso</span>}
      </div>
    </form>
  );
}
