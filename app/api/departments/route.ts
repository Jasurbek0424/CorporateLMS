import { NextResponse } from "next/server";
import { departments, departmentCompletion } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ departments, completion: departmentCompletion });
}
