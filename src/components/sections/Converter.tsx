"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowDownUp, Check, ChevronDown } from "lucide-react";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { CURRENCIES } from "@/components/ui/CurrencyInput";
import { cn, formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Converter() {
  const reduce = useReducedMotion();

  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("SGD");
  const [amount, setAmount] = useState("1000");
  const [swapTurns, setSwapTurns] = useState(0);

  const { data, loading, error } = useExchangeRates(from);

  const rate = data?.rates[to] ?? null;
  const converted = useMemo(() => {
    const n = parseFloat(amount);
    if (!rate || Number.isNaN(n)) return "";
    return (n * rate).toFixed(2);
  }, [amount, rate]);

  function swap() {
    setFrom(to);
    setTo(from);
    setSwapTurns((t) => t + 1);
  }

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="converter"
      aria-label="Live currency converter"
      className="relative isolate overflow-hidden bg-[#111111] py-24 md:py-32"
    >
      <ConverterBackdrop />

      <div
        ref={ref}
        className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-[1.22fr_1fr] lg:gap-16 lg:items-center"
      >
        {/* LEFT COLUMN — editorial context */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={
            inView
              ? { x: 0, opacity: 1 }
              : { x: -40, opacity: 0 }
          }
          transition={{
            duration: reduce ? 0 : 0.9,
            ease: EASE,
          }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C896]/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C896]" />
            </span>
            Live Converter
          </div>

          <h2 className="mt-7 font-display text-[clamp(40px,5.4vw,76px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-white">
            <span className="block">Know <span className="text-[#2D5BFF]">exactly</span></span>
            <span className="block">what they get.</span>
          </h2>

          <p className="mt-7 max-w-[44ch] text-base leading-relaxed text-white/65 md:text-lg">
            Rates refresh every 60 seconds. Lock it before it moves.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            <span>Zero hidden fees</span>
            <span aria-hidden className="text-white/20">·</span>
            <span>Interbank rates</span>
            <span aria-hidden className="text-white/20">·</span>
            <span>Instant confirmation</span>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — converter widget */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={
            inView
              ? { x: 0, opacity: 1 }
              : { x: 40, opacity: 0 }
          }
          transition={{
            duration: reduce ? 0 : 0.9,
            ease: EASE,
            delay: reduce ? 0 : 0.2,
          }}
          className="w-full"
        >
          <div className="border border-white/[0.08] bg-[#0f1a2e]">
            <div className="px-6 pt-6 pb-7 md:px-7 md:pt-7 md:pb-8">
              <FieldBlock label="You Send">
                <CurrencySelect
                  currency={from}
                  onCurrencyChange={setFrom}
                  ariaLabel="Currency to send"
                />
                <AmountInput
                  value={amount}
                  onChange={setAmount}
                  ariaLabel="Amount to send"
                />
              </FieldBlock>

              <div className="my-5 flex items-center">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <button
                  type="button"
                  aria-label="Swap currencies"
                  onClick={swap}
                  className="mx-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2D5BFF]/45 bg-[#2D5BFF]/5 text-[#2D5BFF] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#2D5BFF] hover:bg-[#2D5BFF]/12 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a2e]"
                >
                  <motion.span
                    animate={{ rotate: swapTurns * 180 }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      ease: EASE,
                    }}
                    className="inline-flex"
                  >
                    <ArrowDownUp size={16} strokeWidth={1.75} />
                  </motion.span>
                </button>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              <FieldBlock label="Recipient Gets">
                <CurrencySelect
                  currency={to}
                  onCurrencyChange={setTo}
                  ariaLabel="Currency to receive"
                />
                <AmountInput
                  value={converted}
                  ariaLabel="Amount received"
                  readOnly
                />
              </FieldBlock>

              <div className="mt-7 flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/55 tabular-nums">
                  {error
                    ? "Indicative · live API offline"
                    : loading && !data
                    ? "Fetching live rate…"
                    : rate
                    ? `1 ${from} = ${formatRate(rate)} ${to}`
                    : "—"}
                </span>
              </div>
            </div>

            <LockButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
        {label}
      </span>
      <div className="flex items-stretch border border-white/[0.07] bg-black/25 transition-colors duration-300 focus-within:border-white/25">
        {children}
      </div>
    </div>
  );
}

