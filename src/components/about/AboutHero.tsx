"use client";

import { useRef, Fragment } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const STATS = [
  { value: "50,000+", label: "Customers" },
  { value: "S$2B+",   label: "Exchanged" },
  { value: "Since 2008", label: "Established" },
] as const;

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      /* eyebrow */
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
        });
      }

      /* headline lines stagger */
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean) as HTMLElement[];
      gsap.from(lines, {
        y: 80, opacity: 0, duration: 0.9, stagger: 0.15,
        delay: 0.1, ease: "power3.out",
      });

      /* subtext */
      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: "power2.out",
        });
      }

      /* stats row */
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          y: 20, opacity: 0, duration: 0.7, delay: 0.78, ease: "power2.out",
        });
      }

    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Faizura Trading — Our Story"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#0a0a0b] pt-20 md:pt-24 pb-16 flex flex-col justify-center"
    >
      {/* ── BackdropMesh ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[10%] right-[5%] h-[60vmax] w-[60vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(45,91,255,0.22), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute bottom-[-5%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(0,200,150,0.10), transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      {/* ── BackdropGrid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
        }}
      />

      {/* ── Ghost watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-end justify-start overflow-hidden pb-0"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 22vw, 340px)",
            opacity: 0.03,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
        >
          STORY
        </span>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">

        {/* ── Eyebrow ── */}
        <div
          ref={eyebrowRef}
          className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 will-change-transform"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
          OUR STORY
        </div>

        {/* ── Full-width text ── */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">

          {/* Text — full width on hero (no image here) */}
          <div className="lg:col-span-8 lg:pr-8">

            {/* Display headline */}
            <h1 className="font-display font-black uppercase" style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              <span
                ref={line1Ref}
                className="block text-white will-change-transform"
                style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
              >
                SIXTEEN YEARS
              </span>
              <span
                ref={line2Ref}
                className="block text-white will-change-transform"
                style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
              >
                OF MOVING
              </span>
              <span
                ref={line3Ref}
                className="block will-change-transform"
                style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
              >
                <span className="text-white">MONEY </span>
                <span className="text-[#2D5BFF]">RIGHT.</span>
              </span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="mt-8 text-[18px] leading-[1.7] text-white/65 will-change-transform"
              style={{ maxWidth: "48ch" }}
            >
              From a single counter on Orchard Road to Singapore&apos;s most trusted money
              changer — built on one promise: the rate you see is the rate you get.
            </p>

            {/* Inline stats with dividers */}
            <div
              ref={statsRef}
              className="mt-10 flex flex-wrap items-center will-change-transform"
            >
              {STATS.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && (
                    <div
                      className="mx-6 md:mx-8 h-8 w-px shrink-0"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                      aria-hidden
                    />
                  )}
                  <div>
                    <div
                      className="font-display font-black text-white tabular-nums"
                      style={{
                        fontSize: "clamp(18px, 2.2vw, 28px)",
                        letterSpacing: "-0.025em",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {s.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
