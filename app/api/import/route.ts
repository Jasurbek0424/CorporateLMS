import { NextResponse } from "next/server";
import type { ImportedCourseDraft } from "@/lib/types";

interface AnalyzeBody {
  files: { name: string; size: number }[];
}

const TEMPLATE_MODULES = [
  "Введение в систему",
  "Создание заявок на приём",
  "Оформление документов",
  "Инвентаризация",
  "Отчётность и закрытие смены",
  "Кейсы и итоговая проверка",
];

function bytesToHuman(b: number): string {
  if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(1)} MB`;
  if (b >= 1_000) return `${Math.round(b / 1_000)} KB`;
  return `${b} B`;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({ files: [] }))) as AnalyzeBody;
  const files = body.files ?? [];

  const draft: ImportedCourseDraft = {
    id: `draft-${Date.now()}`,
    title: deriveTitle(files),
    modules: TEMPLATE_MODULES.slice(0, 5).map((title, i) => ({
      id: `dm-${i + 1}`,
      title,
      lessonsCount: 3 + (i % 3),
      status: "draft",
    })),
    questionsCount: 12,
    sourceFiles: files.map((f) => ({ name: f.name, size: bytesToHuman(f.size) })),
  };

  return NextResponse.json(draft);
}

function deriveTitle(files: AnalyzeBody["files"]): string {
  if (files.length === 0) return "Новый курс из документов";
  const base = files[0].name.replace(/\.(pdf|docx?|pptx?)$/i, "").replace(/[-_]/g, " ");
  return `ERP · ${base.charAt(0).toUpperCase()}${base.slice(1)}`;
}
