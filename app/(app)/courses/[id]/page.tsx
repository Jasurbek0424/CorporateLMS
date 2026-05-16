"use client";

import { useEffect, useMemo, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Users,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CourseSidebar } from "@/components/features/course/CourseSidebar";
import { QuizPlayer } from "@/components/features/course/QuizPlayer";
import { Progress } from "@/components/ui/Progress";
import { Chip } from "@/components/ui/Chip";
import { api } from "@/lib/api";
import type { Course, Lesson } from "@/lib/types";
import { statusChipClass, statusLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.courses
      .get(id)
      .then((c) => {
        setCourse(c);
        const first = c.modules[0]?.lessons[0]?.id ?? null;
        setActiveLessonId(first);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const activeLesson: Lesson | undefined = useMemo(() => {
    if (!course) return undefined;
    for (const m of course.modules) {
      const l = m.lessons.find((x) => x.id === activeLessonId);
      if (l) return l;
    }
    return undefined;
  }, [course, activeLessonId]);

  function markComplete(id: string) {
    setCompleted((c) => new Set(c).add(id));
    if (!course) return;
    const flat = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const idx = flat.indexOf(id);
    if (idx >= 0 && idx < flat.length - 1) {
      setActiveLessonId(flat[idx + 1]);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-[1fr_320px] gap-6">
        <div className="card h-96 shimmer rounded-[14px]" />
        <div className="card h-96 shimmer rounded-[14px]" />
      </div>
    );
  }

  if (!course) {
    return <div className="card p-10 text-center text-ink-soft">Курс не найден.</div>;
  }

  const hasLessons = course.modules.length > 0;
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <>
      <Link
        href="/catalog"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-brand-700 mb-4"
      >
        <ArrowLeft size={14} /> Назад в каталог
      </Link>

      <PageHeader
        eyebrow={course.category}
        title={course.title}
        description={course.description}
        actions={<Chip className={statusChipClass(course.status)}>{statusLabel(course.status)}</Chip>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-5">
          <div className="card !p-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} />
                {course.totalLessons} уроков
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />~{course.durationHours} ч
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} />
                {course.authorTeam}
              </span>
              {course.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {course.tags.map((t) => (
                    <Chip key={t} tone="gray">
                      {t}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[12px] text-ink-soft mb-1.5">
                <span>Ваш прогресс по курсу</span>
                <span className="font-semibold tabular-nums">{course.progress}%</span>
              </div>
              <Progress value={course.progress} />
            </div>
          </div>

          {hasLessons && activeLesson ? (
            <LessonView lesson={activeLesson} onComplete={markComplete} />
          ) : (
            <UpcomingNotice course={course} />
          )}
        </div>

        {hasLessons ? (
          <CourseSidebar
            modules={course.modules}
            activeLessonId={activeLessonId ?? ""}
            completed={completed}
            onSelect={(id) => setActiveLessonId(id)}
          />
        ) : (
          <div className="card !p-5">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute mb-2">
              Что вас ждёт
            </div>
            <ul className="space-y-2 text-[13.5px] text-ink-soft">
              <li className="flex items-start gap-2">
                <Award size={14} className="text-brand-600 mt-0.5" />
                Сертификат после успешной сдачи
              </li>
              <li className="flex items-start gap-2">
                <Sparkles size={14} className="text-brand-600 mt-0.5" />
                ИИ-ассистент по содержимому курса
              </li>
              <li className="flex items-start gap-2">
                <BookOpen size={14} className="text-brand-600 mt-0.5" />
                Конспекты, видео и проверочные тесты
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

function LessonView({ lesson, onComplete }: { lesson: Lesson; onComplete: (id: string) => void }) {
  if (lesson.kind === "quiz" && lesson.questions) {
    return (
      <div className="space-y-4">
        <div className="card !p-5">
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-600 mb-1">
            Проверка знаний
          </div>
          <h2 className="text-[22px] font-bold tracking-tight leading-tight mb-1">{lesson.title}</h2>
          <p className="text-ink-soft text-[14px]">
            {lesson.questions.length} вопросов · ~{lesson.durationMin} мин
          </p>
        </div>
        <QuizPlayer questions={lesson.questions} onComplete={() => onComplete(lesson.id)} />
      </div>
    );
  }
  return (
    <div className="card !p-6 anim-fade-up">
      <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-600 mb-2">
        Урок
      </div>
      <h2 className="text-[22px] font-bold tracking-tight leading-tight mb-2">{lesson.title}</h2>
      <div className="flex items-center gap-2 text-[12.5px] text-ink-mute mb-5">
        <Clock size={13} />~{lesson.durationMin} мин чтения
      </div>
      {lesson.body ? (
        <div className="prose-content text-[15px] leading-relaxed text-ink whitespace-pre-line">
          {lesson.body}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface-alt p-6 text-center text-ink-soft text-sm">
          Содержимое урока загружается. Откройте позже.
        </div>
      )}
      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
        <span className="text-[12.5px] text-ink-mute">Отметьте урок завершённым, чтобы перейти дальше.</span>
        <button onClick={() => onComplete(lesson.id)} className="btn btn-primary">
          Отметить пройденным <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

function UpcomingNotice({ course }: { course: Course }) {
  return (
    <div className="card !p-8 text-center">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-brand-50 text-brand-700 mb-4">
        <Sparkles size={24} />
      </div>
      <h2 className="text-[20px] font-bold mb-2">Курс собирается ИИ-импортом</h2>
      <p className="text-ink-soft text-[14px] max-w-md mx-auto mb-5">
        Администратор загрузил документы — структура и уроки готовы. Контент урока будет доступен после публикации методиста.
      </p>
      <div className={cn("inline-flex", statusChipClass(course.status))}>{statusLabel(course.status)}</div>
    </div>
  );
}
