"use client";

import { CheckCircle2, AlertTriangle, BookOpen, Award, Plus } from "lucide-react";
import type { ActivityActionKey, ActivityEvent, Course, Employee } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/uz";

const ACTION_META: Record<ActivityActionKey, {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  tone: string;
  dictKey: DictKey;
}> = {
  examPassed: { Icon: CheckCircle2, tone: "text-success bg-success-soft", dictKey: "activity.examPassed" },
  courseAssigned: { Icon: Plus, tone: "text-brand-700 bg-brand-50", dictKey: "activity.courseAssigned" },
  deadlineOverdue: { Icon: AlertTriangle, tone: "text-danger bg-danger-soft", dictKey: "activity.deadlineOverdue" },
  moduleCompleted: { Icon: BookOpen, tone: "text-brand-700 bg-brand-50", dictKey: "activity.moduleCompleted" },
  certIssued: { Icon: Award, tone: "text-warn bg-warn-soft", dictKey: "activity.certIssued" },
};

interface RecentActivityProps {
  events: ActivityEvent[];
  employees: Employee[];
  courses: Course[];
}

export function RecentActivity({ events, employees, courses }: RecentActivityProps) {
  const { t, locale } = useT();
  return (
    <div className="card !p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-[15px] font-semibold leading-tight">{t("dash.activity.title")}</h3>
        <p className="text-xs text-ink-soft mt-0.5">{t("dash.activity.sub")}</p>
      </div>
      <ul className="divide-y divide-border">
        {events.map((ev) => {
          const employee = employees.find((e) => e.id === ev.employeeId);
          const course = courses.find((c) => c.id === ev.courseId);
          const meta = ACTION_META[ev.actionKey];
          const Icon = meta.Icon;
          const actionLabel = t(meta.dictKey);
          const courseTitle = course ? (locale === "uz" && course.titleUz ? course.titleUz : course.title) : "";
          const timeLabel = locale === "uz" && ev.atUz ? ev.atUz : ev.at;
          return (
            <li key={ev.id} className="px-5 py-3.5 flex items-start gap-3">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl inline-flex items-center justify-center shrink-0",
                  meta.tone,
                )}
              >
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold">{employee?.fullName ?? "—"}</span>{" "}
                  <span className="text-ink-soft">· {actionLabel.toLowerCase()}</span>
                </div>
                <div className="mt-1 text-[12px] text-ink-soft truncate">
                  {courseTitle}
                  {ev.score !== undefined ? (
                    <span className="ml-2 font-semibold text-ink">{t("activity.scoreLabel", { n: ev.score })}</span>
                  ) : null}
                </div>
              </div>
              <div className="text-[11px] text-ink-mute whitespace-nowrap mt-1">{timeLabel}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
