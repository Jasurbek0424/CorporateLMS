import * as React from "react";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4 mb-6", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-600 mb-2">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="text-[26px] sm:text-[30px] font-bold leading-[1.15] tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-[15px] text-ink-soft mt-2 leading-relaxed">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2 flex-wrap">{actions}</div> : null}
    </div>
  );
}
