"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { LENIS_CONFIG, type LenisInstance } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/utils";

const LenisContext = createContext<LenisInstance | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();

    if (prefersReducedMotion()) {
      // Native scroll only — but still update ScrollTrigger on raw scroll.
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    document.documentElement.classList.add("lenis");
    const lenis = new Lenis({ ...LENIS_CONFIG });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Hash-link interception: smoothly scroll to in-page anchors.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(tickerCb);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
