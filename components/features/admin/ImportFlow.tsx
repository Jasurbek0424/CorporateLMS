"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  FileType2,
  Presentation,
  Sparkles,
  CheckCircle2,
  Loader2,
  X,
  Brain,
  ListChecks,
  FileQuestion,
  Languages,
  Rocket,
} from "lucide-react";
import type { ImportedCourseDraft } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";

type Phase = "idle" | "uploading" | "analyzing" | "generating" | "ready";

interface PreparedFile {
  id: string;
  name: string;
  size: number;
  ext: string;
}

const PIPELINE_STEPS = [
  { key: "extract", label: "Извлечение текста из документов", icon: FileText },
  { key: "structure", label: "Построение структуры модулей", icon: ListChecks },
  { key: "summarize", label: "Генерация конспектов уроков", icon: Brain },
  { key: "questions", label: "Формулировка проверочных вопросов", icon: FileQuestion },
  { key: "translate", label: "Подготовка переводов · UZ · EN", icon: Languages },
] as const;

const ALLOWED = /\.(pdf|docx?|pptx?)$/i;

function pickIcon(ext: string) {
  if (ext.startsWith("pdf")) return FileText;
  if (ext.startsWith("ppt")) return Presentation;
  return FileType2;
}

function bytesToHuman(b: number): string {
  if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(1)} MB`;
  if (b >= 1_000) return `${Math.round(b / 1_000)} KB`;
  return `${b} B`;
}

export function ImportFlow() {
  const [files, setFiles] = useState<PreparedFile[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const [draft, setDraft] = useState<ImportedCourseDraft | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    const next: PreparedFile[] = [];
    for (const f of Array.from(list)) {
      if (!ALLOWED.test(f.name)) continue;
      next.push({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 6)}`,
        name: f.name,
        size: f.size,
        ext: (f.name.split(".").pop() ?? "").toLowerCase(),
      });
    }
    setFiles((cur) => [...cur, ...next]);
  }, []);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  function removeFile(id: string) {
    setFiles((cur) => cur.filter((f) => f.id !== id));
  }

  function reset() {
    setFiles([]);
    setPhase("idle");
    setStepIndex(-1);
    setDraft(null);
  }

  async function startAnalyze() {
    if (files.length === 0) return;
    setPhase("uploading");
    setStepIndex(-1);

    // Simulate per-step pipeline
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setStepIndex(i);
      setPhase(i === 0 ? "uploading" : i === 1 ? "analyzing" : "generating");
      await wait(550 + i * 80);
    }

    const result = await api.import.analyze(files.map((f) => ({ name: f.name, size: f.size })));
    setDraft(result);
    setPhase("ready");
  }

  function publish() {
    alert(
      "В прототипе публикация имитируется. Курс отправлен в каталог и доступен для назначения.",
    );
    reset();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-5">
      {/* Left: upload + files */}
      <div className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "card !p-7 border-dashed border-2 transition relative overflow-hidden",
            dragOver ? "border-brand-500 bg-brand-50" : "border-border-strong",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <div className="text-center">
            <div
              className={cn(
                "inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-3 transition",
                dragOver ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700",
              )}
            >
              <UploadCloud size={26} />
            </div>
            <h3 className="text-[17px] font-bold tracking-tight">Перетащите документы сюда</h3>
            <p className="text-[13px] text-ink-soft mt-1">
              PDF · Word · PowerPoint · Confluence · HTML
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button onClick={() => inputRef.current?.click()} className="btn btn-primary">
                Выбрать файлы
              </button>
              <button
                onClick={() => {
                  addFiles(makeFakeFiles());
                }}
                className="btn btn-outline"
              >
                <Sparkles size={14} /> Демо-документы
              </button>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="card !p-0 overflow-hidden anim-fade-up">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
                Загружено · {files.length}
              </div>
              {phase === "idle" && (
                <button
                  onClick={reset}
                  className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute hover:text-danger"
                >
                  Очистить
                </button>
              )}
            </div>
            <ul className="divide-y divide-border">
              {files.map((f) => {
                const Icon = pickIcon(f.ext);
                return (
                  <li key={f.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="h-9 w-9 rounded-lg bg-surface-alt text-ink-soft inline-flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-medium truncate">{f.name}</div>
                      <div className="text-[11.5px] text-ink-mute">{bytesToHuman(f.size)}</div>
                    </div>
                    {phase === "ready" ? (
                      <CheckCircle2 size={16} className="text-success" />
                    ) : phase !== "idle" ? (
                      <Loader2 size={16} className="text-brand-600 spinner" />
                    ) : (
                      <button
                        onClick={() => removeFile(f.id)}
                        className="text-ink-mute hover:text-danger"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {phase === "idle" && files.length > 0 && (
          <button onClick={startAnalyze} className="btn btn-primary w-full !h-12">
            <Sparkles size={16} /> Запустить ИИ-импорт
          </button>
        )}
      </div>

      {/* Right: pipeline + draft */}
      <div className="space-y-4">
        <div className="card !p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex h-9 w-9 rounded-xl bg-brand-50 text-brand-700 items-center justify-center">
              <Brain size={18} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold leading-tight">ИИ-pipeline</h3>
              <p className="text-[12px] text-ink-soft">
                {phase === "ready"
                  ? "Готово. Можно просматривать структуру курса."
                  : phase === "idle"
                    ? "Загрузите документы для запуска."
                    : "Обрабатываем материалы…"}
              </p>
            </div>
          </div>

          <ol className="space-y-2.5">
            {PIPELINE_STEPS.map((s, i) => {
              const Icon = s.icon;
              const status =
                phase === "ready"
                  ? "done"
                  : stepIndex > i
                    ? "done"
                    : stepIndex === i
                      ? "active"
                      : "pending";
              return (
                <li
                  key={s.key}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition",
                    status === "active"
                      ? "bg-brand-50 border-brand-200"
                      : status === "done"
                        ? "bg-white border-border"
                        : "bg-surface-alt/50 border-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "h-9 w-9 rounded-xl inline-flex items-center justify-center shrink-0",
                      status === "done"
                        ? "bg-success text-white"
                        : status === "active"
                          ? "bg-brand-600 text-white"
                          : "bg-white text-ink-mute ring-1 ring-border",
                    )}
                  >
                    {status === "done" ? (
                      <CheckCircle2 size={16} />
                    ) : status === "active" ? (
                      <Loader2 size={16} className="spinner" />
                    ) : (
                      <Icon size={16} />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-medium">{s.label}</div>
                    {status === "active" && (
                      <div className="text-[11.5px] text-brand-700 mt-0.5">Обрабатываем · ИИ-агент</div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10.5px] uppercase tracking-[0.14em] font-semibold",
                      status === "done"
                        ? "text-success"
                        : status === "active"
                          ? "text-brand-700"
                          : "text-ink-mute",
                    )}
                  >
                    {status === "done" ? "готово" : status === "active" ? "в работе" : "ожидание"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {draft && phase === "ready" && <DraftPreview draft={draft} onPublish={publish} onReset={reset} />}
      </div>
    </div>
  );
}

function DraftPreview({
  draft,
  onPublish,
  onReset,
}: {
  draft: ImportedCourseDraft;
  onPublish: () => void;
  onReset: () => void;
}) {
  return (
    <div className="card !p-5 anim-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-brand-600 mb-1">
            Черновик курса
          </div>
          <h3 className="text-[18px] font-bold tracking-tight leading-tight">{draft.title}</h3>
          <p className="text-[12.5px] text-ink-soft mt-1">
            {draft.modules.length} модулей · {draft.questionsCount} проверочных вопросов · из{" "}
            {draft.sourceFiles.length} документов
          </p>
        </div>
        <Chip tone="green">
          <CheckCircle2 size={11} /> Сгенерировано
        </Chip>
      </div>

      <ol className="space-y-2 mb-5">
        {draft.modules.map((m, i) => (
          <li
            key={m.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white"
          >
            <span className="h-7 w-7 rounded-lg bg-brand-50 text-brand-700 text-[12px] font-semibold inline-flex items-center justify-center">
              {i + 1}
            </span>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold">{m.title}</div>
              <div className="text-[11.5px] text-ink-mute mt-0.5">
                {m.lessonsCount} уроков · конспекты ИИ
              </div>
            </div>
            <Chip tone={m.status === "ready" ? "green" : "gray"}>{m.status === "ready" ? "готов" : "черновик"}</Chip>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-2">
        <button onClick={onPublish} className="btn btn-primary flex-1">
          <Rocket size={15} /> Опубликовать и назначить
        </button>
        <button onClick={onReset} className="btn btn-outline">
          Сбросить
        </button>
      </div>

      <p className="text-[11.5px] text-ink-mute mt-3">
        После публикации курс попадёт в каталог. Перед массовым назначением рекомендуется ревью методиста.
      </p>
    </div>
  );
}

function makeFakeFiles(): FileList {
  const files = [
    new File([""], "ERP-warehouse.pdf", { type: "application/pdf" }),
    new File([""], "Регламент-приёмки.docx", { type: "application/msword" }),
    new File([""], "Презентация-склад.pptx", { type: "application/vnd.ms-powerpoint" }),
  ];
  Object.defineProperty(files[0], "size", { value: 4_200_000 });
  Object.defineProperty(files[1], "size", { value: 182_000 });
  Object.defineProperty(files[2], "size", { value: 8_700_000 });
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  return dt.files;
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
