"use client";

import { useEffect, useState } from "react";
import type { CurrencyCode } from "@/types";

type RatesResponse = {
  base: CurrencyCode;
  rates: Partial<Record<CurrencyCode, number>>;
  date: string;
};

const FALLBACK_RATES: RatesResponse = {
  base: "USD",
  date: new Date().toISOString().slice(0, 10),
  rates: {
    SGD: 1.35, EUR: 0.92, GBP: 0.79, AUD: 1.52, JPY: 156.4,
    INR: 83.4, MYR: 4.7, HKD: 7.81, CNY: 7.25, CAD: 1.36, USD: 1,
  },
};

export function useExchangeRates(base: CurrencyCode = "USD") {
  const [data, setData] = useState<RatesResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=${base}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`Rates API ${res.status}`);
        const j = (await res.json()) as { base: CurrencyCode; rates: Partial<Record<CurrencyCode, number>>; date: string };
        if (!cancelled) {
          setData({ base: j.base, rates: { ...j.rates, [base]: 1 }, date: j.date });
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setData(FALLBACK_RATES.base === base ? FALLBACK_RATES : null);
          setError(e instanceof Error ? e : new Error("Unknown error"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    const id = window.setInterval(load, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [base]);

  return { data, loading, error };
}
