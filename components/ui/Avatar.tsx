import { cn } from "@/lib/cn";

interface AvatarProps {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "blue" | "neutral";
  className?: string;
}

const SIZE = {
  xs: "h-7 w-7 text-[11px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

const TONE = {
  blue: "bg-brand-600 text-white",
  neutral: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
} as const;

export function Avatar({ initials, size = "sm", tone = "neutral", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold tracking-wide select-none",
        SIZE[size],
        TONE[tone],
        className,
      )}
    >
      {initials}
    </div>
  );
}
