"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Briefcase, Building2, Mail, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { EmployeeCoursesTable } from "@/components/features/employee/EmployeeCoursesTable";
import { api } from "@/lib/api";
import { getDepartmentPath } from "@/lib/data";
import type { Course, Employee, EmployeeCourseEntry } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/uz";

const TABS: { id: "courses" | "progress" | "tests" | "certificates"; labelKey: DictKey }[] = [
  { id: "courses", labelKey: "emp.tab.courses" },
  { id: "progress", labelKey: "emp.tab.progress" },
  { id: "tests", labelKey: "emp.tab.tests" },
  { id: "certificates", labelKey: "emp.tab.certificates" },
];

type TabId = (typeof TABS)[number]["id"];

export default function EmployeeCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, locale } = useT();
  const [data, setData] = useState<{
    employee: Employee;
    entries: EmployeeCourseEntry[];
    courses: Course[];
  } | null>(null);
  const [tab, setTab] = useState<TabId>("courses");

  useEffect(() => {
    (async () => {
      const [info, courses] = await Promise.all([api.employees.get(id), api.courses.list()]);
      setData({ employee: info.employee, entries: info.courses, courses });
    })();
  }, [id]);

  if (!data) {
    return <div className="card h-96 shimmer rounded-[14px]" />;
  }

  const { employee, entries, courses } = data;
  const depPath = getDepartmentPath(employee.departmentId, locale);
  const position = locale === "uz" && employee.positionUz ? employee.positionUz : employee.position;
  const tenure = locale === "uz" && employee.tenureUz ? employee.tenureUz : employee.tenure;

  return (
    <>
      <Link
        href="/team"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-brand-700 mb-4"
      >
        <ArrowLeft size={14} /> {t("emp.back")}
      </Link>

      <div className="card !p-6 mb-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <Avatar initials={employee.initials} tone="blue" size="lg" />
            <div>
              <h1 className="text-[26px] font-bold tracking-tight leading-tight">{employee.fullName}</h1>
              <p className="text-ink-soft text-[14px] mt-1">{position}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-[13px] text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 size={13} /> {depPath}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={13} /> {t("emp.tenure", { tenure })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={13} /> {employee.id.replace("e-", "")}@marsforge.uz
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="text-right">
              <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
                {t("emp.avgScore")}
              </div>
              <div className="text-[44px] font-bold leading-none tabular-nums tracking-tight mt-1 text-brand-700">
                {employee.avgScore}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn btn-outline !h-9">
                <MessageSquare size={14} /> {t("emp.write")}
              </button>
              <button className="btn btn-primary !h-9">
                <Award size={14} /> {t("emp.assignCourse")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label={t("emp.stat.required")} value={`${employee.required.done} / ${employee.required.total}`} />
          <Stat label={t("emp.stat.assigned")} value={employee.assigned} />
          <Stat label={t("emp.stat.completed")} value={employee.completed} />
          <Stat label={t("emp.stat.inWork")} value={employee.assigned - employee.completed} />
        </div>
      </div>

      <div className="border-b border-border mb-4">
        <div className="flex items-center gap-1">
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={cn(
                "px-4 h-10 text-[13.5px] font-medium border-b-2 -mb-px transition",
                tab === tb.id
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-ink-soft hover:text-ink",
              )}
            >
              {t(tb.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {tab === "courses" && <EmployeeCoursesTable entries={entries} courses={courses} />}
      {tab === "progress" && <ProgressTab entries={entries} courses={courses} />}
      {tab === "tests" && (
        <div className="card !p-10 text-center text-ink-soft text-sm">
          {t("emp.tests.placeholder")}
        </div>
      )}
      {tab === "certificates" && (
        <div className="card !p-10 text-center text-ink-soft text-sm">
          {t("emp.cert.placeholder")}
        </div>
      )}
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-surface-alt p-3.5">
      <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
        {label}
      </div>
      <div className="text-[20px] font-bold tabular-nums tracking-tight mt-1">{value}</div>
    </div>
  );
}

function ProgressTab({ entries, courses }: { entries: EmployeeCourseEntry[]; courses: Course[] }) {
  const { locale } = useT();
  return (
    <div className="card !p-5 space-y-3">
      {entries.map((e) => {
        const course = courses.find((c) => c.id === e.courseId);
        if (!course) return null;
        const title = locale === "uz" && course.titleUz ? course.titleUz : course.title;
        const category = locale === "uz" && course.categoryUz ? course.categoryUz : course.category;
        return (
          <div key={e.courseId} className="grid grid-cols-[1fr_240px_60px] gap-4 items-center">
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold truncate">{title}</div>
              <div className="text-[11.5px] text-ink-mute">{category}</div>
            </div>
            <div>
              <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-600"
                  style={{ width: `${e.progress}%` }}
                />
              </div>
            </div>
            <div className="text-right text-[13px] font-semibold tabular-nums">{e.progress}%</div>
          </div>
        );
      })}
    </div>
  );
}
