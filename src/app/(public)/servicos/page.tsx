import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";
import { Clock } from "lucide-react";

export default async function ServicosPage() {
  const servicos = await prisma.servico.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl text-stone-900">Serviços</h1>
      <p className="mt-2 text-stone-500">
        Conheça todos os serviços disponíveis e seus valores iniciais.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s) => (
          <Card key={s.id}>
            <p className="text-xs font-medium uppercase text-rose-500">
              {CATEGORIA_SERVICO_LABEL[s.categoria]}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-stone-900">{s.nome}</h2>
            <p className="mt-2 text-sm text-stone-600">{s.descricao}</p>
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
              <span className="flex items-center gap-1 text-sm text-stone-400">
                <Clock className="h-4 w-4" />
                {s.duracaoMin} min
              </span>
              <span className="font-semibold text-rose-600">
                a partir de {formatCurrency(s.valorInicial)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
