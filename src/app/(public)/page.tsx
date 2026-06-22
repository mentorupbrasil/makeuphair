import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/public/hero-carousel";
import { SiteFooter } from "@/components/public/site-chrome";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";
import { BRAND, whatsappUrl } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [midias, servicos, depoimentos, perfil] = await Promise.all([
    prisma.midia.findMany({
      where: { ativo: true },
      orderBy: [{ destaqueHome: "desc" }, { ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.servico.findMany({
      where: { destaque: true, ativo: true },
      take: 3,
    }),
    prisma.depoimento.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      take: 3,
    }),
    prisma.perfil.findFirst(),
  ]);

  const heroSlides = midias.filter((m) => m.destaqueHome);
  const gallery = midias.filter((m) => !m.destaqueHome || midias.length <= 3);

  return (
    <>
      <HeroCarousel slides={heroSlides.length > 0 ? heroSlides : midias.slice(0, 5)} />

      {/* Sobre */}
      <section className="border-b border-black/5 bg-ivory py-24 md:py-32">
        <div className="editorial-container grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="section-label">Sobre</p>
            <div className="divider-gold mt-4" />
            <h2 className="font-display mt-8 text-4xl font-light leading-tight md:text-5xl">
              {perfil?.nome || BRAND.name}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-stone md:text-base">
              {perfil?.bio || BRAND.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "500+", l: "Clientes atendidas" },
              { n: "Noivas", l: "Especialidade" },
              { n: "100%", l: "Dedicação" },
              { n: "MA", l: "Imperatriz & região" },
            ].map((s) => (
              <div key={s.l} className="border border-black/5 p-6 text-center">
                <p className="font-display text-2xl text-ink">{s.n}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trabalhos */}
      <section id="trabalhos" className="bg-ivory-muted py-24 md:py-32">
        <div className="editorial-container">
          <p className="section-label">Portfólio</p>
          <h2 className="font-display mt-4 text-4xl font-light md:text-5xl">Trabalhos recentes</h2>
          {gallery.length === 0 ? (
            <p className="mt-12 text-stone">
              Em breve novos trabalhos. A Bianca está preparando o portfólio.
            </p>
          ) : (
            <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((m) => (
                <div key={m.id} className="mb-4 break-inside-avoid overflow-hidden">
                  {m.tipo === "VIDEO" ? (
                    <video src={m.url} controls className="w-full" />
                  ) : (
                    <Image
                      src={m.url}
                      alt={m.titulo || "Trabalho"}
                      width={600}
                      height={800}
                      className="w-full object-cover transition duration-500 hover:scale-[1.02]"
                    />
                  )}
                  {m.titulo && (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-stone">{m.titulo}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Serviços */}
      <section className="border-y border-black/5 bg-ivory py-24 md:py-32">
        <div className="editorial-container">
          <p className="section-label">Serviços</p>
          <h2 className="font-display mt-4 text-4xl font-light">Experiências exclusivas</h2>
          <div className="mt-12 divide-y divide-black/5">
            {servicos.map((s) => (
              <div key={s.id} className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    {CATEGORIA_SERVICO_LABEL[s.categoria]}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-light">{s.nome}</h3>
                  <p className="mt-2 max-w-lg text-sm text-stone">{s.descricao}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl">{formatCurrency(s.valorInicial)}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone">{s.duracaoMin} min</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/servicos"
            className="mt-8 inline-block border-b border-ink pb-1 text-[10px] uppercase tracking-[0.3em] text-ink"
          >
            Ver todos os serviços
          </Link>
        </div>
      </section>

      {/* Depoimentos */}
      {depoimentos.length > 0 && (
        <section className="bg-ink py-24 text-ivory md:py-32">
          <div className="editorial-container">
            <p className="section-label text-gold-light">Depoimentos</p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {depoimentos.map((d) => (
                <blockquote key={d.id} className="border-l border-gold/40 pl-6">
                  <p className="font-display text-xl font-light italic leading-relaxed">
                    &ldquo;{d.texto}&rdquo;
                  </p>
                  <footer className="mt-4 text-[10px] uppercase tracking-[0.25em] text-ivory/50">
                    — {d.nome}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ivory py-24 text-center md:py-32">
        <div className="editorial-container max-w-2xl">
          <h2 className="font-display text-4xl font-light md:text-5xl">Pronta para o seu momento?</h2>
          <p className="mt-4 text-stone">Agende sua produção ou solicite um orçamento personalizado.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/agendar"
              className="bg-ink px-10 py-4 text-[10px] uppercase tracking-[0.25em] text-ivory hover:bg-ink-soft"
            >
              Agendar horário
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/20 px-10 py-4 text-[10px] uppercase tracking-[0.25em] text-ink hover:bg-ink hover:text-ivory"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
