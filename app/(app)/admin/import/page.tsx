"use client";

import { Sparkles, Languages, Bot, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImportFlow } from "@/components/features/admin/ImportFlow";

const AI_FEATURES = [
  {
    code: "α",
    name: "AI Course Generation",
    desc: "PDF · Word · PPTX → структура курса, конспекты, рерайт.",
    Icon: Sparkles,
  },
  {
    code: "β",
    name: "AI Knowledge Checks",
    desc: "Автогенерация вопросов 6 типов с регулировкой сложности.",
    Icon: Bot,
  },
  {
    code: "δ",
    name: "AI Translation & Voiceover",
    desc: "Перевод и озвучка курса: UZ · RU · EN из коробки.",
    Icon: Languages,
  },
];

export default function AdminImportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контент · импорт"
        title="ИИ-импорт документов"
        description="Перетащите PDF, Word и презентации — система разберёт их на модули и уроки, сделает конспекты, сформулирует проверочные вопросы. Администратор просматривает, правит, публикует."
      />

      <ImportFlow />

      <div className="mt-8">
        <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-ink-mute mb-3">
          ИИ-фичи внутри платформы
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AI_FEATURES.map((f) => (
            <div key={f.code} className="card !p-4 flex items-start gap-3">
              <span className="h-9 w-9 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center font-bold text-[15px] shrink-0">
                {f.code}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold leading-tight">{f.name}</div>
                <p className="text-[12.5px] text-ink-soft mt-1 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card !p-4 mt-3 flex items-start gap-3 bg-brand-50/40 border-brand-100">
          <ShieldCheck size={18} className="text-success shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-ink-soft">
            ИИ-обработка идёт через изолированный контур (zero-retention API или локальный
            Llama/Qwen в вашем контуре). Документы не покидают периметр заказчика.
          </p>
        </div>
      </div>
    </>
  );
}
