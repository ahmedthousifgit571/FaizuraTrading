"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import storefrontImg from "@/assets/gallery/image1.png";
import counterDetailImg from "@/assets/gallery/image2.png";
import rateBoardImg from "@/assets/gallery/image3.png";
import currencyNotesImg from "@/assets/gallery/image4.png";
import teamImg from "@/assets/gallery/image5.png";
import interiorImg from "@/assets/gallery/image6.png";
import signageImg from "@/assets/gallery/image7.png";

type Cell = {
  label: string;
  gridArea: string;
  src: StaticImageData;
  featured?: boolean;
};

/* Asymmetric masonry composition.
   4 columns. The featured cell takes the top-left 2×2 block. */
const CELLS: Cell[] = [
  { label: "Storefront", gridArea: "1 / 1 / 3 / 3", src: storefrontImg, featured: true },
  { label: "Counter Detail", gridArea: "1 / 3 / 3 / 4", src: counterDetailImg },
  { label: "Rate Board", gridArea: "1 / 4 / 2 / 5", src: rateBoardImg },
  { label: "Currency Notes", gridArea: "2 / 4 / 3 / 5", src: currencyNotesImg },
  { label: "Team", gridArea: "3 / 1 / 4 / 2", src: teamImg },
  { label: "Interior", gridArea: "3 / 2 / 4 / 4", src: interiorImg },
  { label: "Signage", gridArea: "3 / 4 / 4 / 5", src: signageImg },
];

const GALLERY_CSS = `
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(180px, auto));
    gap: 12px;
  }
  @media (min-width: 768px) {
    .gallery-grid {
      gap: 16px;
      grid-template-rows: repeat(3, minmax(220px, auto));
    }
  }
  @media (min-width: 1280px) {
    .gallery-grid {
      gap: 18px;
      grid-template-rows: repeat(3, minmax(260px, auto));
    }
  }
  @media (max-width: 767px) {
    .gallery-grid {
      grid-template-columns: 1fr;
      grid-template-rows: none;
      gap: 12px;
    }
    .gallery-cell {
      grid-area: auto !important;
      min-height: 220px;
    }
  }

  .gallery-cell {
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    transition: background-color 280ms cubic-bezier(0.22,1,0.36,1),
                border-color 280ms cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }
  .gallery-cell:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(99,179,237,0.45);
  }
  .gallery-cell-inner {
    position: absolute;
    inset: 0;
    will-change: transform;
  }
  .gallery-cell-inner img {
    object-fit: cover;
    transition: transform 520ms cubic-bezier(0.22,1,0.36,1);
  }
  .gallery-cell:hover .gallery-cell-inner img {
    transform: scale(1.04);
  }
  .gallery-cell-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 18px 20px;
    background: linear-gradient(
      to top,
      rgba(15,26,46,0.78) 0%,
      rgba(15,26,46,0.0) 60%
    );
    opacity: 0;
    transition: opacity 220ms cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
  }
  .gallery-cell:hover .gallery-cell-overlay {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .gallery-cell, .gallery-cell-inner, .gallery-cell-inner img { transition: none; }
    .gallery-cell:hover .gallery-cell-inner img { transform: none; }
  }
`;

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuredInnerRef = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();

  /* Parallax on the featured cell — quick-set motion values
     so we never trigger a React render per mousemove. */
  useEffect(() => {
    if (reduce) return;
    const featured = cellRefs.current[0];
    const inner = featuredInnerRef.current;
    if (!featured || !inner) return;

    const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = featured.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      // Move opposite to cursor, max ~8px.
      xTo(-dx * 16);
      yTo(-dy * 16);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    featured.addEventListener("mousemove", handleMove);
    featured.addEventListener("mouseleave", handleLeave);
    return () => {
      featured.removeEventListener("mousemove", handleMove);
      featured.removeEventListener("mouseleave", handleLeave);
    };
  }, [reduce]);

  useGSAP(
    () => {
      if (reduce) return;

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }

      if (line1Ref.current && line2Ref.current) {
        gsap.from([line1Ref.current, line2Ref.current], {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.28,
          ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      const cells = cellRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (cells.length) {
        gsap.from(cells, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          stagger: { amount: 0.8, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    [reduce],
    sectionRef
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-label="Faizura Trading store gallery"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#0f1a2e" }}
    >
      <style>{GALLERY_CSS}</style>

      {/* Radial bloom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.18), rgba(45,91,255,0) 70%)",
            filter: "blur(36px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.08), rgba(0,200,150,0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Grid layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
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

      {/* Ghost watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase whitespace-nowrap text-white"
          style={{
            fontSize: "clamp(140px, 22vw, 360px)",
            opacity: 0.02,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          GALLERY
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <header className="mb-14 md:mb-16">
          <div className="max-w-3xl">
            <div
              ref={eyebrowRef}
              className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
              Our Store
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
                WHERE THE <span className="text-[#2D5BFF]">RATE</span>
              </span>
              <span ref={line2Ref} className="block will-change-transform">
                MEETS THE ROOM.
              </span>
            </h2>

            <p
              ref={subtextRef}
              className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-white/40"
            >
              Visit us at Clementi. See the space where we work.
            </p>
          </div>

          <div
            ref={dividerRef}
            className="mt-10 h-px w-full will-change-transform"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* Asymmetric masonry-style grid */}
        <div ref={gridRef} className="gallery-grid">
          {CELLS.map((cell, i) => {
            const isFeatured = !!cell.featured;
            return (
              <div
                key={cell.label}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                className="gallery-cell"
                style={{ gridArea: cell.gridArea }}
                aria-label={cell.label}
              >
                <div
                  ref={isFeatured ? featuredInnerRef : undefined}
                  className="gallery-cell-inner"
                >
                  <Image
                    src={cell.src}
                    alt={cell.label}
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 767px) 100vw, 50vw"
                        : "(max-width: 767px) 100vw, 25vw"
                    }
                    priority={isFeatured}
                  />
                </div>

                <div className="gallery-cell-overlay">
                  <span
                    className="font-mono uppercase text-white/85"
                    style={{ fontSize: 11, letterSpacing: "0.18em" }}
                  >
                    {cell.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tiny caption strip below the grid for editorial polish. */}
        <div className="mt-10 flex items-center gap-6">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span
            className="shrink-0 select-none font-mono uppercase text-white/30"
            style={{ fontSize: 10, letterSpacing: "0.22em" }}
          >
            Clementi · Singapore
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      </div>
    </section>
  );
}
