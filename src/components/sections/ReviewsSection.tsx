"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "yrshx",
    rating: 5,
    text: "When i went to change my RM to SG dollars, i did not realise that i had dropped my 100rm on the floor. After changing the money, i went to the bank to deposit and went to the interchange until the gentleman in beige shirt from faizura trading money changer approached me that he had been finding for me everywhere and informed me that i had dropped my 100rm and showed me a footage of myself from the cctv. We went back to the money changer and he assisted me with changing my 100rm to sgd. Thank you so much for your effort and service!! 🙏🏻👍🏻",
  },
  {
    id: 2,
    name: "Jake T",
    rating: 5,
    text: "Shaik boss is friendly and possesses a pleasant demeanor. Rates are very attractive and so is their attitude. Keep up the good work guys!",
  },
  {
    id: 3,
    name: "Luc",
    rating: 5,
    text: "Very satisfied with their service. Been a regular with them for years. Their rates are pretty good too. I accidentally exchanged the wrong currency amount but a young gentleman, SK and the rest of the staff were helpful in addressing this at no cost. Will come back again for my next trip.",
  },
  {
    id: 4,
    name: "Mac Goh",
    rating: 5,
    text: "Good Rate, 👍 and wonderful service by Mr SK. Very nice young chap. Friendly and helpful to assist you in exchanging your currency. Will come back again 😊",
  },
  {
    id: 5,
    name: "Ka Leong",
    rating: 5,
    text: "Change taiwan dollar here and rate were superb, very kind, friendly and honest shop, highly recommend!!",
  },
  {
    id: 6,
    name: "Maisara Sulaiaman",
    rating: 5,
    text: "Good rate! Friendly service. Definitely recommend to come here. Repeat customer for years",
  },
  {
    id: 7,
    name: "Flo A",
    rating: 5,
    text: "Good money changer with great rates! Friendly Service too",
  },
  {
    id: 8,
    name: "Pratyush Ghosh",
    rating: 4,
    text: "Fairly good experience. The staff seem professional, and had clearly posted exchange rates which they followed, as well as provided receipts for. The rate for EUR and USD was good (only about 1.5% commission). The rate for INR wasn't great but that may be the case at other money-changers too (about 5.5% commission).",
  },
  {
    id: 9,
    name: "Timothy Wong",
    rating: 5,
    text: "Reasonable rates. My go-to money changer in the area. Staff are also helpful and clear in their communication.",
  },
  {
    id: 10,
    name: "Keryn",
    rating: 5,
    text: "Very friendly and offer good rate. This is my go to money changer. Staff SK is helpful",
  },
  {
    id: 11,
    name: "Martin",
    rating: 3,
    text: "Chanced upon this when taking lift down to Basement and rates is quite good so decided to change some more as earlier only changed abit but am surprised to receive mix notes. Luckily it can be used as it's been more than 5years since last traveled and not sure if certain notes are still in use or not but I think Money Changer should at least let customers know in advance lor and we can choose to either accept or request for new notes coz I checked with few friends all who changed at Money Changer are using new notes only.",
  },
];

const ROW_1_IDS = [1, 2, 3, 4, 5, 6];
const ROW_2_IDS = [7, 8, 9, 10, 11];

const REVIEWS_CSS = `
  @keyframes reviews-marquee-left {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }
  @keyframes reviews-marquee-right {
    from { transform: translate3d(-50%, 0, 0); }
    to   { transform: translate3d(0, 0, 0); }
  }
  .reviews-row-track {
    display: flex;
    gap: 20px;
    width: max-content;
    will-change: transform;
  }
  .reviews-row-1 {
    animation: reviews-marquee-left 40s linear infinite;
  }
  .reviews-row-2 {
    animation: reviews-marquee-right 55s linear infinite;
  }
  .reviews-row-mask:hover .reviews-row-track {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .reviews-row-1, .reviews-row-2 { animation: none !important; }
  }
  .reviews-row-mask {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  }
  .reviews-card {
    transition: background-color 280ms cubic-bezier(0.22,1,0.36,1),
                border-color 280ms cubic-bezier(0.22,1,0.36,1),
                transform 280ms cubic-bezier(0.22,1,0.36,1);
  }
  .reviews-card:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(99,179,237,0.3);
    transform: translateY(-2px);
  }
  .reviews-card-body-wrap {
    overflow: hidden;
    transition: max-height 360ms cubic-bezier(0.22,1,0.36,1);
  }
  .reviews-read-more {
    color: #63b3ed;
    font-weight: 500;
    cursor: pointer;
    margin-left: 4px;
    text-decoration: none;
    border: 0;
    background: transparent;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
  }
  .reviews-read-more:hover { text-decoration: underline; }
`;

