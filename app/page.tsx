"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    if (s.role === "employee") router.replace("/catalog");
    else if (s.role === "manager") router.replace("/dashboard");
    else router.replace("/admin/import");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-600 spinner" />
    </div>
  );
}
