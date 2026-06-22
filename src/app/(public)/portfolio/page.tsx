import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SiteHeader, SiteFooter } from "@/components/public/site-chrome";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const midias = await prisma.midia.findMany({
    where: { ativo: true },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <SiteHeader />
      <main className="py-24 md:py-32">
        <div className="editorial-container">
          <p className="section-label">Portfólio</p>
          <h1 className="font-display mt-4 text-5xl font-light">Trabalhos selecionados</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
            Maquiagem, penteados, noivas e produções para eventos — cada look pensado para realçar sua beleza.
          </p>

          {midias.length === 0 ? (
            <p className="mt-16 text-stone">Galeria em atualização. Em breve novas imagens.</p>
          ) : (
            <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {midias.map((m) => (
                <div key={m.id} className="mb-4 break-inside-avoid overflow-hidden bg-ivory-muted">
                  {m.tipo === "VIDEO" ? (
                    <video src={m.url} controls className="w-full" />
                  ) : (
                    <Image src={m.url} alt={m.titulo || "Trabalho"} width={800} height={1000} className="w-full object-cover" />
                  )}
                  {m.titulo && <p className="p-4 text-[10px] uppercase tracking-[0.2em] text-stone">{m.titulo}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
