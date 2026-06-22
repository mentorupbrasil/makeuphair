import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";

export default async function ServicosPage() {
  const servicos = await prisma.servico.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" },
  });

  return (
    <>
      <SiteHeader />
      <main className="py-24 md:py-32">
        <div className="editorial-container">
          <p className="section-label">Serviços</p>
          <h1 className="font-display mt-4 text-5xl font-light">Menu de experiências</h1>
          <div className="mt-16 divide-y divide-black/5">
            {servicos.map((s) => (
              <div key={s.id} className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    {CATEGORIA_SERVICO_LABEL[s.categoria]}
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-light">{s.nome}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">{s.descricao}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-stone">{s.duracaoMin} minutos</p>
                </div>
                <p className="font-display text-3xl">{formatCurrency(s.valorInicial)}</p>
              </div>
            ))}
          </div>
          <Link
            href="/agendar"
            className="mt-12 inline-block bg-ink px-10 py-4 text-[10px] uppercase tracking-[0.25em] text-ivory"
          >
            Agendar horário
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
