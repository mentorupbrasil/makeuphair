import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  STATUS_AGENDAMENTO_COLOR,
  STATUS_AGENDAMENTO_LABEL,
} from "@/lib/constants";
import { NovoAgendamentoForm } from "@/components/admin/novo-agendamento-form";
import { AgendaActions } from "@/components/admin/agenda-actions";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ semana?: string }>;
}) {
  const params = await searchParams;
  const baseDate = params.semana ? new Date(params.semana) : new Date();
  const inicio = startOfWeek(baseDate, { weekStartsOn: 0 });
  const fim = endOfWeek(baseDate, { weekStartsOn: 0 });

  const agendamentos = await prisma.agendamento.findMany({
    where: { data: { gte: inicio, lte: fim } },
    include: { cliente: true, servico: true },
    orderBy: [{ data: "asc" }, { horaInicio: "asc" }],
  });

  const servicos = await prisma.servico.findMany({ where: { ativo: true }, orderBy: { nome: "asc" } });

  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(inicio);
    d.setDate(d.getDate() + i);
    return d;
  });

  const prevWeek = subWeeks(inicio, 1).toISOString();
  const nextWeek = addWeeks(inicio, 1).toISOString();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-label">Operação</p>
          <h1 className="font-display mt-2 text-3xl font-light">Agenda</h1>
          <p className="mt-1 text-sm text-stone">Controle completo dos atendimentos</p>
        </div>
        <NovoAgendamentoForm servicos={servicos} />
      </div>
      <div className="mt-6 flex items-center justify-end gap-2">
        <Link href={`/admin/agenda?semana=${prevWeek}`} className="border border-black/10 p-2 hover:bg-ivory-muted">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-sm text-stone">
          {format(inicio, "d MMM", { locale: ptBR })} — {format(fim, "d MMM yyyy", { locale: ptBR })}
        </span>
        <Link href={`/admin/agenda?semana=${nextWeek}`} className="border border-black/10 p-2 hover:bg-ivory-muted">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-7">
        {dias.map((dia) => {
          const diaStr = format(dia, "yyyy-MM-dd");
          const doDia = agendamentos.filter(
            (a) => format(a.data, "yyyy-MM-dd") === diaStr
          );
          return (
            <div key={diaStr} className="min-h-[200px] rounded-xl border border-stone-200 bg-white p-3">
              <p className="mb-2 text-center text-sm font-semibold text-stone-700">
                {format(dia, "EEE", { locale: ptBR })}
                <br />
                <span className="text-lg">{format(dia, "d")}</span>
              </p>
              <div className="space-y-2">
                {doDia.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-sm border border-brand-cream bg-brand-cream/30 p-2 text-xs"
                  >
                    <p className="font-semibold text-stone-800">{a.horaInicio}</p>
                    <p className="text-stone-600">{a.cliente.nome}</p>
                    <p className="text-stone-500">{a.servico.nome}</p>
                    <Badge className={`mt-1 ${STATUS_AGENDAMENTO_COLOR[a.status]}`}>
                      {STATUS_AGENDAMENTO_LABEL[a.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 text-lg font-semibold text-stone-900">Todos os agendamentos da semana</h2>
      <div className="mt-4 space-y-3">
        {agendamentos.length === 0 && (
          <p className="text-stone-500">Nenhum agendamento nesta semana.</p>
        )}
        {agendamentos.map((a) => (
          <Card key={a.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <p><span className="text-stone-500">Cliente:</span> {a.cliente.nome}</p>
              <p><span className="text-stone-500">Serviço:</span> {a.servico.nome}</p>
              <p><span className="text-stone-500">Horário:</span> {formatDate(a.data)} {a.horaInicio} - {a.horaFim}</p>
              <p><span className="text-stone-500">Valor:</span> {formatCurrency(a.valor)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={STATUS_AGENDAMENTO_COLOR[a.status]}>
                {STATUS_AGENDAMENTO_LABEL[a.status]}
              </Badge>
              <AgendaActions agendamentoId={a.id} status={a.status} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
