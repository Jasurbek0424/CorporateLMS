import type { Department, DepartmentCompletion } from "@/lib/types";

export const departments: Department[] = [
  { id: "d-hq", name: "Головной офис", parentId: null, headcount: 1247 },
  { id: "d-prod", name: "Производство", parentId: "d-hq", headcount: 599 },
  { id: "d-prod-1", name: "Цех №1", parentId: "d-prod", headcount: 312 },
  { id: "d-prod-2", name: "Цех №2", parentId: "d-prod", headcount: 287 },
  { id: "d-log", name: "Логистика и склад", parentId: "d-hq", headcount: 148 },
  { id: "d-buy", name: "Закупки", parentId: "d-hq", headcount: 52 },
  { id: "d-fin", name: "Финансы и бухгалтерия", parentId: "d-hq", headcount: 73 },
  { id: "d-geo", name: "Геолого-разведка", parentId: "d-hq", headcount: 94 },
  { id: "d-safety", name: "Безопасность труда", parentId: "d-hq", headcount: 38 },
  { id: "d-it", name: "ИТ-департамент", parentId: "d-hq", headcount: 61 },
  { id: "d-hr", name: "HR и обучение", parentId: "d-hq", headcount: 24 },
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

export function getDepartmentPath(id: string): string {
  const node = getDepartmentById(id);
  if (!node) return "";
  if (!node.parentId) return node.name;
  return `${getDepartmentPath(node.parentId)} · ${node.name}`;
}

export function getDepartmentChildren(parentId: string | null): Department[] {
  return departments.filter((d) => d.parentId === parentId);
}
