"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import ceoImage from "@/assets/ceo.png";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const CREDENTIALS = [
  "MAS Licensed Operator",
  "15+ Years in FX Industry",
  "50,000+ Customers Served",
] as const;

const PARAGRAPHS = [
  {
    id: "origin",
    text: "Shaik founded Faizura Trading in 2008 with a single counter and a simple conviction: that ordinary people deserved the same interbank rates that corporations take for granted. No inflated spreads. No fine print. Just honest exchange.",
  },
  {
    id: "philosophy",
    text: "Having spent years watching customers overpay at airport kiosks and bank counters, Shaik built Faizura Trading around radical transparency. Every rate posted is the rate honoured. Every customer — whether changing S$50 or S$50,000 — receives the same standard of service.",
  },
  {
    id: "community",
    text: "Beyond the counter, Shaik and his team have become a fixture of the Clementi community. It's not uncommon for staff to chase down customers who drop money, to hold late for a regular, or to walk a first-timer through the process with patience. That culture starts at the top.",
  },
  {
    id: "vision",
    text: "Today, Faizura Trading serves customers from over 47 currency corridors — from the construction worker sending ringgit home to Johor, to the executive settling a Tokyo invoice. The mission remains unchanged: move money the right way, every time.",
  },
] as const;

export default function CEOProfile() {
  const sectionRef   = useRef<HTMLElement>(null);
  const imageColRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const paraRefs     = useRef<(HTMLParagraphElement | null)[]>([]);

  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      /* left image column slides from left */
      if (imageColRef.current) {
        gsap.from(imageColRef.current, {
          x: -50, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageColRef.current, start: "top 82%", once: true },
        });
      }

      /* eyebrow */
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }

      /* headline lines */
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
      if (lines.length) {
        gsap.from(lines, {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      /* paragraph stagger */
      const paras = paraRefs.current.filter(Boolean) as HTMLElement[];
      if (paras.length) {
        gsap.from(paras, {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: paras[0], start: "top 85%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Meet the Founder"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#0f1a2e" }}
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(45,91,255,0.12), transparent 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -bottom-[15%] -left-[10%] h-[45vmax] w-[45vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(0,200,150,0.07), transparent 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* ── BackdropGrid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
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
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-end overflow-hidden pr-0"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(100px, 18vw, 280px)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          FOUNDER
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-12 lg:gap-20">

          {/* ── LEFT — portrait + credential card (5/12) ── */}
          <div ref={imageColRef} className="lg:col-span-5 will-change-transform">

            {/* Tall portrait */}
            <div
              className="relative overflow-hidden"
              style={{ borderLeft: "3px solid #2D5BFF" }}
            >
              <div
                className="grayscale hover:grayscale-0 transition-[filter] duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <Image
                  src={ceoImage}
                  alt="Shaik Munavvar — Founder and CEO of Faizura Trading"
                  className="block w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </div>

            {/* Credential card */}
            <div
              className="mt-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "24px",
                borderRadius: "4px",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                style={{ color: "#2D5BFF" }}
              >
                Founder &amp; CEO
              </p>
              <p
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "24px", letterSpacing: "-0.02em" }}
              >
                Shaik Munavvar
              </p>
              <div
                className="mb-4 h-px"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <ul className="space-y-2.5">
                {CREDENTIALS.map((cred) => (
                  <li key={cred} className="flex items-center gap-2.5 text-[13px] text-white/65">
                    <span
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "#00C896" }}
                      aria-hidden
                    />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT — story content (7/12) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 will-change-transform"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
              MEET THE FOUNDER
            </div>

            {/* Display headline */}
            <h2 className="font-display font-black uppercase mb-10" style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              <span
                ref={line1Ref}
                className="block text-white will-change-transform"
                style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
              >
                THE MAN BEHIND
              </span>
              <span
                ref={line2Ref}
                className="block will-change-transform"
                style={{ fontSize: "clamp(44px, 5.5vw, 80px)" }}
              >
                <span className="text-white">THE </span>
                <span style={{ color: "#2D5BFF" }}>RATE.</span>
              </span>
            </h2>

            {/* Body paragraphs with hover blue accent line */}
            <div className="flex flex-col gap-7">
              {PARAGRAPHS.map((para, i) => (
                <p
                  key={para.id}
                  ref={(el) => { paraRefs.current[i] = el; }}
                  className="will-change-transform cursor-default"
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.70)",
                    maxWidth: "58ch",
                    paddingLeft: "16px",
                    borderLeft: "2px solid transparent",
                    transition: "border-color 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2D5BFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  {para.text}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
