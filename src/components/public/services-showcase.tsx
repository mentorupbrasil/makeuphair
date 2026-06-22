import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIA_SERVICO_LABEL } from "@/lib/constants";
import type { CategoriaServico } from "@/generated/prisma/client";

export type ServicoItem = {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: CategoriaServico;
  duracaoMin: number;
  valorInicial: number;
};

export function ServicesShowcase({
  servicos,
  variant = "dark",
  showAllLink = true,
}: {
  servicos: ServicoItem[];
  variant?: "dark" | "light";
  showAllLink?: boolean;
}) {
  const dark = variant === "dark";

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`section-label ${dark ? "text-gold-light" : ""}`}>Serviços</p>
          <h2
            className={`font-display mt-2 text-3xl font-light md:text-4xl ${
              dark ? "text-ivory" : "text-ink"
            }`}
          >
            Assinaturas de beleza
          </h2>
        </div>
        <p
          className={`max-w-sm text-sm leading-relaxed ${
            dark ? "text-ivory/55" : "text-stone"
          }`}
        >
          Técnica refinada, acabamento impecável e atendimento pensado para cada ocasião.
        </p>
      </div>

      <div className={`mt-10 ${dark ? "border-t border-ivory/10" : "border-t border-black/8"}`}>
        {servicos.length === 0 ? (
          <p className={`py-8 text-sm ${dark ? "text-ivory/50" : "text-stone"}`}>
            Nenhum serviço cadastrado no momento.
          </p>
        ) : (
          servicos.map((s, i) => (
          <article
            key={s.id}
            className={`group grid gap-5 border-b py-8 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-10 md:py-9 ${
              dark ? "border-ivory/10" : "border-black/5"
            }`}
          >
            <span
              className={`font-display text-2xl tabular-nums ${
                dark ? "text-gold/70" : "text-gold"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <p
                className={`text-[9px] uppercase tracking-[0.32em] ${
                  dark ? "text-gold-light/80" : "text-gold"
                }`}
              >
                {CATEGORIA_SERVICO_LABEL[s.categoria]}
              </p>
              <h3
                className={`font-display mt-1.5 text-2xl font-light transition md:text-[1.75rem] ${
                  dark ? "text-ivory group-hover:text-gold-light" : "text-ink"
                }`}
              >
                {s.nome}
              </h3>
              {s.descricao && (
                <p
                  className={`mt-2 max-w-lg text-sm leading-relaxed ${
                    dark ? "text-ivory/50" : "text-stone"
                  }`}
                >
                  {s.descricao}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-4 md:flex-col md:items-end md:gap-1">
              <p
                className={`font-display text-xl md:text-2xl ${
                  dark ? "text-ivory" : "text-ink"
                }`}
              >
                {formatCurrency(s.valorInicial)}
              </p>
              <p
                className={`text-[9px] uppercase tracking-[0.28em] ${
                  dark ? "text-ivory/35" : "text-stone"
                }`}
              >
                {s.duracaoMin} min
              </p>
            </div>
          </article>
          ))
        )}
      </div>

      {(showAllLink || servicos.length > 0) && (
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {showAllLink && (
            <Link
              href="/servicos"
              className={`text-[10px] uppercase tracking-[0.28em] transition ${
                dark
                  ? "text-ivory/70 hover:text-ivory"
                  : "text-ink hover:text-gold"
              }`}
            >
              Menu completo →
            </Link>
          )}
          <Link
            href="/agendar"
            className={`inline-block px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] transition ${
              dark
                ? "bg-ivory text-ink hover:bg-gold-light"
                : "bg-ink text-ivory hover:bg-ink-soft"
            }`}
          >
            Agendar horário
          </Link>
        </div>
      )}
    </div>
  );
}
