"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const MAPS_LINK =
  "https://www.google.com/maps/search/Faizura+Trading+Clementi+Money+Changer/@1.3147408,103.7647079,17z";

export default function AboutCTA() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subtextRef  = useRef<HTMLParagraphElement>(null);
  const btnsRef     = useRef<HTMLDivElement>(null);

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

      /* headline: two lines stagger up */
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
      if (lines.length) {
        gsap.from(lines, {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 24, opacity: 0, duration: 0.8, delay: 0.35, ease: "power2.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (btnsRef.current) {
        gsap.from(btnsRef.current, {
          y: 20, opacity: 0, duration: 0.7, delay: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Get the best rate"
      className="relative isolate overflow-hidden py-32 md:py-40 bg-[#0a0a0b]"
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vmax] w-[60vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(45,91,255,0.14), transparent 70%)",
            filter: "blur(40px)",
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
            fontSize: "clamp(120px, 22vw, 360px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          FAIZURA
        </span>
      </div>

      {/* ── BackdropGrid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 100%)",
        }}
      />

      {/* ── Content — centered closing beat ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 text-center">

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 will-change-transform"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
          THE RATE YOU DESERVE
        </div>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase mx-auto"
          style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}
        >
          <span
            ref={line1Ref}
            className="block text-white will-change-transform"
            style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
          >
            READY TO GET
          </span>
          <span
            ref={line2Ref}
            className="block will-change-transform"
            style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
          >
            <span className="text-white">THE BEST </span>
            <span style={{ color: "#2D5BFF" }}>RATE?</span>
          </span>
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="mt-8 mx-auto text-[18px] leading-[1.7] text-white/55 will-change-transform"
          style={{ maxWidth: "40ch" }}
        >
          Walk in today. No appointment. No surprises.
        </p>

        {/* CTA buttons */}
        <div
          ref={btnsRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 will-change-transform"
        >
          {/* Primary — blue fill */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 active:scale-[0.98]"
            style={{
              padding: "16px 36px",
              background: "#2D5BFF",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "3px",
              transition: "filter 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ""; }}
          >
            GET DIRECTIONS
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>

          {/* Secondary — outline */}
          <Link
            href="/#rates"
            className="group inline-flex items-center gap-3 active:scale-[0.98]"
            style={{
              padding: "15px 36px",
              background: "transparent",
              color: "#2D5BFF",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "3px",
              border: "1px solid #2D5BFF",
              transition: "background 0.22s ease, color 0.22s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2D5BFF";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#2D5BFF";
            }}
          >
            VIEW LIVE RATES
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* Bottom trust line */}
        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-white/25">
          MAS-Licensed · Clementi · Since 2008
        </p>
      </div>
    </section>
  );
}
