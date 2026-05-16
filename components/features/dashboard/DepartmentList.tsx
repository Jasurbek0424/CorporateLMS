"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import type { Department, DepartmentCompletion } from "@/lib/types";
import { formatNumber, pluralRu } from "@/lib/format";

interface DepartmentListProps {
  departments: Department[];
  completion: DepartmentCompletion[];
}

export function DepartmentList({ departments, completion }: DepartmentListProps) {
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
          <h3 className="text-[15px] font-semibold leading-tight">Завершённость по подразделениям</h3>
          <p className="text-xs text-ink-soft mt-0.5">Все курсы · текущий квартал</p>
        </div>
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
          Drill-in кликом
        </div>
      </div>

      <ul className="divide-y divide-border">
        {rows.map((row) => {
          const peopleLabel = pluralRu(row.people, ["человек", "человека", "человек"]);
          return (
            <li key={row.departmentId}>
              <Link
                href={`/team?dept=${row.departmentId}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-alt transition group"
              >
                <div className="w-44 shrink-0">
                  <div className="text-[14px] font-semibold leading-tight">{row.dep!.name}</div>
                  <div className="text-[11.5px] text-ink-mute mt-0.5">
                    {formatNumber(row.people)} {peopleLabel}
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
