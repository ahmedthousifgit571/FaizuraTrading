"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const body = document.getElementById("article-body");
      if (!body) {
        bar.style.width = "0%";
        bar.style.opacity = "1";
        rafRef.current = requestAnimationFrame(update);
        return;
      }

      const rect = body.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrollable = articleHeight - viewportHeight;
      const scrolled = window.scrollY - articleTop;
      const raw = scrollable > 0 ? scrolled / scrollable : 0;
      const progress = Math.max(0, Math.min(1, raw));

      bar.style.width = `${progress * 100}%`;
      bar.style.opacity = progress >= 1 ? "0" : "1";

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        ref={barRef}
        className="h-full transition-opacity duration-500"
        style={{
          width: "0%",
          background: "#2D5BFF",
          boxShadow: "0 0 12px rgba(45,91,255,0.6)",
        }}
      />
    </div>
  );
}
