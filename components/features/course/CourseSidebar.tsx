"use client";

import { CheckCircle2, Circle, FileText, HelpCircle, PlayCircle } from "lucide-react";
import type { Lesson, Module } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

interface CourseSidebarProps {
  modules: Module[];
  activeLessonId: string;
  completed: Set<string>;
  onSelect: (lessonId: string) => void;
}

const KIND_ICON = {
  text: FileText,
  video: PlayCircle,
  quiz: HelpCircle,
  scorm: PlayCircle,
} as const;

export function CourseSidebar({ modules, activeLessonId, completed, onSelect }: CourseSidebarProps) {
  const { t } = useT();
  return (
    <nav className="card !p-0 sticky top-24 overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border">
        <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
          {t("course.sidebar.contents")}
        </div>
      </div>
      <div className="max-h-[calc(100vh-220px)] overflow-y-auto py-1">
        {modules.map((m, mi) => (
          <ModuleSection
            key={m.id}
            module={m}
            index={mi}
            activeLessonId={activeLessonId}
            completed={completed}
            onSelect={onSelect}
          />
        ))}
      </div>
    </nav>
  );
}

function ModuleSection({
  module,
  index,
  activeLessonId,
  completed,
  onSelect,
}: {
  module: Module;
  index: number;
  activeLessonId: string;
  completed: Set<string>;
  onSelect: (id: string) => void;
}) {
  const { locale } = useT();
  const mTitle = locale === "uz" && module.titleUz ? module.titleUz : module.title;
  return (
    <div className="px-2 py-1.5">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-md bg-brand-50 text-brand-700 text-[10.5px] font-semibold">
          {index + 1}
        </span>
        <div className="text-[13px] font-semibold leading-tight">{mTitle}</div>
      </div>
      <ul>
        {module.lessons.map((l) => (
          <LessonRow
            key={l.id}
            lesson={l}
            active={l.id === activeLessonId}
            done={completed.has(l.id)}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}

function LessonRow({
  lesson,
  active,
  done,
  onSelect,
}: {
  lesson: Lesson;
  active: boolean;
  done: boolean;
  onSelect: (id: string) => void;
}) {
  const { t, locale } = useT();
  const Icon = KIND_ICON[lesson.kind];
  const lTitle = locale === "uz" && lesson.titleUz ? lesson.titleUz : lesson.title;
  const kindLabel =
    lesson.kind === "quiz"
      ? t("course.lesson.kind.quiz")
      : lesson.kind === "video"
        ? t("course.lesson.kind.video")
        : t("course.lesson.kind.text");
  return (
    <li>
      <button
        onClick={() => onSelect(lesson.id)}
        className={cn(
          "w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition",
          active ? "bg-brand-50 text-brand-800" : "hover:bg-surface-alt text-ink-soft",
        )}
      >
        <span className="mt-0.5">
          {done ? (
            <CheckCircle2 size={15} className="text-success" />
          ) : active ? (
            <Circle size={15} className="text-brand-600 fill-brand-100" />
          ) : (
            <Circle size={15} className="text-ink-mute" />
          )}
        </span>
        <span className="flex-1 min-w-0">
          <span className={cn("block text-[13px] leading-tight font-medium", active && "text-brand-800")}>
            {lTitle}
          </span>
          <span className="flex items-center gap-1.5 mt-1 text-[11px] text-ink-mute">
            <Icon size={11} />
            <span>
              {kindLabel} · {lesson.durationMin} {t("common.minutesShort")}
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
