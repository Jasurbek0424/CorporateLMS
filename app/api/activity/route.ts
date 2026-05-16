import { NextResponse } from "next/server";
import { recentActivity } from "@/lib/data";

export async function GET() {
  return NextResponse.json(recentActivity);
}
