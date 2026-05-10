"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import { ShieldCheck } from "lucide-react";

const STATS = [
  { value: "50,000+", label: "Customers Served" },
  { value: "S$2B+",   label: "Total Exchanged" },
  { value: "15+ yrs", label: "Operating Since 2008" },
  { value: "MAS",     label: "Licensed Operator" },
];

export default function About() {
  return (
    <section id="about" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            About
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Singapore-rooted. Globally responsible.
          </AnimatedText>

          <div className="mt-6 space-y-4 text-base text-muted leading-relaxed max-w-xl">
            <p>
              We started Faizura Trading in 2008 with a single counter on Orchard Road and one idea — that
              moving money across borders shouldn&apos;t cost more than the move itself. Sixteen years and five
              branches later, that idea still drives every quote we issue.
            </p>
            <p>
              We&apos;re MAS-licensed, audited annually, and proud to serve Singapore&apos;s diaspora — from the
              construction worker remitting to family in Chennai, to the executive paying Sydney suppliers,
              to the student topping up before a Tokyo semester. The rate you see is the rate you get. No
              footnotes. No surprises.
            </p>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-surface">
            <ShieldCheck size={16} className="text-accent" />
            <span className="text-sm tabular text-primary/85">
              MAS License No. <span className="font-medium">PS00000000</span>
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px self-start bg-border rounded-2xl overflow-hidden border border-border">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface p-7 md:p-9">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                {s.label}
              </dt>
              <dd className="mt-3 font-display text-display-md text-primary tabular">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
