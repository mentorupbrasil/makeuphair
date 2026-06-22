"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrabalhoItem = {
  id: string;
  instagram: string | null;
  clienteNome: string | null;
  fotos: { id: string; url: string; tipo: string }[];
};

function instagramLabel(handle: string | null, nome: string | null) {
  if (handle) {
    const clean = handle.replace(/^@/, "").trim();
    return `@${clean}`;
  }
  return nome || "Cliente";
}

function instagramUrl(handle: string | null) {
  if (!handle) return null;
  const clean = handle.replace(/^@/, "").trim();
  return clean ? `https://www.instagram.com/${clean}/` : null;
}

export function PortfolioCarousel({ trabalhos, limit }: { trabalhos: TrabalhoItem[]; limit?: number }) {
  const items = limit ? trabalhos.slice(0, limit) : trabalhos;
  const [current, setCurrent] = useState(0);

  if (items.length === 0) return null;

  const t = items[current];
  const ig = instagramUrl(t.instagram);

  return (
    <div className="mt-12">
      <div className="grid gap-3 md:grid-cols-2">
        {t.fotos.slice(0, 2).map((f, i) => (
          <div key={f.id} className="relative aspect-[3/4] overflow-hidden bg-ivory-muted">
            {f.tipo === "VIDEO" ? (
              <video src={f.url} controls className="h-full w-full object-cover" />
            ) : (
              <Image
                src={f.url}
                alt={instagramLabel(t.instagram, t.clienteNome)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={current === 0 && i === 0}
              />
            )}
          </div>
        ))}
        {t.fotos.length === 1 && <div className="hidden aspect-[3/4] bg-ivory-muted md:block" />}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-6">
        {ig ? (
          <a
            href={ig}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-lg text-ink transition hover:text-gold"
          >
            {instagramLabel(t.instagram, t.clienteNome)}
          </a>
        ) : (
          <span className="font-display text-lg text-stone">{instagramLabel(t.instagram, t.clienteNome)}</span>
        )}

        {items.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}
              className="border border-black/10 p-2 hover:bg-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone">
              {current + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % items.length)}
              className="border border-black/10 p-2 hover:bg-white"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn("h-0.5 flex-1 transition", i === current ? "bg-gold" : "bg-black/10")}
              aria-label={`Trabalho ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PortfolioGrid({ trabalhos }: { trabalhos: TrabalhoItem[] }) {
  return (
    <div className="mt-16 space-y-16">
      {trabalhos.map((t) => {
        const ig = instagramUrl(t.instagram);
        const label = instagramLabel(t.instagram, t.clienteNome);
        return (
          <article key={t.id}>
            <div className="grid gap-3 md:grid-cols-2">
              {t.fotos.slice(0, 2).map((f) => (
                <div key={f.id} className="relative aspect-[3/4] overflow-hidden bg-ivory-muted">
                  {f.tipo === "VIDEO" ? (
                    <video src={f.url} controls className="h-full w-full object-cover" />
                  ) : (
                    <Image src={f.url} alt={label} fill className="object-cover" sizes="50vw" />
                  )}
                </div>
              ))}
            </div>
            {ig ? (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-stone transition hover:text-gold"
              >
                {label}
              </a>
            ) : (
              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-stone">{label}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
