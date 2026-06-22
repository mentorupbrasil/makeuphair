import Link from "next/link";
import { NAV_PUBLIC } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl text-rose-800">
          <Sparkles className="h-5 w-5 text-rose-500" />
          MakeupHair
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_PUBLIC.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-600 transition hover:text-rose-600"
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
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg text-rose-800">MakeupHair</p>
            <p className="mt-2 text-sm text-stone-500">
              Maquiagem e penteados com excelência para momentos especiais.
            </p>
          </div>
          <div>
            <p className="font-medium text-stone-800">Links</p>
            <div className="mt-3 flex flex-col gap-2">
              {NAV_PUBLIC.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-500 hover:text-rose-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-stone-800">Redes sociais</p>
            <div className="mt-3 flex gap-4 text-sm text-stone-500">
              <a href="#" className="hover:text-rose-600">Instagram</a>
              <a href="#" className="hover:text-rose-600">WhatsApp</a>
              <a href="#" className="hover:text-rose-600">TikTok</a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} MakeupHair. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
