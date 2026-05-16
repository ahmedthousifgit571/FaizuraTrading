"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const STATS = [
  { value: "50,000+", label: "Customers Served" },
  { value: "S$2B+",   label: "Total Exchanged" },
  { value: "15+ yrs", label: "Operating Since 2008" },
  { value: "MAS",     label: "Licensed Operator" },
];

/* count-up metadata — index-aligned with STATS */
const COUNT_META: Array<{ countTo: number; format: (n: number) => string } | null> = [
  { countTo: 50000, format: (n) => `${Math.round(n).toLocaleString()}+` },
  null,
  { countTo: 15, format: (n) => `${Math.round(n)}+ yrs` },
  null,
];

export default function About() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const para1Ref     = useRef<HTMLParagraphElement>(null);
  const para2Ref     = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDListElement>(null);
  /* per-stat refs */
  const statElRefs  = useRef<(HTMLElement | null)[]>([]);
  const statNumRefs = useRef<(HTMLElement | null)[]>([]);

  const reduce = useReducedMotion();

  useGSAP(
    (_ctx) => {
      if (reduce) return;

      /* ── Zone 1 headline: line-by-line entrance ── */
      if (line1Ref.current) {
        gsap.from(line1Ref.current, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
      if (line2Ref.current) {
        gsap.from(line2Ref.current, {
          y: 80,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      /* ── Zone 1 headline: parallax scrub ── */
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* ── Left column: paragraph reveals ── */
      const triggerEl = para1Ref.current;
      if (para1Ref.current) {
        gsap.from(para1Ref.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: triggerEl, start: "top 85%", once: true },
        });
      }
      if (para2Ref.current) {
        gsap.from(para2Ref.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: triggerEl, start: "top 85%", once: true },
        });
      }
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          y: 10,
          opacity: 0,
          duration: 0.7,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: triggerEl, start: "top 85%", once: true },
        });
      }

      /* ── Right column: stat scale entrance ── */
      const statEls = statElRefs.current.filter(Boolean) as HTMLElement[];
      if (statEls.length) {
        gsap.from(statEls, {
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: statsGridRef.current, start: "top 82%", once: true },
        });
      }

      /* ── Right column: count-up on countable stats ── */
      COUNT_META.forEach((meta, i) => {
        if (!meta) return;
        const el = statNumRefs.current[i];
        if (!el) return;

        const proxy = { val: 0 };
        const { countTo, format } = meta;

        gsap.to(proxy, {
          val: countTo,
          duration: 1.7,
          delay: i * 0.15,
          ease: "power2.out",
          onUpdate() {
            el.textContent = format(proxy.val);
          },
          onComplete() {
            el.textContent = format(countTo);
            gsap.to(el, {
              color: "#2D5BFF",
              duration: 0.05,
              ease: "none",
              onComplete() {
                el.style.textShadow = "0 0 28px rgba(45,91,255,0.85)";
                gsap.to(el, {
                  textShadow: "0 0 10px rgba(45,91,255,0.35)",
                  duration: 0.6,
                  delay: 0.15,
                  ease: "power2.out",
                });
              },
            });
          },
          scrollTrigger: { trigger: statsGridRef.current, start: "top 82%", once: true },
        });
      });
    },
    [],
    sectionRef
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Faizura Trading"
      className="relative overflow-hidden bg-[#111111] py-24 md:py-32"
    >
      {/* subtle radial bloom — bottom-left */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.07), rgba(0,200,150,0) 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -top-[10%] -right-[15%] h-[40vmax] w-[40vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.10), rgba(45,91,255,0) 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">

        {/* ─────────────────────────────────────────────
            ZONE 1 — Full-width cinematic opener
        ───────────────────────────────────────────── */}
        <div className="mb-16 md:mb-24">
          {/* eyebrow */}
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
            ABOUT FAIZURA TRADING
          </div>

          {/* display headline */}
          <h2
            ref={headlineRef}
            className="font-display font-black uppercase will-change-transform"
            style={{
              fontSize: "clamp(44px, 7vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            <span ref={line1Ref} className="block text-white">
              SIXTEEN YEARS.
            </span>
            <span ref={line2Ref} className="block text-white">
              ONE <span className="text-[#2D5BFF]">PROMISE</span>
            </span>
          </h2>

          {/* divider */}
          <div
            className="mt-10 h-px w-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* ─────────────────────────────────────────────
            ZONE 2 — Editorial split
        ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">

          {/* LEFT — story text (col-span-7 of 12 ≈ 55%) */}
          <div className="lg:col-span-7 flex flex-col">
            <p
              ref={para1Ref}
              className="text-[18px] leading-[1.8] text-white/75"
              style={{ maxWidth: "52ch" }}
            >
              We started Faizura Trading in 2008 with a single counter on Orchard Road and
              one idea — that moving money across borders shouldn&apos;t cost more than the
              move itself. Sixteen years and five branches later, that idea still drives
              every quote we issue.
            </p>

            <p
              ref={para2Ref}
              className="mt-8 text-[18px] leading-[1.8] text-white/75"
              style={{ maxWidth: "52ch" }}
            >
              We&apos;re MAS-licensed, audited annually, and proud to serve Singapore&apos;s diaspora
              — from the construction worker remitting to family in Chennai, to the executive
              paying Sydney suppliers, to the student topping up before a Tokyo semester. The
              rate you see is the rate you get. No footnotes. No surprises.
            </p>

            {/* MAS credential badge — sharp rectangle, not pill */}
            <div
              ref={badgeRef}
              className="mt-10 inline-flex items-center gap-3 self-start"
              style={{
                padding: "12px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "4px",
              }}
            >
              <ShieldCheck size={15} strokeWidth={1.75} className="text-[#2D5BFF] flex-shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                MAS License&nbsp;&nbsp;·&nbsp;&nbsp;
                <span className="text-white/90">PS00000000</span>
              </span>
            </div>
          </div>

          {/* RIGHT — open stats grid (col-span-5 of 12 ≈ 45%) */}
          <div className="lg:col-span-5 relative">
            {/* ghost watermark "SINCE 2008" at -2deg */}
            <div
              aria-hidden
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <span
                className="font-display font-black uppercase text-white whitespace-nowrap"
                style={{
                  fontSize: "clamp(52px, 7vw, 96px)",
                  opacity: 0.025,
                  letterSpacing: "-0.04em",
                  transform: "rotate(-2deg)",
                  lineHeight: 1,
                }}
              >
                SINCE 2008
              </span>
            </div>

            {/* stats — open grid, no card boxes */}
            <dl
              ref={statsGridRef}
              className="relative grid grid-cols-2"
            >
              {STATS.map((s, i) => {
                const isRightCol = i % 2 === 1;
                const isTopRow   = i < 2;
                const isMas      = s.value === "MAS";
                const displayVal = isMas ? "MAS LICENSED" : s.value;

                return (
                  <div
                    key={s.label}
                    ref={(el) => { statElRefs.current[i] = el; }}
                    className="flex flex-col will-change-transform"
                    style={{
                      paddingTop: "24px",
                      paddingBottom: "28px",
                      paddingLeft:  isRightCol ? "clamp(20px, 3vw, 36px)" : "0",
                      paddingRight: !isRightCol ? "clamp(20px, 3vw, 36px)" : "0",
                      borderBottom: isTopRow ? "1px solid rgba(255,255,255,0.06)" : undefined,
                      borderRight:  !isRightCol ? "1px solid rgba(255,255,255,0.06)" : undefined,
                    }}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-4">
                      {s.label}
                    </dt>
                    <dd
                      ref={(el) => { statNumRefs.current[i] = el; }}
                      className="font-display font-black text-white leading-none tabular-nums"
                      style={{
                        fontSize: isMas
                          ? "clamp(24px, 3vw, 40px)"
                          : "clamp(40px, 4.5vw, 64px)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {displayVal}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

        </div>
      </div>
    </section>
  );
}
