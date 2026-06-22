import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

const STATUS_EVENTO = {
  ORCAMENTO: "Orçamento",
  CONFIRMADO: "Confirmado",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export default async function EventosPage() {
  const eventos = await prisma.evento.findMany({
    include: { cliente: true, checklist: { orderBy: { ordem: "asc" } } },
    orderBy: { data: "asc" },
  });

  return (
    <div>
      <p className="section-label">Eventos</p>
      <h1 className="font-display mt-2 text-3xl font-light">Noivas & eventos</h1>
      <p className="mt-1 text-sm text-stone">Fichas de eventos, pacotes e checklists</p>

      <div className="mt-6 space-y-4">
        {eventos.map((e) => {
          const restante = e.valorTotal - e.valorEntrada;
          return (
            <Card key={e.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-stone-900">{e.titulo}</h2>
                    <Badge className="bg-rose-100 text-rose-800">{STATUS_EVENTO[e.status]}</Badge>
                  </div>
                  <div className="mt-2 grid gap-1 text-sm text-stone-600 sm:grid-cols-2">
                    <p><span className="text-stone-500">Noiva/Cliente:</span> {e.cliente.nome}</p>
                    <p><span className="text-stone-500">Data:</span> {formatDate(e.data)}</p>
                    <p><span className="text-stone-500">Local:</span> {e.local || "—"}</p>
                    <p><span className="text-stone-500">Pacote:</span> {e.pacote || "—"}</p>
                    <p><span className="text-stone-500">Valor:</span> {formatCurrency(e.valorTotal)}</p>
                    <p><span className="text-stone-500">Entrada:</span> {formatCurrency(e.valorEntrada)}</p>
                    <p><span className="text-stone-500">Restante:</span> {formatCurrency(restante)}</p>
                  </div>
                </div>
                <div className="min-w-[220px]">
                  <p className="text-sm font-medium text-stone-700">Checklist</p>
                  <ul className="mt-2 space-y-1">
                    {e.checklist.map((item) => (
                      <li key={item.id} className="flex items-center gap-2 text-sm text-stone-600">
                        {item.concluido ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-stone-300" />
                        )}
                        {item.titulo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
        {eventos.length === 0 && (
          <p className="text-stone-500">Nenhum evento cadastrado.</p>
        )}
      </div>
    </div>
  );
}
