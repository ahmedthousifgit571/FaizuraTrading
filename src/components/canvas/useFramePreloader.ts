"use client";

import { useEffect, useRef, useState } from "react";
import { FRAME_PATH } from "@/lib/utils";

type Frame = HTMLImageElement;

export function useFramePreloader(total: number, criticalCount = 30) {
  const [progress, setProgress] = useState(0);
  const [criticalReady, setCriticalReady] = useState(false);
  const cacheRef = useRef<Map<number, Frame>>(new Map());

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const cache = cacheRef.current;

    async function loadOne(i: number): Promise<void> {
      if (cache.has(i) || cancelled) return;
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.decoding = "async";
      try {
        await img.decode();
      } catch {
        /* decode may throw on some browsers; drawImage still works */
      }
      if (cancelled) return;
      cache.set(i, img);
      loaded += 1;
      setProgress(loaded / total);
      if (loaded >= criticalCount) setCriticalReady(true);
    }

    async function run() {
      // 1. Frame 0 sync
      await loadOne(0);

      // 2. Frames 1..9 in parallel (bounded)
      await Promise.all(
        Array.from({ length: Math.min(9, total - 1) }, (_, k) => loadOne(k + 1))
      );

      // 3. Remaining via idle chunks
      const remaining: number[] = [];
      for (let i = 10; i < total; i++) remaining.push(i);

      const ric =
        (typeof window !== "undefined" &&
          (window as unknown as { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback) ||
        ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 16 } as IdleDeadline), 16));

      const chunkSize = 8;
      function nextChunk() {
        if (cancelled || remaining.length === 0) return;
        const slice = remaining.splice(0, chunkSize);
        Promise.all(slice.map(loadOne)).then(() => ric(nextChunk));
      }
      ric(nextChunk);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [total, criticalCount]);

  return { cache: cacheRef, progress, criticalReady };
}
