"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";
import { formatCurrency } from "@/lib/utils";
import { whatsappUrl } from "@/lib/brand";

type Servico = { id: string; nome: string; duracaoMin: number; valorInicial: number };

const STEPS = ["Serviço", "Data & hora", "Seus dados"];

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    servicoId: "",
    data: "",
    hora: "",
    nome: "",
    telefone: "",
    email: "",
  });

  const servico = servicos.find((s) => s.id === form.servicoId);

  useEffect(() => {
    fetch("/api/servicos")
      .then((r) => r.json())
      .then(setServicos)
      .catch(() => setError("Não foi possível carregar os serviços."));
  }, []);

  useEffect(() => {
    if (!form.data || !form.servicoId) {
      setHorarios([]);
      return;
    }
    setLoadingHorarios(true);
    setForm((f) => ({ ...f, hora: "" }));
    fetch(`/api/disponibilidade?data=${form.data}&servicoId=${form.servicoId}`)
      .then((r) => r.json())
      .then((d) => setHorarios(d.horarios ?? []))
      .catch(() => setHorarios([]))
      .finally(() => setLoadingHorarios(false));
  }, [form.data, form.servicoId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setDone(true);
    else setError(data.error || "Erro ao enviar. Tente novamente.");
  }

  return (
    <>
      <SiteHeader />
      <main className="py-14 md:py-20">
        <div className="editorial-container max-w-lg">
          {done ? (
            <div>
              <p className="section-label">Enviado</p>
              <h1 className="font-display mt-4 text-4xl font-light">Solicitação recebida</h1>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                Obrigada pelo interesse. Entraremos em contato pelo WhatsApp para confirmar seu horário.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl("Olá! Acabei de solicitar um agendamento pelo site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] text-ivory"
                >
                  Falar no WhatsApp
                </a>
                <Link href="/" className="border border-black/10 px-8 py-3.5 text-[10px] uppercase tracking-[0.25em]">
                  Voltar ao início
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="section-label">Agendamento</p>
              <h1 className="font-display mt-4 text-4xl font-light">Reserve seu horário</h1>

              <div className="mt-8 flex gap-6">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-px ${step > i ? "bg-gold" : "bg-black/10"}`} />
                    <p className={`mt-2 text-[9px] uppercase tracking-[0.2em] ${step === i + 1 ? "text-gold" : "text-stone"}`}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {step === 1 && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">Serviço</label>
                      <select
                        required
                        value={form.servicoId}
                        onChange={(e) => setForm({ ...form, servicoId: e.target.value })}
                        className="field-editorial"
                      >
                        <option value="">Selecione</option>
                        {servicos.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.nome} — {formatCurrency(s.valorInicial)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => form.servicoId && setStep(2)}
                      className="bg-ink px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] text-ivory"
                    >
                      Continuar
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">Data</label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={form.data}
                        onChange={(e) => setForm({ ...form, data: e.target.value })}
                        className="field-editorial"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">Horário</label>
                      <select
                        required
                        value={form.hora}
                        onChange={(e) => setForm({ ...form, hora: e.target.value })}
                        className="field-editorial"
                        disabled={loadingHorarios || horarios.length === 0}
                      >
                        <option value="">
                          {loadingHorarios
                            ? "Carregando..."
                            : horarios.length === 0
                              ? "Sem horários neste dia"
                              : "Selecione"}
                        </option>
                        {horarios.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setStep(1)} className="border border-black/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em]">
                        Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => form.data && form.hora && setStep(3)}
                        disabled={!form.hora}
                        className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-40"
                      >
                        Continuar
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">Nome completo</label>
                      <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="field-editorial" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">WhatsApp</label>
                      <input required value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="field-editorial" placeholder="(99) 99999-9999" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-stone">E-mail (opcional)</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-editorial" />
                    </div>
                    {servico && (
                      <p className="border-t border-black/5 pt-4 text-sm text-stone">
                        {servico.nome} · {form.data.split("-").reverse().join("/")} às {form.hora} · {formatCurrency(servico.valorInicial)}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setStep(2)} className="border border-black/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em]">
                        Voltar
                      </button>
                      <button type="submit" disabled={loading} className="bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-ivory disabled:opacity-50">
                        {loading ? "Enviando..." : "Confirmar solicitação"}
                      </button>
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
