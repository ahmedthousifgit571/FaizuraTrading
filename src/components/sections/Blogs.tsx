"use client";

import { ArrowRight } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";

const POSTS = [
  {
    category: "Rate Analysis",
    title: "USD to SGD this week — what's actually moving the rate?",
    excerpt:
      "We break down the Fed's latest signal and what it means for the dollar over the next two weeks.",
    readTime: 5,
    date: "May 7, 2026",
    featured: true,
  },
  {
    category: "Travel",
    title: "Changi Airport money changers vs us — the real spread, in numbers.",
    excerpt: "We did the math across 8 currencies. The result will not surprise frequent flyers.",
    readTime: 4,
    date: "May 4, 2026",
  },
  {
    category: "Remittance",
    title: "Sending money to Chennai: 5 things every sender should check.",
    excerpt: "Beyond the rate — fees, IFSC codes, settlement times, and what 'instant' really means.",
    readTime: 6,
    date: "Apr 28, 2026",
  },
  {
    category: "Compliance",
    title: "MAS-licensed: what it actually means for your money.",
    excerpt: "A plain-English guide to Singapore's Payment Services Act and why the badge matters.",
    readTime: 7,
    date: "Apr 22, 2026",
  },
];

export default function Blogs() {
  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <section id="blogs" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
              Insights
            </span>
            <AnimatedText
              as="h2"
              className="mt-3 font-display text-display-md text-primary"
            >
              Notes from the dealing desk.
            </AnimatedText>
          </div>
          <a
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-primary/80 hover:text-primary"
          >
            Read all insights <ArrowRight size={16} />
          </a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <article className="lg:col-span-2 rounded-2xl border border-border bg-surface p-8 md:p-10 hover:translate-y-[-2px] hover:border-primary/30 transition-all duration-300 cursor-pointer">
            <span className="text-[11px] uppercase tracking-[0.18em] text-accent tabular">
              {featured.category}
            </span>
            <h3 className="mt-4 font-display text-display-md text-primary leading-tight text-balance">
              {featured.title}
            </h3>
            <p className="mt-5 text-muted max-w-xl leading-relaxed">
              {featured.excerpt}
            </p>
            <p className="mt-8 text-xs text-muted tabular">
              {featured.readTime} min read · {featured.date}
            </p>
          </article>

          <div className="grid grid-cols-1 gap-4">
            {rest.slice(0, 3).map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-6 hover:translate-y-[-2px] hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-accent tabular">
                  {p.category}
                </span>
                <h3 className="mt-3 text-base font-medium text-primary leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-xs text-muted tabular">
                  {p.readTime} min · {p.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
