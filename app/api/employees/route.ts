import { NextResponse } from "next/server";
import { employees } from "@/lib/data";

export async function GET() {
  return NextResponse.json(employees);
}
