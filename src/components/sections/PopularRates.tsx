"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn, formatRate } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PAIRS: ReadonlyArray<{
  code: string;
  flag: string;
  name: string;
  buy: number;
  sell: number;
  hot?: boolean;
}> = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar", buy: 1.342, sell: 1.358, hot: true },
  { code: "EUR", flag: "🇪🇺", name: "Euro", buy: 1.452, sell: 1.471 },
  { code: "GBP", flag: "🇬🇧", name: "British Pound", buy: 1.701, sell: 1.722 },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit", buy: 0.282, sell: 0.291 },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee", buy: 0.0159, sell: 0.0166 },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar", buy: 0.886, sell: 0.901 },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen", buy: 0.0085, sell: 0.0089 },
  { code: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar", buy: 0.171, sell: 0.176 },
];

function hash01(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function GhostWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
    >
      <span
        data-ghost
        className="font-display font-black uppercase leading-none tracking-tighter text-white will-change-transform"
        style={{
          fontSize: "clamp(220px, 30vw, 460px)",
          opacity: 0.025,
        }}
      >
        Popular
      </span>
    </div>
  );
}

export default function PopularRates() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pairs = useMemo(
    () =>
      PAIRS.map((p, i) => ({
        ...p,
        change: (Math.sin(i * 1.9) + hash01(i) * 0.5 - 0.25) * 0.6,
      })),
    []
  );

  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

  useGSAP(() => {
    const numbers = sectionRef.current?.querySelectorAll<HTMLElement>(
      "[data-count]"
    );

    numbers?.forEach((el) => {
      const target = parseFloat(el.dataset.count ?? "0");
      const decimals = parseInt(el.dataset.decimals ?? "4", 10);

      if (reduce) {
        el.textContent = formatRate(target, decimals);
        return;
      }

      el.textContent = formatRate(0, decimals);

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          el.textContent = formatRate(obj.val, decimals);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    if (reduce) return;

    const ghost = sectionRef.current?.querySelector<HTMLElement>("[data-ghost]");
    if (ghost) {
      gsap.fromTo(
        ghost,
        { xPercent: -8 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.to(ghost, {
        scale: 1.04,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    }

    const scan = sectionRef.current?.querySelector<HTMLElement>("[data-scan]");
    if (scan) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
          once: true,
        },
      });
      tl.fromTo(
        scan,
        { xPercent: -150, opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      ).to(
        scan,
        { xPercent: 260, duration: 1.7, ease: "power2.inOut" },
        "<0.05"
      ).to(scan, { opacity: 0, duration: 0.35, ease: "power1.in" }, "-=0.45");
    }
  }, [reduce]);

  const gridVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: reduce ? 0 : 0.6,
        ease: EASE,
        delay: reduce ? 0 : Math.floor(i / 4) * 0.85 + (i % 4) * 0.08,
      },
    }),
  };

  return (
    <section
      id="popular"
      ref={sectionRef}
      aria-label="Popular currency pairs"
      className="relative isolate overflow-hidden bg-[#111111] py-24 md:py-32"
    >
      <GhostWatermark />

      <div
        ref={headerRef}
        className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={headerInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C896]/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C896]" />
              </span>
              Popular Pairs
            </div>

            <h2 className="mt-7 font-display text-[clamp(40px,5.4vw,76px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-white">
              <span className="block">The rates</span>
              <span className="block"><span className="text-[#2D5BFF]">everyone</span> wants.</span>
            </h2>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              Live buy &amp; sell rates · updated every 60 seconds
            </p>
          </div>

          <a
            href="#rates"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-[#2D5BFF] md:self-end"
          >
            <span className="relative">
              View all rates
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D5BFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
            </span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
            />
          </a>
        </motion.div>

        <div className="relative mt-10 h-px overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.08]" />
          <div
            data-scan
            aria-hidden
            className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-[#2D5BFF] to-transparent"
            style={{ opacity: 0 }}
          />
        </div>
      </div>

      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={gridInView ? "show" : "hidden"}
        variants={gridVariants}
        className="relative z-10 mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-3 px-5 sm:grid-cols-2 md:gap-4 md:px-10 lg:grid-cols-4"
      >
        {pairs.map((p, i) => {
          const positive = p.change >= 0;
          return (
            <motion.article
              key={p.code}
              custom={i}
              variants={cardVariants}
              className="group relative rounded-[3px] border border-white/[0.07] bg-white/[0.03] p-6 transition-[background-color,border-color] duration-200 ease-out hover:border-[#2D5BFF] hover:bg-white/[0.06]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-px -top-px h-3 w-3 origin-top-left scale-0 bg-[#2D5BFF] transition-transform duration-200 ease-out group-hover:scale-100"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden className="text-[28px] leading-none">
                      {p.flag}
                    </span>
                    <span className="font-display text-[20px] font-bold uppercase leading-none tracking-[0.04em] text-white">
                      {p.code}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] font-normal text-white/55">
                    {p.name}
                  </p>
                </div>

                {p.hot ? (
                  <span className="shrink-0 rounded-[2px] bg-[#2D5BFF] px-3 py-2 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.16em] text-white">
                    Best Rate
                  </span>
                ) : null}
              </div>

              <div className="mt-6 h-px w-full bg-white/[0.06]" />

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                    We Buy
                  </div>
                  <div
                    className="mt-2 font-mono text-[22px] font-bold leading-none tabular-nums text-white"
                    data-count={p.buy}
                    data-decimals="4"
                  >
                    {formatRate(p.buy, 4)}
                  </div>
                  <div
                    className={cn(
                      "mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium tabular-nums",
                      positive ? "text-[#00C896]" : "text-[#FF5C5C]"
                    )}
                  >
                    <span aria-hidden>{positive ? "▲" : "▼"}</span>
                    {Math.abs(p.change).toFixed(2)}%
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                    We Sell
                  </div>
                  <div
                    className="mt-2 font-mono text-[22px] font-bold leading-none tabular-nums text-white"
                    data-count={p.sell}
                    data-decimals="4"
                  >
                    {formatRate(p.sell, 4)}
                  </div>
                  <div
                    className={cn(
                      "mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium tabular-nums",
                      positive ? "text-[#00C896]" : "text-[#FF5C5C]"
                    )}
                  >
                    <span aria-hidden>{positive ? "▲" : "▼"}</span>
                    {Math.abs(p.change).toFixed(2)}%
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
