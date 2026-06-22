import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrandLogo } from "@/components/public/brand-logo";
import { BRAND } from "@/lib/brand";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";
import { Star, Clock, MapPin } from "lucide-react";
import { whatsappUrl } from "@/lib/brand";

export default async function HomePage() {
  const [servicos, depoimentos, perfil] = await Promise.all([
    prisma.servico.findMany({
      where: { destaque: true, ativo: true },
      take: 4,
    }),
    prisma.depoimento.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      take: 3,
    }),
    prisma.perfil.findFirst(),
  ]);

  return (
    <>
      <section className="gradient-hero px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand-taupe-dark">
              Beleza & Elegância
            </p>
            <h1 className="font-serif text-4xl leading-tight text-brand-brown md:text-5xl">
              {perfil?.nome || BRAND.name}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-camel">
              {BRAND.tagline}
            </p>
            <p className="mt-4 text-lg text-brand-taupe-dark">
              {perfil?.bio || BRAND.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/agendar">
                <Button size="lg">Agendar horário</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Ver portfólio
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-white/60 shadow-xl backdrop-blur-sm">
            <div className="pattern-bg absolute inset-0 opacity-20" />
            <BrandLogo variant="stacked" className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-brand-brown">
            Serviços em destaque
          </h2>
          <p className="mt-2 text-center text-brand-taupe-dark">
            Escolha o serviço ideal para você
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicos.map((s) => (
              <Card key={s.id} className="flex flex-col gap-3 transition hover:shadow-md">
                <div className="flex h-32 items-center justify-center bg-brand-cream/50">
                  <Image
                    src={BRAND.assets.monogram}
                    alt=""
                    width={48}
                    height={48}
                    className="h-10 w-10 opacity-40"
                    aria-hidden
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-brand-camel">
                  {CATEGORIA_SERVICO_LABEL[s.categoria]}
                </p>
                <h3 className="font-serif font-medium text-brand-brown">{s.nome}</h3>
                <p className="flex-1 text-sm text-brand-taupe-dark line-clamp-2">
                  {s.descricao}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-brand-taupe">
                    <Clock className="h-3.5 w-3.5" />
                    {s.duracaoMin} min
                  </span>
                  <span className="font-medium text-brand-brown">
                    a partir de {formatCurrency(s.valorInicial)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/servicos">
              <Button variant="outline">Ver todos os serviços</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-brand-brown">Depoimentos</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d) => (
              <Card key={d.id}>
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: d.estrelas }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-camel text-brand-camel" />
                  ))}
                </div>
                <p className="text-sm text-brand-taupe-dark">&ldquo;{d.texto}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-brand-brown">— {d.nome}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-brand-brown">Contato</h2>
          <p className="mt-2 text-center text-brand-taupe-dark">
            Visite o studio ou fale com a Bianca
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <MapPin className="mx-auto h-6 w-6 text-brand-camel" />
              <p className="mt-3 text-sm font-medium text-brand-brown">Studio</p>
              <a
                href={BRAND.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-brand-taupe-dark hover:text-brand-brown"
              >
                {BRAND.contact.address}
              </a>
            </Card>
            <Card className="text-center">
              <p className="text-2xl text-brand-camel">📱</p>
              <p className="mt-3 text-sm font-medium text-brand-brown">WhatsApp</p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-brand-taupe-dark hover:text-brand-brown"
              >
                {BRAND.contact.whatsappDisplay}
              </a>
            </Card>
            <Card className="text-center">
              <p className="text-2xl text-brand-camel">📷</p>
              <p className="mt-3 text-sm font-medium text-brand-brown">Instagram</p>
              <a
                href={BRAND.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-brand-taupe-dark hover:text-brand-brown"
              >
                {BRAND.contact.instagramHandle}
              </a>
            </Card>
          </div>
        </div>
      </section>

      <section className="pattern-bg px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-sm bg-white/90 p-10 text-center backdrop-blur-sm">
          <h2 className="font-serif text-3xl text-brand-brown">Pronta para brilhar?</h2>
          <p className="mt-3 text-brand-taupe-dark">
            Agende seu horário online de forma rápida e prática.
          </p>
          <Link href="/agendar" className="mt-6 inline-block">
            <Button size="lg">Agendar horário</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
