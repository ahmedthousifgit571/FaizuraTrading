"use client";

import { useRef, type ElementType } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { prefersReducedMotion } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  /** Delay seconds */
  delay?: number;
  /** Trigger on scroll (true) or on mount (false) */
  onScroll?: boolean;
  stagger?: number;
};

/**
 * Word-by-word reveal — splits on spaces, wraps each word in an inline-block
 * span with overflow-hidden, then translates words from y: 100% → 0.
 * Lighter than the official GSAP SplitText plugin, no license required.
 */
export default function AnimatedText({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  onScroll = true,
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = children.split(/(\s+)/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const wordEls = el.querySelectorAll<HTMLElement>("[data-word]");
      if (!wordEls.length) return;

      if (prefersReducedMotion()) {
        gsap.set(wordEls, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(wordEls, { yPercent: 110, opacity: 0 });

      const tween = gsap.to(wordEls, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger,
        delay,
        ...(onScroll
          ? {
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          : {}),
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.trigger === el && t.kill());
      };
    },
    [children]
  );

  return (
    <Tag ref={ref as never} className={cn("overflow-hidden", className)}>
      {words.map((w, i) =>
        /\s/.test(w) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block will-change-transform">
              {w}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}
