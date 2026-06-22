"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Servico = { id: string; nome: string; valorInicial: number; duracaoMin: number };

export function NovoAgendamentoForm({ servicos }: { servicos: Servico[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomeCliente: fd.get("nomeCliente"),
        telefone: fd.get("telefone"),
        servicoId: fd.get("servicoId"),
        data: fd.get("data"),
        horaInicio: fd.get("horaInicio"),
        valor: fd.get("valor"),
        status: fd.get("status"),
        observacao: fd.get("observacao"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      router.refresh();
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory"
      >
        + Novo agendamento
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card mt-6 grid gap-4 p-6 md:grid-cols-2">
      <h2 className="font-display text-xl md:col-span-2">Novo agendamento</h2>
      <input name="nomeCliente" placeholder="Nome do cliente" required className="border border-black/10 p-3 text-sm" />
      <input name="telefone" placeholder="Telefone" required className="border border-black/10 p-3 text-sm" />
      <select name="servicoId" required className="border border-black/10 p-3 text-sm">
        <option value="">Serviço</option>
        {servicos.map((s) => (
          <option key={s.id} value={s.id}>{s.nome}</option>
        ))}
      </select>
      <input name="data" type="date" required className="border border-black/10 p-3 text-sm" />
      <input name="horaInicio" type="time" required defaultValue="09:00" className="border border-black/10 p-3 text-sm" />
      <input name="valor" type="number" step="0.01" placeholder="Valor R$" className="border border-black/10 p-3 text-sm" />
      <select name="status" defaultValue="CONFIRMADO" className="border border-black/10 p-3 text-sm">
        <option value="PENDENTE">Pendente</option>
        <option value="CONFIRMADO">Confirmado</option>
      </select>
      <input name="observacao" placeholder="Observação" className="border border-black/10 p-3 text-sm md:col-span-2" />
      <div className="flex gap-2 md:col-span-2">
        <button type="submit" disabled={loading} className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory">
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="border border-black/10 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em]">
          Cancelar
        </button>
      </div>
    </form>
  );
}
