"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
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

function badgeStyle(cat: string): React.CSSProperties {
  const color = CATEGORY_COLORS[cat] ?? "#2D5BFF";
  return {
    display: "inline-block",
    padding: "5px 10px",
    background: `${color}1a`,
    border: `1px solid ${color}38`,
    color,
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    borderRadius: "2px",
  };
}

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLElement | null)[]>([]);
  const reduce      = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      const cards = cardRefs.current.filter((el): el is HTMLElement => el !== null);
      if (!cards.length) return;

      gsap.from(cards, {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          once: true,
        },
      });
    },
    [],
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Related articles"
      className="py-20 md:py-28"
      style={{ background: "#0f1a2e" }}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">

        {/* Back to insights */}
        <div
          className="mb-12 pb-12 flex items-center"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link
            href="/#blogs"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2D5BFF] transition-opacity duration-300 hover:opacity-60"
          >
            <ArrowLeft
              size={13}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Insights
          </Link>
        </div>

        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
            More Insights
          </div>
          <h2
            className="font-display font-black uppercase text-white"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            YOU MIGHT ALSO <span className="text-[#2D5BFF]">LIKE.</span>
          </h2>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <article
              key={article.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group will-change-transform"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px",
              }}
            >
              <Link
                href={`/insights/${article.slug}`}
                className="block h-full p-6 transition-colors duration-200 hover:bg-white/[0.04]"
              >
                <span style={badgeStyle(article.category)}>{article.category}</span>

                <h3
                  className="mt-4 font-bold text-white transition-colors duration-200 group-hover:text-[#2D5BFF]"
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  } as React.CSSProperties}
                >
                  {article.title}
                </h3>

                <p
                  className="mt-3 text-white/55"
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  } as React.CSSProperties}
                >
                  {article.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                    {article.readTime} · {article.date}
                  </p>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.75}
                    className="text-white/25 transition-all duration-200 group-hover:text-[#2D5BFF] group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
