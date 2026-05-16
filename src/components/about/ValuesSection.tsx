"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const VALUES = [
  {
    id: "transparency",
    num: "01",
    title: "TRANSPARENCY",
    body: "The rate on the board is the rate you pay. No hidden fees. No last-minute adjustments. What you see is exactly what you get — every time, without exception.",
  },
  {
    id: "community",
    num: "02",
    title: "COMMUNITY",
    body: "We've served Singapore's diaspora for 16 years — from students topping up travel money to businesses settling international payroll. Every customer matters, every transaction counts.",
  },
  {
    id: "integrity",
    num: "03",
    title: "INTEGRITY",
    body: "MAS-licensed and audited annually. We operate by the book because your money deserves nothing less than complete accountability and responsible stewardship.",
  },
] as const;

export default function ValuesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);

  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }

      const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
      if (lines.length) {
        gsap.from(lines, {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (cards.length) {
        gsap.from(cards, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: cards[0], start: "top 82%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Our Values"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#111111" }}
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[15%] left-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(45,91,255,0.10), transparent 70%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="absolute -bottom-[10%] right-[5%] h-[40vmax] w-[40vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(0,200,150,0.06), transparent 70%)",
            filter: "blur(28px)",
          }}
        />
      </div>

      {/* ── Ghost watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 16vw, 260px)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          VALUES
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">

        {/* ── Section header ── */}
        <header className="mb-16 md:mb-24">
          <div
            ref={eyebrowRef}
            className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 will-change-transform"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
            OUR VALUES
          </div>

          <h2 className="font-display font-black uppercase" style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}>
            <span
              ref={line1Ref}
              className="block text-white will-change-transform"
              style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
            >
              WHAT WE
            </span>
            <span
              ref={line2Ref}
              className="block will-change-transform"
              style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
            >
              <span className="text-white">STAND </span>
              <span style={{ color: "#2D5BFF" }}>FOR.</span>
            </span>
          </h2>
        </header>

        {/* ── Values grid — open layout, dividers not cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {VALUES.map((v, i) => (
            <div
              key={v.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative overflow-hidden py-10 will-change-transform group"
              style={{
                paddingLeft: i === 0 ? "0" : "clamp(24px, 4vw, 48px)",
                paddingRight: i === VALUES.length - 1 ? "0" : "clamp(24px, 4vw, 48px)",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}
            >
              {/* Oversized background number — editorial anchor */}
              <div
                aria-hidden
                className="pointer-events-none select-none absolute -right-2 -top-2 font-display font-black text-white"
                style={{
                  fontSize: "clamp(88px, 14vw, 180px)",
                  opacity: 0.055,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  transition: "opacity 0.3s ease",
                }}
              >
                {v.num}
              </div>

              {/* Number label */}
              <div
                className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#2D5BFF" }}
              >
                {v.num}
              </div>

              {/* Title */}
              <h3
                className="font-display font-black uppercase text-white mb-4"
                style={{ fontSize: "20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {v.title}
              </h3>

              {/* Body */}
              <p
                className="text-[14px] leading-[1.75] text-white/55"
                style={{ maxWidth: "34ch" }}
              >
                {v.body}
              </p>

              {/* Bottom accent line — grows on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{
                  backgroundColor: "#2D5BFF",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
