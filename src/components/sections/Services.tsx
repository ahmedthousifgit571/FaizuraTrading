"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const SERVICES = [
  { icon: "01", title: "Currency Exchange",       body: "Walk-in or online, USD to SGD or any of 50+ currencies, at the rate you see live." },
  { icon: "02", title: "International Remittance", body: "Send money to family or partners abroad — same-day delivery to 80+ countries." },
  { icon: "03", title: "Corporate FX",             body: "Hedging, batch payments, and multi-currency accounts for SMEs and treasurers." },
  { icon: "04", title: "Travel Money Card",        body: "Multi-currency prepaid card with locked-in rates. Top-up online before you fly." },
  { icon: "05", title: "Bulk Cash Orders",         body: "Pre-order large amounts of foreign currency for collection at any branch." },
  { icon: "06", title: "Rate Alerts",              body: "Set a target rate and we'll notify you the moment we hit it. WhatsApp / SMS / email." },
];

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const reduce      = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      /* ── header entrance ── */
      const headerEls = headerRef.current?.querySelectorAll<HTMLElement>(
        "[data-header-item]"
      );
      if (headerEls && headerEls.length) {
        gsap.from(Array.from(headerEls), {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      /* ── card staggered entrance ── */
      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-service-card]");
      if (cards && cards.length) {
        gsap.from(Array.from(cards), {
          y: 80,
          x: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      /* ── number parallax ── */
      const numbers = gridRef.current?.querySelectorAll<HTMLElement>("[data-ghost-num]");
      if (numbers && numbers.length) {
        Array.from(numbers).forEach((num) => {
          gsap.to(num, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: num.closest("[data-service-card]"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    },
    [],
    sectionRef
  );

  /* ── card hover micro-animations (pure JS, no state) ── */
  function handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    gsap.to(e.currentTarget, { y: -6, duration: 0.3, ease: "power2.out" });
  }
  function handleMouseLeave(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
  }

  const featured  = SERVICES.slice(0, 2);
  const secondary = SERVICES.slice(2, 5);
  const last      = SERVICES[5];

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Faizura Trading services"
      className="relative overflow-hidden bg-[#0f1a2e] py-24 md:py-32"
    >
      {/* ghost watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center -z-0 overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 18vw, 280px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          SERVICES
        </span>
      </div>

      {/* subtle radial bloom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute top-0 right-0 h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.14), rgba(45,91,255,0) 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        {/* ── Section header ── */}
        <header ref={headerRef} className="mb-16 md:mb-20">
          <div data-header-item className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
            SERVICES
          </div>

          <h2
            data-header-item
            className="font-display font-black uppercase text-white"
            style={{
              fontSize: "clamp(44px, 7vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            <span className="text-[#2D5BFF]">EVERYTHING</span> YOU NEED.
            <br />
            NOTHING YOU DON&apos;T.
          </h2>

          <p
            data-header-item
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
          >
            Six ways to move, protect, and grow your money.
          </p>

          <div
            data-header-item
            className="mt-8 h-px w-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* ── Grid ── */}
        <div ref={gridRef} className="flex flex-col gap-px">

          {/* Row 1 — featured (60%) + tall narrow (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px">
            {/* featured large card */}
            <ServiceCard
              service={featured[0]}
              className="lg:col-span-3 min-h-[320px] lg:min-h-[380px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {/* tall narrow card */}
            <ServiceCard
              service={featured[1]}
              className="lg:col-span-2 min-h-[320px] lg:min-h-[380px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Row 2 — three equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px">
            {secondary.map((s) => (
              <ServiceCard
                key={s.icon}
                service={s}
                className="min-h-[280px]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Row 3 — full-width last card */}
          <div className="grid grid-cols-1 gap-px">
            <ServiceCard
              service={last}
              className="min-h-[220px]"
              wide
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── ServiceCard ── */

type ServiceItem = { icon: string; title: string; body: string };

function ServiceCard({
  service,
  className = "",
  wide = false,
  onMouseEnter,
  onMouseLeave,
}: {
  service: ServiceItem;
  className?: string;
  wide?: boolean;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <article
      data-service-card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={[
        "group relative overflow-hidden cursor-pointer will-change-transform",
        "border border-white/[0.06] bg-transparent",
        "transition-[border-color,background-color] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-[#2D5BFF] hover:bg-white/[0.03]",
        "p-8 md:p-10",
        "flex flex-col justify-between",
        className,
      ].join(" ")}
    >
      {/* oversized ghost number — parallax anchor */}
      <span
        data-ghost-num
        aria-hidden
        className="pointer-events-none select-none absolute font-display font-black text-white leading-none"
        style={{
          fontSize: wide ? "clamp(120px,14vw,200px)" : "clamp(96px,11vw,160px)",
          opacity: 0.15,
          top: wide ? "-20%" : "-10%",
          right: wide ? "2%" : "-4%",
          letterSpacing: "-0.04em",
          transition: "opacity 250ms ease",
        }}
      >
        {service.icon}
      </span>

      {/* number opacity lift on hover via CSS group */}
      <style jsx>{`
        article:hover [data-ghost-num] {
          opacity: 0.25;
        }
      `}</style>

      {/* card content */}
      <div className={wide ? "flex flex-col md:flex-row md:items-end md:gap-16" : "flex flex-col"}>
        <div className={wide ? "flex-1" : ""}>
          <h3
            className="font-display font-bold uppercase text-white"
            style={{
              fontSize: "clamp(18px, 1.6vw, 22px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55 max-w-[38ch]">
            {service.body}
          </p>
        </div>

        {/* learn more — hover fade-in */}
        <div className="mt-6 md:mt-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2D5BFF]">
            Learn more
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
      </div>
    </article>
  );
}
