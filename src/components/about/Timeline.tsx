"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

type TimelineEvent = {
  year: string;
  side: "left" | "right";
  title: string;
  description: string;
};

const EVENTS: TimelineEvent[] = [
  {
    year: "2008",
    side: "left",
    title: "Founded",
    description:
      "Opened our first counter with one mission: honest rates for everyone. No spreads. No surprises.",
  },
  {
    year: "2010",
    side: "right",
    title: "MAS Licensed",
    description:
      "Received full licensing from the Monetary Authority of Singapore, cementing our legitimacy as a regulated operator.",
  },
  {
    year: "2014",
    side: "left",
    title: "10,000 Customers",
    description:
      "Reached our first major milestone — 10,000 customers served through word of mouth alone. No advertising. Just trust.",
  },
  {
    year: "2018",
    side: "right",
    title: "S$1 Billion Exchanged",
    description:
      "A decade of operation, a billion dollars moved across borders with zero fraud incidents and a spotless compliance record.",
  },
  {
    year: "2023",
    side: "left",
    title: "47 Currencies",
    description:
      "Expanded our currency offering to 47 live pairs, serving Singapore's most diverse and geographically spread customer base.",
  },
  {
    year: "2024",
    side: "right",
    title: "50,000+ Customers",
    description:
      "Crossed the 50,000 customer milestone — still from the same counter, same values, same promise we made in 2008.",
  },
];

export default function Timeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const centerRef   = useRef<HTMLDivElement>(null);
  const nodeRefs    = useRef<(HTMLDivElement | null)[]>([]);

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

      const headLines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
      if (headLines.length) {
        gsap.from(headLines, {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      /* center line draws downward as user scrolls through section */
      if (centerRef.current) {
        gsap.fromTo(
          centerRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );
      }

      /* each timeline node animates from its side */
      const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
      nodes.forEach((node, i) => {
        const event = EVENTS[i];
        gsap.from(node, {
          x: event.side === "left" ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
      });
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Our Journey"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#0f1a2e" }}
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(45,91,255,0.10), transparent 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -bottom-[15%] right-[-5%] h-[45vmax] w-[45vmax] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(0,200,150,0.06), transparent 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* ── Ghost watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-end overflow-hidden"
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
          JOURNEY
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
            OUR JOURNEY
          </div>

          <h2 className="font-display font-black uppercase" style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}>
            <span
              ref={line1Ref}
              className="block text-white will-change-transform"
              style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
            >
              SIXTEEN YEARS
            </span>
            <span
              ref={line2Ref}
              className="block will-change-transform"
              style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
            >
              <span className="text-white">IN THE </span>
              <span style={{ color: "#2D5BFF" }}>MAKING.</span>
            </span>
          </h2>
        </header>

        {/* ── Timeline — desktop: alternating left/right, mobile: left-aligned ── */}

        {/* Desktop layout */}
        <div className="hidden lg:block relative">

          {/* Center vertical line */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: "1px", background: "rgba(255,255,255,0.06)" }}
          >
            {/* The scrubbed fill line — starts at scaleY:0, grows to 1 as user scrolls */}
            <div
              ref={centerRef}
              className="absolute inset-0 will-change-transform"
              style={{ background: "#2D5BFF", transformOrigin: "top" }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {EVENTS.map((event, i) => (
              <div
                key={event.year}
                ref={(el) => { nodeRefs.current[i] = el; }}
                className={`relative grid grid-cols-2 will-change-transform ${
                  i < EVENTS.length - 1 ? "pb-16" : ""
                }`}
              >
                {event.side === "left" ? (
                  <>
                    {/* Left content */}
                    <div className="pr-16 text-right">
                      <div
                        className="font-display font-black tabular-nums"
                        style={{ fontSize: "32px", color: "#2D5BFF", letterSpacing: "-0.025em", lineHeight: 1 }}
                      >
                        {event.year}
                      </div>
                      <h3
                        className="mt-2 font-display font-black uppercase text-white"
                        style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="mt-2 text-[14px] leading-[1.7] text-white/55"
                        style={{ maxWidth: "28ch", marginLeft: "auto" }}
                      >
                        {event.description}
                      </p>
                    </div>

                    {/* Right empty — dot sits on the center line */}
                    <div className="pl-16" />
                  </>
                ) : (
                  <>
                    {/* Left empty */}
                    <div className="pr-16" />

                    {/* Right content */}
                    <div className="pl-16">
                      <div
                        className="font-display font-black tabular-nums"
                        style={{ fontSize: "32px", color: "#2D5BFF", letterSpacing: "-0.025em", lineHeight: 1 }}
                      >
                        {event.year}
                      </div>
                      <h3
                        className="mt-2 font-display font-black uppercase text-white"
                        style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="mt-2 text-[14px] leading-[1.7] text-white/55"
                        style={{ maxWidth: "28ch" }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </>
                )}

                {/* Center dot — pulsing blue indicator */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                >
                  <span className="relative inline-flex h-3 w-3">
                    <span
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{ backgroundColor: "rgba(45,91,255,0.55)" }}
                    />
                    <span
                      className="relative inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: "#2D5BFF" }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile layout — left-aligned vertical list */}
        <div className="lg:hidden relative pl-8">
          {/* Left-edge line */}
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0"
            style={{ width: "1px", background: "rgba(255,255,255,0.10)" }}
          />

          <div className="flex flex-col gap-10">
            {EVENTS.map((event) => (
              <div key={event.year} className="relative">
                {/* Dot on the line */}
                <div
                  aria-hidden
                  className="absolute -left-8 top-1 -translate-x-1/2"
                >
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{ backgroundColor: "rgba(45,91,255,0.55)" }}
                    />
                    <span
                      className="relative inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: "#2D5BFF" }}
                    />
                  </span>
                </div>

                <div
                  className="font-display font-black tabular-nums"
                  style={{ fontSize: "28px", color: "#2D5BFF", letterSpacing: "-0.025em", lineHeight: 1 }}
                >
                  {event.year}
                </div>
                <h3
                  className="mt-1 font-display font-black uppercase text-white"
                  style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
                >
                  {event.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-white/55">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
