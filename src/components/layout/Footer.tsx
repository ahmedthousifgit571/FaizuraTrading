import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

const MAPS_LINK =
  "https://www.google.com/maps/search/Faizura+Trading+Clementi+Money+Changer/@1.3147408,103.7647079,17z";

type FooterLink = { label: string; href: string; live?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "#home" },
      { label: "Converter", href: "#converter" },
      { label: "Live Rates", href: "#rates", live: true },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Find Us", href: "#locations" },
      { label: "Our Store", href: "#gallery" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQs", href: "#faq" },
      { label: "Insights", href: "#blogs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "MAS Disclosures", href: "/mas-disclosure" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative isolate border-t border-white/[0.08] bg-[#0a0a0b]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%,#000 0%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%,#000 0%,transparent 100%)",
        }}
      />

      {/* Blue radial bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-[50vmax] w-[50vmax] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side,rgba(45,91,255,0.09),transparent 70%)",
        }}
      />

      {/* ── Pre-footer CTA strip ── */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-20">
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] px-8 py-10 md:px-14 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-[60px]"
            style={{
              background:
                "radial-gradient(closest-side,rgba(45,91,255,0.18),transparent 70%)",
            }}
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Singapore&rsquo;s #1 Forex Desk
              </p>
              <h2 className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.035em] text-white md:text-[2.75rem]">
                Ready to move money
                <br className="hidden md:block" /> across borders?
              </h2>
            </div>
            <a
              href="#rates"
              className="group inline-flex shrink-0 items-center rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-[#0a0a0b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:pr-3 active:scale-[0.98]"
            >
              Get Best Rate
              <span className="ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a0a0b] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px]">
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-10 pt-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 md:gap-8 lg:gap-12">

          {/* ── Brand + Contact column (wider) ── */}
          <div className="col-span-2 md:col-span-2">

            {/* Logo */}
            <a
              href="#home"
              className="inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-80"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full bg-[#2D5BFF]"
              />
              Faizura Trading
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-[30ch]">
              Singapore&apos;s trusted partner for cross-border money exchange and remittance.
            </p>

            {/* MAS badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
              <span className="relative inline-flex h-1.5 w-1.5" aria-label="Active">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00C896]/60" aria-hidden />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#00C896]" aria-hidden />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                MAS-Licensed · Since 2008
              </span>
            </div>

            {/* ── Contact details ── */}
            <div
              className="mt-8 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Contact
              </p>

              <ul className="space-y-4">
                {/* Address */}
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
                    aria-hidden
                  >
                    <MapPin size={12} strokeWidth={1.5} className="text-[#2D5BFF]" />
                  </span>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-[1.6] text-white/55 transition-all duration-200 hover:-translate-y-px hover:text-white"
                  >
                    Blk 441A Clementi Ave 3, #01-04
                    <br />
                    Singapore 121441
                  </a>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
                    aria-hidden
                  >
                    <Phone size={12} strokeWidth={1.5} className="text-[#2D5BFF]" />
                  </span>
                  <a
                    href="tel:+6566595180"
                    className="font-mono text-[13px] tabular-nums text-white/55 transition-all duration-200 hover:-translate-y-px hover:text-white"
                  >
                    +65 6659 5180
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
                    aria-hidden
                  >
                    <Mail size={12} strokeWidth={1.5} className="text-[#2D5BFF]" />
                  </span>
                  <a
                    href="mailto:hello@faizura-trading.sg"
                    className="text-[13px] text-white/55 transition-all duration-200 hover:-translate-y-px hover:text-white"
                  >
                    hello@faizura-trading.sg
                  </a>
                </li>

                {/* Hours */}
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
                    aria-hidden
                  >
                    <Clock size={12} strokeWidth={1.5} className="text-[#2D5BFF]" />
                  </span>
                  <span className="text-[13px] text-white/55">
                    Mon – Sat &middot; 9:00 – 19:00 SGT
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Link columns ── */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/55 transition-all duration-200 hover:-translate-y-px hover:text-white"
                    >
                      {link.live && (
                        <span className="relative inline-flex h-1.5 w-1.5 shrink-0" aria-label="Live">
                          <span className="absolute inset-0 animate-ping rounded-full bg-[#00C896]/70" aria-hidden />
                          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#00C896]" aria-hidden />
                        </span>
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs tabular-nums text-white/35">
            MAS License No. PS00000000 — Faizura Trading Pte Ltd. &copy;{" "}
            {new Date().getFullYear()}.
          </p>
          <p className="font-mono text-xs text-white/35">Built for Singapore.</p>
        </div>
      </div>
    </footer>
  );
}
