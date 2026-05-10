"use client";

import { ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";

const BRANCHES = [
  {
    name: "Orchard",
    address: "313 Orchard Road, #02-01, Singapore 238895",
    hours: "Mon – Sun · 9:00 – 21:00",
    phone: "+65 6000 0001",
  },
  {
    name: "Chinatown",
    address: "133 New Bridge Road, #B1-12, Singapore 059413",
    hours: "Mon – Sun · 10:00 – 20:00",
    phone: "+65 6000 0002",
  },
  {
    name: "Jurong East",
    address: "JEM Mall, #03-25, Singapore 608549",
    hours: "Mon – Sun · 10:00 – 21:00",
    phone: "+65 6000 0003",
  },
  {
    name: "Tampines",
    address: "Tampines Mall, #02-08, Singapore 529510",
    hours: "Mon – Sun · 10:00 – 21:00",
    phone: "+65 6000 0004",
  },
  {
    name: "Changi Airport T1",
    address: "Changi Airport Terminal 1, Departure Hall, Singapore 819642",
    hours: "Daily · 06:00 – 23:00",
    phone: "+65 6000 0005",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-10 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Locations
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Five branches. Across Singapore.
          </AnimatedText>
          <p className="mt-4 text-muted">
            Visit any branch for cash exchange, large remittances, or just to chat with our team.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((b) => (
            <article
              key={b.name}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30"
            >
              <header className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-primary">{b.name}</h3>
                <a
                  aria-label={`Get directions to ${b.name} branch`}
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all"
                >
                  <ArrowUpRight size={18} />
                </a>
              </header>

              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-accent/80" />
                  <span>{b.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={14} className="mt-0.5 shrink-0 text-accent/80" />
                  <span className="tabular">{b.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={14} className="mt-0.5 shrink-0 text-accent/80" />
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="tabular hover:text-primary">
                    {b.phone}
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
