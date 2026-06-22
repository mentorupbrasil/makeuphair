"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, Users, Wallet, Package, Heart,
  FileText, Settings, LogOut, Menu, X, Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ADMIN } from "@/lib/constants";
import { Logo } from "@/components/public/logo";
import { useState } from "react";

const ICONS = {
  LayoutDashboard, Calendar, Users, Wallet, Package, Heart,
  FileText, Settings, Image,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <>
      <div className="border-b border-black/5 px-6 py-6">
        <Logo />
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-stone">Painel</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        {NAV_ADMIN.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.15em] transition",
                active ? "bg-ink text-ivory" : "text-stone hover:bg-ivory-muted hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-black/5 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-stone hover:text-ink"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 border border-black/10 bg-white p-2 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-white lg:flex">
        {nav}
      </aside>
      {open && (
        <aside className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden">{nav}</aside>
      )}
    </>
  );
}
