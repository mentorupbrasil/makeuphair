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
      <h1 className="font-serif text-4xl text-brand-brown">Serviços</h1>
      <p className="mt-2 text-brand-taupe-dark">
        Conheça todos os serviços disponíveis e seus valores iniciais.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s) => (
          <Card key={s.id}>
            <p className="text-xs font-medium uppercase tracking-wider text-brand-camel">
              {CATEGORIA_SERVICO_LABEL[s.categoria]}
            </p>
            <h2 className="mt-1 font-serif text-xl text-brand-brown">{s.nome}</h2>
            <p className="mt-2 text-sm text-brand-taupe-dark">{s.descricao}</p>
            <div className="mt-4 flex items-center justify-between border-t border-brand-cream pt-4">
              <span className="flex items-center gap-1 text-sm text-brand-taupe">
                <Clock className="h-4 w-4" />
                {s.duracaoMin} min
              </span>
              <span className="font-medium text-brand-brown">
                a partir de {formatCurrency(s.valorInicial)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
