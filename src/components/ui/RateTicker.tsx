"use client";

import { useEffect, useState } from "react";
import { cn, formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

type Tick = { code: CurrencyCode; rate: number; delta: number };

const TICKER_LOOP_DURATION_SECONDS = 6;
const DRIFT_INTERVAL_MS = 1400;

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
          return {
            ...t,
            rate: +(t.rate + drift).toFixed(4),
            delta: +drift.toFixed(4),
          };
        })
      );
    }, DRIFT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  // Triple the items so the marquee can loop seamlessly
  const items = [...ticks, ...ticks, ...ticks];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden border-y border-white/[0.06] bg-white/[0.03]",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
      aria-label="Live exchange rates ticker"
    >
      <div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `ticker ${TICKER_LOOP_DURATION_SECONDS}s linear infinite`,
        }}
      >
        {items.map((t, i) => {
          const positive = t.delta >= 0;
          return (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-3 border-r border-white/[0.15] px-8 py-3.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                SGD/{t.code}
              </span>
              <span className="font-mono text-[14px] font-bold tabular-nums text-white">
                {formatRate(t.rate)}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-mono text-[12px] font-medium tabular-nums",
                  positive ? "text-[#00C896]" : "text-[#FF5C5C]"
                )}
              >
                <span aria-hidden>{positive ? "▲" : "▼"}</span>
                {Math.abs(t.delta).toFixed(4)}
              </span>
            </span>
          );
        })}
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
