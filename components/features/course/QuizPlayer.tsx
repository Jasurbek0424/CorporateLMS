"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/cn";

interface QuizPlayerProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

export function QuizPlayer({ questions, onComplete }: QuizPlayerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const q = questions[index];
  const userAnswer = answers[q.id];
  const isRevealed = revealed[q.id];

  function selectSingle(i: number) {
    if (isRevealed) return;
    setAnswers((a) => ({ ...a, [q.id]: i }));
  }

  function toggleMulti(i: number) {
    if (isRevealed) return;
    setAnswers((a) => {
      const cur = (a[q.id] as number[]) ?? [];
      const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i].sort();
      return { ...a, [q.id]: next };
    });
  }

  function reveal() {
    setRevealed((r) => ({ ...r, [q.id]: true }));
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      const score = computeScore(questions, answers);
      setDone(true);
      onComplete?.(score);
    }
  }

  function restart() {
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setDone(false);
  }

  if (done) {
    const score = computeScore(questions, answers);
    const passed = score >= 80;
    return (
      <div className="card !p-6 anim-fade-up">
        <div className={cn(
          "inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-4",
          passed ? "bg-success-soft text-success" : "bg-warn-soft text-warn",
        )}>
          {passed ? <CheckCircle2 size={26} /> : <RotateCcw size={24} />}
        </div>
        <h3 className="text-xl font-bold tracking-tight">
          {passed ? "Тест сдан" : "Нужно повторить материал"}
        </h3>
        <p className="text-ink-soft text-[14px] mt-1 mb-5">
          Правильных ответов: <b className="tabular-nums text-ink">{Math.round(score)}%</b> ·
          проходной порог 80%.
        </p>
        <div className="flex items-center gap-2">
          <button onClick={restart} className="btn btn-outline">
            <RotateCcw size={15} /> Пройти заново
          </button>
          <button onClick={restart} className="btn btn-primary">
            Продолжить курс <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card !p-6 anim-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-brand-600">
          Вопрос {index + 1} из {questions.length}
        </div>
        <div className="flex items-center gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-7 bg-brand-600" : i < index ? "w-2 bg-brand-300" : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>

      <h3 className="text-[17px] font-semibold leading-snug mb-1">{q.prompt}</h3>
      <div className="text-[12.5px] text-ink-mute mb-5">
        {q.type === "multiple_answer" ? "Несколько правильных ответов" : "Один правильный ответ"}
      </div>

      <div className="space-y-2 mb-5">
        {q.options?.map((opt, i) => {
          const checked =
            q.type === "multiple_answer"
              ? Array.isArray(userAnswer) && userAnswer.includes(i)
              : userAnswer === i;
          const correctOpt = isCorrectOption(q, i);
          const showCorrect = isRevealed && correctOpt;
          const showWrong = isRevealed && checked && !correctOpt;
          return (
            <button
              key={i}
              onClick={() => (q.type === "multiple_answer" ? toggleMulti(i) : selectSingle(i))}
              disabled={isRevealed}
              className={cn(
                "w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3",
                showCorrect
                  ? "border-success bg-success-soft"
                  : showWrong
                    ? "border-danger bg-danger-soft"
                    : checked
                      ? "border-brand-500 bg-brand-50"
                      : "border-border bg-white hover:border-brand-300",
              )}
            >
              <span
                className={cn(
                  "shrink-0 mt-0.5 inline-flex items-center justify-center h-5 w-5 text-[11px] font-semibold",
                  q.type === "multiple_answer" ? "rounded-md" : "rounded-full",
                  showCorrect
                    ? "bg-success text-white"
                    : showWrong
                      ? "bg-danger text-white"
                      : checked
                        ? "bg-brand-600 text-white"
                        : "bg-surface-alt text-ink-soft ring-1 ring-border",
                )}
              >
                {showCorrect ? <CheckCircle2 size={13} /> : showWrong ? <XCircle size={13} /> : String.fromCharCode(65 + i)}
              </span>
              <span className="text-[14px] leading-snug">{opt}</span>
            </button>
          );
        })}
      </div>

      {isRevealed && q.explanation && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-3.5 mb-5 flex gap-3">
          <Sparkles size={16} className="text-brand-600 shrink-0 mt-0.5" />
          <div className="text-[13px] leading-relaxed text-brand-900">
            <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-brand-700 mb-0.5">
              Объяснение
            </div>
            {q.explanation}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-[12px] text-ink-mute">
          {!isRevealed ? "Выберите ответ и проверьте" : "Готово к следующему шагу"}
        </div>
        {!isRevealed ? (
          <button
            onClick={reveal}
            disabled={userAnswer === undefined || (Array.isArray(userAnswer) && userAnswer.length === 0)}
            className="btn btn-primary"
          >
            Проверить ответ
          </button>
        ) : (
          <button onClick={next} className="btn btn-primary">
            {index < questions.length - 1 ? "Следующий вопрос" : "Завершить тест"}
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

function isCorrectOption(q: Question, i: number): boolean {
  if (Array.isArray(q.correct)) return q.correct.includes(i);
  return q.correct === i;
}

function computeScore(questions: Question[], answers: Record<string, number | number[]>): number {
  let correct = 0;
  for (const q of questions) {
    const a = answers[q.id];
    if (Array.isArray(q.correct)) {
      const arr = Array.isArray(a) ? a : [];
      const correctSet = new Set(q.correct);
      if (arr.length === q.correct.length && arr.every((x) => correctSet.has(x))) correct += 1;
    } else {
      if (a === q.correct) correct += 1;
    }
  }
  return (correct / questions.length) * 100;
}
