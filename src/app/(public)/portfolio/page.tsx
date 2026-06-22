import { prisma } from "@/lib/prisma";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";
import { PortfolioGrid } from "@/components/public/portfolio-carousel";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const trabalhos = await prisma.trabalho.findMany({
    where: { ativo: true },
    include: { fotos: { orderBy: { ordem: "asc" } } },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <SiteHeader />
      <main className="py-14 md:py-20">
        <div className="editorial-container">
          <p className="section-label">Portfólio</p>
          <h1 className="font-display mt-4 text-5xl font-light">Trabalhos selecionados</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
            Maquiagem, penteados, noivas e produções para eventos — cada look pensado para realçar sua beleza.
          </p>

          {trabalhos.length === 0 ? (
            <p className="mt-16 text-stone">Galeria em atualização. Em breve novas imagens.</p>
          ) : (
            <PortfolioGrid trabalhos={trabalhos} />
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
