"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };

type NavDropdown = {
  type: "dropdown";
  label: string;
  items: NavLink[];
};

type NavSingle = {
  type: "link";
  href: string;
  label: string;
};

type NavItem = NavDropdown | NavSingle;

const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "dropdown",
    label: "Services",
    items: [
      { href: "/#converter", label: "Converter" },
      { href: "/#rates", label: "Live Rates" },
      { href: "/#services", label: "Services" },
    ],
  },
  {
    type: "dropdown",
    label: "About",
    items: [
      { href: "/about", label: "About" },
      { href: "/#blogs", label: "Insights" },
    ],
  },
  {
    type: "dropdown",
    label: "Company",
    items: [
      { href: "/#locations", label: "Find Us" },
      { href: "/#gallery", label: "Our Store" },
      { href: "/#reviews", label: "Reviews" },
      { href: "/#faq", label: "FAQs" },
    ],
  },
  { type: "link", href: "/#contact", label: "Contact" },
];

const CTA_CLASSES =
  "inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-bg transition-all duration-200 ease-out-expo hover:translate-y-[-1px] hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

function NavAnchor({
  href,
  className,
  onClick,
  role,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  role?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} role={role} className={className}>
      {children}
    </Link>
  );
}

function DesktopDropdown({ label, items }: NavDropdown) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm text-primary/80 transition-colors duration-200 hover:text-primary"
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        role="menu"
        onMouseLeave={() => setOpen(false)}
        className={cn(
          "absolute left-0 top-full z-50 min-w-[11rem] pt-3 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <ul className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0b]/95 py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {items.map((item) => (
            <li key={item.href} role="none">
              <NavAnchor
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-primary/75 transition-colors hover:bg-white/[0.04] hover:text-primary"
              >
                {item.label}
              </NavAnchor>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function MobileDropdown({
  label,
  items,
  onNavigate,
}: NavDropdown & { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-base text-primary/90"
      >
        {label}
        <ChevronDown
          size={18}
          className={cn("transition-transform duration-200", expanded && "rotate-180")}
          aria-hidden
        />
      </button>
      {expanded && (
        <ul className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-white/[0.08] pl-4">
          {items.map((item) => (
            <li key={item.href}>
              <NavAnchor
                href={item.href}
                onClick={onNavigate}
                className="block py-2.5 text-sm text-primary/70 hover:text-primary"
              >
                {item.label}
              </NavAnchor>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

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

  const closeMobile = () => setOpen(false);

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 isolate transition-all duration-400 ease-out-expo",
        scrolled
          ? "border-b border-white/[0.08] bg-[#0a0a0b]/85 backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-primary"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
          />
          Faizura Trading
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) =>
            item.type === "link" ? (
              <li key={item.href}>
                <NavAnchor
                  href={item.href}
                  className="text-sm text-primary/80 transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </NavAnchor>
              </li>
            ) : (
              <DesktopDropdown key={item.label} {...item} />
            )
          )}
        </ul>

        <div className="hidden md:block">
          <NavAnchor href="/#rates" className={CTA_CLASSES}>
            Get Best Rate
          </NavAnchor>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 text-primary md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] bg-[#0a0a0b]/95 backdrop-blur-xl backdrop-saturate-150 md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-6">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <li key={item.href}>
                  <NavAnchor
                    href={item.href}
                    onClick={closeMobile}
                    className="block py-3 text-base text-primary/90 hover:text-primary"
                  >
                    {item.label}
                  </NavAnchor>
                </li>
              ) : (
                <MobileDropdown
                  key={item.label}
                  {...item}
                  onNavigate={closeMobile}
                />
              )
            )}
            <li className="pt-3">
              <NavAnchor href="/#rates" onClick={closeMobile} className={cn(CTA_CLASSES, "w-full")}>
                Get Best Rate
              </NavAnchor>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
