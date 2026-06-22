"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Wallet,
  Package,
  Heart,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ADMIN } from "@/lib/constants";
import { BRAND } from "@/lib/brand";
import { useState } from "react";

const ICONS = {
  LayoutDashboard,
  Calendar,
  Users,
  Wallet,
  Package,
  Heart,
  FileText,
  Settings,
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
      <div className="border-b border-brand-brown/30 px-6 py-5">
        <Image
          src={BRAND.assets.logoLight}
          alt={BRAND.fullName}
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
        />
        <p className="mt-2 text-xs text-brand-champagne/60">Painel administrativo</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ADMIN.map((item) => {
          const Icon = ICONS[item.icon];
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition",
                active
                  ? "bg-brand-champagne/20 text-brand-champagne"
                  : "text-brand-champagne/70 hover:bg-brand-brown/20 hover:text-brand-champagne"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-brand-brown/30 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-brand-champagne/60 transition hover:bg-brand-brown/20 hover:text-brand-champagne"
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
        className="fixed left-4 top-4 z-50 rounded-sm bg-brand-bg-dark p-2 text-brand-champagne lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className="hidden w-64 shrink-0 flex-col bg-brand-brown lg:flex">
        {nav}
      </aside>

      {open && (
        <aside className="fixed inset-0 z-40 flex flex-col bg-brand-brown lg:hidden">
          {nav}
        </aside>
      )}
    </>
  );
}
