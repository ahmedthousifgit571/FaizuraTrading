"use client";

import { useMemo, useState } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import RateTicker from "@/components/ui/RateTicker";
import { cn, formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";
import { useExchangeRates } from "@/hooks/useExchangeRates";

const ROWS: Array<{ code: CurrencyCode; flag: string; name: string }> = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit" },
  { code: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar" },
  { code: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
];

const SPREAD = 0.005; // 0.5% notional buy/sell spread for illustration

// Deterministic 0..1 hash — must match between SSR and client to avoid
// hydration mismatch. Sin-based GLSL-style noise.
function hash01(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 64, h = 22;
  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const trend = values[values.length - 1] - values[0];
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path
        d={path}
        fill="none"
        stroke={trend >= 0 ? "var(--color-positive)" : "var(--color-negative)"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function genSpark(seed: number, rowIdx: number): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < 20; i++) {
    v += (hash01(rowIdx * 101 + i) - 0.5) * seed * 0.01;
    out.push(v);
  }
  return out;
}

export default function LiveRates() {
  const { data, error } = useExchangeRates("SGD");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const rows = useMemo(() => {
    return ROWS.map((row, i) => {
      const inverse = data?.rates[row.code]; // SGD → row.code
      const sgdPerRow = inverse ? 1 / inverse : null; // 1 row.code = ? SGD
      const change = ((Math.sin(i * 1.7) + hash01(i) * 0.4) - 0.2) * 0.4;
      const spark = sgdPerRow ? genSpark(sgdPerRow, i) : [];
      return { ...row, sgdPerRow, change, spark };
    });
  }, [data]);

  return (
    <section id="rates" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-10 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Live Rates
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Today&apos;s Rates, Updated in Real Time
          </AnimatedText>
          <p className="mt-4 text-muted">
            All rates shown against SGD. {error ? "Showing indicative rates." : "Refreshes every 60 seconds."}
          </p>
        </header>

        <RateTicker className="mb-10" />

        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm tabular">
            <thead>
              <tr className="text-left text-muted text-xs uppercase tracking-[0.12em]">
                <th className="py-4 px-5 font-normal">Currency</th>
                <th className="py-4 px-5 font-normal text-right">We Buy</th>
                <th className="py-4 px-5 font-normal text-right">We Sell</th>
                <th className="py-4 px-5 font-normal text-right">24h</th>
                <th className="py-4 px-5 font-normal text-right hidden md:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.code}
                  className={cn(
                    "border-t border-border transition-colors",
                    hoverIdx === i ? "bg-bg" : "bg-surface"
                  )}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-3">
                      <span aria-hidden className="text-base">{r.flag}</span>
                      <span className="font-medium text-primary">{r.code}</span>
                      <span className="text-muted hidden md:inline">{r.name}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right text-primary">
                    {r.sgdPerRow ? formatRate(r.sgdPerRow * (1 - SPREAD)) : "—"}
                  </td>
                  <td className="py-4 px-5 text-right text-primary">
                    {r.sgdPerRow ? formatRate(r.sgdPerRow * (1 + SPREAD)) : "—"}
                  </td>
                  <td
                    className={cn(
                      "py-4 px-5 text-right",
                      r.change >= 0 ? "text-positive" : "text-negative"
                    )}
                  >
                    {r.change >= 0 ? "+" : ""}{(r.change).toFixed(2)}%
                  </td>
                  <td className="py-4 px-5 text-right hidden md:table-cell">
                    {r.spark.length ? <Sparkline values={r.spark} /> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
