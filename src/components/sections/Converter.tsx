"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import CurrencyInput from "@/components/ui/CurrencyInput";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import { formatRate } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

export default function Converter() {
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("SGD");
  const [amount, setAmount] = useState("1000");
  const { data, loading, error } = useExchangeRates(from);

  const rate = data?.rates[to] ?? null;
  const converted = useMemo(() => {
    const n = parseFloat(amount);
    if (!rate || Number.isNaN(n)) return "";
    return (n * rate).toFixed(2);
  }, [amount, rate]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <section id="converter" className="relative py-section bg-bg">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Live Converter
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-balance text-primary"
          >
            Get a live quote in two clicks.
          </AnimatedText>
          <p className="mt-4 text-base text-muted">
            Indicative rates updated every 60 seconds. Final rate confirmed at the point of transaction.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
          <CurrencyInput
            label="You Send"
            currency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
            value={amount}
            placeholder="0.00"
          />

          <div className="my-3 flex items-center justify-center">
            <button
              type="button"
              aria-label="Swap currencies"
              onClick={swap}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border bg-bg text-primary hover:translate-y-[-1px] hover:border-primary/40 transition-all duration-200"
            >
              <ArrowDownUp size={16} />
            </button>
          </div>

          <CurrencyInput
            label="Recipient Gets"
            currency={to}
            onCurrencyChange={setTo}
            onAmountChange={() => { /* read-only on this side; rate-driven */ }}
            value={converted}
            placeholder="0.00"
            readOnly
          />

          <div className="mt-6 flex items-center justify-between text-sm">
            <p className="text-muted tabular">
              {error
                ? "Showing indicative rates (live API unavailable)."
                : loading && !data
                ? "Fetching live rate…"
                : rate
                ? `1 ${from} = ${formatRate(rate)} ${to}`
                : "—"}
            </p>
            <Button size="sm" variant="primary">Lock This Rate</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
