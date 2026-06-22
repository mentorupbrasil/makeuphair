import Link from "next/link";
import Image from "next/image";
import { NAV_PUBLIC } from "@/lib/constants";
import { BRAND } from "@/lib/brand";
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
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Image
              src={BRAND.assets.logoLight}
              alt={BRAND.fullName}
              width={220}
              height={70}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-4 text-sm text-brand-champagne/80">
              Maquiagem e penteados com excelência para momentos especiais.
            </p>
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
            <p className="text-xs font-semibold uppercase tracking-widest">Redes sociais</p>
            <div className="mt-3 flex gap-4 text-sm text-brand-champagne/80">
              <a href="#" className="transition hover:text-white">Instagram</a>
              <a href="#" className="transition hover:text-white">WhatsApp</a>
              <a href="#" className="transition hover:text-white">TikTok</a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-brand-champagne/60">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
