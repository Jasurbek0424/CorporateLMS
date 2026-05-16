import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "blue" | "green" | "amber" | "red" | "gray";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  icon?: React.ReactNode;
}

const TONE_CLS: Record<Tone, string> = {
  blue: "chip chip-blue",
  green: "chip chip-green",
  amber: "chip chip-amber",
  red: "chip chip-red",
  gray: "chip chip-gray",
};

export function Chip({ tone = "gray", icon, className, children, ...rest }: ChipProps) {
  return (
    <span {...rest} className={cn(TONE_CLS[tone], className)}>
      {icon}
      {children}
    </span>
  );
}
