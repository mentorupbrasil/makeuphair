import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { NAV_PUBLIC } from "@/lib/constants";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { BrandLogo } from "@/components/public/brand-logo";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-cream/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <BrandLogo href="/" variant="horizontal" />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_PUBLIC.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-widest text-brand-taupe-dark transition hover:text-brand-brown"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/agendar">
          <Button size="sm">Agendar horário</Button>
        </Link>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-brand-bg-dark text-brand-champagne">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src={BRAND.assets.logoLight}
              alt={BRAND.fullName}
              width={220}
              height={70}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-brand-champagne/80">{BRAND.description}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest">Links</p>
            <div className="mt-3 flex flex-col gap-2">
              {NAV_PUBLIC.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-brand-champagne/80 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest">Contato</p>
            <div className="mt-3 space-y-2 text-sm text-brand-champagne/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={BRAND.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  {BRAND.contact.address}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  {BRAND.contact.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest">Redes sociais</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-brand-champagne/80">
              <a
                href={BRAND.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Instagram {BRAND.contact.instagramHandle}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp {BRAND.contact.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-brand-champagne/60">
          © {new Date().getFullYear()} {BRAND.fullName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
