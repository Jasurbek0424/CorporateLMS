import type {
  ActivityEvent,
  Course,
  Department,
  DepartmentCompletion,
  Employee,
  EmployeeCourseEntry,
  ImportedCourseDraft,
} from "@/lib/types";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Request failed: ${url} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  courses: {
    list: () => jsonFetch<Course[]>("/api/courses"),
    get: (id: string) => jsonFetch<Course>(`/api/courses/${id}`),
  },
  employees: {
    list: () => jsonFetch<Employee[]>("/api/employees"),
    get: (id: string) => jsonFetch<{ employee: Employee; courses: EmployeeCourseEntry[] }>(`/api/employees/${id}`),
  },
  departments: {
    list: () => jsonFetch<{ departments: Department[]; completion: DepartmentCompletion[] }>("/api/departments"),
  },
  activity: {
    list: () => jsonFetch<ActivityEvent[]>("/api/activity"),
  },
  import: {
    analyze: (files: { name: string; size: number }[]) =>
      jsonFetch<ImportedCourseDraft>("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files }),
      }),
  },
};
