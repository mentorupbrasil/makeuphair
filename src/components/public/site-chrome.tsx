import Link from "next/link";
import { Logo } from "@/components/public/logo";
import { BRAND, whatsappUrl } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-ivory/95 backdrop-blur-md">
      <div className="editorial-container flex items-center justify-between py-5">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {[
            { href: "/", label: "Início" },
            { href: "/#trabalhos", label: "Trabalhos" },
            { href: "/servicos", label: "Serviços" },
            { href: "/agendar", label: "Agendar" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[10px] uppercase tracking-[0.3em] text-stone transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/agendar"
          className="bg-ink px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory transition hover:bg-ink-soft"
        >
          Agendar
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-black/5 bg-ink text-ivory">
      <div className="editorial-container grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="light" href="/" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            {BRAND.description}
          </p>
        </div>
        <div>
          <p className="section-label text-gold-light">Contato</p>
          <div className="mt-4 space-y-2 text-sm text-ivory/70">
            <a href={BRAND.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">
              {BRAND.contact.address}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">
              {BRAND.contact.phone}
            </a>
          </div>
        </div>
        <div>
          <p className="section-label text-gold-light">Social</p>
          <div className="mt-4 space-y-2 text-sm text-ivory/70">
            <a href={BRAND.contact.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">
              Instagram
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-ivory/40">
        © {new Date().getFullYear()} {BRAND.fullName}
      </div>
    </footer>
  );
}
