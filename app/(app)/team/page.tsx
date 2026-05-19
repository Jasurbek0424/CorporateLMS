"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Chip } from "@/components/ui/Chip";
import { api } from "@/lib/api";
import { depName, getDepartmentById } from "@/lib/data";
import type { Employee } from "@/lib/types";
import { useT } from "@/lib/i18n";

export default function TeamPage() {
  const { t, locale } = useT();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.employees.list().then((data) => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) => {
      const pos = (locale === "uz" && e.positionUz ? e.positionUz : e.position).toLowerCase();
      return e.fullName.toLowerCase().includes(q) || pos.includes(q);
    });
  }, [employees, query, locale]);

  return (
    <>
      <PageHeader
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        description={t("team.desc")}
      />

      <div className="card !p-3 mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("team.search.placeholder")}
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-alt border border-transparent text-sm focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50"
          />
        </div>
        <button className="btn btn-outline">
          <Filter size={14} /> {t("common.filters")}
        </button>
      </div>

      <div className="card !p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute border-b border-border bg-surface-alt/50">
              <th className="py-3 px-5">{t("team.col.employee")}</th>
              <th className="py-3 px-3">{t("team.col.department")}</th>
              <th className="py-3 px-3">{t("team.col.required")}</th>
              <th className="py-3 px-3 w-[200px]">{t("team.col.completion")}</th>
              <th className="py-3 px-3">{t("team.col.avgScore")}</th>
              <th className="py-3 px-3 w-10" />
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td colSpan={6} className="px-5 py-4">
                    <div className="h-8 shimmer rounded-md" />
                  </td>
                </tr>
              ))
            ) : (
              filtered.map((e) => {
                const dep = getDepartmentById(e.departmentId);
                const requiredPct = Math.round((e.required.done / e.required.total) * 100);
                const compPct = Math.round((e.completed / e.assigned) * 100);
                const pos = locale === "uz" && e.positionUz ? e.positionUz : e.position;
                return (
                  <tr
                    key={e.id}
                    className="border-b border-border last:border-b-0 hover:bg-surface-alt/60 transition"
                  >
                    <td className="px-5 py-3.5">
                      <Link href={`/team/${e.id}`} className="flex items-center gap-3 group">
                        <Avatar initials={e.initials} size="sm" />
                        <div>
                          <div className="font-semibold text-ink group-hover:text-brand-700 transition leading-tight">
                            {e.fullName}
                          </div>
                          <div className="text-[12px] text-ink-mute">{pos}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-ink-soft">{depName(dep, locale)}</td>
                    <td className="px-3 py-3.5">
                      {e.required.done === e.required.total ? (
                        <Chip tone="green">
                          {e.required.done}/{e.required.total}
                        </Chip>
                      ) : (
                        <Chip tone={requiredPct >= 70 ? "amber" : "red"}>
                          {e.required.done}/{e.required.total}
                        </Chip>
                      )}
                    </td>
                    <td className="px-3 py-3.5">
                      <Progress value={compPct} showLabel thin />
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="tabular-nums font-semibold">{e.avgScore}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <Link href={`/team/${e.id}`} className="text-ink-mute hover:text-brand-600">
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
