import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardTitle } from "@/components/ui/card";
import { CATEGORIA_DESPESA_LABEL, FORMA_PAGAMENTO_LABEL } from "@/lib/constants";
import { startOfMonth, endOfMonth } from "date-fns";

export default async function FinanceiroPage() {
  const now = new Date();
  const mesInicio = startOfMonth(now);
  const mesFim = endOfMonth(now);

  const [receitas, despesas, totalReceitas, totalDespesas] = await Promise.all([
    prisma.receita.findMany({
      where: { data: { gte: mesInicio, lte: mesFim } },
      include: { cliente: true },
      orderBy: { data: "desc" },
    }),
    prisma.despesa.findMany({
      where: { data: { gte: mesInicio, lte: mesFim } },
      orderBy: { data: "desc" },
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

  const receita = totalReceitas._sum.valor || 0;
  const despesa = totalDespesas._sum.valor || 0;
  const maxBar = Math.max(receita, despesa, 1);

  return (
    <div>
      <p className="section-label">Financeiro</p>
      <h1 className="font-display mt-2 text-3xl font-light">Financeiro</h1>
      <p className="mt-1 text-sm text-stone">Controle de entradas, saídas e relatórios</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-stone-500">Faturamento do mês</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(receita)}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-500">Gastos do mês</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(despesa)}</p>
        </Card>
        <Card>
          <p className="text-sm text-stone-500">Lucro líquido</p>
          <p className="text-2xl font-bold text-stone-900">{formatCurrency(receita - despesa)}</p>
        </Card>
      </div>

      <Card className="mt-6">
        <CardTitle>Relatório visual</CardTitle>
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Faturamento</span>
              <span>{formatCurrency(receita)}</span>
            </div>
            <div className="bar-bg"><div className="bar-fill" style={{ width: `${(receita / maxBar) * 100}%` }} /></div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Gastos</span>
              <span>{formatCurrency(despesa)}</span>
            </div>
            <div className="bar-bg"><div className="bar-fill bg-stone-400" style={{ width: `${(despesa / maxBar) * 100}%` }} /></div>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Entradas</h2>
          <div className="mt-3 space-y-2">
            {receitas.map((r) => (
              <Card key={r.id} className="p-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{r.descricao}</p>
                    <p className="text-stone-500">{formatDate(r.data)} · {FORMA_PAGAMENTO_LABEL[r.formaPagamento]}</p>
                    {r.cliente && <p className="text-stone-400">{r.cliente.nome}</p>}
                  </div>
                  <p className="font-semibold text-emerald-600">{formatCurrency(r.valor)}</p>
                </div>
              </Card>
            ))}
            {receitas.length === 0 && <p className="text-sm text-stone-500">Nenhuma entrada este mês.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Saídas</h2>
          <div className="mt-3 space-y-2">
            {despesas.map((d) => (
              <Card key={d.id} className="p-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{d.descricao}</p>
                    <p className="text-stone-500">{formatDate(d.data)} · {CATEGORIA_DESPESA_LABEL[d.categoria]}</p>
                  </div>
                  <p className="font-semibold text-red-600">-{formatCurrency(d.valor)}</p>
                </div>
              </Card>
            ))}
            {despesas.length === 0 && <p className="text-sm text-stone-500">Nenhuma saída este mês.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
