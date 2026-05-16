"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import type { ContentBlock } from "@/lib/articles";

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !sectionRef.current) return;

      const blocks = sectionRef.current.querySelectorAll<HTMLElement>(".body-block");
      blocks.forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, filter: "blur(6px)", duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    [],
    sectionRef
  );

  return (
    <section
      id="article-body"
      ref={sectionRef}
      aria-label="Article body"
      className="py-16 md:py-24"
      style={{ background: "#0a0a0b" }}
    >
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <div key={i} className="body-block max-w-[720px] mx-auto px-5 md:px-10 will-change-transform">
              <h2
                className="mt-14 mb-5 font-display font-bold uppercase text-white"
                style={{
                  fontSize: "28px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  borderLeft: "3px solid #2D5BFF",
                  paddingLeft: "18px",
                }}
              >
                {block.text}
              </h2>
            </div>
          );
        }

        if (block.type === "paragraph") {
          return (
            <div key={i} className="body-block max-w-[720px] mx-auto px-5 md:px-10 will-change-transform">
              <p
                className="mb-6 text-white/75"
                style={{ fontSize: "17px", lineHeight: 1.9 }}
              >
                {block.text}
              </p>
            </div>
          );
        }

        if (block.type === "pullquote") {
          return (
            <div key={i} className="body-block max-w-[720px] mx-auto px-5 md:px-10 my-10 will-change-transform">
              <blockquote
                style={{
                  borderLeft: "4px solid #2D5BFF",
                  paddingLeft: "28px",
                  background: "rgba(255,255,255,0.03)",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingRight: "24px",
                }}
              >
                <p
                  className="text-white italic"
                  style={{ fontSize: "22px", lineHeight: 1.55 }}
                >
                  &ldquo;{block.text}&rdquo;
                </p>
              </blockquote>
            </div>
          );
        }

        if (block.type === "statcallout") {
          return (
            <div
              key={i}
              className="body-block w-full my-14 py-10 px-5 md:px-10 will-change-transform"
              style={{
                background: "#0f1a2e",
                borderTop: "1px solid rgba(99,179,237,0.15)",
                borderBottom: "1px solid rgba(99,179,237,0.15)",
              }}
            >
              <div className="max-w-[720px] mx-auto">
                <div
                  className="font-display font-black text-white tabular-nums"
                  style={{
                    fontSize: "clamp(40px, 5vw, 68px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {block.stat}
                </div>
                <div
                  className="mt-3 font-mono uppercase tracking-[0.2em] text-white/55"
                  style={{ fontSize: "11px" }}
                >
                  {block.label}
                </div>
                {block.detail && (
                  <div
                    className="mt-1.5 font-mono text-white/30"
                    style={{ fontSize: "10px" }}
                  >
                    {block.detail}
                  </div>
                )}
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* CTA row */}
      <div className="body-block max-w-[720px] mx-auto px-5 md:px-10 mt-16 pt-10 will-change-transform" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          Ready to exchange?
        </p>
        <Link
          href="/#rates"
          className="group relative inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-[15px] font-semibold text-[#0a0a0b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:pr-3 active:scale-[0.98]"
        >
          See live rates
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0b] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px]">
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </span>
        </Link>
      </div>
    </section>
  );
}
