import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface KpiTileProps {
  label: string;
  value: React.ReactNode;
  delta?: { value: string; positive: boolean };
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "neutral" | "warn" | "danger" | "success";
}

const TONE: Record<NonNullable<KpiTileProps["tone"]>, string> = {
  neutral: "text-ink",
  warn: "text-warn",
  danger: "text-danger",
  success: "text-success",
};

export function KpiTile({ label, value, delta, subtitle, icon, tone = "neutral" }: KpiTileProps) {
  return (
    <div className="card !p-5">
      <div className="flex items-start justify-between mb-2.5">
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-mute">
          {label}
        </div>
        {icon}
      </div>
      <div className={cn("text-[30px] font-bold leading-none tabular-nums tracking-tight mb-1.5", TONE[tone])}>
        {value}
      </div>
      <div className="flex items-center gap-2 text-[12px]">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              delta.positive ? "text-success" : "text-danger",
            )}
          >
            {delta.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {delta.value}
          </span>
        ) : null}
        {subtitle ? <span className="text-ink-mute">{subtitle}</span> : null}
      </div>
    </div>
  );
}