/* ───────────── Helpers ───────────── */

function hashHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % 360;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 1).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/* ───────────── Sub-components ───────────── */

function FilledStar({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        fill="#FFC542"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

function HalfStar({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="rev-halfstar" x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="#FFC542" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#rev-halfstar)"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

function EmptyStar({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        fill="rgba(255,255,255,0.18)"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        return filled ? <FilledStar key={i} size={size} /> : <EmptyStar key={i} size={size} />;
      })}
    </div>
  );
}

function GoogleG({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083h-1.611V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function Avatar({ name }: { name: string }) {
  const hue = hashHue(name);
  const initials = getInitials(name);
  return (
    <div
      className="flex shrink-0 items-center justify-center select-none"
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: `linear-gradient(135deg, hsl(${hue}, 62%, 42%) 0%, hsl(${(hue + 28) % 360}, 58%, 30%) 100%)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: "0.02em",
        fontFamily: "var(--font-sans, system-ui)",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const TRUNCATE_AT = 180;
  const isLong = review.text.length > TRUNCATE_AT;
  const displayText =
    !isLong || expanded ? review.text : review.text.slice(0, TRUNCATE_AT).trimEnd() + "…";

  return (
    <article
      className="reviews-card flex flex-col"
      style={{
        flex: "0 0 380px",
        width: 380,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        padding: 28,
      }}
    >
      {/* Top row: avatar + name + stars */}
      <header className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div className="min-w-0">
          <div
            className="truncate text-white"
            style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.005em" }}
          >
            {review.name}
          </div>
          <div className="mt-1.5">
            <StarRow rating={review.rating} size={14} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mt-5 flex-1">
        <p
          className="text-white/70"
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "var(--font-sans, system-ui)",
          }}
        >
          {displayText}
          {isLong && !expanded && (
            <button
              type="button"
              className="reviews-read-more"
              onClick={() => setExpanded(true)}
              aria-label={`Read full review from ${review.name}`}
            >
              Read more
            </button>
          )}
          {isLong && expanded && (
            <>
              {"  "}
              <button
                type="button"
                className="reviews-read-more"
                onClick={() => setExpanded(false)}
                aria-label="Collapse review"
              >
                Show less
              </button>
            </>
          )}
        </p>
      </div>

      {/* Footer */}
      <footer
        className="mt-6 flex items-center justify-between"
        style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <GoogleG size={14} />
          <span
            className="font-mono uppercase text-white/45"
            style={{ fontSize: 10, letterSpacing: "0.18em" }}
          >
            Google Review
          </span>
        </div>
        <span
          className="font-mono text-white/70 tabular-nums"
          style={{ fontSize: 12, letterSpacing: "0.04em" }}
        >
          {review.rating}.0 / 5.0
        </span>
      </footer>
    </article>
  );
}

function MarqueeRow({
  reviews,
  rowClass,
  rowRef,
}: {
  reviews: Review[];
  rowClass: string;
  rowRef: React.RefObject<HTMLDivElement>;
}) {
  // Render twice so the loop is seamless when translating -50%.
  const doubled = [...reviews, ...reviews];
  return (
    <div className="reviews-row-mask relative overflow-hidden">
      <div ref={rowRef} className={`reviews-row-track ${rowClass}`}>
        {doubled.map((r, idx) => (
          <ReviewCard key={`${r.id}-${idx}`} review={r} />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Rating summary count-up ───────────── */

function RatingSummary({
  numberRef,
  starsRef,
}: {
  numberRef: React.RefObject<HTMLDivElement>;
  starsRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-col items-start md:items-end">
      <div className="flex items-baseline gap-3">
        <div
          ref={numberRef}
          className="font-display font-black text-white tabular-nums"
          style={{
            fontSize: 48,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
          aria-label="Google rating 4.0"
        >
          0.0
        </div>
        <span
          className="font-mono uppercase text-white/40"
          style={{ fontSize: 10, letterSpacing: "0.22em" }}
        >
          /5.0
        </span>
      </div>

      <div ref={starsRef} className="mt-3 flex items-center gap-1">
        <span style={{ display: "inline-block", transformOrigin: "center" }}>
          <FilledStar size={18} />
        </span>
        <span style={{ display: "inline-block", transformOrigin: "center" }}>
          <FilledStar size={18} />
        </span>
        <span style={{ display: "inline-block", transformOrigin: "center" }}>
          <FilledStar size={18} />
        </span>
        <span style={{ display: "inline-block", transformOrigin: "center" }}>
          <FilledStar size={18} />
        </span>
        <span style={{ display: "inline-block", transformOrigin: "center" }}>
          <HalfStar size={18} />
        </span>
      </div>

      <p
        className="mt-3 font-mono uppercase text-white/45"
        style={{ fontSize: 10, letterSpacing: "0.2em" }}
      >
        124 reviews on Google
      </p>
    </div>
  );
}

/* ───────────── Main section ───────────── */

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ratingNumberRef = useRef<HTMLDivElement>(null);
  const ratingStarsRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();

  // Snap visible values for reduced motion straight away.
  useEffect(() => {
    if (!reduce) return;
    if (ratingNumberRef.current) ratingNumberRef.current.textContent = "4.0";
    if (ratingStarsRef.current) {
      ratingStarsRef.current.querySelectorAll<HTMLElement>("span").forEach((s) => {
        s.style.transform = "scale(1)";
        s.style.opacity = "1";
      });
    }
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

      // Count-up for the 4.0 rating.
      if (ratingNumberRef.current) {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: 4.0,
          duration: 1.7,
          ease: "power3.out",
          onUpdate: () => {
            if (ratingNumberRef.current) {
              ratingNumberRef.current.textContent = obj.v.toFixed(1);
            }
          },
          scrollTrigger: {
            trigger: ratingNumberRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      // Stars staggered scale-in.
      if (ratingStarsRef.current) {
        const stars = ratingStarsRef.current.querySelectorAll<HTMLElement>("span");
        gsap.from(stars, {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2.4)",
          scrollTrigger: {
            trigger: ratingStarsRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Marquee rows entrance — CSS @keyframes takes over for the loop.
      if (row1Ref.current) {
        gsap.from(row1Ref.current, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row1Ref.current, start: "top 90%", once: true },
        });
      }

      if (row2Ref.current) {
        gsap.from(row2Ref.current, {
          x: 80,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: row2Ref.current, start: "top 92%", once: true },
        });
      }
    },
    [reduce],
    sectionRef
  );

  const row1Reviews = ROW_1_IDS.map((id) => REVIEWS.find((r) => r.id === id)!).filter(Boolean);
  const row2Reviews = ROW_2_IDS.map((id) => REVIEWS.find((r) => r.id === id)!).filter(Boolean);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-label="Customer reviews from Google"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#111111" }}
    >
      <style>{REVIEWS_CSS}</style>

      {/* Radial bloom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[15%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.10), rgba(45,91,255,0) 70%)",
            filter: "blur(36px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,197,66,0.05), rgba(255,197,66,0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Grid layer */}
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

      {/* Ghost watermark — centered between the rows */}
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
          REVIEWS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <header className="mb-14 md:mb-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* Left */}
            <div className="max-w-2xl">
              <div
                ref={eyebrowRef}
                className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
                What People Say
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
                  <span className="text-[#2D5BFF]">TRUSTED</span> BY
                </span>
                <span ref={line2Ref} className="block will-change-transform">
                  THOUSANDS
                </span>
              </h2>

              <p
                ref={subtextRef}
                className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-white/40"
              >
                Real reviews from real customers. Rated 4.0 on Google.
              </p>
            </div>

            {/* Right — Google rating summary */}
            <RatingSummary numberRef={ratingNumberRef} starsRef={ratingStarsRef} />
          </div>

          <div
            ref={dividerRef}
            className="mt-10 h-px w-full will-change-transform"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </header>

        {/* Marquee rows */}
        <div className="flex flex-col gap-5">
          <MarqueeRow reviews={row1Reviews} rowClass="reviews-row-1" rowRef={row1Ref} />
          <MarqueeRow reviews={row2Reviews} rowClass="reviews-row-2" rowRef={row2Ref} />
        </div>
      </div>
    </section>
  );
}
