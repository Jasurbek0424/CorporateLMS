"use client";

import { Chip } from "@/components/ui/Chip";
import { Progress } from "@/components/ui/Progress";
import type { Course, EmployeeCourseEntry } from "@/lib/types";
import { formatDate, statusChipClass, statusLabel } from "@/lib/format";

interface Props {
  entries: EmployeeCourseEntry[];
  courses: Course[];
}

export function EmployeeCoursesTable({ entries, courses }: Props) {
  if (entries.length === 0) {
    return (
      <div className="card !p-8 text-center text-ink-soft">
        Назначенных курсов нет.
      </div>
    );
  }
  return (
    <div className="card !p-0 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute border-b border-border bg-surface-alt/50">
            <th className="py-3 px-5">Курс</th>
            <th className="py-3 px-3 w-[200px]">Прогресс</th>
            <th className="py-3 px-3">Балл</th>
            <th className="py-3 px-3">Дата / срок</th>
            <th className="py-3 px-3">Статус</th>
          </tr>
        </thead>
        <tbody className="text-[13.5px]">
          {entries.map((e) => {
            const course = courses.find((c) => c.id === e.courseId);
            if (!course) return null;
            return (
              <tr key={e.courseId} className="border-b border-border last:border-b-0 hover:bg-surface-alt/60 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold leading-tight">{course.title}</span>
                    {course.required && <Chip tone="blue">обяз</Chip>}
                  </div>
                  <div className="text-[12px] text-ink-mute mt-0.5">{course.category}</div>
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
                  {e.completedAt ? formatDate(e.completedAt) : e.dueDate ? `до ${formatDate(e.dueDate)}` : "—"}
                </td>
                <td className="px-3 py-3.5">
                  <span className={statusChipClass(e.status)}>{statusLabel(e.status)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
