"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion, cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  className,
  strength = 0.25,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </div>
  );
}
