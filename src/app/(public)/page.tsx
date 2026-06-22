import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";
import { Star, Clock, Sparkles } from "lucide-react";

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
      {/* Hero */}
      <section className="gradient-hero px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-rose-500">
              Beleza & Elegância
            </p>
            <h1 className="font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
              {perfil?.nome || "Studio MakeupHair"}
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              {perfil?.bio ||
                "Maquiagem e penteados profissionais para transformar seus momentos especiais."}
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
          <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-rose-100 to-amber-50 shadow-xl">
            <div className="text-center">
              <Sparkles className="mx-auto h-16 w-16 text-rose-400" />
              <p className="mt-4 font-serif text-xl text-rose-800">Sua beleza, nossa arte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços em destaque */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-stone-900">Serviços em destaque</h2>
          <p className="mt-2 text-center text-stone-500">Escolha o serviço ideal para você</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicos.map((s) => (
              <Card key={s.id} className="flex flex-col gap-3 transition hover:shadow-md">
                <div className="flex h-32 items-center justify-center rounded-xl bg-rose-50">
                  <Sparkles className="h-8 w-8 text-rose-300" />
                </div>
                <p className="text-xs font-medium uppercase text-rose-500">
                  {CATEGORIA_SERVICO_LABEL[s.categoria]}
                </p>
                <h3 className="font-semibold text-stone-900">{s.nome}</h3>
                <p className="flex-1 text-sm text-stone-500 line-clamp-2">{s.descricao}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="h-3.5 w-3.5" />
                    {s.duracaoMin} min
                  </span>
                  <span className="font-semibold text-rose-600">
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

      {/* Depoimentos */}
      <section className="bg-rose-50/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-stone-900">Depoimentos</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d) => (
              <Card key={d.id}>
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: d.estrelas }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-600">&ldquo;{d.texto}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-stone-800">— {d.nome}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-stone-900">Pronta para brilhar?</h2>
          <p className="mt-3 text-stone-500">
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
