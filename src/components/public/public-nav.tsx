"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_PUBLIC } from "@/lib/constants";

export function PublicNav({
  variant = "dark",
  showCta = true,
}: {
  variant?: "dark" | "light";
  showCta?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const light = variant === "light";

  const linkClass = cn(
    "text-[10px] uppercase tracking-[0.3em] transition",
    light ? "text-ivory/80 hover:text-ivory" : "text-stone hover:text-ink"
  );

  const ctaClass = cn(
    "px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] transition",
    light
      ? "border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
      : "bg-ink text-ivory hover:bg-ink-soft"
  );

  return (
    <>
      <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
        {NAV_PUBLIC.map((l) => (
          <Link key={l.href} href={l.href} className={linkClass}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        {showCta && (
          <Link href="/agendar" className={cn(ctaClass, "hidden sm:inline-block")}>
            Agendar
          </Link>
        )}
        <button
          type="button"
          className={cn(
            "p-2 md:hidden",
            light ? "text-ivory" : "text-ink"
          )}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "absolute inset-x-0 top-full border-b px-6 py-6 md:hidden",
            light ? "border-ivory/10 bg-ink/95 backdrop-blur-md" : "border-black/5 bg-ivory/98 backdrop-blur-md"
          )}
        >
          <div className="flex flex-col gap-4">
            {NAV_PUBLIC.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {showCta && (
              <Link href="/agendar" className={ctaClass} onClick={() => setOpen(false)}>
                Agendar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
