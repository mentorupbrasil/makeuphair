import { prisma } from "@/lib/prisma";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";
import { ServicesShowcase } from "@/components/public/services-showcase";

export default async function ServicosPage() {
  const servicos = await prisma.servico.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" },
  });

  return (
    <>
      <SiteHeader />
      <main className="bg-ink py-14 text-ivory md:py-20">
        <div className="editorial-container">
          <ServicesShowcase servicos={servicos} variant="dark" showAllLink={false} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
