import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatCard, Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  STATUS_AGENDAMENTO_COLOR,
  STATUS_AGENDAMENTO_LABEL,
} from "@/lib/constants";
import {
  Calendar,
  Wallet,
  Package,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export default async function DashboardPage() {
  const now = new Date();
  const hojeInicio = startOfDay(now);
  const hojeFim = endOfDay(now);
  const mesInicio = startOfMonth(now);
  const mesFim = endOfMonth(now);

  const [
    agendamentosHoje,
    receitasHoje,
    produtosBaixo,
    proximoAgendamento,
    receitasMes,
    despesasMes,
  ] = await Promise.all([
    prisma.agendamento.count({
      where: { data: { gte: hojeInicio, lte: hojeFim }, status: { not: "CANCELADO" } },
    }),
    prisma.receita.aggregate({
      where: { data: { gte: hojeInicio, lte: hojeFim } },
      _sum: { valor: true },
    }),
    prisma.produto.findMany(),
    prisma.agendamento.findFirst({
      where: { data: { gte: now }, status: { in: ["PENDENTE", "CONFIRMADO"] } },
      orderBy: [{ data: "asc" }],
      include: { cliente: true, servico: true },
    }),
    prisma.receita.aggregate({
      where: { data: { gte: mesInicio, lte: mesFim } },
      _sum: { valor: true },
    }),
    prisma.despesa.aggregate({
      where: { data: { gte: mesInicio, lte: mesFim } },
      _sum: { valor: true },
    }),
  ]);

  const produtosAlerta = produtosBaixo.filter((p) => p.quantidade <= p.estoqueMinimo);
  const receitaMes = receitasMes._sum.valor || 0;
  const despesaMes = despesasMes._sum.valor || 0;
  const lucroMes = receitaMes - despesaMes;
  const faturamentoHoje = receitasHoje._sum.valor || 0;

  const maxBar = Math.max(receitaMes, despesaMes, 1);

  return (
    <div>
      <h1 className="section-label">Visão geral</h1>
      <h2 className="font-display mt-2 text-3xl font-light">Dashboard</h2>
      <p className="mt-1 text-sm text-stone">Resumo do seu negócio</p>

      <h3 className="mt-10 text-[10px] uppercase tracking-[0.25em] text-stone">Hoje</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Atendimentos"
          value={String(agendamentosHoje)}
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          label="Faturamento"
          value={formatCurrency(faturamentoHoje)}
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatCard
          label="Produtos acabando"
          value={String(produtosAlerta.length)}
          icon={<Package className="h-5 w-5" />}
          trend={produtosAlerta.length > 0 ? produtosAlerta.map((p) => p.nome).join(", ") : "Tudo ok"}
        />
        <StatCard
          label="Próximo cliente"
          value={proximoAgendamento ? proximoAgendamento.horaInicio : "—"}
          icon={<Clock className="h-5 w-5" />}
          trend={proximoAgendamento?.cliente.nome}
        />
      </div>

      <h3 className="mt-10 text-[10px] uppercase tracking-[0.25em] text-stone">Mês</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Receita"
          value={formatCurrency(receitaMes)}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          label="Gastos"
          value={formatCurrency(despesaMes)}
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <StatCard
          label="Lucro"
          value={formatCurrency(lucroMes)}
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      <Card className="mt-8">
        <CardTitle>Relatório do mês</CardTitle>
        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-stone-600">Faturamento</span>
              <span className="font-medium">{formatCurrency(receitaMes)}</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: `${(receitaMes / maxBar) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-stone-600">Gastos</span>
              <span className="font-medium">{formatCurrency(despesaMes)}</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill bg-stone-400" style={{ width: `${(despesaMes / maxBar) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-stone-600">Lucro líquido</span>
              <span className="font-medium text-emerald-600">{formatCurrency(lucroMes)}</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill bg-emerald-500" style={{ width: `${(Math.max(lucroMes, 0) / maxBar) * 100}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {proximoAgendamento && (
        <Card className="mt-6">
          <CardTitle>Próximo atendimento</CardTitle>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="text-stone-500">Cliente:</span> {proximoAgendamento.cliente.nome}</p>
            <p><span className="text-stone-500">Serviço:</span> {proximoAgendamento.servico.nome}</p>
            <p><span className="text-stone-500">Data:</span> {formatDate(proximoAgendamento.data)}</p>
            <p><span className="text-stone-500">Horário:</span> {proximoAgendamento.horaInicio} - {proximoAgendamento.horaFim}</p>
            <p><span className="text-stone-500">Valor:</span> {formatCurrency(proximoAgendamento.valor)}</p>
            <p>
              <Badge className={STATUS_AGENDAMENTO_COLOR[proximoAgendamento.status]}>
                {STATUS_AGENDAMENTO_LABEL[proximoAgendamento.status]}
              </Badge>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
