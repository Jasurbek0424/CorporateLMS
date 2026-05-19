"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  AlertOctagon,
  Download,
  Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiTile } from "@/components/features/dashboard/KpiTile";
import { DepartmentList } from "@/components/features/dashboard/DepartmentList";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";
import { api } from "@/lib/api";
import type { ActivityEvent, Course, Department, DepartmentCompletion, Employee } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { useT } from "@/lib/i18n";

export default function DashboardPage() {
  const { t, locale } = useT();
  const [data, setData] = useState<{
    courses: Course[];
    employees: Employee[];
    departments: Department[];
    completion: DepartmentCompletion[];
    activity: ActivityEvent[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      const [courses, employees, deps, activity] = await Promise.all([
        api.courses.list(),
        api.employees.list(),
        api.departments.list(),
        api.activity.list(),
      ]);
      setData({
        courses,
        employees,
        departments: deps.departments,
        completion: deps.completion,
        activity,
      });
    })();
  }, []);

  if (!data) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card h-28 shimmer rounded-[14px]" />
          ))}
        </div>
        <div className="card h-72 shimmer rounded-[14px]" />
      </div>
    );
  }

  const activeCourses = data.courses.length;
  const totalAssigned = data.employees.reduce((s, e) => s + e.assigned, 0);
  const avgCompletion = Math.round(
    data.completion.reduce((s, c) => s + c.completion, 0) / data.completion.length,
  );
  const overdueCount = data.courses.filter((c) => c.status === "overdue").length;

  return (
    <>
      <PageHeader
        eyebrow={t("dash.eyebrow")}
        title={t("dash.title")}
        description={t("dash.desc")}
        actions={
          <>
            <button className="btn btn-outline">
              <Calendar size={15} /> {t("common.quarter")}
            </button>
            <button className="btn btn-primary">
              <Download size={15} /> {t("common.exportExcel")}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiTile
          label={t("dash.kpi.activeCourses")}
          value={activeCourses}
          delta={{ value: t("dash.kpi.activeCoursesDelta"), positive: true }}
          icon={<BookOpen size={16} className="text-brand-600" />}
        />
        <KpiTile
          label={t("dash.kpi.assigned")}
          value={formatNumber(totalAssigned, locale)}
          subtitle={t("dash.kpi.staffPct")}
          icon={<Users size={16} className="text-brand-600" />}
        />
        <KpiTile
          label={t("dash.kpi.completion")}
          value={`${avgCompletion}%`}
          delta={{ value: t("dash.kpi.completionDelta"), positive: true }}
          icon={<TrendingUp size={16} className="text-success" />}
          tone="success"
        />
        <KpiTile
          label={t("dash.kpi.overdue")}
          value={overdueCount * 12 + 1}
          subtitle={t("dash.kpi.overdueWarn")}
          icon={<AlertOctagon size={16} className="text-danger" />}
          tone="danger"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5">
        <DepartmentList departments={data.departments} completion={data.completion} />
        <RecentActivity events={data.activity} employees={data.employees} courses={data.courses} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <ProblemCard
          tone="danger"
          title={t("dash.problem.urgent.title")}
          description={t("dash.problem.urgent.desc")}
          metric="−14 pp"
        />
        <ProblemCard
          tone="warn"
          title={t("dash.problem.risk.title")}
          description={t("dash.problem.risk.desc")}
          metric={t("dash.problem.risk.metric")}
        />
        <ProblemCard
          tone="success"
          title={t("dash.problem.best.title")}
          description={t("dash.problem.best.desc")}
          metric="+18 pp"
        />
      </div>
    </>
  );
}

function ProblemCard({
  tone,
  title,
  description,
  metric,
}: {
  tone: "danger" | "warn" | "success";
  title: string;
  description: string;
  metric: string;
}) {
  const cls = {
    danger: "bg-danger-soft text-danger",
    warn: "bg-warn-soft text-warn",
    success: "bg-success-soft text-success",
  }[tone];
  return (
    <div className="card !p-4">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-[10.5px] uppercase tracking-[0.14em] font-bold px-2 py-0.5 rounded ${cls}`}
        >
          {metric}
        </span>
      </div>
      <div className="text-[14px] font-semibold leading-tight mb-1">{title}</div>
      <p className="text-[12.5px] text-ink-soft leading-snug">{description}</p>
    </div>
  );
}
