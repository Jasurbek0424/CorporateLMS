import type { Department, DepartmentCompletion } from "@/lib/types";

export const departments: Department[] = [
  { id: "d-hq", name: "Головной офис", nameUz: "Bosh ofis", parentId: null, headcount: 1247 },
  { id: "d-prod", name: "Производство", nameUz: "Ishlab chiqarish", parentId: "d-hq", headcount: 599 },
  { id: "d-prod-1", name: "Цех №1", nameUz: "1-sex", parentId: "d-prod", headcount: 312 },
  { id: "d-prod-2", name: "Цех №2", nameUz: "2-sex", parentId: "d-prod", headcount: 287 },
  { id: "d-log", name: "Логистика и склад", nameUz: "Logistika va ombor", parentId: "d-hq", headcount: 148 },
  { id: "d-buy", name: "Закупки", nameUz: "Xaridlar", parentId: "d-hq", headcount: 52 },
  { id: "d-fin", name: "Финансы и бухгалтерия", nameUz: "Moliya va buxgalteriya", parentId: "d-hq", headcount: 73 },
  { id: "d-geo", name: "Геолого-разведка", nameUz: "Geologik qidiruv", parentId: "d-hq", headcount: 94 },
  { id: "d-safety", name: "Безопасность труда", nameUz: "Mehnat xavfsizligi", parentId: "d-hq", headcount: 38 },
  { id: "d-it", name: "ИТ-департамент", nameUz: "AT departamenti", parentId: "d-hq", headcount: 61 },
  { id: "d-hr", name: "HR и обучение", nameUz: "HR va o'qitish", parentId: "d-hq", headcount: 24 },
];

export const departmentCompletion: DepartmentCompletion[] = [
  { departmentId: "d-prod-1", completion: 92, people: 312 },
  { departmentId: "d-log", completion: 85, people: 148 },
  { departmentId: "d-prod-2", completion: 74, people: 287 },
  { departmentId: "d-fin", completion: 54, people: 73 },
  { departmentId: "d-geo", completion: 47, people: 94 },
  { departmentId: "d-safety", completion: 31, people: 38 },
];

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}

export function depName(d: Department | undefined, locale: "uz" | "ru" = "uz"): string {
  if (!d) return "";
  return locale === "uz" && d.nameUz ? d.nameUz : d.name;
}

export function getDepartmentPath(id: string, locale: "uz" | "ru" = "uz"): string {
  const node = getDepartmentById(id);
  if (!node) return "";
  const name = depName(node, locale);
  if (!node.parentId) return name;
  return `${getDepartmentPath(node.parentId, locale)} · ${name}`;
}

export function getDepartmentChildren(parentId: string | null): Department[] {
  return departments.filter((d) => d.parentId === parentId);
}
