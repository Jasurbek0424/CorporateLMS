"use client";

import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

interface BrandProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-xl bg-brand-600 text-white shadow-[0_4px_14px_-4px_rgba(30,77,204,0.55)]",
        className,
      )}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19V5l5 7 3-4 3 4 5-7v14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Brand({ className, compact }: BrandProps) {
  const { t } = useT();
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      {!compact && (
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight">Mars Forge</div>
          <div className="text-[11px] text-ink-mute uppercase tracking-[0.12em]">{t("brand.tagline")}</div>
        </div>
      )}
    </div>
  );
}
