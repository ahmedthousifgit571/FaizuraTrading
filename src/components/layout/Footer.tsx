import Link from "next/link";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Currency Exchange", href: "#services" },
      { label: "International Remittance", href: "#services" },
      { label: "Corporate FX", href: "#services" },
      { label: "Travel Money Card", href: "#services" },
      { label: "Rate Alerts", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Locations", href: "#locations" },
      { label: "Insights", href: "#blogs" },
      { label: "Contact", href: "#contact" },
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
    <footer className="border-t border-border bg-bg text-primary">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
              Faizura Trading
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Singapore&apos;s trusted partner for cross-border money exchange and
              remittance. MAS-licensed since 2008.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.18em] text-muted mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-primary/85 hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted">
          <p className="tabular">
            MAS License No. PS00000000 — Faizura Trading Pte Ltd. © {new Date().getFullYear()}.
          </p>
          <p>Built for Singapore.</p>
        </div>
      </div>
    </footer>
  );
}
