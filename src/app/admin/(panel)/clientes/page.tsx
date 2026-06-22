import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default async function ClientesPage() {
  const clientes = await prisma.cliente.findMany({
    include: {
      agendamentos: {
        include: { servico: true },
        orderBy: { data: "desc" },
        take: 5,
      },
    },
    orderBy: { nome: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Clientes</h1>
      <p className="text-stone-500">CRM — cadastro e histórico de atendimentos</p>

      <div className="mt-6 space-y-4">
        {clientes.map((c) => {
          let prefs = { gosta: [] as string[], naoGosta: [] as string[] };
          try {
            if (c.preferencias) prefs = JSON.parse(c.preferencias);
          } catch { /* ignore */ }

          return (
            <Card key={c.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-stone-900">{c.nome}</h2>
                  <div className="mt-1 space-y-0.5 text-sm text-stone-500">
                    <p>{c.telefone}</p>
                    {c.instagram && <p>{c.instagram}</p>}
                    {c.aniversario && <p>Aniversário: {formatDate(c.aniversario)}</p>}
                  </div>
                  {(prefs.gosta?.length > 0 || prefs.naoGosta?.length > 0) && (
                    <div className="mt-3 text-sm">
                      {prefs.gosta?.length > 0 && (
                        <p><span className="font-medium text-emerald-700">Gosta:</span> {prefs.gosta.join(", ")}</p>
                      )}
                      {prefs.naoGosta?.length > 0 && (
                        <p><span className="font-medium text-red-600">Não gosta:</span> {prefs.naoGosta.join(", ")}</p>
                      )}
                    </div>
                  )}
                  {c.observacoes && (
                    <p className="mt-2 text-sm text-stone-500">{c.observacoes}</p>
                  )}
                </div>
                <div className="min-w-[240px]">
                  <p className="text-sm font-medium text-stone-700">Histórico</p>
                  {c.agendamentos.length === 0 ? (
                    <p className="mt-1 text-sm text-stone-400">Sem atendimentos</p>
                  ) : (
                    <ul className="mt-2 space-y-1">
                      {c.agendamentos.map((a) => (
                        <li key={a.id} className="text-sm text-stone-600">
                          {formatDate(a.data)} — {a.servico.nome} — {formatCurrency(a.valor)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {clientes.length === 0 && (
          <p className="text-stone-500">Nenhum cliente cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
