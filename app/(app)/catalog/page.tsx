"use client";

import { useEffect, useMemo, useState } from "react";
import { ListFilter, LayoutGrid, Rows3, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/features/catalog/CourseCard";
import { api } from "@/lib/api";
import type { Course, CourseStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

type Filter = "all" | "required" | "in_progress" | "completed" | "overdue";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "required", label: "Обязательные" },
  { id: "in_progress", label: "В процессе" },
  { id: "completed", label: "Завершённые" },
  { id: "overdue", label: "Просроченные" },
];

function matches(course: Course, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "required") return course.required;
  return course.status === (f as CourseStatus);
}

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    api.courses.list().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (!matches(c, filter)) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [courses, filter, query]);

  const stats = useMemo(() => {
    const required = courses.filter((c) => c.required).length;
    const inProgress = courses.filter((c) => c.status === "in_progress").length;
    const completed = courses.filter((c) => c.status === "completed").length;
    const overdue = courses.filter((c) => c.status === "overdue").length;
    return { required, inProgress, completed, overdue };
  }, [courses]);

  return (
    <>
      <PageHeader
        eyebrow="Мои курсы"
        title="Каталог обучения"
        description="Назначенные и рекомендованные программы. Срок прохождения и напоминания настраивает администратор."
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex p-0.5 rounded-lg border border-border-strong bg-white">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "h-8 px-2.5 rounded-md inline-flex items-center gap-1.5 text-[12.5px] font-medium transition",
                  view === "grid" ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-ink",
                )}
              >
                <LayoutGrid size={14} /> Сетка
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "h-8 px-2.5 rounded-md inline-flex items-center gap-1.5 text-[12.5px] font-medium transition",
                  view === "list" ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-ink",
                )}
              >
                <Rows3 size={14} /> Список
              </button>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatTile label="Обязательных" value={stats.required} tone="blue" />
        <StatTile label="В процессе" value={stats.inProgress} tone="amber" />
        <StatTile label="Завершено" value={stats.completed} tone="green" />
        <StatTile label="Просрочено" value={stats.overdue} tone="red" />
      </div>

      <div className="card !p-3 mb-5 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, категории или тегу"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-alt border border-transparent text-sm placeholder:text-ink-mute focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <ListFilter size={14} className="text-ink-mute mr-1" />
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-8 px-3 rounded-lg text-[12.5px] font-medium transition border",
                filter === f.id
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-ink-soft border-border hover:border-brand-300 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-64 shimmer rounded-[14px]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card py-16 text-center">
          <div className="text-sm text-ink-soft">Курсы по вашему фильтру не найдены.</div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </>
  );
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "blue" | "amber" | "green" | "red";
}) {
  const colorByTone = {
    blue: "text-brand-700 bg-brand-50",
    amber: "text-warn bg-warn-soft",
    green: "text-success bg-success-soft",
    red: "text-danger bg-danger-soft",
  } as const;
  return (
    <div className="card !p-4 flex items-center justify-between">
      <div>
        <div className="text-[11.5px] uppercase tracking-[0.12em] font-semibold text-ink-mute mb-1">
          {label}
        </div>
        <div className="text-[26px] font-bold tabular-nums tracking-tight leading-none">
          {value}
        </div>
      </div>
      <div className={cn("h-10 w-1.5 rounded-full", colorByTone[tone].split(" ")[1])} />
    </div>
  );
}
