import type { ActivityEvent } from "@/lib/types";

export const recentActivity: ActivityEvent[] = [
  { id: "a-1", employeeId: "e-3091", actionKey: "examPassed", courseId: "c-safety-area", score: 96, at: "12 мин назад", atUz: "12 daq oldin" },
  { id: "a-2", employeeId: "e-2274", actionKey: "courseAssigned", courseId: "c-erp-prod", at: "1 ч назад", atUz: "1 soat oldin" },
  { id: "a-3", employeeId: "e-7811", actionKey: "deadlineOverdue", courseId: "c-comp-lit", at: "3 ч назад", atUz: "3 soat oldin" },
  { id: "a-4", employeeId: "e-9134", actionKey: "moduleCompleted", courseId: "c-ai-lit", at: "вчера", atUz: "kecha" },
  { id: "a-5", employeeId: "e-6618", actionKey: "certIssued", courseId: "c-safety-area", at: "вчера", atUz: "kecha" },
  { id: "a-6", employeeId: "e-7704", actionKey: "courseAssigned", courseId: "c-excel", at: "2 дн назад", atUz: "2 kun oldin" },
];
