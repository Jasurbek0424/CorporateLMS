import type { ActivityEvent } from "@/lib/types";

export const recentActivity: ActivityEvent[] = [
  { id: "a-1", employeeId: "e-3091", action: "Сдан экзамен", courseId: "c-safety-area", score: 96, at: "12 мин назад" },
  { id: "a-2", employeeId: "e-2274", action: "Назначен курс", courseId: "c-erp-prod", at: "1 ч назад" },
  { id: "a-3", employeeId: "e-7811", action: "Просрочен дедлайн", courseId: "c-comp-lit", at: "3 ч назад" },
  { id: "a-4", employeeId: "e-9134", action: "Завершён модуль", courseId: "c-ai-lit", at: "вчера" },
  { id: "a-5", employeeId: "e-6618", action: "Получен сертификат", courseId: "c-safety-area", at: "вчера" },
  { id: "a-6", employeeId: "e-7704", action: "Назначен курс", courseId: "c-excel", at: "2 дн назад" },
];
