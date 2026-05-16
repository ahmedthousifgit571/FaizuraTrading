"use client";

import { useEffect, useRef, type RefObject } from "react";

type Cache = RefObject<Map<number, HTMLImageElement>>;

export function useCanvasRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  cache: Cache
) {
  const lastDrawnRef = useRef<number>(-1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d", { alpha: false });

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Force a redraw at next frame
      lastDrawnRef.current = -1;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [canvasRef]);

  function draw(frameIndex: number) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const idx = Math.round(frameIndex);
    if (idx === lastDrawnRef.current) return;

    const img = cache.current?.get(idx);
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fall back to nearest available frame
      const fallback = nearestAvailable(cache, idx);
      if (!fallback) return;
      drawCover(ctx, fallback, canvas.offsetWidth, canvas.offsetHeight);
      return;
    }

    drawCover(ctx, img, canvas.offsetWidth, canvas.offsetHeight);
    lastDrawnRef.current = idx;
  }

  return { draw };
}

function nearestAvailable(cache: Cache, idx: number): HTMLImageElement | null {
  const map = cache.current;
  if (!map) return null;
  for (let r = 0; r < 30; r++) {
    const a = map.get(idx - r);
    if (a) return a;
    const b = map.get(idx + r);
    if (b) return b;
  }
  return null;
}

// Source-image fraction reserved for the bottom watermark. Kept in sync with
// the `canvas-clip-watermark` mask in globals.css.
const WATERMARK_CLIP = 0.06;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  ctx.clearRect(0, 0, canvasW, canvasH);

  // On portrait / very-narrow viewports (mobile), cover would scale the
  // 16:9 frame to fill vertically and crop ~50% of its width, slicing the
  // phones and hands off the sides. Fall back to contain so the whole
  // cinematic composition stays in frame; the section's navy background
  // covers the resulting letterbox bands seamlessly.
  if (canvasRatio < imgRatio * 0.7) {
    const sw = img.naturalWidth;
    const sh = img.naturalHeight * (1 - WATERMARK_CLIP);
    const sourceRatio = sw / sh;

    let drawW: number, drawH: number;
    if (sourceRatio > canvasRatio) {
      drawW = canvasW;
      drawH = drawW / sourceRatio;
    } else {
      drawH = canvasH;
      drawW = drawH * sourceRatio;
    }
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;
    ctx.drawImage(img, 0, 0, sw, sh, offsetX, offsetY, drawW, drawH);
    return;
  }

  let drawW: number, drawH: number, offsetX: number, offsetY: number;
  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = drawH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = drawW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
