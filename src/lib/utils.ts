import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale = "en-SG",
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...opts,
  }).format(amount);
}

export function formatRate(rate: number, decimals = 4) {
  return new Intl.NumberFormat("en-SG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const FRAME_COUNT = 120;
export const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`;
