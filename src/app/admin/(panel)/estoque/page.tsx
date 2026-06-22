import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export default async function EstoquePage() {
  const produtos = await prisma.produto.findMany({
    include: { movimentacoes: { orderBy: { data: "desc" }, take: 3 } },
    orderBy: { nome: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Estoque</h1>
      <p className="text-stone-500">Controle de produtos, validade e alertas</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => {
          const baixo = p.quantidade <= p.estoqueMinimo;
          const vencido = p.validade && new Date(p.validade) < new Date();
          return (
            <Card key={p.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-stone-900">{p.nome}</h2>
                  {p.marca && <p className="text-sm text-stone-500">{p.marca}</p>}
                </div>
                {baixo && (
                  <Badge className="bg-amber-100 text-amber-800">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Estoque baixo
                  </Badge>
                )}
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <p><span className="text-stone-500">Qtd:</span> {p.quantidade} {p.unidade}</p>
                <p><span className="text-stone-500">Mínimo:</span> {p.estoqueMinimo}</p>
                {p.validade && (
                  <p className={vencido ? "text-red-600" : ""}>
                    <span className="text-stone-500">Validade:</span> {formatDate(p.validade)}
                    {vencido && " (VENCIDO)"}
                  </p>
                )}
              </div>
              {p.movimentacoes.length > 0 && (
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <p className="text-xs font-medium text-stone-500">Últimas movimentações</p>
                  {p.movimentacoes.map((m) => (
                    <p key={m.id} className="text-xs text-stone-400">
                      {formatDate(m.data)} — {m.tipo} — {m.quantidade}
                    </p>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
        {produtos.length === 0 && (
          <p className="text-stone-500">Nenhum produto cadastrado.</p>
        )}
      </div>
    </div>
  );
}
