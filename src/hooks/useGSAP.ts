"use client";

import { useLayoutEffect, useEffect, type DependencyList } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Run a GSAP setup function inside a `gsap.context()` so all tweens and
 * ScrollTriggers created inside are auto-cleaned on unmount.
 *
 * Pass a scope ref to limit selector queries inside the callback.
 */
export function useGSAP(
  cb: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: React.RefObject<HTMLElement>
) {
  useIsoLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(cb, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
