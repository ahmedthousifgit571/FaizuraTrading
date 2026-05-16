"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const LAT = 1.3146629;
const LNG = 103.7645832;
const MAPS_LINK = `https://maps.google.com/?q=${LAT},${LNG}`;
const EMBED_SRC = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;

function getOpenStatus(): boolean {
  const now = new Date();
  const sg = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
  const mins = sg.getHours() * 60 + sg.getMinutes();
  return mins >= 600 && mins < 1320;
}

export default function Locations() {
  const reduce = useReducedMotion();

  const sectionRef      = useRef<HTMLElement>(null);
  const eyebrowRef      = useRef<HTMLDivElement>(null);
  const headlineRef     = useRef<HTMLHeadingElement>(null);
  const subtextRef      = useRef<HTMLParagraphElement>(null);
  const dividerRef      = useRef<HTMLDivElement>(null);
  const mapColRef       = useRef<HTMLDivElement>(null);
  const cardRef         = useRef<HTMLDivElement>(null);
  const infoRowRefs = useRef<(HTMLElement | null)[]>([]);

  const [openStatus, setOpenStatus] = useState<boolean | null>(null);

  useEffect(() => {
    setOpenStatus(getOpenStatus());
  }, []);

  /* ── GSAP scroll animations ── */
  useGSAP(
    () => {
      if (reduce) return;

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 88%", once: true },
        });
      }
      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 88%", once: true },
        });
      }
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 88%", once: true },
        });
      }
      if (mapColRef.current) {
        gsap.from(mapColRef.current, {
          x: -60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: mapColRef.current, start: "top 82%", once: true },
        });
      }
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          x: 60, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
        });
      }
      const rows = infoRowRefs.current.filter((el): el is HTMLElement => el !== null);
      if (rows.length) {
        gsap.from(rows, {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  const statusColor  = openStatus ? "#22c55e"           : "#FF5C5C";
  const statusBg     = openStatus ? "rgba(34,197,94,0.1)" : "rgba(255,92,92,0.1)";
  const statusLabel  = openStatus ? "Open" : "Closed";
  const dotPingColor = openStatus ? "rgba(34,197,94,0.65)" : "rgba(255,92,92,0.65)";

  return (
    <section
      id="locations"
      ref={sectionRef}
      aria-label="Faizura Trading Clementi location"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#0f1a2e" }}
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.12), rgba(45,91,255,0) 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.06), rgba(0,200,150,0) 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* ── Grid layer ── */}
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

      {/* ── Ghost watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 22vw, 340px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          CLEMENTI
        </span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">

        {/* Section header */}
        <header className="mb-16 md:mb-24">
          <div
            ref={eyebrowRef}
            className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
            Find Us
          </div>

          <h2
            ref={headlineRef}
            className="font-display font-black uppercase will-change-transform text-white"
            style={{
              fontSize: "clamp(44px, 7vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            <span className="block">VISIT US IN</span>
            <span className="block text-[#2D5BFF]">CLEMENTI</span>
          </h2>

          <p
            ref={subtextRef}
            className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-white/35"
          >
            Walk in for cash exchange, remittance, or just a rate check.
          </p>

          <div
            ref={dividerRef}
            className="mt-10 h-px w-full will-change-transform"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* Split layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">

          {/* LEFT — Map column (7/12) */}
          <div
            ref={mapColRef}
            className="flex flex-col will-change-transform lg:col-span-7"
          >
            {/* Map wrapper with floating chip */}
            <div className="relative" style={{ height: "520px" }}>

              {/* Google Maps iframe — dark via CSS filter */}
              <iframe
                title="FAIZURA TRADING @ CLEMENTI MONEY CHANGER location map"
                src={EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "block",
                  filter: "invert(90%) hue-rotate(180deg)",
                }}
              />

              {/* Frosted-glass info chip */}
              <div
                aria-hidden
                className="absolute left-4 top-4 z-[400] flex items-center gap-3"
                style={{
                  background: "rgba(15,26,46,0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "12px 16px",
                  pointerEvents: "none",
                }}
              >
                {/* Live dot */}
                <span className="relative inline-flex h-2 w-2 shrink-0">
                  {openStatus !== null && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full"
                      style={{ backgroundColor: dotPingColor }}
                    />
                  )}
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        openStatus === null
                          ? "rgba(255,255,255,0.25)"
                          : statusColor,
                    }}
                  />
                </span>
                <div>
                  <div
                    className="font-display text-[13px] font-bold uppercase leading-none text-white"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    FAIZURA TRADING
                  </div>
                  <div
                    className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{
                      color:
                        openStatus === null
                          ? "rgba(255,255,255,0.40)"
                          : openStatus
                          ? "#22c55e"
                          : "rgba(255,255,255,0.40)",
                    }}
                  >
                    Clementi
                    {openStatus !== null ? ` · ${openStatus ? "Open Now" : "Closed"}` : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* Below-map row */}
            <div className="mt-4 flex items-center justify-between">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#2D5BFF] transition-opacity duration-300 hover:opacity-60"
              >
                Open in Google Maps
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <span className="font-mono text-[10px] text-white/20 tabular-nums">
                1.3146629, 103.7645832
              </span>
            </div>
          </div>

          {/* RIGHT — Premium detail card (5/12) */}
          <div
            ref={cardRef}
            className="will-change-transform lg:col-span-5"
          >
            <div
              className="flex h-full flex-col"
              style={{
                background: "#0a0f1a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                padding: "36px",
              }}
            >
              {/* ── Branch identity ── */}
              <div className="mb-0">
                <h3
                  className="font-display font-black uppercase text-white"
                  style={{ fontSize: "32px", letterSpacing: "-0.025em", lineHeight: 1 }}
                >
                  CLEMENTI
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Money Changer · Since 2008
                </p>
                <div
                  className="mt-5 h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
              </div>

              {/* ── INFO ROWS ── */}

              {/* Address row */}
              <div
                ref={(el) => { infoRowRefs.current[0] = el; }}
                className="flex items-start will-change-transform"
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  minHeight: "72px",
                }}
              >
                {/* Icon zone */}
                <div
                  className="flex shrink-0 items-start justify-center pt-0.5"
                  style={{ width: "40px" }}
                >
                  <MapPin size={15} strokeWidth={1.5} style={{ color: "#2D5BFF" }} />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Address
                  </span>
                  <span className="block text-[14px] leading-[1.55] text-white">
                    Blk 441A Clementi Ave 3, #01-04
                  </span>
                  <span className="block text-[14px] leading-[1.55] text-white">
                    Singapore 121441
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-white/35">
                    Opp Toast Box · Next to Money Max
                  </span>
                </div>
              </div>

              {/* Hours row */}
              <div
                ref={(el) => { infoRowRefs.current[1] = el; }}
                className="flex items-center will-change-transform"
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  minHeight: "64px",
                }}
              >
                {/* Icon zone */}
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ width: "40px" }}
                >
                  <Clock size={15} strokeWidth={1.5} style={{ color: "#2D5BFF" }} />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Hours
                  </span>
                  <span className="block text-[14px] text-white">
                    Opens 10:00 AM Daily
                  </span>
                </div>
                {/* Status badge */}
                {openStatus !== null && (
                  <div
                    className="ml-3 flex shrink-0 items-center gap-1.5"
                    style={{
                      padding: "5px 10px",
                      background: statusBg,
                      borderRadius: "2px",
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: statusColor }}
                    />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{ color: statusColor }}
                    >
                      {statusLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Phone row */}
              <div
                ref={(el) => { infoRowRefs.current[2] = el; }}
                className="flex items-center will-change-transform"
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  minHeight: "64px",
                }}
              >
                {/* Icon zone */}
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ width: "40px" }}
                >
                  <Phone size={15} strokeWidth={1.5} style={{ color: "#2D5BFF" }} />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Phone
                  </span>
                  <a
                    href="tel:+6566595180"
                    className="font-mono text-[14px] tabular-nums text-white transition-colors duration-200 hover:text-[#2D5BFF]"
                  >
                    +65 6659 5180
                  </a>
                </div>
                {/* Call link */}
                <a
                  href="tel:+6566595180"
                  className="ml-3 shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-[#2D5BFF] transition-opacity duration-200 hover:opacity-60"
                >
                  Call →
                </a>
              </div>

              {/* Push buttons down */}
              <div className="min-h-4 flex-1" />

              {/* Divider before CTAs */}
              <div
                className="mb-5 h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              {/* ── CTA buttons ── */}
              <div className="flex flex-col gap-3">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="loc-btn-primary"
                >
                  Get Directions
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>

                <a
                  href="tel:+6566595180"
                  className="loc-btn-outline"
                >
                  <Phone size={13} strokeWidth={2} />
                  Call Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
