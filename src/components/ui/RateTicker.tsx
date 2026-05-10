"use client";

import { useEffect, useState } from "react";
import { cn, formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

type Tick = { code: CurrencyCode; rate: number; delta: number };

const SEED: Tick[] = [
  { code: "USD", rate: 1.3502, delta: 0.0023 },
  { code: "EUR", rate: 1.4612, delta: -0.0011 },
  { code: "GBP", rate: 1.7102, delta: 0.0034 },
  { code: "AUD", rate: 0.8934, delta: -0.0006 },
  { code: "INR", rate: 0.0162, delta: 0.0001 },
  { code: "MYR", rate: 0.2872, delta: -0.0004 },
  { code: "JPY", rate: 0.0086, delta: 0.0001 },
  { code: "HKD", rate: 0.1729, delta: 0.0002 },
  { code: "CNY", rate: 0.1862, delta: -0.0007 },
  { code: "CAD", rate: 0.9923, delta: 0.0011 },
];

export default function RateTicker({ className }: { className?: string }) {
  const [ticks, setTicks] = useState(SEED);

  useEffect(() => {
    // Subtle simulated drift so the ticker feels alive while live API loads
    const id = window.setInterval(() => {
      setTicks((prev) =>
        prev.map((t) => {
          const drift = (Math.random() - 0.5) * 0.0008;
          return { ...t, rate: +(t.rate + drift).toFixed(4), delta: +drift.toFixed(4) };
        })
      );
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  // Triple the items so the marquee can loop seamlessly
  const items = [...ticks, ...ticks, ...ticks];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-border bg-surface",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      aria-label="Live exchange rates ticker"
    >
      <div className="flex gap-12 py-4 animate-[ticker_60s_linear_infinite] whitespace-nowrap">
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm tabular text-primary/90"
          >
            <span className="text-muted">SGD/{t.code}</span>
            <span className="font-medium">{formatRate(t.rate)}</span>
            <span
              className={cn(
                "text-xs tabular",
                t.delta >= 0 ? "text-positive" : "text-negative"
              )}
            >
              {t.delta >= 0 ? "▲" : "▼"} {Math.abs(t.delta).toFixed(4)}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
