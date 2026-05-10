"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const FrameScrubber = dynamic(() => import("@/components/canvas/FrameScrubber"), {
  ssr: false,
});

const HEADLINE_WORDS: ReadonlyArray<string> = [
  "Your",
  "money",
  "travels",
  "faster",
  "than",
  "you",
  "do.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StoryScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(revealRef, { once: true, amount: "some" });

  const animate = reduce || inView ? "show" : "hidden";

  const headlineContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE },
    },
  };

  const supportingContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { y: 28, opacity: 0, filter: "blur(10px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.75, ease: EASE },
    },
  };

  return (
    <section
      ref={wrapperRef}
      id="story"
      className="relative bg-[#0f1a2e]"
      style={{ height: "400vh" }}
      aria-label="The Faizura Trading story"
    >
      <div
        ref={revealRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-[25vh] h-px w-px"
      />
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <FrameScrubber
          triggerSelector="#story"
          className="absolute inset-0 h-full w-full"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#0f1a2e]"
          style={{ mixBlendMode: "multiply", opacity: 0.78 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#2D5BFF]"
          style={{ mixBlendMode: "overlay", opacity: 0.08 }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-[#0f1a2e]/0 via-[#0f1a2e]/70 to-[#0f1a2e]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#0f1a2e]/70 to-[#0f1a2e]/0"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 pb-[8vh] md:pb-[7vh]">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
            <motion.div
              initial="hidden"
              animate={animate}
              variants={supportingContainer}
              className="max-w-2xl lg:max-w-[34rem]"
            >
              <motion.h2
                variants={headlineContainer}
                className="font-display text-[clamp(40px,5.5vw,84px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-white"
              >
                {HEADLINE_WORDS.map((w, i) => {
                  const isAccent = w.toLowerCase() === "faster";
                  return (
                    <span
                      key={i}
                      className="inline-block overflow-hidden align-bottom pr-[0.22em]"
                    >
                      <motion.span
                        variants={wordVariants}
                        className={
                          isAccent
                            ? "inline-block text-[#2D5BFF] will-change-transform"
                            : "inline-block will-change-transform"
                        }
                      >
                        {w}
                      </motion.span>
                    </span>
                  );
                })}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-7 font-mono text-[11px] uppercase tracking-[0.26em] text-white/65 will-change-transform"
              >
                47 currencies · Zero hidden fees · Singapore's most trusted since 2008
              </motion.p>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
