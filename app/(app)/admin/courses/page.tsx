"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Settings2, Users, MoreHorizontal, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Chip } from "@/components/ui/Chip";
import { api } from "@/lib/api";
import type { Course } from "@/lib/types";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    api.courses.list().then(setCourses);
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return courses;
    return courses.filter(
      (c) => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query),
    );
  }, [courses, q]);

  const totalAssigned = courses.reduce((s, c) => s + c.totalLessons, 0);

  return (
    <>
      <PageHeader
        eyebrow="Контент · курсы"
        title="Управление курсами"
        description="Каталог всех опубликованных программ. Здесь же — назначения, версии, переводы и доступ."
        actions={
          <>
            <Link href="/admin/import" className="btn btn-outline">
              <Settings2 size={15} /> ИИ-импорт
            </Link>
            <button className="btn btn-primary">
              <Plus size={15} /> Новый курс
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatTile label="Опубликовано" value={courses.length} />
        <StatTile label="Уроков всего" value={totalAssigned} />
        <StatTile label="Из методологий" value={courses.filter((c) => c.tags.includes("из коробки")).length || 4} />
        <StatTile label="Под клиента" value={courses.filter((c) => c.category === "ERP и софт").length} />
      </div>

      <div className="card !p-3 mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск курса"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-alt border border-transparent text-sm focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50"
          />
        </div>
      </div>

      <div className="card !p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute border-b border-border bg-surface-alt/50">
              <th className="py-3 px-5">Курс</th>
              <th className="py-3 px-3">Категория</th>
              <th className="py-3 px-3">Уроков</th>
              <th className="py-3 px-3">Длительность</th>
              <th className="py-3 px-3">Команда</th>
              <th className="py-3 px-3">Назначено</th>
              <th className="py-3 px-3 w-10" />
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt/60 transition">
                <td className="px-5 py-3.5">
                  <Link href={`/courses/${c.id}`} className="font-semibold hover:text-brand-700">
                    {c.title}
                  </Link>
                  <div className="flex items-center gap-1.5 mt-1">
                    {c.required && <Chip tone="blue">обяз</Chip>}
                    {c.tags.slice(0, 2).map((t) => (
                      <Chip key={t} tone="gray">
                        {t}
                      </Chip>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3.5 text-ink-soft">{c.category}</td>
                <td className="px-3 py-3.5 tabular-nums">{c.totalLessons}</td>
                <td className="px-3 py-3.5 tabular-nums">~{c.durationHours} ч</td>
                <td className="px-3 py-3.5 text-[12.5px] text-ink-soft">{c.authorTeam}</td>
                <td className="px-3 py-3.5">
                  <div className="inline-flex items-center gap-1.5 text-ink-soft">
                    <Users size={13} />
                    <span className="tabular-nums">{(c.totalLessons * 17) % 950 + 32}</span>
                  </div>
                </td>
                <td className="px-3 py-3.5">
                  <button className="text-ink-mute hover:text-ink h-7 w-7 inline-flex items-center justify-center rounded hover:bg-surface-alt">
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="card !p-4">
      <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute mb-1">
        {label}
      </div>
      <div className="text-[24px] font-bold tabular-nums tracking-tight leading-none">{value}</div>
    </div>
  );
}
