"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  readTime: number;
  date: string;
  featured?: true;
};

const POSTS: Post[] = [
  {
    category: "Rate Analysis",
    title: "USD to SGD this week — what's actually moving the rate?",
    excerpt:
      "We break down the Fed's latest signal and what it means for the dollar over the next two weeks.",
    readTime: 5,
    date: "May 7, 2026",
    featured: true,
  },
  {
    category: "Travel",
    title: "Changi Airport money changers vs us — the real spread, in numbers.",
    excerpt: "We did the math across 8 currencies. The result will not surprise frequent flyers.",
    readTime: 4,
    date: "May 4, 2026",
  },
  {
    category: "Remittance",
    title: "Sending money to Chennai: 5 things every sender should check.",
    excerpt: "Beyond the rate — fees, IFSC codes, settlement times, and what 'instant' really means.",
    readTime: 6,
    date: "Apr 28, 2026",
  },
  {
    category: "Compliance",
    title: "MAS-licensed: what it actually means for your money.",
    excerpt: "A plain-English guide to Singapore's Payment Services Act and why the badge matters.",
    readTime: 7,
    date: "Apr 22, 2026",
  },
];

const CAT_COLORS: Record<string, string> = {
  "Rate Analysis": "#2D5BFF",
  Travel:          "#F5A623",
  Remittance:      "#22c55e",
  Compliance:      "#8b5cf6",
};

