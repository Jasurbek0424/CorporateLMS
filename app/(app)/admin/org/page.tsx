"use client";

import { useState } from "react";
import { Building2, ChevronRight, Plus, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Chip } from "@/components/ui/Chip";
import { departments, depName, getDepartmentChildren } from "@/lib/data";
import type { Department } from "@/lib/types";
import { formatNumber, pluralByLocale } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

export default function OrgPage() {
  const { t, locale } = useT();
  const root = departments.find((d) => !d.parentId)!;
  const [selected, setSelected] = useState<Department>(root);

  return (
    <>
      <PageHeader
        eyebrow={t("org.eyebrow")}
        title={t("org.title")}
        description={t("org.desc")}
        actions={
          <>
            <button className="btn btn-outline">
              <Upload size={15} /> {t("org.btn.import1c")}
            </button>
            <button className="btn btn-primary">
              <Plus size={15} /> {t("org.btn.addNode")}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        <div className="card !p-3 overflow-hidden">
          <div className="px-2 pt-1 pb-2.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
            {t("org.tree")}
          </div>
          <TreeNode node={root} depth={0} selected={selected} onSelect={setSelected} />
        </div>

        <div className="space-y-4">
          <div className="card !p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-600 mb-1">
                  {t("org.node")}
                </div>
                <h2 className="text-[22px] font-bold tracking-tight leading-tight">{depName(selected, locale)}</h2>
                <p className="text-ink-soft text-[13px] mt-1">
                  {formatNumber(selected.headcount, locale)}{" "}
                  {pluralByLocale(locale, selected.headcount, ["сотрудник", "сотрудника", "сотрудников"], "xodim")}
                </p>
              </div>
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center">
                <Building2 size={20} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <StatTile label={t("org.stat.completed")} value="74%" tone="success" />
              <StatTile label={t("org.stat.required")} value="11" tone="brand" />
              <StatTile label={t("org.stat.overdue")} value="3" tone="danger" />
            </div>

            <div>
              <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute mb-2">
                {t("org.assignedPrograms")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Chip tone="blue">{locale === "uz" ? "Mehnat xavfsizligi" : "Безопасность труда"}</Chip>
                <Chip tone="blue">{locale === "uz" ? "ERP · Ishlab chiqarish" : "ERP · Производство"}</Chip>
                <Chip tone="blue">{locale === "uz" ? "Kompyuter savodxonligi" : "Компьютерная грамотность"}</Chip>
                <Chip tone="gray">{t("org.chips.recommended", { n: 4 })}</Chip>
              </div>
            </div>
          </div>

          <div className="card !p-5">
            <h3 className="text-[15px] font-semibold mb-3">{t("org.children")}</h3>
            {getDepartmentChildren(selected.id).length === 0 ? (
              <p className="text-[13px] text-ink-soft">{t("org.noChildren")}</p>
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
                      <span className="text-[13.5px] font-medium">{depName(c, locale)}</span>
                    </div>
                    <span className="text-[12px] text-ink-mute tabular-nums">
                      {formatNumber(c.headcount, locale)}{" "}
                      {pluralByLocale(locale, c.headcount, ["чел", "чел", "чел"], "kishi")}
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
  const { locale } = useT();
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
        <span className="text-[13px] font-medium flex-1">{depName(node, locale)}</span>
        <span className="text-[11px] text-ink-mute tabular-nums">{formatNumber(node.headcount, locale)}</span>
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
