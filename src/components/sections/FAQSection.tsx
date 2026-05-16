"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const FAQS = [
  {
    q: "What currencies do you exchange?",
    a: "We exchange over 47 currencies including USD, EUR, GBP, AUD, JPY, MYR, INR, HKD, CNY, TWD, and many more. Walk in or check our Live Rates page for the full list and today's rates.",
  },
  {
    q: "Do I need to make an appointment?",
    a: "No appointment needed. Simply walk in to our Clementi branch during operating hours — Monday to Saturday, 9:00 AM to 7:00 PM SGT. We serve customers on a first-come, first-served basis.",
  },
  {
    q: "Is there a minimum or maximum amount I can exchange?",
    a: "There is no strict minimum. For large transactions above S$5,000, we recommend calling ahead so we can prepare your currency and offer you the best available rate at the time of exchange.",
  },
  {
    q: "Are your rates the same as the rates shown online?",
    a: "The rates displayed on our Live Rates page are indicative and updated every 60 seconds. Final rates are confirmed at the point of transaction. We always aim to match or beat what you see — no hidden fees, no markup surprises.",
  },
  {
    q: "Is Faizura Trading MAS-licensed?",
    a: "Yes. Faizura Trading is a licensed money changer regulated by the Monetary Authority of Singapore (MAS). Our license number is PS00000000. You can verify this on the MAS website.",
  },
  {
    q: "Can I send money overseas through Faizura Trading?",
    a: "Yes. We offer international remittance services to 80+ countries with same-day delivery options. Visit our Services page or speak to our team in branch for transfer limits, fees, and supported corridors.",
  },
] as const;

/* ─────────────────────── Main section ─────────────────────── */

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const handleToggle = (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i));

  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef  = useRef<HTMLParagraphElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (reduce) return;

      if (eyebrowRef.current && headlineRef.current && subtextRef.current) {
        gsap.from([eyebrowRef.current, headlineRef.current, subtextRef.current], {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      const items = faqItemsRef.current.filter(Boolean) as HTMLDivElement[];
      if (items.length) {
        gsap.from(items, {
          x: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    [reduce],
    sectionRef
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Frequently asked questions"
      className="relative isolate overflow-hidden bg-[#111111] py-24 md:py-32"
    >
      {/* Ghost watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-display font-black uppercase leading-none tracking-tighter text-white whitespace-nowrap"
          style={{ fontSize: "clamp(180px, 28vw, 380px)", opacity: 0.02 }}
        >
          FAQ
        </span>
      </div>

      {/* Radial bloom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[15%] -right-[5%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.12), rgba(45,91,255,0) 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        {/* Top divider */}
        <div className="mb-16 h-px w-full bg-white/[0.08]" />

        {/* Split layout: 40% left / 60% right */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-20">

          {/* ── LEFT: header + contact card + trust line ── */}
          <div className="flex flex-col gap-10">

            <div>
              <div
                ref={eyebrowRef}
                className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                ● FAQ
              </div>

              <h2
                ref={headlineRef}
                className="font-display font-black uppercase leading-[0.92] tracking-[-0.035em] text-white"
                style={{ fontSize: "clamp(44px, 5.5vw, 72px)" }}
              >
                <span className="text-[#2D5BFF]">QUESTIONS</span> WE
                <br />
                HEAR EVERY DAY
              </h2>

              <p
                ref={subtextRef}
                className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
              >
                Everything you need to know before you walk in.
              </p>
            </div>

            <ContactCard ref={cardRef} hasActiveQuestion={openIndex !== -1} />

            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              ● MAS LICENSED · PS00000000 · SINCE 2008
            </p>
          </div>

          {/* ── RIGHT: accordion ── */}
          <div className="divide-y divide-white/[0.08]">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === i}
                onOpen={() => handleToggle(i)}
                reduce={!!reduce}
                itemRef={(el) => { faqItemsRef.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Contact card ─────────────────────── */

const ContactCard = forwardRef<HTMLDivElement, { hasActiveQuestion: boolean }>(
  function ContactCard({ hasActiveQuestion }, ref) {
    return (
      <div
        ref={ref}
        className="rounded-[4px] p-7"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: hasActiveQuestion
            ? "3px solid #2D5BFF"
            : "1px solid rgba(255,255,255,0.08)",
          transition: "border-left 200ms ease",
        }}
      >
        <p className="text-[18px] font-bold leading-snug text-white">
          Still have questions?
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-white/50">
          Our team replies within 2 business hours.
        </p>

        <div className="mt-6 flex flex-col gap-[10px]">
          <a
            href="https://wa.me/6566595180"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[4px] py-3 text-center text-[14px] font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-px active:scale-[0.98]"
            style={{ background: "#25D366" }}
          >
            WhatsApp Us &rarr;
          </a>
          <a
            href="tel:+6566595180"
            className="block w-full rounded-[4px] border py-3 text-center text-[14px] font-semibold text-white/80 transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white hover:-translate-y-px active:scale-[0.98]"
            style={{ borderColor: "#2D5BFF", background: "transparent" }}
          >
            Call Us &rarr;
          </a>
        </div>
      </div>
    );
  }
);

/* ─────────────────────── FAQ accordion item ─────────────────────── */

function FAQItem({
  question,
  answer,
  isOpen,
  onOpen,
  reduce,
  itemRef,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onOpen: () => void;
  reduce: boolean;
  itemRef: (el: HTMLDivElement | null) => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef   = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  /* GSAP icon rotation */
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;
    if (reduce) {
      icon.style.transform = `rotate(${isOpen ? 45 : 0}deg)`;
      return;
    }
    gsap.to(icon, {
      rotation: isOpen ? 45 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isOpen, reduce]);

  /* GSAP accent line draw-down on open */
  useEffect(() => {
    const line = accentRef.current;
    if (!line || reduce) return;
    if (isOpen) {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen, reduce]);

  /* max-height expand / collapse */
  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.opacity = "1";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
    }
  }, [isOpen]);

  return (
    <div ref={itemRef}>
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className="text-[17px] font-bold leading-[1.4] transition-colors duration-200"
          style={{ color: isOpen ? "#2D5BFF" : "#ffffff" }}
        >
          {question}
        </span>

        <span
          ref={iconRef}
          aria-hidden
          className="flex-shrink-0 font-light leading-none text-[#2D5BFF] will-change-transform"
          style={{
            display: "inline-block",
            fontSize: "24px",
            transformOrigin: "center",
          }}
        >
          +
        </span>
      </button>

      {/* Answer — max-height animated */}
      <div
        ref={answerRef}
        style={{
          maxHeight: isOpen ? undefined : "0px",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: reduce
            ? "none"
            : "max-height 350ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
        }}
      >
        <div className="relative pb-6 pl-5">
          <span
            ref={accentRef}
            aria-hidden
            className="absolute left-0 top-0 h-full w-[2px] bg-[#2D5BFF]"
            style={{ display: "block", transformOrigin: "top" }}
          />
          <p className="text-[15px] leading-[1.8] text-white/60">{answer}</p>
        </div>
      </div>
    </div>
  );
}
