"use client";

import { CheckCircle2, AlertTriangle, BookOpen, Award, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import type { ActivityEvent, Course, Employee } from "@/lib/types";
import { cn } from "@/lib/cn";

const ACTION_ICON: Record<string, { Icon: React.ComponentType<{ size?: number; className?: string }>; tone: string }> = {
  "Сдан экзамен": { Icon: CheckCircle2, tone: "text-success bg-success-soft" },
  "Назначен курс": { Icon: Plus, tone: "text-brand-700 bg-brand-50" },
  "Просрочен дедлайн": { Icon: AlertTriangle, tone: "text-danger bg-danger-soft" },
  "Завершён модуль": { Icon: BookOpen, tone: "text-brand-700 bg-brand-50" },
  "Получен сертификат": { Icon: Award, tone: "text-warn bg-warn-soft" },
};

interface RecentActivityProps {
  events: ActivityEvent[];
  employees: Employee[];
  courses: Course[];
}

export function RecentActivity({ events, employees, courses }: RecentActivityProps) {
  return (
    <div className="card !p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-[15px] font-semibold leading-tight">Последние события</h3>
        <p className="text-xs text-ink-soft mt-0.5">По всем подразделениям</p>
      </div>
      <ul className="divide-y divide-border">
        {events.map((ev) => {
          const employee = employees.find((e) => e.id === ev.employeeId);
          const course = courses.find((c) => c.id === ev.courseId);
          const meta = ACTION_ICON[ev.action];
          const Icon = meta?.Icon ?? BookOpen;
          return (
            <li key={ev.id} className="px-5 py-3.5 flex items-start gap-3">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl inline-flex items-center justify-center shrink-0",
                  meta?.tone ?? "text-ink-soft bg-surface-alt",
                )}
              >
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold">{employee?.fullName ?? "—"}</span>{" "}
                  <span className="text-ink-soft">· {ev.action.toLowerCase()}</span>
                </div>
                <div className="mt-1 text-[12px] text-ink-soft truncate">
                  {course ? course.title : ""}
                  {ev.score !== undefined ? (
                    <span className="ml-2 font-semibold text-ink">балл {ev.score}</span>
                  ) : null}
                </div>
              </div>
              <div className="text-[11px] text-ink-mute whitespace-nowrap mt-1">{ev.at}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
