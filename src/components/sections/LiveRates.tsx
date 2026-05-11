"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import RateTicker from "@/components/ui/RateTicker";
import { cn, formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";
import { useExchangeRates } from "@/hooks/useExchangeRates";

const EASE = [0.22, 1, 0.36, 1] as const;

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

function hash01(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
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

function Sparkline({ values, positive }: { values: number[]; positive: boolean }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 72;
  const h = 24;
  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <path
        d={path}
        fill="none"
        stroke={positive ? "#00C896" : "#FF5C5C"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SingaporeClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-SG", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    function tick() {
      setTime(formatter.format(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        Singapore · SGT
      </span>
      <span
        className="font-mono text-[clamp(34px,4vw,52px)] font-medium leading-none tabular-nums text-[#2D5BFF]"
        suppressHydrationWarning
      >
        {time ?? "--:--:--"}
      </span>
    </div>
  );
}

function GhostWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[35%] z-0 flex select-none items-center justify-center overflow-hidden"
    >
      <span className="font-display text-[clamp(200px,28vw,420px)] font-black uppercase leading-none tracking-tighter text-white opacity-[0.03]">
        Rates
      </span>
    </div>
  );
}

export default function LiveRates() {
  const reduce = useReducedMotion();
  const { data, error } = useExchangeRates("SGD");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const rows = useMemo(() => {
    return ROWS.map((row, i) => {
      const inverse = data?.rates[row.code]; // SGD → row.code
      const sgdPerRow = inverse ? 1 / inverse : null; // 1 row.code = ? SGD
      const change = (Math.sin(i * 1.7) + hash01(i) * 0.4 - 0.2) * 0.4;
      const spark = sgdPerRow ? genSpark(sgdPerRow, i) : [];
      return { ...row, sgdPerRow, change, spark };
    });
  }, [data]);

  const headerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const tickerInView = useInView(tickerRef, { once: true, amount: 0.4 });
  const tableInView = useInView(tableRef, { once: true, amount: 0.2 });

  const tbodyVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.55, ease: EASE },
    },
  };

  return (
    <section
      id="rates"
      aria-label="Live exchange rates"
      className="relative isolate overflow-hidden bg-[#0f1a2e] py-24 md:py-32"
    >
      <GhostWatermark />

      {/* Header row */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={
            headerInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
          }
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C896]/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C896]" />
              </span>
              Live Rates
            </div>

            <h2 className="mt-7 font-display text-[clamp(40px,5.4vw,76px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-white">
              <span className="block">The <span className="text-[#2D5BFF]">market</span></span>
              <span className="block">Right now.</span>
            </h2>

            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/65 md:text-lg">
              All rates shown against SGD.{" "}
              {error
                ? "Showing indicative rates."
                : "Refreshes every 60 seconds."}
            </p>
          </div>

          <SingaporeClock className="items-start md:items-end" />
        </motion.div>
      </div>

      {/* Ticker bar — full bleed */}
      <motion.div
        ref={tickerRef}
        initial={{ opacity: 0, y: 12 }}
        animate={
          tickerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
        }
        transition={{
          duration: reduce ? 0 : 0.8,
          delay: reduce ? 0 : 0.2,
          ease: EASE,
        }}
        className="relative z-10 mt-14 md:mt-20"
      >
        <RateTicker />
      </motion.div>

      {/* Rates table */}
      <div
        ref={tableRef}
        className="relative z-10 mx-auto mt-14 max-w-[1440px] px-5 md:mt-20 md:px-10"
      >
        <div className="overflow-x-auto">
          <motion.table
            className="w-full min-w-[640px] border-collapse"
            initial="hidden"
            animate={tableInView ? "show" : "hidden"}
            variants={tbodyVariants}
          >
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                  Currency
                </th>
                <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                  We Buy
                </th>
                <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                  We Sell
                </th>
                <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
                  24H
                </th>
                <th className="hidden px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 md:table-cell">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const positive = r.change >= 0;
                const hovered = hoverIdx === i;
                return (
                  <motion.tr
                    key={r.code}
                    variants={rowVariants}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    className={cn(
                      "h-[72px] border-b border-white/[0.05] transition-colors duration-150",
                      hovered ? "bg-white/[0.04]" : "bg-transparent"
                    )}
                  >
                    <td
                      className={cn(
                        "px-5 transition-shadow duration-150",
                        hovered
                          ? "shadow-[inset_2px_0_0_#2D5BFF]"
                          : "shadow-none"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="text-[22px] leading-none"
                        >
                          {r.flag}
                        </span>
                        <div className="flex flex-col leading-tight">
                          <span className="font-mono text-[14px] font-bold uppercase tracking-[0.06em] text-white">
                            {r.code}
                          </span>
                          <span className="mt-0.5 hidden text-[12px] text-white/45 md:inline">
                            {r.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 text-right font-mono text-[15px] font-bold tabular-nums text-white">
                      {r.sgdPerRow
                        ? formatRate(r.sgdPerRow * (1 - SPREAD))
                        : "—"}
                    </td>
                    <td className="px-5 text-right font-mono text-[15px] font-bold tabular-nums text-white">
                      {r.sgdPerRow
                        ? formatRate(r.sgdPerRow * (1 + SPREAD))
                        : "—"}
                    </td>
                    <td
                      className={cn(
                        "px-5 text-right font-mono text-[14px] font-bold tabular-nums",
                        positive ? "text-[#00C896]" : "text-[#FF5C5C]"
                      )}
                    >
                      <span aria-hidden className="mr-1">
                        {positive ? "▲" : "▼"}
                      </span>
                      {Math.abs(r.change).toFixed(2)}%
                    </td>
                    <td className="hidden px-5 text-right align-middle md:table-cell">
                      <div className="inline-flex items-center justify-end">
                        {r.spark.length ? (
                          <Sparkline
                            values={r.spark}
                            positive={positive}
                          />
                        ) : null}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </motion.table>
        </div>
      </div>
    </section>
  );
}
