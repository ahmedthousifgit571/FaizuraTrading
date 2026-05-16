"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import type { Article } from "@/lib/articles";

const CATEGORY_COLORS: Record<string, string> = {
  "RATE ANALYSIS": "#2D5BFF",
  REMITTANCE:      "#22c55e",
  TRAVEL:          "#F5A623",
  COMPLIANCE:      "#8b5cf6",
  GUIDE:           "#06b6d4",
};

export default function ArticleHero({ article }: { article: Article }) {
  const sectionRef   = useRef<HTMLElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLSpanElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLParagraphElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const excerptRef   = useRef<HTMLParagraphElement>(null);

  const reduce = useReducedMotion();
  const accentColor = CATEGORY_COLORS[article.category] ?? "#2D5BFF";

  useGSAP(
    () => {
      if (reduce) return;

      if (breadcrumbRef.current) {
        gsap.from(breadcrumbRef.current, {
          y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
        });
      }

      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          scale: 0, opacity: 0, duration: 0.4, delay: 0.2, ease: "back.out(2)",
        });
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll<HTMLSpanElement>(".headline-line");
        gsap.from(lines, {
          y: 80, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        });
      }

      const afterHeadline = [metaRef.current, dividerRef.current, excerptRef.current].filter(
        Boolean
      );
      if (afterHeadline.length) {
        gsap.from(afterHeadline, {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.08, delay: 0.8,
          ease: "power3.out",
        });
      }
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label={`Article hero: ${article.title}`}
      className="relative isolate min-h-[100dvh] overflow-hidden flex flex-col justify-center"
      style={{ background: "#0a0a0b" }}
    >
      {/* Radial bloom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -right-[10%] h-[60vmax] w-[60vmax] rounded-full"
          style={{
            background: `radial-gradient(closest-side, ${accentColor}1a, transparent 70%)`,
            filter: "blur(32px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.06), transparent 70%)",
            filter: "blur(36px)",
          }}
        />
      </div>

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
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

      {/* Ghost category watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 18vw, 280px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">

        {/* Breadcrumb */}
        <div
          ref={breadcrumbRef}
          className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
        >
          <Link href="/" className="transition-colors hover:text-white/70">HOME</Link>
          <span className="text-white/20">→</span>
          <Link href="/#blogs" className="transition-colors hover:text-white/70">INSIGHTS</Link>
          <span className="text-white/20">→</span>
          <span style={{ color: accentColor }}>{article.category}</span>
        </div>

        {/* Category badge */}
        <span
          ref={badgeRef}
          className="inline-block will-change-transform"
          style={{
            padding: "7px 14px",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}40`,
            color: accentColor,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderRadius: "2px",
          }}
        >
          {article.category}
        </span>

        {/* Headline */}
        <div ref={headlineRef} className="mt-8 overflow-hidden">
          <h1
            className="font-display font-black uppercase text-white"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            {article.heroHeadlineLines.map((line, i) => (
              <span
                key={i}
                className="headline-line block will-change-transform overflow-hidden"
              >
                {line}
              </span>
            ))}
          </h1>
        </div>

        {/* Meta row */}
        <p
          ref={metaRef}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
        >
          {article.readTime} · {article.date} · By Faizura Trading
        </p>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mt-8 h-px w-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Lede / excerpt */}
        <p
          ref={excerptRef}
          className="mt-8 text-white/70 leading-[1.7] max-w-[680px]"
          style={{ fontSize: "20px" }}
        >
          {article.excerpt}
        </p>
      </div>
    </section>
  );
}
