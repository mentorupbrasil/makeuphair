"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";
import { formatCurrency } from "@/lib/utils";

type Servico = { id: string; nome: string; duracaoMin: number; valorInicial: number };

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ servicoId: "", data: "", hora: "", nome: "", telefone: "", email: "" });

  useEffect(() => {
    fetch("/api/servicos").then((r) => r.json()).then(setServicos);
  }, []);

  const servico = servicos.find((s) => s.id === form.servicoId);
  const HORARIOS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) setDone(true);
  }

  return (
    <>
      <SiteHeader />
      <main className="py-24 md:py-32">
        <div className="editorial-container max-w-lg">
          {done ? (
            <div className="text-center">
              <p className="section-label">Confirmado</p>
              <h1 className="font-display mt-4 text-4xl font-light">Solicitação enviada</h1>
              <p className="mt-4 text-stone">Entraremos em contato para confirmar seu horário.</p>
            </div>
          ) : (
            <>
              <p className="section-label">Agendamento</p>
              <h1 className="font-display mt-4 text-4xl font-light">Reserve seu horário</h1>
              <div className="mt-8 flex gap-2">
                {[1,2,3].map((s) => (
                  <div key={s} className={`h-px flex-1 ${step >= s ? "bg-gold" : "bg-black/10"}`} />
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {step === 1 && (
                  <>
                    <select required value={form.servicoId} onChange={(e) => setForm({...form, servicoId: e.target.value})} className="w-full border border-black/10 p-3 text-sm">
                      <option value="">Selecione o serviço</option>
                      {servicos.map((s) => <option key={s.id} value={s.id}>{s.nome} — {formatCurrency(s.valorInicial)}</option>)}
                    </select>
                    <button type="button" onClick={() => form.servicoId && setStep(2)} className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory">Continuar</button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <input type="date" required min={new Date().toISOString().split("T")[0]} value={form.data} onChange={(e) => setForm({...form, data: e.target.value})} className="w-full border border-black/10 p-3 text-sm" />
                    <select required value={form.hora} onChange={(e) => setForm({...form, hora: e.target.value})} className="w-full border border-black/10 p-3 text-sm">
                      <option value="">Horário</option>
                      {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setStep(1)} className="border border-black/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em]">Voltar</button>
                      <button type="button" onClick={() => form.data && form.hora && setStep(3)} className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory">Continuar</button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <input required placeholder="Nome completo" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="w-full border border-black/10 p-3 text-sm" />
                    <input required placeholder="WhatsApp" value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})} className="w-full border border-black/10 p-3 text-sm" />
                    <input type="email" placeholder="E-mail (opcional)" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full border border-black/10 p-3 text-sm" />
                    {servico && <p className="text-sm text-stone">{servico.nome} · {form.data} às {form.hora} · {formatCurrency(servico.valorInicial)}</p>}
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setStep(2)} className="border border-black/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em]">Voltar</button>
                      <button type="submit" disabled={loading} className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory">{loading ? "Enviando..." : "Confirmar"}</button>
                    </div>
                  </>
                )}
              </form>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
