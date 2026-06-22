"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STATUS_ORCAMENTO_LABEL } from "@/lib/constants";
import { BRAND, whatsappUrl } from "@/lib/brand";

type Orcamento = {
  id: string;
  nomeCliente: string;
  evento: string | null;
  servicos: string;
  valor: number;
  validade: string;
  status: string;
};

export function OrcamentosManager({ initial }: { initial: Orcamento[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/orcamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomeCliente: fd.get("nomeCliente"),
        evento: fd.get("evento"),
        servicos: fd.get("servicos"),
        valor: fd.get("valor"),
        validadeDias: fd.get("validadeDias"),
        observacoes: fd.get("observacoes"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      router.refresh();
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/orcamentos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory"
        >
          + Novo orçamento
        </button>
      ) : (
        <form onSubmit={handleCreate} className="admin-card mt-4 grid gap-4 p-6 md:grid-cols-2">
          <h2 className="font-display text-xl md:col-span-2">Criar orçamento</h2>
          <input name="nomeCliente" placeholder="Nome do cliente" required className="border border-black/10 p-3 text-sm" />
          <input name="evento" placeholder="Evento (ex: Casamento)" className="border border-black/10 p-3 text-sm" />
          <input name="servicos" placeholder="Serviços (ex: Make + Hair)" required className="border border-black/10 p-3 text-sm md:col-span-2" />
          <input name="valor" type="number" step="0.01" placeholder="Valor R$" required className="border border-black/10 p-3 text-sm" />
          <input name="validadeDias" type="number" defaultValue={7} placeholder="Validade (dias)" className="border border-black/10 p-3 text-sm" />
          <textarea name="observacoes" placeholder="Observações" className="border border-black/10 p-3 text-sm md:col-span-2" rows={2} />
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" disabled={loading} className="bg-ink px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory">
              {loading ? "Salvando..." : "Criar orçamento"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="border border-black/10 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em]">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {initial.map((o) => {
          const msg =
            `Olá ${o.nomeCliente}! Segue seu orçamento:\n\n` +
            `Evento: ${o.evento || "—"}\nServiços: ${o.servicos}\n` +
            `Valor: ${formatCurrency(o.valor)}\nValidade: ${formatDate(o.validade)}\n\n${BRAND.fullName}`;

          return (
            <div key={o.id} className="admin-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{o.nomeCliente}</p>
                <p className="text-sm text-stone">{o.evento} · {o.servicos}</p>
                <p className="font-display mt-1 text-xl">{formatCurrency(o.valor)}</p>
                <p className="text-[10px] uppercase tracking-wider text-stone">
                  {STATUS_ORCAMENTO_LABEL[o.status]} · Validade {formatDate(o.validade)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappUrl(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/10 px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-ivory-muted"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => updateStatus(o.id, "ENVIADO")}
                  className="border border-black/10 px-4 py-2 text-[10px] uppercase tracking-wider hover:bg-ivory-muted"
                >
                  Marcar enviado
                </button>
                <button
                  onClick={() => updateStatus(o.id, "ACEITO")}
                  className="border border-emerald-200 px-4 py-2 text-[10px] uppercase tracking-wider text-emerald-700 hover:bg-emerald-50"
                >
                  Aceito
                </button>
              </div>
            </div>
          );
        })}
        {initial.length === 0 && <p className="text-stone">Nenhum orçamento cadastrado.</p>}
      </div>
    </div>
  );
}
