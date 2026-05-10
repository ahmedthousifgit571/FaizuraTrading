import type Lenis from "@studio-freight/lenis";

export type LenisInstance = Lenis;

export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
} as const;
