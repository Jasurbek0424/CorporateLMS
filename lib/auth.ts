"use client";

import type { Role, Session } from "@/lib/types";

const SESSION_KEY = "mf_lms_session";

interface SessionTemplate extends Session {
  positionUz?: string;
}

const SESSION_TEMPLATES: Record<Role, SessionTemplate> = {
  employee: {
    userId: "e-4128",
    role: "employee",
    fullName: "Олимов Аброр",
    initials: "ОА",
    departmentId: "d-prod-2",
    position: "Оператор линии · Цех №2",
    positionUz: "Liniya operatori · 2-sex",
  },
  manager: {
    userId: "e-2274",
    role: "manager",
    fullName: "Турсунов Дилмурод",
    initials: "ТД",
    departmentId: "d-prod-1",
    position: "Начальник смены · Цех №1",
    positionUz: "Smena boshlig'i · 1-sex",
  },
  admin: {
    userId: "e-9134",
    role: "admin",
    fullName: "Рахимова Гулноза",
    initials: "РГ",
    departmentId: "d-hr",
    position: "Администратор-методист · HR",
    positionUz: "Administrator-metodist · HR",
  },
  hr: {
    userId: "e-9134",
    role: "hr",
    fullName: "Рахимова Гулноза",
    initials: "РГ",
    departmentId: "d-hr",
    position: "HR · куратор обучения",
    positionUz: "HR · ta'lim kuratori",
  },
};

export interface StoredSession extends Session {
  positionUz?: string;
}

export function getSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export function setSession(role: Role): StoredSession {
  const session = SESSION_TEMPLATES[role];
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  document.cookie = `mf_role=${role}; path=/; max-age=86400`;
  return session;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  document.cookie = "mf_role=; path=/; max-age=0";
}

export function roleLabel(role: Role, locale: "uz" | "ru" = "uz"): string {
  if (locale === "uz") {
    return {
      employee: "Xodim",
      manager: "Rahbar",
      admin: "Administrator-metodist",
      hr: "HR · ta'lim kuratori",
    }[role];
  }
  return {
    employee: "Сотрудник",
    manager: "Руководитель",
    admin: "Администратор-методист",
    hr: "HR · куратор обучения",
  }[role];
}
