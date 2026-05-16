"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileUp,
  Building2,
  GraduationCap,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Brand } from "@/components/ui/Brand";
import type { Role } from "@/lib/types";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: string;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Обучение",
    items: [
      { label: "Каталог курсов", href: "/catalog", icon: GraduationCap, roles: ["employee", "manager", "admin", "hr"] },
    ],
  },
  {
    group: "Руководителю",
    items: [
      { label: "Дашборд", href: "/dashboard", icon: LayoutDashboard, roles: ["manager", "admin", "hr"] },
      { label: "Сотрудники", href: "/team", icon: Users, roles: ["manager", "admin", "hr"] },
    ],
  },
  {
    group: "Администрирование",
    items: [
      { label: "ИИ-импорт", href: "/admin/import", icon: FileUp, roles: ["admin"], badge: "ИИ" },
      { label: "Курсы", href: "/admin/courses", icon: BookOpen, roles: ["admin", "hr"] },
      { label: "Оргструктура", href: "/admin/org", icon: Building2, roles: ["admin", "hr"] },
    ],
  },
];

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-[252px] shrink-0 border-r border-border bg-surface">
      <div className="px-5 h-16 flex items-center border-b border-border">
        <Brand />
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        {NAV.map((group) => {
          const visible = group.items.filter((i) => i.roles.includes(role));
          if (visible.length === 0) return null;
          return (
            <div key={group.group}>
              <div className="px-3 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-ink-mute mb-1.5">
                {group.group}
              </div>
              <ul className="space-y-0.5">
                {visible.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-2.5 h-9 px-3 rounded-lg text-sm transition-colors",
                          active
                            ? "bg-brand-50 text-brand-700 font-medium"
                            : "text-ink-soft hover:text-ink hover:bg-surface-alt",
                        )}
                      >
                        <Icon
                          size={17}
                          strokeWidth={active ? 2.2 : 1.8}
                          className={cn("shrink-0", active ? "text-brand-600" : "text-ink-mute group-hover:text-ink")}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="text-[9.5px] font-semibold px-1.5 py-px rounded bg-brand-600/10 text-brand-700">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-alt">
          <ShieldCheck size={16} className="text-success" />
          <div className="text-[11px] leading-tight">
            <div className="font-semibold text-ink">on-premise · v1.2</div>
            <div className="text-ink-mute">SBOM · pentest · аудит</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
