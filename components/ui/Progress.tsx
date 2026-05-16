import { cn } from "@/lib/cn";

interface ProgressProps {
  value: number;
  tone?: "blue" | "green" | "amber" | "red" | "auto";
  className?: string;
  showLabel?: boolean;
  thin?: boolean;
}

const TONE_BG = {
  blue: "bg-brand-600",
  green: "bg-success",
  amber: "bg-warn",
  red: "bg-danger",
} as const;

function autoTone(v: number): keyof typeof TONE_BG {
  if (v >= 80) return "green";
  if (v >= 50) return "blue";
  if (v >= 30) return "amber";
  return "red";
}

export function Progress({ value, tone = "auto", className, showLabel, thin }: ProgressProps) {
  const t = tone === "auto" ? autoTone(value) : tone;
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 rounded-full bg-surface-alt overflow-hidden", thin ? "h-1.5" : "h-2")}>
        <div
          className={cn("h-full rounded-full transition-[width] duration-500 ease-out", TONE_BG[t])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <span className="text-xs font-semibold text-ink-soft tabular-nums w-9 text-right">{clamped}%</span>
      ) : null}
    </div>
  );
}
