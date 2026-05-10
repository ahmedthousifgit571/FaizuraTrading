import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "neutral" | "positive" | "negative" | "accent";

const toneStyles: Record<Tone, string> = {
  neutral: "border-border text-muted",
  positive: "border-positive/30 text-positive",
  negative: "border-negative/30 text-negative",
  accent: "border-accent/30 text-accent",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]",
        "uppercase tracking-[0.12em] tabular border",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
