"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import Badge from "@/components/ui/Badge";
import { formatRate } from "@/lib/utils";

const PAIRS = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar", buy: 1.342, sell: 1.358, hot: true },
  { code: "EUR", flag: "🇪🇺", name: "Euro", buy: 1.452, sell: 1.471 },
  { code: "GBP", flag: "🇬🇧", name: "British Pound", buy: 1.701, sell: 1.722 },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit", buy: 0.282, sell: 0.291 },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee", buy: 0.0159, sell: 0.0166 },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar", buy: 0.886, sell: 0.901 },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen", buy: 0.0085, sell: 0.0089 },
  { code: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar", buy: 0.171, sell: 0.176 },
];

export default function PopularRates() {
  return (
    <section id="popular" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-10 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Popular
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Most-Bought Currencies This Week
          </AnimatedText>
        </header>

        <div className="-mx-5 md:mx-0">
          <div className="flex md:grid md:grid-cols-4 gap-4 px-5 md:px-0 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
            {PAIRS.map((p) => (
              <article
                key={p.code}
                className="snap-start shrink-0 w-[260px] md:w-auto rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30"
              >
                <header className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="text-2xl">{p.flag}</span>
                    <span className="text-primary font-medium">{p.code}</span>
                  </span>
                  {p.hot && <Badge tone="accent">Best rate</Badge>}
                </header>
                <p className="mt-1 text-xs text-muted">{p.name}</p>

                <dl className="mt-5 grid grid-cols-2 gap-4 text-sm tabular">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">We Buy</dt>
                    <dd className="mt-1 text-primary text-base">{formatRate(p.buy)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">We Sell</dt>
                    <dd className="mt-1 text-primary text-base">{formatRate(p.sell)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
