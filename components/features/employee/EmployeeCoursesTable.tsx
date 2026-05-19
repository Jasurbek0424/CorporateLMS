"use client";

import { Chip } from "@/components/ui/Chip";
import { Progress } from "@/components/ui/Progress";
import type { Course, EmployeeCourseEntry } from "@/lib/types";
import { formatDate, statusChipClass, statusLabel } from "@/lib/format";
import { useT } from "@/lib/i18n";

interface Props {
  entries: EmployeeCourseEntry[];
  courses: Course[];
}

export function EmployeeCoursesTable({ entries, courses }: Props) {
  const { t, locale } = useT();
  if (entries.length === 0) {
    return (
      <div className="card !p-8 text-center text-ink-soft">{t("empCourses.empty")}</div>
    );
  }
  return (
    <div className="card !p-0 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute border-b border-border bg-surface-alt/50">
            <th className="py-3 px-5">{t("empCourses.col.course")}</th>
            <th className="py-3 px-3 w-[200px]">{t("empCourses.col.progress")}</th>
            <th className="py-3 px-3">{t("empCourses.col.score")}</th>
            <th className="py-3 px-3">{t("empCourses.col.date")}</th>
            <th className="py-3 px-3">{t("empCourses.col.status")}</th>
          </tr>
        </thead>
        <tbody className="text-[13.5px]">
          {entries.map((e) => {
            const course = courses.find((c) => c.id === e.courseId);
            if (!course) return null;
            const title = locale === "uz" && course.titleUz ? course.titleUz : course.title;
            const category = locale === "uz" && course.categoryUz ? course.categoryUz : course.category;
            return (
              <tr key={e.courseId} className="border-b border-border last:border-b-0 hover:bg-surface-alt/60 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold leading-tight">{title}</span>
                    {course.required && <Chip tone="blue">{t("common.requiredShort")}</Chip>}
                  </div>
                  <div className="text-[12px] text-ink-mute mt-0.5">{category}</div>
                </td>
                <td className="px-3 py-3.5">
                  <Progress value={e.progress} thin showLabel />
                </td>
                <td className="px-3 py-3.5">
                  {e.score !== undefined ? (
                    <span className={`tabular-nums font-semibold ${e.score < 70 ? "text-danger" : ""}`}>
                      {e.score}
                    </span>
                  ) : (
                    <span className="text-ink-mute">—</span>
                  )}
                </td>
                <td className="px-3 py-3.5 text-[12.5px] text-ink-soft tabular-nums">
                  {e.completedAt
                    ? formatDate(e.completedAt, locale)
                    : e.dueDate
                      ? t("catalog.card.deadline", { date: formatDate(e.dueDate, locale) })
                      : "—"}
                </td>
                <td className="px-3 py-3.5">
                  <span className={statusChipClass(e.status)}>{statusLabel(e.status, locale)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
