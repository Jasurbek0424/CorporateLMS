"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { getSession } from "@/lib/auth";
import type { Session } from "@/lib/types";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setSession(s);
    setReady(true);
  }, [router]);

  if (!ready || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-600 spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar role={session.role} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar session={session} />
        <main className="flex-1 px-6 sm:px-8 py-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
