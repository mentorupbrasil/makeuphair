import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, whatsappUrl } from "@/lib/brand";

export function BookingCta() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-black/5 bg-ivory">
      <div className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-display text-[14rem] font-light leading-none text-black/[0.02] md:block">
        BB
      </div>

      <div className="editorial-container relative py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="section-label">Agende</p>
            <h2 className="font-display mt-4 text-[2.5rem] font-light leading-[1.08] text-ink md:text-5xl lg:text-[3.25rem]">
              Sua beleza merece
              <br />
              <span className="italic text-gold">tempo e cuidado</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone md:text-[15px]">
              Produções para noivas, eventos e ocasiões especiais. Entre em contato para
              reservar horário ou solicitar um orçamento sob medida.
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="border-t border-gold/40 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <div className="space-y-7">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-gold">WhatsApp</p>
                  <a
                    href={whatsappUrl("Olá Bianca! Gostaria de agendar uma produção.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex items-center gap-2 font-display text-2xl text-ink transition hover:text-gold md:text-3xl"
                  >
                    {BRAND.contact.phone}
                    <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-gold">Instagram</p>
                  <a
                    href={BRAND.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm text-stone transition hover:text-ink"
                  >
                    {BRAND.contact.instagramHandle}
                  </a>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-gold">Estúdio</p>
                  <a
                    href={BRAND.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block max-w-xs text-sm leading-relaxed text-stone transition hover:text-ink"
                  >
                    {BRAND.contact.address}
                  </a>
                </div>
              </div>

              <Link
                href="/agendar"
                className="group mt-10 inline-flex w-full items-center justify-between border border-ink bg-ink px-6 py-4 text-[10px] uppercase tracking-[0.28em] text-ivory transition hover:bg-ink-soft sm:w-auto sm:min-w-[240px]"
              >
                Reservar horário
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 bg-ivory-muted/60">
        <div className="editorial-container flex flex-col gap-3 py-4 text-[9px] uppercase tracking-[0.28em] text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>Imperatriz — Maranhão</span>
          <a
            href={whatsappUrl("Olá! Gostaria de um orçamento personalizado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold"
          >
            Solicitar orçamento via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
