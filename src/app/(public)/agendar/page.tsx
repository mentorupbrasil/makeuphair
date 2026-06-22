"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField, Input, Select } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

type Servico = {
  id: string;
  nome: string;
  duracaoMin: number;
  valorInicial: number;
};

const HORARIOS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    servicoId: "",
    data: "",
    hora: "",
    nome: "",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    fetch("/api/servicos")
      .then((r) => r.json())
      .then(setServicos);
  }, []);

  const servico = servicos.find((s) => s.id === form.servicoId);

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

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="mt-4 font-serif text-3xl text-brand-brown">Agendamento solicitado!</h1>
        <p className="mt-2 text-brand-taupe-dark">
          Recebemos sua solicitação. Em breve entraremos em contato para confirmar.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-serif text-4xl text-brand-brown">Agendar horário</h1>
      <p className="mt-2 text-brand-taupe-dark">Preencha os dados abaixo para reservar seu horário.</p>

      {/* Steps indicator */}
      <div className="mt-8 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${step >= s ? "bg-brand-taupe-dark" : "bg-brand-cream"}`}
          />
        ))}
      </div>

      <Card className="mt-8">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif font-medium text-brand-brown">1. Escolha o serviço</h2>
              <FormField label="Serviço" htmlFor="servico">
                <Select
                  id="servico"
                  required
                  value={form.servicoId}
                  onChange={(e) => setForm({ ...form, servicoId: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome} — {formatCurrency(s.valorInicial)}
                    </option>
                  ))}
                </Select>
              </FormField>
              {servico && (
                <p className="text-sm text-brand-taupe-dark">
                  Duração estimada: {servico.duracaoMin} minutos
                </p>
              )}
              <Button type="button" onClick={() => form.servicoId && setStep(2)} disabled={!form.servicoId}>
                Próximo
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif font-medium text-brand-brown">2. Data e horário</h2>
              <FormField label="Data" htmlFor="data">
                <Input
                  id="data"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                />
              </FormField>
              <FormField label="Horário" htmlFor="hora">
                <Select
                  id="hora"
                  required
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {HORARIOS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </Select>
              </FormField>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>Voltar</Button>
                <Button type="button" onClick={() => form.data && form.hora && setStep(3)} disabled={!form.data || !form.hora}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-serif font-medium text-brand-brown">3. Seus dados</h2>
              <FormField label="Nome completo" htmlFor="nome">
                <Input
                  id="nome"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </FormField>
              <FormField label="Telefone / WhatsApp" htmlFor="telefone">
                <Input
                  id="telefone"
                  required
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                />
              </FormField>
              <FormField label="E-mail (opcional)" htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </FormField>
              <div className="rounded-sm bg-brand-cream/50 p-4 text-sm text-brand-taupe-dark">
                <p><strong>Serviço:</strong> {servico?.nome}</p>
                <p><strong>Data:</strong> {form.data} às {form.hora}</p>
                {servico && <p><strong>Valor:</strong> {formatCurrency(servico.valorInicial)}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>Voltar</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Confirmar agendamento"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
