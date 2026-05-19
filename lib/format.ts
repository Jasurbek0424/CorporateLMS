import type { CourseStatus } from "@/lib/types";

type Loc = "uz" | "ru";

const STATUS_LABEL_RU: Record<CourseStatus, string> = {
  required: "Обязательный",
  recommended: "Рекомендован",
  completed: "Завершён",
  in_progress: "В процессе",
  overdue: "Просрочен",
  not_started: "Не начат",
};

const STATUS_LABEL_UZ: Record<CourseStatus, string> = {
  required: "Majburiy",
  recommended: "Tavsiya etilgan",
  completed: "Tugatilgan",
  in_progress: "Jarayonda",
  overdue: "Muddati o'tgan",
  not_started: "Boshlanmagan",
};

const STATUS_CHIP: Record<CourseStatus, string> = {
  required: "chip chip-blue",
  recommended: "chip chip-gray",
  completed: "chip chip-green",
  in_progress: "chip chip-amber",
  overdue: "chip chip-red",
  not_started: "chip chip-gray",
};

export function statusLabel(s: CourseStatus, locale: Loc = "uz"): string {
  return locale === "uz" ? STATUS_LABEL_UZ[s] : STATUS_LABEL_RU[s];
}

export function statusChipClass(s: CourseStatus): string {
  return STATUS_CHIP[s];
}

export function formatDate(iso: string, locale: Loc = "uz"): string {
  const d = new Date(iso);
  const tag = locale === "uz" ? "uz-Latn-UZ" : "ru-RU";
  return d.toLocaleDateString(tag, { day: "2-digit", month: "2-digit", year: "2-digit" });
}

export function formatNumber(n: number, locale: Loc = "uz"): string {
  const tag = locale === "uz" ? "uz-Latn-UZ" : "ru-RU";
  return new Intl.NumberFormat(tag).format(n);
}

export function pluralRu(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export function pluralByLocale(
  locale: Loc,
  n: number,
  ru: [string, string, string],
  uzSingle: string,
): string {
  if (locale === "uz") return uzSingle;
  return pluralRu(n, ru);
}
