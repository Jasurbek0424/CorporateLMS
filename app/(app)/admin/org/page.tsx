"use client";

import { useState } from "react";
import { Building2, Users, ChevronRight, Plus, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Chip } from "@/components/ui/Chip";
import { departments, getDepartmentChildren } from "@/lib/data";
import type { Department } from "@/lib/types";
import { formatNumber, pluralRu } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function OrgPage() {
  const root = departments.find((d) => !d.parentId)!;
  const [selected, setSelected] = useState<Department>(root);

  return (
    <>
      <PageHeader
        eyebrow="Управление · оргструктура"
        title="Оргструктура предприятия"
        description="Многоуровневая иерархия: подразделения, должности, группы. Курсы назначаются на любой узел. Импорт из 1С:ЗУП или HR-системы."
        actions={
          <>
            <button className="btn btn-outline">
              <Upload size={15} /> Импорт из 1С:ЗУП
            </button>
            <button className="btn btn-primary">
              <Plus size={15} /> Добавить узел
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        <div className="card !p-3 overflow-hidden">
          <div className="px-2 pt-1 pb-2.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
            Дерево
          </div>
          <TreeNode node={root} depth={0} selected={selected} onSelect={setSelected} />
        </div>

        <div className="space-y-4">
          <div className="card !p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-600 mb-1">
                  Узел оргструктуры
                </div>
                <h2 className="text-[22px] font-bold tracking-tight leading-tight">{selected.name}</h2>
                <p className="text-ink-soft text-[13px] mt-1">
                  {formatNumber(selected.headcount)} {pluralRu(selected.headcount, ["сотрудник", "сотрудника", "сотрудников"])}
                </p>
              </div>
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center">
                <Building2 size={20} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <StatTile label="Завершено" value="74%" tone="success" />
              <StatTile label="Обязательных" value="11" tone="brand" />
              <StatTile label="Просрочки" value="3" tone="danger" />
            </div>

            <div>
              <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute mb-2">
                Назначенные программы
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Chip tone="blue">Безопасность труда</Chip>
                <Chip tone="blue">ERP · Производство</Chip>
                <Chip tone="blue">Компьютерная грамотность</Chip>
                <Chip tone="gray">+ 4 рекомендованных</Chip>
              </div>
            </div>
          </div>

          <div className="card !p-5">
            <h3 className="text-[15px] font-semibold mb-3">Дочерние подразделения</h3>
            {getDepartmentChildren(selected.id).length === 0 ? (
              <p className="text-[13px] text-ink-soft">У этого узла нет дочерних подразделений.</p>
            ) : (
              <ul className="space-y-1.5">
                {getDepartmentChildren(selected.id).map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-alt transition cursor-pointer"
                    onClick={() => setSelected(c)}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 size={14} className="text-ink-mute" />
                      <span className="text-[13.5px] font-medium">{c.name}</span>
                    </div>
                    <span className="text-[12px] text-ink-mute tabular-nums">
                      {formatNumber(c.headcount)} {pluralRu(c.headcount, ["чел", "чел", "чел"])}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function TreeNode({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: Department;
  depth: number;
  selected: Department;
  onSelect: (d: Department) => void;
}) {
  const children = getDepartmentChildren(node.id);
  const active = selected.id === node.id;
  return (
    <div>
      <button
        onClick={() => onSelect(node)}
        className={cn(
          "w-full flex items-center gap-2 py-2 pr-3 rounded-lg transition text-left",
          active ? "bg-brand-50 text-brand-800" : "hover:bg-surface-alt",
        )}
        style={{ paddingLeft: 8 + depth * 18 }}
      >
        <ChevronRight
          size={14}
          className={cn(
            "shrink-0 transition-transform",
            children.length === 0 && "opacity-30",
          )}
        />
        <Building2 size={14} className={active ? "text-brand-600" : "text-ink-mute"} />
        <span className="text-[13px] font-medium flex-1">{node.name}</span>
        <span className="text-[11px] text-ink-mute tabular-nums">{formatNumber(node.headcount)}</span>
      </button>
      {children.length > 0 && (
        <div>
          {children.map((c) => (
            <TreeNode key={c.id} node={c} depth={depth + 1} selected={selected} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "danger" | "brand";
}) {
  const cls = {
    success: "text-success",
    danger: "text-danger",
    brand: "text-brand-700",
  }[tone];
  return (
    <div className="rounded-xl bg-surface-alt p-3">
      <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute mb-1">
        {label}
      </div>
      <div className={cn("text-[20px] font-bold tabular-nums tracking-tight", cls)}>{value}</div>
    </div>
  );
}
