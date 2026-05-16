import type { CourseStatus } from "@/lib/types";

const STATUS_LABEL: Record<CourseStatus, string> = {
  required: "Обязательный",
  recommended: "Рекомендован",
  completed: "Завершён",
  in_progress: "В процессе",
  overdue: "Просрочен",
  not_started: "Не начат",
};

const STATUS_CHIP: Record<CourseStatus, string> = {
  required: "chip chip-blue",
  recommended: "chip chip-gray",
  completed: "chip chip-green",
  in_progress: "chip chip-amber",
  overdue: "chip chip-red",
  not_started: "chip chip-gray",
};

export function statusLabel(s: CourseStatus): string {
  return STATUS_LABEL[s];
}

export function statusChipClass(s: CourseStatus): string {
  return STATUS_CHIP[s];
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function pluralRu(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
