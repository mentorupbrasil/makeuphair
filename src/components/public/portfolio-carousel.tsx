"use client";

import { useState } from "react";
import Image from "next/image";
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

function PortfolioPhotos({
  fotos,
  alt,
  size,
  priority,
}: {
  fotos: TrabalhoItem["fotos"];
  alt: string;
  size: "compact" | "page";
  priority?: boolean;
}) {
  const frame = "relative aspect-[4/5] w-full overflow-hidden bg-white";

  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 gap-1.5 sm:gap-2",
        size === "compact" ? "max-w-[min(100%,720px)]" : "max-w-[min(100%,840px)]"
      )}
    >
      {fotos.slice(0, 3).map((f, i) => (
        <div key={f.id} className={frame}>
          {f.tipo === "VIDEO" ? (
            <video src={f.url} controls className="h-full w-full object-cover" />
          ) : (
            <Image
              src={f.url}
              alt={`${alt} — foto ${i + 1}`}
              fill
              className="object-cover"
              sizes={size === "compact" ? "(max-width: 640px) 30vw, 220px" : "(max-width: 768px) 30vw, 260px"}
              priority={priority && i === 0}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InstagramCaption({
  handle,
  nome,
  className,
}: {
  handle: string | null;
  nome: string | null;
  className?: string;
}) {
  const label = instagramLabel(handle, nome);
  const ig = instagramUrl(handle);

  if (ig) {
    return (
      <a
        href={ig}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-[10px] uppercase tracking-[0.32em] text-stone transition hover:text-gold",
          className
        )}
      >
        {label}
      </a>
    );
  }

  return (
    <span className={cn("text-[10px] uppercase tracking-[0.32em] text-stone", className)}>
      {label}
    </span>
  );
}

export function PortfolioCarousel({ trabalhos, limit }: { trabalhos: TrabalhoItem[]; limit?: number }) {
  const items = limit ? trabalhos.slice(0, limit) : trabalhos;
  const [current, setCurrent] = useState(0);

  if (items.length === 0) return null;

  const t = items[current];
  const label = instagramLabel(t.instagram, t.clienteNome);

  return (
    <div className="mt-10 md:mt-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <InstagramCaption handle={t.instagram} nome={t.clienteNome} className="mb-4" />

        <div className="relative w-full">
          <PortfolioPhotos
            fotos={t.fotos}
            alt={label}
            size="compact"
            priority={current === 0}
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}
                className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 border border-black/10 bg-ivory/95 p-2 shadow-sm transition hover:bg-white sm:-left-12"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrent((c) => (c + 1) % items.length)}
                className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 border border-black/10 bg-ivory/95 p-2 shadow-sm transition hover:bg-white sm:-right-12"
                aria-label="Próximo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {items.length > 1 && (
          <div className="mt-6 flex w-full max-w-[min(100%,720px)] items-center gap-4">
            <div className="flex flex-1 gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-0.5 flex-1 transition",
                    i === current ? "bg-gold" : "bg-black/10 hover:bg-black/20"
                  )}
                  aria-label={`Trabalho ${i + 1}`}
                />
              ))}
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-stone">
              {current + 1} / {items.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PortfolioGrid({ trabalhos }: { trabalhos: TrabalhoItem[] }) {
  return (
    <div className="mt-12 space-y-12 md:mt-14">
      {trabalhos.map((t) => {
        const label = instagramLabel(t.instagram, t.clienteNome);

        return (
          <article key={t.id} className="mx-auto w-full max-w-3xl">
            <InstagramCaption handle={t.instagram} nome={t.clienteNome} className="mb-4 block" />
            <PortfolioPhotos fotos={t.fotos} alt={label} size="page" />
          </article>
        );
      })}
    </div>
  );
}
