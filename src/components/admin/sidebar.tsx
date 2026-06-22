"use client";

import Link from "next/link";
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
      <div className="border-b border-stone-800 px-6 py-5">
        <p className="font-serif text-lg text-rose-300">MakeupHair</p>
        <p className="text-xs text-stone-400">Painel administrativo</p>
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                active
                  ? "bg-rose-600 text-white"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-400 transition hover:bg-stone-800 hover:text-white"
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
        className="fixed left-4 top-4 z-50 rounded-lg bg-stone-900 p-2 text-white lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className="hidden w-64 shrink-0 flex-col bg-stone-900 lg:flex">
        {nav}
      </aside>

      {open && (
        <aside className="fixed inset-0 z-40 flex flex-col bg-stone-900 lg:hidden">
          {nav}
        </aside>
      )}
    </>
  );
}
