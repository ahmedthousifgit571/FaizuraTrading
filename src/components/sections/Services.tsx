"use client";

import { ArrowUpRight, Banknote, Send, Briefcase, CreditCard, PackageOpen, BellRing } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";

const SERVICES = [
  { icon: Banknote, title: "Currency Exchange", body: "Walk-in or online, USD to SGD or any of 50+ currencies, at the rate you see live." },
  { icon: Send,     title: "International Remittance", body: "Send money to family or partners abroad — same-day delivery to 80+ countries." },
  { icon: Briefcase,title: "Corporate FX",  body: "Hedging, batch payments, and multi-currency accounts for SMEs and treasurers." },
  { icon: CreditCard,title: "Travel Money Card", body: "Multi-currency prepaid card with locked-in rates. Top-up online before you fly." },
  { icon: PackageOpen,title: "Bulk Cash Orders", body: "Pre-order large amounts of foreign currency for collection at any branch." },
  { icon: BellRing, title: "Rate Alerts", body: "Set a target rate and we'll notify you the moment we hit it. WhatsApp / SMS / email." },
];

export default function Services() {
  return (
    <section id="services" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-10 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Services
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Everything money should move through.
          </AnimatedText>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group relative bg-surface p-7 md:p-8 transition-all duration-400 hover:bg-bg cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <Icon size={22} className="text-accent transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <ArrowUpRight size={18} className="text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary" />
              </div>
              <h3 className="mt-8 text-lg font-medium text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