function CurrencySelect({
  currency,
  onCurrencyChange,
  ariaLabel,
}: {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = CURRENCIES.find((c) => c.code === currency)!;

  return (
    <div ref={wrapperRef} className="relative shrink-0 flex items-stretch">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border-r border-white/[0.07] bg-white/[0.05] px-4 text-white transition-all duration-150 hover:border-white/[0.2] hover:bg-white/[0.09] active:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2D5BFF]/40"
      >
        <span aria-hidden className="text-base leading-none">{selected.flag}</span>
        <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em]">
          {selected.code}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
          className="inline-flex text-white/50"
        >
          <ChevronDown size={14} strokeWidth={1.75} aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={ariaLabel}
            data-lenis-prevent-wheel
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1 w-[260px] overflow-y-auto border border-white/[0.1] bg-[#0f1a2e] [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-[#0a1424] [&::-webkit-scrollbar-thumb]:bg-[#2D5BFF] [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{
              maxHeight: 280,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              scrollbarWidth: "thin",
              scrollbarColor: "#2D5BFF #0a1424",
              overscrollBehaviorY: "contain",
            }}
          >
            {CURRENCIES.map((c) => {
              const isSelected = c.code === currency;
              return (
                <li
                  key={c.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onCurrencyChange(c.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border-l-2 px-4 py-3 transition-all duration-150",
                    isSelected
                      ? "border-l-[#2D5BFF] bg-[#2D5BFF]/10"
                      : "border-l-transparent hover:border-l-[#2D5BFF] hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span aria-hidden className="shrink-0 text-base leading-none">
                      {c.flag}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[12px] font-semibold uppercase tracking-[0.08em]",
                        isSelected ? "text-[#2D5BFF]" : "text-white"
                      )}
                    >
                      {c.code}
                    </span>
                    <span
                      className={cn(
                        "truncate text-[12px]",
                        isSelected ? "text-[#2D5BFF]/70" : "text-white/50"
                      )}
                    >
                      {c.name}
                    </span>
                  </div>
                  {isSelected && (
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      aria-hidden
                      className="ml-3 shrink-0 text-[#2D5BFF]"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmountInput({
  value,
  onChange,
  readOnly,
  ariaLabel,
}: {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  ariaLabel: string;
}) {
  return (
    <input
      inputMode="decimal"
      value={value}
      readOnly={readOnly}
      onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
      placeholder="0.00"
      aria-label={ariaLabel}
      className="w-full min-w-0 flex-1 bg-transparent px-5 py-3 text-right font-mono text-[26px] font-medium leading-none tabular-nums text-white placeholder:text-white/25 focus:outline-none md:text-[30px]"
    />
  );
}

function LockButton() {
  return (
    <button
      type="button"
      className="group relative block w-full overflow-hidden border-t border-white/[0.08] bg-[#2D5BFF] px-6 py-4 text-center text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#3a66ff] active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a2e]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[220%]"
      />
      <span className="relative">Lock This Rate</span>
    </button>
  );
}

function ConverterBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, #000 0%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          right: "-12%",
          top: "5%",
          width: "55vmax",
          height: "55vmax",
          background:
            "radial-gradient(closest-side, rgba(45,91,255,0.14), rgba(45,91,255,0) 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          left: "-15%",
          bottom: "0%",
          width: "45vmax",
          height: "45vmax",
          background:
            "radial-gradient(closest-side, rgba(0,200,150,0.07), rgba(0,200,150,0) 70%)",
          filter: "blur(28px)",
        }}
      />
    </>
  );
}
