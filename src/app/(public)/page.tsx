import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/public/hero-carousel";
import { SiteFooter } from "@/components/public/site-chrome";
import { ServicesShowcase } from "@/components/public/services-showcase";
import { TestimonialsBand } from "@/components/public/testimonials-band";
import { BookingCta } from "@/components/public/booking-cta";
import { PortfolioCarousel } from "@/components/public/portfolio-carousel";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [trabalhos, midiasHero, servicos, depoimentos, perfil] = await Promise.all([
    prisma.trabalho.findMany({
      where: { ativo: true },
      include: { fotos: { orderBy: { ordem: "asc" } } },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.midia.findMany({
      where: { ativo: true, destaqueHome: true },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.servico.findMany({
      where: { ativo: true, destaque: true },
      take: 3,
    }).then(async (destaques) => {
      if (destaques.length > 0) return destaques;
      return prisma.servico.findMany({ where: { ativo: true }, take: 3, orderBy: { nome: "asc" } });
    }),
    prisma.depoimento.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      take: 3,
    }),
    prisma.perfil.findFirst(),
  ]);

  // Hero: só itens marcados explicitamente — nunca preenche com todo o portfólio
  const heroFromTrabalhos = trabalhos
    .filter((t) => t.destaqueHome && t.fotos[0])
    .map((t) => ({
      id: t.id,
      url: t.fotos[0].url,
      tipo: t.fotos[0].tipo,
      titulo: t.instagram || t.clienteNome,
    }));
  const heroItems = [...heroFromTrabalhos, ...midiasHero];
  const portfolioItems = trabalhos;

  return (
    <>
      <HeroCarousel slides={heroItems} />

      {/* Sobre */}
      <section className="border-b border-black/5 bg-ivory py-12 md:py-16">
        <div className="editorial-container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="section-label">Sobre</p>
              <h2 className="font-display mt-3 text-4xl font-light leading-[1.1] md:text-[2.75rem]">
                {perfil?.nome || BRAND.name}
              </h2>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-stone">
                Makeup & Hair · Imperatriz, MA
              </p>
            </div>
            <div className="md:col-span-8 md:border-l md:border-gold/25 md:pl-12">
              <p className="font-display text-xl font-light italic leading-relaxed text-ink/90 md:text-2xl">
                &ldquo;{perfil?.bio || BRAND.description}&rdquo;
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/5 pt-6">
                {[
                  "Noivas & eventos",
                  "Produção completa",
                  "Atendimento personalizado",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-stone"
                  >
                    <span className="h-px w-4 bg-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trabalhos */}
      <section id="trabalhos" className="bg-ivory-muted py-16 md:py-20">
        <div className="editorial-container">
          <p className="section-label">Portfólio</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl font-light md:text-5xl">Trabalhos recentes</h2>
            {portfolioItems.length > 0 && (
              <Link href="/portfolio" className="text-[10px] uppercase tracking-[0.28em] text-stone transition hover:text-ink">
                Ver portfólio completo →
              </Link>
            )}
          </div>
          {portfolioItems.length === 0 ? (
            <p className="mt-12 text-stone">
              Em breve novos trabalhos. A Bianca está preparando o portfólio.
            </p>
          ) : (
            <PortfolioCarousel trabalhos={portfolioItems} limit={6} />
          )}
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-ink py-14 text-ivory md:py-20">
        <div className="editorial-container">
          <ServicesShowcase servicos={servicos} variant="dark" />
        </div>
      </section>

      <TestimonialsBand depoimentos={depoimentos} />

      <BookingCta />

      <SiteFooter />
    </>
  );
}
