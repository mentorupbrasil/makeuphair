import Link from "next/link";
import { Lock } from "lucide-react";
import { Logo } from "@/components/public/logo";
import { BRAND, whatsappUrl } from "@/lib/brand";

export function OwnerLoginLink({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const styles =
    variant === "light"
      ? "text-ivory/60 hover:text-ivory border-ivory/20 hover:border-ivory/40"
      : "text-stone hover:text-ink border-black/10 hover:border-black/20";

  return (
    <Link
      href="/admin/login"
      className={`inline-flex items-center gap-2 border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition ${styles} ${className}`}
    >
      <Lock className="h-3.5 w-3.5" aria-hidden />
      Área da proprietária
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-ivory/95 backdrop-blur-md">
      <div className="editorial-container flex items-center justify-between gap-4 py-5">
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
        <div className="flex items-center gap-3">
          <OwnerLoginLink className="hidden sm:inline-flex" />
          <Link
            href="/agendar"
            className="bg-ink px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ivory transition hover:bg-ink-soft"
          >
            Agendar
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-black/5 bg-ink text-ivory">
      <div className="editorial-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-span-2 lg:col-span-2">
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
        <div>
          <p className="section-label text-gold-light">Proprietária</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">
            Acesse o painel para atualizar fotos, vídeos, agenda e orçamentos.
          </p>
          <div className="mt-4">
            <OwnerLoginLink variant="light" />
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
          © {new Date().getFullYear()} {BRAND.fullName}
        </p>
        <Link
          href="/admin/login"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-ivory/50 transition hover:text-gold-light"
        >
          <Lock className="h-3 w-3" aria-hidden />
          Entrar no painel
        </Link>
      </div>
    </footer>
  );
}
