"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { clearSession, roleLabel, setSession } from "@/lib/auth";
import type { Role, Session } from "@/lib/types";
import { cn } from "@/lib/cn";

const ROLES: { id: Role; label: string }[] = [
  { id: "employee", label: "Сотрудник" },
  { id: "manager", label: "Руководитель" },
  { id: "admin", label: "Администратор" },
];

export function Topbar({ session }: { session: Session }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchRole(role: Role) {
    setSession(role);
    setMenuOpen(false);
    if (role === "employee") router.push("/catalog");
    if (role === "manager") router.push("/dashboard");
    if (role === "admin") router.push("/admin/import");
    router.refresh();
  }

  function logout() {
    clearSession();
    router.push("/login");
  }

  return (
    <header className="h-16 flex items-center gap-4 px-6 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-10">
      <div className="relative flex-1 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
        <input
          type="text"
          placeholder="Поиск курсов, сотрудников, документов…"
          className="w-full h-10 pl-9 pr-14 rounded-lg bg-surface-alt border border-transparent text-sm placeholder:text-ink-mute focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50 transition"
        />
        <span className="kbd absolute right-2.5 top-1/2 -translate-y-1/2">⌘K</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-ink-soft hover:bg-surface-alt transition relative">
          <Bell size={17} />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex items-center gap-2.5 pl-1.5 pr-2.5 h-10 rounded-lg transition hover:bg-surface-alt",
              menuOpen && "bg-surface-alt",
            )}
          >
            <Avatar initials={session.initials} tone="blue" size="sm" />
            <div className="text-left hidden sm:block">
              <div className="text-[13px] font-semibold leading-tight">{session.fullName}</div>
              <div className="text-[11px] text-ink-mute leading-tight">{roleLabel(session.role)}</div>
            </div>
            <ChevronDown size={14} className="text-ink-mute" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-72 card !p-0 z-20 anim-fade-up overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="text-sm font-semibold">{session.fullName}</div>
                <div className="text-xs text-ink-soft">{session.position}</div>
              </div>
              <div className="p-2">
                <div className="px-2 pt-1 pb-2 text-[10.5px] uppercase tracking-[0.12em] font-semibold text-ink-mute">
                  Переключить роль (демо)
                </div>
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => switchRole(r.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 h-9 rounded-md text-sm transition",
                      r.id === session.role
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "hover:bg-surface-alt",
                    )}
                  >
                    <span>{r.label}</span>
                    {r.id === session.role && (
                      <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold">текущая</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-border p-2">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-2.5 h-9 rounded-md text-sm text-ink-soft hover:bg-surface-alt"
                >
                  <LogOut size={15} />
                  Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
