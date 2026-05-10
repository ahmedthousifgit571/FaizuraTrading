"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "#converter", label: "Converter" },
  { href: "#rates", label: "Live Rates" },
  { href: "#services", label: "Services" },
  { href: "#locations", label: "Locations" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 isolate transition-all duration-400 ease-out-expo",
        scrolled
          ? "bg-[#0a0a0b]/85 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.08]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="#"
          className="flex items-center gap-2 text-primary font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
          />
          Faizura Trading
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-primary/80 hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button size="sm" variant="primary">
            Get Best Rate
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-primary p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0a0a0b]/95 backdrop-blur-xl backdrop-saturate-150">
          <ul className="flex flex-col gap-1 px-5 py-6">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-primary/90 hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Button size="md" variant="primary" className="w-full">
                Get Best Rate
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