const BLOGS_CSS = `
  .blogs-hscroll::-webkit-scrollbar { display: none; }
  .blogs-featured-title {
    transition: color 0.3s ease;
  }
  .blogs-featured-article:hover .blogs-featured-title {
    color: #2D5BFF;
  }
  .blogs-featured-cta {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  .blogs-featured-article:hover .blogs-featured-cta {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

function badgeStyle(cat: string, small?: boolean): React.CSSProperties {
  const color = CAT_COLORS[cat] ?? "#2D5BFF";
  return {
    display: "inline-block",
    padding: small ? "5px 10px" : "7px 13px",
    background: `${color}1a`,
    border: `1px solid ${color}38`,
    color,
    fontFamily: "var(--font-mono, monospace)",
    fontSize: small ? "9px" : "10px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    borderRadius: "2px",
  };
}

export default function Blogs() {
  const sectionRef       = useRef<HTMLElement>(null);
  const eyebrowRef       = useRef<HTMLDivElement>(null);
  const line1Ref         = useRef<HTMLSpanElement>(null);
  const line2Ref         = useRef<HTMLSpanElement>(null);
  const subtextRef       = useRef<HTMLParagraphElement>(null);
  const dividerRef       = useRef<HTMLDivElement>(null);
  const featuredRef      = useRef<HTMLElement>(null);
  const featuredBadgeRef = useRef<HTMLSpanElement>(null);
  const sidebarColRef    = useRef<HTMLDivElement>(null);
  const sidebarRowRefs   = useRef<(HTMLElement | null)[]>([]);
  const sidebarBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hScrollRef       = useRef<HTMLDivElement>(null);
  const hCardRefs        = useRef<(HTMLElement | null)[]>([]);
  const hBadgeRefs       = useRef<(HTMLSpanElement | null)[]>([]);

  const isDragging    = useRef(false);
  const dragStartX    = useRef(0);
  const dragScrollLeft = useRef(0);

  const reduce  = useReducedMotion();
  const featured = POSTS.find((p) => p.featured)!;
  const rest     = POSTS.filter((p) => !p.featured);

  useGSAP(
    (_ctx) => {
      if (reduce) return;

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }

      if (line1Ref.current && line2Ref.current) {
        gsap.from([line1Ref.current, line2Ref.current], {
          y: 70, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 20, opacity: 0, duration: 0.8, delay: 0.28, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          x: -50, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: featuredRef.current, start: "top 82%", once: true },
        });
      }

      if (featuredBadgeRef.current) {
        gsap.from(featuredBadgeRef.current, {
          scale: 0, opacity: 0, duration: 0.4, delay: 0.38, ease: "back.out(2)",
          scrollTrigger: { trigger: featuredRef.current, start: "top 82%", once: true },
        });
      }

      const rows = sidebarRowRefs.current.filter((el): el is HTMLElement => el !== null);
      if (rows.length) {
        gsap.from(rows, {
          x: 40, opacity: 0, duration: 0.7, stagger: 0.12, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: rows[0], start: "top 82%", once: true },
        });
      }

      const sBadges = sidebarBadgeRefs.current.filter(
        (el): el is HTMLSpanElement => el !== null
      );
      if (sBadges.length && rows.length) {
        gsap.from(sBadges, {
          scale: 0, opacity: 0, duration: 0.4, stagger: 0.12, delay: 0.4, ease: "back.out(2)",
          scrollTrigger: { trigger: rows[0], start: "top 82%", once: true },
        });
      }

      const hCards = hCardRefs.current.filter((el): el is HTMLElement => el !== null);
      if (hCards.length) {
        gsap.from(hCards, {
          y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: hScrollRef.current, start: "top 88%", once: true },
        });
      }

      const hBadges = hBadgeRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      if (hBadges.length) {
        gsap.from(hBadges, {
          scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, delay: 0.18, ease: "back.out(2)",
          scrollTrigger: { trigger: hScrollRef.current, start: "top 88%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hScrollRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - hScrollRef.current.offsetLeft;
    dragScrollLeft.current = hScrollRef.current.scrollLeft;
    hScrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !hScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - hScrollRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    hScrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (hScrollRef.current) hScrollRef.current.style.cursor = "grab";
  };

  return (
    <section
      id="blogs"
      ref={sectionRef}
      aria-label="Faizura Trading insights"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#111111" }}
    >
      <style>{BLOGS_CSS}</style>

      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.10), rgba(45,91,255,0) 70%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.05), rgba(0,200,150,0) 70%)",
            filter: "blur(36px)",
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
            fontSize: "clamp(100px, 20vw, 320px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          INSIGHTS
        </span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">

        {/* Section header */}
        <header className="mb-16 md:mb-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Left */}
            <div>
              <div
                ref={eyebrowRef}
                className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
                Insights
              </div>

              <h2
                className="font-display font-black uppercase text-white"
                style={{
                  fontSize: "clamp(44px, 7vw, 104px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}
              >
                <span ref={line1Ref} className="block will-change-transform">
                  KNOW MORE
                </span>
                <span ref={line2Ref} className="block will-change-transform">
                  <span className="text-[#2D5BFF]">PAY</span> LESS
                </span>
              </h2>

              <p
                ref={subtextRef}
                className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-white/35"
              >
                Market analysis, remittance guides, and rate intelligence.
              </p>
            </div>

            {/* Right — "Read All Insights" link */}
            <div className="md:pb-1 md:shrink-0">
              <a
                href="/insights"
                className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[#2D5BFF] transition-opacity duration-300 hover:opacity-60"
              >
                Read All Insights
                <ArrowRight
                  size={13}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          <div
            ref={dividerRef}
            className="mt-10 h-px w-full will-change-transform"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* ── Main editorial grid ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* FEATURED ARTICLE (7/12) — open layout, no card box */}
          <article
            ref={featuredRef}
            className="blogs-featured-article group cursor-pointer will-change-transform lg:col-span-7 lg:pr-10"
            style={{
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Category badge */}
            <span
              ref={featuredBadgeRef}
              className="will-change-transform"
              style={badgeStyle(featured.category)}
            >
              {featured.category}
            </span>

            {/* Headline */}
            <h3
              className="blogs-featured-title mt-6 font-display font-bold text-white"
              style={{
                fontSize: "clamp(28px, 3.2vw, 50px)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {featured.title}
            </h3>

            {/* Excerpt */}
            <p
              className="mt-5 text-white/60"
              style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "55ch" }}
            >
              {featured.excerpt}
            </p>

            {/* Meta */}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
              {featured.readTime} min read · {featured.date}
            </p>

            {/* CTA — slides up on article hover */}
            <div className="mt-5">
              <a
                href="/insights"
                className="blogs-featured-cta inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[#2D5BFF]"
              >
                Read Article
                <ArrowRight size={12} strokeWidth={1.75} />
              </a>
            </div>
          </article>

          {/* SIDEBAR ROWS (5/12) — open rows, no card boxes */}
          <div
            ref={sidebarColRef}
            className="lg:col-span-5"
          >
            {rest.map((p, i) => {
              const isLast = i === rest.length - 1;
              return (
                <article
                  key={p.title}
                  ref={(el) => { sidebarRowRefs.current[i] = el; }}
                  className="group flex cursor-pointer items-center gap-3 will-change-transform transition-colors duration-200 hover:bg-white/[0.03]"
                  style={{
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginLeft: "-10px",
                    marginRight: "-10px",
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <span
                      ref={(el) => { sidebarBadgeRefs.current[i] = el; }}
                      className="will-change-transform"
                      style={badgeStyle(p.category, true)}
                    >
                      {p.category}
                    </span>

                    <h3
                      className="mt-2.5 font-bold text-white transition-colors duration-200 group-hover:text-[#2D5BFF]"
                      style={{
                        fontSize: "17px",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      } as React.CSSProperties}
                    >
                      {p.title}
                    </h3>

                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                      {p.readTime} min · {p.date}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="ml-2 shrink-0 inline-block font-mono text-[18px] text-white/25 transition-all duration-200 group-hover:text-[#2D5BFF] group-hover:translate-x-1">
                    →
                  </span>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Horizontal scroll teaser ── */}
        <div className="mt-20 md:mt-24">

          {/* Section label row */}
          <div className="mb-5 flex items-center gap-6">
            <div
              className="h-px flex-1"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25 select-none">
              Drag to explore
            </span>
          </div>

          {/* Scroll container */}
          <div
            ref={hScrollRef}
            className="blogs-hscroll flex gap-4 overflow-x-auto pb-2 select-none"
            style={{ cursor: "grab", scrollbarWidth: "none" } as React.CSSProperties}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {POSTS.map((p, i) => {
              return (
                <article
                  key={p.title}
                  ref={(el) => { hCardRefs.current[i] = el; }}
                  className="cursor-pointer will-change-transform shrink-0 transition-colors duration-200 hover:bg-white/[0.04]"
                  style={{
                    width: "300px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px",
                    padding: "22px 20px",
                  }}
                >
                  <span
                    ref={(el) => { hBadgeRefs.current[i] = el; }}
                    className="will-change-transform"
                    style={badgeStyle(p.category, true)}
                  >
                    {p.category}
                  </span>

                  <h3
                    className="mt-3 font-bold text-white"
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.45,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    } as React.CSSProperties}
                  >
                    {p.title}
                  </h3>

                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                    {p.readTime} min · {p.date}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
