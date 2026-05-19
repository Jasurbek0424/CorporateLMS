"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Server,
  GraduationCap,
  UserCog,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { setSession } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useT, type Locale } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/uz";

interface RoleCard {
  id: Role;
  labelKey: DictKey;
  hintKey: DictKey;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  destination: string;
}

const ROLE_CARDS: RoleCard[] = [
  {
    id: "employee",
    labelKey: "role.employee",
    hintKey: "login.hint.employee",
    icon: GraduationCap,
    destination: "/catalog",
  },
  {
    id: "manager",
    labelKey: "role.manager",
    hintKey: "login.hint.manager",
    icon: Building2,
    destination: "/dashboard",
  },
  {
    id: "admin",
    labelKey: "role.adminFull",
    hintKey: "login.hint.admin",
    icon: UserCog,
    destination: "/admin/import",
  },
];

function AutoLoginFromQuery() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const as = params.get("as");
    const target = ROLE_CARDS.find((r) => r.id === as);
    if (target) {
      setSession(target.id);
      router.replace(target.destination);
    }
  }, [params, router]);
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useT();
  const [loading, setLoading] = useState<Role | null>(null);

  function enter(role: Role, destination: string) {
    setLoading(role);
    setSession(role);
    setTimeout(() => router.push(destination), 240);
  }

  function toggleLang() {
    const next: Locale = locale === "uz" ? "ru" : "uz";
    setLocale(next);
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Suspense fallback={null}>
        <AutoLoginFromQuery />
      </Suspense>

      <div className="hidden lg:flex w-[44%] xl:w-[42%] relative overflow-hidden bg-brand-700 text-white">
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_25%_15%,white_0,transparent_45%),radial-gradient(circle_at_85%_85%,white_0,transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white text-brand-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V5l5 7 3-4 3 4 5-7v14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <div className="text-[15px] font-semibold tracking-tight">Mars Forge</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/60">{t("login.brandSubtitle")}</div>
            </div>
          </div>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-[11px] uppercase tracking-[0.14em] font-semibold mb-6">
              <Sparkles size={12} /> {t("login.badge")}
            </div>
            <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight mb-4">
              {t("login.headline")}
            </h1>
            <p className="text-white/75 text-[15px] leading-relaxed">{t("login.sub")}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-white/85">
            <Stat value="10K+" label={t("login.stat.learners")} />
            <Stat value="2 300" label={t("login.stat.daily")} />
            <Stat value={t("login.stat.yearsValue")} label={t("login.stat.years")} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:py-16 relative">
        <button
          onClick={toggleLang}
          className="absolute top-5 right-6 h-9 px-3 inline-flex items-center gap-1.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider text-ink-soft hover:bg-surface-alt transition"
        >
          {locale === "uz" ? "RU" : "UZ"}
        </button>

        <div className="w-full max-w-[440px]">
          <div className="lg:hidden mb-8">
            <Brand />
          </div>

          <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-600 mb-2">
            {t("login.eyebrow")}
          </div>
          <h2 className="text-[28px] font-bold leading-tight tracking-tight mb-2">
            {t("login.welcome")}
          </h2>
          <p className="text-ink-soft text-[15px] mb-7">{t("login.helper")}</p>

          <div className="space-y-3 mb-4">
            <button className="w-full h-11 inline-flex items-center justify-center gap-2.5 rounded-lg bg-white border border-border-strong text-ink hover:border-brand-400 hover:text-brand-700 transition font-medium text-[14px]">
              <Server size={16} />
              {t("login.sso")}
            </button>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <div className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-ink-mute">
              {t("login.or")}
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-2.5">
            {ROLE_CARDS.map((r) => {
              const Icon = r.icon;
              const isLoading = loading === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => enter(r.id, r.destination)}
                  disabled={loading !== null}
                  className={cn(
                    "group w-full flex items-center gap-3.5 p-3.5 rounded-xl border bg-white text-left transition",
                    isLoading
                      ? "border-brand-500 ring-4 ring-brand-50"
                      : "border-border hover:border-brand-300 hover:shadow-pop",
                  )}
                >
                  <div
                    className={cn(
                      "inline-flex items-center justify-center h-11 w-11 rounded-xl shrink-0 transition",
                      isLoading
                        ? "bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
                    )}
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold leading-tight">{t(r.labelKey)}</div>
                    <div className="text-[12.5px] text-ink-soft mt-0.5">{t(r.hintKey)}</div>
                  </div>
                  {isLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-brand-200 border-t-brand-600 spinner" />
                  ) : (
                    <ArrowRight size={16} className="text-ink-mute group-hover:text-brand-600 transition" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-2 text-[12px] text-ink-mute">
            <ShieldCheck size={14} className="text-success" />
            <span>{t("login.security")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[22px] font-bold tracking-tight text-white">{value}</div>
      <div className="text-[11px] text-white/55 leading-tight mt-0.5">{label}</div>
    </div>
  );
}
