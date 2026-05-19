"use client";

import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, LogOut, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { clearSession, roleLabel, setSession, type StoredSession } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useT, type Locale } from "@/lib/i18n";

export function Topbar({ session }: { session: StoredSession }) {
  const router = useRouter();
  const { locale, setLocale, t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const ROLES: { id: Role; label: string }[] = [
    { id: "employee", label: t("role.employee") },
    { id: "manager", label: t("role.manager") },
    { id: "admin", label: t("role.admin") },
  ];

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

  function pickLang(l: Locale) {
    setLocale(l);
    setLangOpen(false);
  }

  const displayPosition = locale === "uz" && session.positionUz ? session.positionUz : session.position;

  return (
    <header className="h-16 flex items-center gap-4 px-6 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-10">
      <div className="relative flex-1 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
        <input
          type="text"
          placeholder={t("topbar.search")}
          className="w-full h-10 pl-9 pr-14 rounded-lg bg-surface-alt border border-transparent text-sm placeholder:text-ink-mute focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50 transition"
        />
        <span className="kbd absolute right-2.5 top-1/2 -translate-y-1/2">⌘K</span>
      </div>

      <div className="flex items-center gap-1.5">
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className={cn(
              "h-10 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-[12.5px] font-semibold uppercase tracking-wider transition",
              langOpen ? "bg-surface-alt" : "text-ink-soft hover:bg-surface-alt hover:text-ink",
            )}
            aria-label={t("lang.label")}
          >
            <Globe size={14} />
            {locale.toUpperCase()}
            <ChevronDown size={12} className="text-ink-mute" />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-12 w-44 card !p-1 z-20 anim-fade-up">
              <button
                onClick={() => pickLang("uz")}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 h-9 rounded-md text-sm transition",
                  locale === "uz" ? "bg-brand-50 text-brand-700 font-semibold" : "hover:bg-surface-alt",
                )}
              >
                <span>{t("lang.uz")}</span>
                <span className="text-[10px] uppercase tracking-wider text-ink-mute">UZ</span>
              </button>
              <button
                onClick={() => pickLang("ru")}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 h-9 rounded-md text-sm transition",
                  locale === "ru" ? "bg-brand-50 text-brand-700 font-semibold" : "hover:bg-surface-alt",
                )}
              >
                <span>{t("lang.ru")}</span>
                <span className="text-[10px] uppercase tracking-wider text-ink-mute">RU</span>
              </button>
            </div>
          )}
        </div>

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
              <div className="text-[11px] text-ink-mute leading-tight">{roleLabel(session.role, locale)}</div>
            </div>
            <ChevronDown size={14} className="text-ink-mute" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-72 card !p-0 z-20 anim-fade-up overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="text-sm font-semibold">{session.fullName}</div>
                <div className="text-xs text-ink-soft">{displayPosition}</div>
              </div>
              <div className="p-2">
                <div className="px-2 pt-1 pb-2 text-[10.5px] uppercase tracking-[0.12em] font-semibold text-ink-mute">
                  {t("topbar.switchRole")}
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
                      <span className="text-[10px] uppercase tracking-wider text-brand-600 font-semibold">
                        {t("topbar.current")}
                      </span>
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
                  {t("topbar.logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
