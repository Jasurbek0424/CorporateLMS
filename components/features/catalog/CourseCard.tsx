"use client";

import Link from "next/link";
import { BookOpen, Clock, AlertTriangle, CheckCircle2, Play } from "lucide-react";
import type { Course } from "@/lib/types";
import { Progress } from "@/components/ui/Progress";
import { Chip } from "@/components/ui/Chip";
import { statusChipClass, statusLabel, formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

const CATEGORY_TINT: Record<string, string> = {
  Безопасность: "from-rose-50 to-rose-100/40 text-rose-700",
  Xavfsizlik: "from-rose-50 to-rose-100/40 text-rose-700",
  "ERP и софт": "from-indigo-50 to-indigo-100/40 text-indigo-700",
  "ERP va dasturlar": "from-indigo-50 to-indigo-100/40 text-indigo-700",
  "Базовая грамотность": "from-blue-50 to-sky-100/40 text-blue-700",
  "Asosiy savodxonlik": "from-blue-50 to-sky-100/40 text-blue-700",
  "Офисный софт": "from-emerald-50 to-emerald-100/40 text-emerald-700",
  "Ofis dasturlari": "from-emerald-50 to-emerald-100/40 text-emerald-700",
  Производство: "from-amber-50 to-amber-100/40 text-amber-700",
  "Ishlab chiqarish": "from-amber-50 to-amber-100/40 text-amber-700",
  "Информационная безопасность": "from-slate-100 to-slate-200/60 text-slate-700",
  "Axborot xavfsizligi": "from-slate-100 to-slate-200/60 text-slate-700",
  Аттестация: "from-purple-50 to-purple-100/40 text-purple-700",
  Attestatsiya: "from-purple-50 to-purple-100/40 text-purple-700",
};

export function CourseCard({ course }: { course: Course }) {
  const { t, locale } = useT();
  const title = locale === "uz" && course.titleUz ? course.titleUz : course.title;
  const description = locale === "uz" && course.descriptionUz ? course.descriptionUz : course.description;
  const category = locale === "uz" && course.categoryUz ? course.categoryUz : course.category;
  const tint = CATEGORY_TINT[category] ?? "from-slate-50 to-slate-100/60 text-slate-700";
  const isCompleted = course.status === "completed";
  const isOverdue = course.status === "overdue";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col card !p-0 hover:shadow-pop hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className={cn("h-28 relative overflow-hidden rounded-t-[14px] bg-gradient-to-br", tint)}>
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/5" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold opacity-80">
            {category}
          </span>
          <span className={statusChipClass(course.status)}>
            {isOverdue ? <AlertTriangle size={11} /> : isCompleted ? <CheckCircle2 size={11} /> : null}
            {statusLabel(course.status, locale)}
          </span>
        </div>
        <div className="absolute right-4 -bottom-4 opacity-50">
          <BookOpen size={72} strokeWidth={1.2} />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
        <p className="text-[12.5px] text-ink-soft line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 text-[11.5px] text-ink-mute mb-3">
          <span className="inline-flex items-center gap-1">
            <BookOpen size={12} />
            {course.totalLessons} {t("common.lessonsShort")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />~{course.durationHours} {t("common.hoursShort")}
          </span>
          {course.required ? <Chip tone="blue">{t("common.required")}</Chip> : null}
        </div>

        <div className="mt-auto pt-3 border-t border-border/70">
          <div className="flex items-center justify-between text-[11px] text-ink-soft mb-1.5">
            <span>
              {isCompleted && course.score !== undefined
                ? t("catalog.card.scoreLabel", { score: course.score })
                : course.dueDate
                  ? t("catalog.card.deadline", { date: formatDate(course.dueDate, locale) })
                  : t("catalog.card.progress")}
            </span>
            <span className="font-semibold tabular-nums">{course.progress}%</span>
          </div>
          <Progress value={course.progress} thin />
        </div>
      </div>
    </Link>
  );
}

export function CourseCardCompact({ course }: { course: Course }) {
  const { t, locale } = useT();
  const title = locale === "uz" && course.titleUz ? course.titleUz : course.title;
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card !p-3.5 flex items-center gap-3 hover:border-brand-300 hover:shadow-pop transition"
    >
      <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0">
        <Play size={16} fill="currentColor" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{title}</div>
        <div className="text-xs text-ink-mute">
          {course.totalLessons} {t("common.lessons")} · ~{course.durationHours} {t("common.hoursShort")}
        </div>
      </div>
      <div className="w-24">
        <Progress value={course.progress} thin />
      </div>
    </Link>
  );
}
