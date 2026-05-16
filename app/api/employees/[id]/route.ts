import { NextResponse } from "next/server";
import { getEmployeeById, getEmployeeCourses } from "@/lib/data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const employee = getEmployeeById(id);
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ employee, courses: getEmployeeCourses(id) });
}
