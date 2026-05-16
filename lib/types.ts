export type Role = "employee" | "manager" | "admin" | "hr";

export interface Session {
  userId: string;
  role: Role;
  fullName: string;
  initials: string;
  departmentId: string;
  position: string;
}

export type CourseStatus =
  | "required"
  | "recommended"
  | "completed"
  | "in_progress"
  | "overdue"
  | "not_started";

export type QuestionType =
  | "multiple_choice"
  | "multiple_answer"
  | "fill_blank"
  | "linear_scale"
  | "free_form"
  | "upload_file";

export interface Department {
  id: string;
  name: string;
  parentId: string | null;
  headcount: number;
}

export interface Employee {
  id: string;
  fullName: string;
  initials: string;
  position: string;
  departmentId: string;
  tenure: string;
  avgScore: number;
  required: { done: number; total: number };
  assigned: number;
  completed: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correct?: number | number[];
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  kind: "text" | "video" | "quiz" | "scorm";
  durationMin: number;
  body?: string;
  questions?: Question[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  modules: Module[];
  totalLessons: number;
  durationHours: number;
  required: boolean;
  progress: number;
  status: CourseStatus;
  dueDate?: string;
  score?: number;
  completedAt?: string;
  authorTeam: string;
  tags: string[];
}

export interface EmployeeCourseEntry {
  courseId: string;
  status: CourseStatus;
  progress: number;
  score?: number;
  completedAt?: string;
  dueDate?: string;
}

export interface ActivityEvent {
  id: string;
  employeeId: string;
  action: string;
  courseId?: string;
  score?: number;
  at: string;
}

export interface DepartmentCompletion {
  departmentId: string;
  completion: number;
  people: number;
}

export interface ImportedCourseDraft {
  id: string;
  title: string;
  modules: { id: string; title: string; lessonsCount: number; status: "draft" | "ready" | "processing" }[];
  questionsCount: number;
  sourceFiles: { name: string; size: string }[];
}
