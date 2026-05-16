"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import type { CurrencyCode } from "@/types";

const HEADLINE_LINES: ReadonlyArray<{ words: ReadonlyArray<string>; accentIndex?: number }> = [
  { words: ["Move", "money"] },
  { words: ["across", "borders"] },
  { words: ["at", "Singapore's", "best", "rate"], accentIndex: 2 },
];

type TrustMetric = {
  prefix?: string;
  target: number;
  suffix?: string;
  decimals?: number;
  thousands?: boolean;
  label: string;
};

const TRUST_METRICS: ReadonlyArray<TrustMetric> = [
  { target: 50283, thousands: true, label: "Customers served" },
  { prefix: "S$", target: 8.4, decimals: 1, suffix: "B", label: "Volume settled" },
  { target: 47, label: "Live currencies" },
  { target: 2008, label: "Operating since" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_BASE = "SGD" as const;

const HERO_RATE_META: ReadonlyArray<{
  code: CurrencyCode;
  fallbackRate: string;
  delta: string;
  positive: boolean;
}> = [
  { code: "USD", fallbackRate: "1.3287", delta: "+0.42%", positive: true },
  { code: "GBP", fallbackRate: "1.6841", delta: "−0.18%", positive: false },
  { code: "INR", fallbackRate: "0.0159", delta: "+0.07%", positive: true },
  { code: "MYR", fallbackRate: "0.2843", delta: "+0.21%", positive: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { data } = useExchangeRates(HERO_BASE);

  const panelRows = useMemo(() => {
    return HERO_RATE_META.map(({ code, fallbackRate, delta, positive }) => {
      const inverse = data?.rates[code];
      const sgdPerUnit = typeof inverse === "number" && inverse > 0 ? 1 / inverse : null;
      return {
        pair: `${code} / SGD`,
        rate: sgdPerUnit ? sgdPerUnit.toFixed(4) : fallbackRate,
        delta,
        positive,
      };
    });
  }, [data]);

  const heroUsdRate = panelRows[0]?.rate ?? HERO_RATE_META[0].fallbackRate;

  const buildLineVariants = (lineIndex: number): Variants => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.15 + lineIndex * 0.18,
      },
    },
  });

  const wordVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE },
    },
  };

  const fadeUp: Variants = {
    hidden: { y: 24, opacity: 0, filter: "blur(8px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.8, ease: EASE },
    },
  };

  return (
    <section
      aria-label="Faizura Trading hero"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#0a0a0b] text-primary"
    >
      <BackdropMesh />
      <BackdropGrid />
      <GhostMarquee />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col px-5 pt-20 pb-12 md:px-10 md:pt-24 md:pb-16">
        <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pr-8 flex flex-col justify-start">
            <h1 className="font-display text-[clamp(44px,7vw,104px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-white">
              {HEADLINE_LINES.map((line, li) => (
                <motion.span
                  key={li}
                  initial="hidden"
                  animate="show"
                  variants={buildLineVariants(li)}
                  className="block overflow-hidden"
                >
                  {line.words.map((w, wi) => {
                    const isAccent = line.accentIndex === wi;
                    return (
                      <span
                        key={wi}
                        className="inline-block overflow-hidden align-bottom pr-[0.22em]"
                      >
                        <motion.span
                          variants={wordVariants}
                          className={cn(
                            "inline-block will-change-transform",
                            isAccent && "text-[#2D5BFF]"
                          )}
                        >
                          {w}
                        </motion.span>
                      </span>
                    );
                  })}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="mt-10 max-w-[46ch] text-base leading-relaxed text-white/65 md:text-lg"
            >
              Settle remittances and convert at interbank-thin spreads — the same
              wholesale rates Singapore banks see, without the bank-grade markup.
              Forty-seven currencies. Zero hidden fees.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <a
                href="#converter"
                className="group relative inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-[15px] font-semibold text-[#0a0a0b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:pr-3 active:scale-[0.98]"
              >
                Lock today&apos;s rate
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0b] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </a>

              <a
                href="#rates"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <span className="relative">
                  See live board
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                </span>
                <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex items-start">
            <MarketPanel reduce={!!reduce} rows={panelRows} usdRate={heroUsdRate} />
          </div>
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}

function BackdropMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -top-[20%] -right-[10%] h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,91,255,0.22), rgba(45,91,255,0) 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute -bottom-[25%] -left-[15%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,200,150,0.10), rgba(0,200,150,0) 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}

function BackdropGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
      }}
    />
  );
}

function GhostMarquee() {
  const reduce = useReducedMotion();
  const phrase = "Exchange · Transfer · Settle · Remit · ";
  const repeated = phrase.repeat(8);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] -z-10 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ x: 0 }}
        animate={reduce ? undefined : { x: "-50%" }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="whitespace-nowrap font-display text-[clamp(180px,22vw,320px)] font-black uppercase leading-none tracking-tighter text-white/[0.10] select-none"
      >
        {repeated}
        {repeated}
      </motion.div>
    </div>
  );
}

