"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/public/logo";
import { PublicNav } from "@/components/public/public-nav";
import { OwnerLoginLink } from "@/components/public/site-chrome";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Slide = { id: string; url: string; tipo: string; titulo: string | null };

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const items = slides.length > 0 ? slides : [];

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      {items.length > 0 ? (
        items.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            {slide.tipo === "VIDEO" ? (
              <video
                src={slide.url}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={slide.url}
                alt={slide.titulo || "Portfolio Bianca Brito"}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            )}
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-soft via-ink to-black" />
      )}

      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="editorial-container relative flex items-center justify-between py-8">
          <Logo variant="light" />
          <div className="flex items-center gap-2 sm:gap-3">
            <OwnerLoginLink
              variant="light"
              className="hidden shrink-0 border-ivory/30 text-ivory/80 hover:border-ivory hover:text-ivory lg:inline-flex"
            />
            <PublicNav variant="light" />
          </div>
        </header>

        <div className="editorial-container flex flex-1 flex-col justify-end pb-12 md:pb-16">
          <p className="section-label text-gold-light">Imperatriz — MA</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl font-light leading-[1.05] text-ivory md:text-7xl lg:text-8xl">
            Beleza que<br />
            <span className="italic">transcende</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/70">
            {BRAND.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/agendar"
              className="bg-ivory px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] text-ink transition hover:bg-gold-light"
            >
              Reservar horário
            </Link>
            <a
              href={whatsappUrl("Olá Bianca! Gostaria de saber mais sobre seus serviços.")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ivory/30 px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] text-ivory transition hover:border-ivory"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {items.length > 1 && (
          <div className="editorial-container flex gap-2 pb-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-0.5 flex-1 transition-all",
                  i === current ? "bg-gold" : "bg-ivory/30"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
