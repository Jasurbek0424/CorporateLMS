"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import type { Department, DepartmentCompletion } from "@/lib/types";
import { formatNumber, pluralByLocale } from "@/lib/format";
import { useT } from "@/lib/i18n";

interface DepartmentListProps {
  departments: Department[];
  completion: DepartmentCompletion[];
}

export function DepartmentList({ departments, completion }: DepartmentListProps) {
  const { t, locale } = useT();
  const rows = completion
    .map((c) => ({
      ...c,
      dep: departments.find((d) => d.id === c.departmentId),
    }))
    .filter((r) => r.dep)
    .sort((a, b) => b.completion - a.completion);

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold leading-tight">{t("dash.deptList.title")}</h3>
          <p className="text-xs text-ink-soft mt-0.5">{t("dash.deptList.sub")}</p>
        </div>
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
          {t("dash.deptList.drill")}
        </div>
      </div>

      <ul className="divide-y divide-border">
        {rows.map((row) => {
          const peopleLabel = pluralByLocale(
            locale,
            row.people,
            ["человек", "человека", "человек"],
            "kishi",
          );
          const depName = locale === "uz" && row.dep!.nameUz ? row.dep!.nameUz : row.dep!.name;
          return (
            <li key={row.departmentId}>
              <Link
                href={`/team?dept=${row.departmentId}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-alt transition group"
              >
                <div className="w-44 shrink-0">
                  <div className="text-[14px] font-semibold leading-tight">{depName}</div>
                  <div className="text-[11.5px] text-ink-mute mt-0.5">
                    {formatNumber(row.people, locale)} {peopleLabel}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <Progress value={row.completion} showLabel />
                </div>
                <ChevronRight size={16} className="text-ink-mute group-hover:text-brand-600 transition" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