function MarketPanel({
  reduce,
  rows,
  usdRate,
}: {
  reduce: boolean;
  rows: ReadonlyArray<{ pair: string; rate: string; delta: string; positive: boolean }>;
  usdRate: string;
}) {
  const points: ReadonlyArray<[number, number]> = [
    [0, 78], [12, 72], [22, 80], [32, 68], [44, 74],
    [56, 60], [68, 64], [78, 48], [88, 52], [100, 38],
  ];
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: EASE }}
      className="relative w-full"
    >
      <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_30px_80px_-30px_rgba(45,91,255,0.4)] backdrop-blur-[2px]">
        <div className="rounded-[22px] border border-white/[0.06] bg-[#0d0d10] p-4 sm:p-5 md:p-7">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C896]/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C896]" />
                </span>
                Live · Singapore desk
              </div>
              <div className="mt-3 font-display text-[28px] font-bold leading-none text-white">
                USD <span className="text-white/35">→</span> SGD
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[28px] font-medium leading-none tabular-nums text-white">
                {usdRate}
              </div>
              <div className="mt-1 font-mono text-[11px] tabular-nums text-[#00C896]">
                +0.42% · 24h
              </div>
            </div>
          </div>

          <div className="mt-6">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
              <defs>
                <linearGradient id="hero-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D5BFF" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#2D5BFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={area}
                fill="url(#hero-area-grad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke="#2D5BFF"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 1.6, delay: 0.9, ease: EASE }}
                style={{ filter: "drop-shadow(0 0 4px rgba(45,91,255,0.35))" }}
              />
              <motion.circle
                cx={100}
                cy={38}
                r="1.6"
                fill="#2D5BFF"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.4, ease: EASE }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="mt-6 divide-y divide-white/[0.06]">
            {rows.map((p, i) => (
              <motion.div
                key={p.pair}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.08, ease: EASE }}
                className="flex items-center justify-between py-2.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {p.pair}
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[13px] tabular-nums text-white">
                    {p.rate}
                  </span>
                  <span
                    className={cn(
                      "w-14 text-right font-mono text-[11px] tabular-nums",
                      p.positive ? "text-[#00C896]" : "text-[#FF5C5C]"
                    )}
                  >
                    {p.delta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrustStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [parentRevealed, setParentRevealed] = useState(false);
  const active = inView && parentRevealed;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
      onAnimationComplete={() => setParentRevealed(true)}
      className="mt-16 grid grid-cols-2 gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-4 md:gap-10 md:pt-10"
    >
      {TRUST_METRICS.map((m, i) => (
        <div key={m.label} className="flex flex-col">
          <AnimatedStat metric={m} index={i} active={active} reduce={!!reduce} />
          <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            {m.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function formatStatNumber(value: number, decimals: number, thousands: boolean): string {
  const fixed = value.toFixed(decimals);
  if (!thousands) return fixed;
  const [intPart, fracPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fracPart !== undefined ? `${withSep}.${fracPart}` : withSep;
}

function AnimatedStat({
  metric,
  index,
  active,
  reduce,
}: {
  metric: TrustMetric;
  index: number;
  active: boolean;
  reduce: boolean;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [settled, setSettled] = useState(reduce);

  const decimals = metric.decimals ?? 0;
  const thousands = metric.thousands ?? false;
  const finalText = formatStatNumber(metric.target, decimals, thousands);
  const initialText = formatStatNumber(0, decimals, thousands);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (reduce) {
      if (numberRef.current) numberRef.current.textContent = finalText;
      setSettled(true);
      return;
    }

    const delayMs = index * 150;
    const durationMs = 1700;
    const startAt = performance.now() + delayMs;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = metric.target * eased;
      if (numberRef.current) {
        numberRef.current.textContent = formatStatNumber(current, decimals, thousands);
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        if (numberRef.current) numberRef.current.textContent = finalText;
        setSettled(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, metric.target, decimals, thousands, index, finalText]);

  return (
    <motion.span
      className="font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-none tabular-nums"
      initial={false}
      animate={
        settled
          ? {
              color: "#2D5BFF",
              textShadow: [
                "0 0 0px rgba(45,91,255,0)",
                "0 0 28px rgba(45,91,255,0.85)",
                "0 0 10px rgba(45,91,255,0.35)",
              ],
            }
          : { color: "#FFFFFF", textShadow: "0 0 0px rgba(45,91,255,0)" }
      }
      transition={
        settled
          ? {
              color: { duration: 0.05, ease: "easeOut" },
              textShadow: { duration: 0.6, times: [0, 0.25, 1], ease: "easeOut" },
            }
          : { duration: 0 }
      }
    >
      {metric.prefix}
      <span ref={numberRef}>{reduce ? finalText : initialText}</span>
      {metric.suffix}
    </motion.span>
  );
}
