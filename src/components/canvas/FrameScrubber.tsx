"use client";

import { useEffect, useRef } from "react";
import { useFramePreloader } from "./useFramePreloader";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { FRAME_COUNT } from "@/lib/utils";

type Props = {
  /** Selector or ref of the scroll container that drives frame index */
  triggerSelector: string;
  /** Visible canvas should be `position: sticky; top: 0` so pin not needed */
  className?: string;
};

/**
 * The cinematic canvas. Lives inside a `position: sticky; top: 0; height: 100vh`
 * wrapper, while a parent of height ~400vh provides the scroll distance. As the
 * user scrolls through that distance, ScrollTrigger maps progress to frame index.
 */
export default function FrameScrubber({ triggerSelector, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { cache, progress, criticalReady } = useFramePreloader(FRAME_COUNT, 30);
  const { draw } = useCanvasRenderer(canvasRef, cache);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  // Draw frame 0 as soon as it's available so we never show blank canvas
  useEffect(() => {
    if (cache.current?.has(0)) drawRef.current(0);
  }, [cache, progress]);

  useGSAP(
    () => {
      const trigger = document.querySelector(triggerSelector);
      if (!trigger) return;

      const state = { frame: 0 };

      gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        snap: { frame: 1 },
        scrollTrigger: {
          trigger: trigger as Element,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => drawRef.current(state.frame),
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === trigger) t.kill();
        });
      };
    },
    [triggerSelector]
  );

  const showLoader = !criticalReady && progress < 1;

  return (
    <div className={className} aria-label="Cross-border money exchange visualization">
      <canvas
        ref={canvasRef}
        className="block h-full w-full canvas-clip-watermark"
        role="img"
        aria-label="Two phones exchanging currency notes across borders"
      />
      {showLoader && (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex w-[min(320px,80vw)] flex-col items-center gap-2 text-on-mint">
          <div className="h-px w-full overflow-hidden bg-on-mint/15">
            <div
              className="h-full bg-on-mint transition-[width] duration-200 ease-out-expo"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] tabular">
            Loading {Math.round(progress * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
