"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReducedMotion } from "framer-motion";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-form";
import { submitContactEnquiry } from "@/lib/submit-contact-enquiry";
import type { LucideIcon } from "lucide-react";
import {
  MessageCircle, Phone, Mail, Clock,
  ShieldCheck, ChevronDown, ArrowRight, Zap, Lock,
} from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const schema = contactFormSchema;
type FormValues = ContactFormValues;

/** Set NEXT_PUBLIC_CONTACT_FORM_LIVE=true in .env.local when Resend is ready. */
const CONTACT_FORM_LIVE =
  process.env.NEXT_PUBLIC_CONTACT_FORM_LIVE === "true";

/* ── Contact info rows ── */
type ContactRow = {
  Icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  href: string | null;
};

const CONTACT_ROWS: ContactRow[] = [
  {
    Icon: Phone,
    iconColor: "#2D5BFF",
    label: "CALL US",
    value: "+65 6659 5180",
    href: "tel:+6566595180",
  },
  {
    Icon: MessageCircle,
    iconColor: "#25D366",
    label: "WHATSAPP",
    value: "+65 6659 5180",
    href: "https://wa.me/6566595180",
  },
  {
    Icon: Mail,
    iconColor: "#2D5BFF",
    label: "EMAIL US",
    value: "hello@faizura-trading.sg",
    href: "mailto:hello@faizura-trading.sg",
  },
  {
    Icon: Clock,
    iconColor: "rgba(255,255,255,0.35)",
    label: "BUSINESS HOURS",
    value: "Mon – Sat · 9:00 – 19:00 SGT",
    href: null,
  },
];

const TRUST_ITEMS = [
  { Icon: Zap,         label: "Quick response",   sub: "We reply within 2 business hours." },
  { Icon: Lock,        label: "Trusted & secure",  sub: "MAS-licensed operator." },
  { Icon: ShieldCheck, label: "Your data is safe", sub: "No spam, ever." },
] as const;

export default function Contact() {
  const sectionRef      = useRef<HTMLElement>(null);
  const eyebrowRef      = useRef<HTMLDivElement>(null);
  const line1Ref        = useRef<HTMLSpanElement>(null);
  const line2Ref        = useRef<HTMLSpanElement>(null);
  const underlineRef    = useRef<HTMLSpanElement>(null);
  const subtextRef      = useRef<HTMLParagraphElement>(null);
  const contactBlockRef = useRef<HTMLDivElement>(null);
  const dividerRef      = useRef<HTMLDivElement>(null);
  const privacyBadgeRef = useRef<HTMLDivElement>(null);
  const contactRowRefs  = useRef<(HTMLElement | null)[]>([]);
  const formCardRef     = useRef<HTMLFormElement>(null);

  const reduce = useReducedMotion();

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { enquiryType: "personal" },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);

    if (CONTACT_FORM_LIVE) {
      const result = await submitContactEnquiry(values);
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
    } else {
      /* Dummy success until Resend + domain are configured (see .env.example). */
      await new Promise((r) => setTimeout(r, 600));
    }

    setSubmitted(true);
    reset();
  }

  /* ── GSAP scroll animations ── */
  useGSAP(
    () => {
      if (reduce) return;

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 88%", once: true },
        });
      }
      if (line1Ref.current) {
        gsap.from(line1Ref.current, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
      if (line2Ref.current) {
        gsap.from(line2Ref.current, {
          y: 40, opacity: 0, duration: 0.9, delay: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
      if (underlineRef.current) {
        gsap.from(underlineRef.current, {
          scaleX: 0, duration: 0.85, delay: 0.48, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          y: 20, opacity: 0, duration: 0.8, delay: 0.25, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 88%", once: true },
        });
      }

      if (contactBlockRef.current) {
        gsap.from(contactBlockRef.current, {
          y: 20, opacity: 0, duration: 0.8, delay: 0.35, ease: "power3.out",
          scrollTrigger: { trigger: contactBlockRef.current, start: "top 88%", once: true },
        });
      }
      if (privacyBadgeRef.current) {
        gsap.from(privacyBadgeRef.current, {
          y: 16, opacity: 0, duration: 0.7, delay: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: privacyBadgeRef.current, start: "top 88%", once: true },
        });
      }
      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          x: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: formCardRef.current, start: "top 82%", once: true },
        });
      }
    },
    [],
    sectionRef
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact Faizura Trading"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: "#0f1a2e" }}
    >
      {/* ── Radial bloom ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[20%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,91,255,0.12), rgba(45,91,255,0) 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,150,0.06), rgba(0,200,150,0) 70%)",
            filter: "blur(36px)",
          }}
        />
      </div>

      {/* ── Grid layer ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 0%, transparent 80%)",
        }}
      />

      {/* ── Ghost watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(96px, 18vw, 300px)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          CONTACT
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-12 lg:gap-20">

          {/* ──────────────────────────────────────────
              LEFT — editorial header + contact info
          ────────────────────────────────────────── */}
          <div className="flex flex-col lg:col-span-5 lg:self-start">

            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 will-change-transform"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
              Contact
            </div>

            {/* Display headline — intentionally mixed case for conversational tone */}
            <h2>
              <span
                ref={line1Ref}
                className="block font-display font-extrabold text-white will-change-transform"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                }}
              >
                Let&apos;s start
              </span>
              <span
                ref={line2Ref}
                className="block font-display font-extrabold text-white will-change-transform"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  marginTop: "4px",
                }}
              >
                a{" "}
                <span
                  style={{
                    color: "#2D5BFF",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  conversation.
                  {/* Left-to-right draw underline */}
                  <span
                    ref={underlineRef}
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "#2D5BFF",
                      borderRadius: "1.5px",
                      display: "block",
                      transformOrigin: "left center",
                    }}
                  />
                </span>
              </span>
            </h2>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="mt-8 will-change-transform"
              style={{
                fontSize: "16px",
                lineHeight: 1.72,
                color: "rgba(255,255,255,0.60)",
                maxWidth: "40ch",
              }}
            >
              Whether it&apos;s a one-off remittance or recurring corporate FX,
              our team replies within 2 business hours.
            </p>

            {/* Contact details */}
            <div
              ref={contactBlockRef}
              className="mt-6 flex flex-col gap-5 will-change-transform sm:mt-7"
            >
              {CONTACT_ROWS.map(({ Icon, iconColor, label, value, href }, i) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    {/* Circular icon container */}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} strokeWidth={1.5} style={{ color: iconColor }} />
                    </div>
                    {/* Label + value */}
                    <div>
                      <div
                        className="font-mono uppercase"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.40)",
                          marginBottom: "3px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        className="font-bold"
                        style={{
                          fontSize: "15px",
                          color: "#ffffff",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                );

                return href ? (
                  <a
                    key={label}
                    ref={(el) => { contactRowRefs.current[i] = el; }}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-row-wrap will-change-transform"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={label}
                    ref={(el) => { contactRowRefs.current[i] = el; }}
                    className="will-change-transform"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            <div
              ref={dividerRef}
              className="mt-8 h-px will-change-transform sm:mt-10"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            {/* Privacy badge */}
            <div
              ref={privacyBadgeRef}
              className="mt-8 will-change-transform sm:mt-10"
              style={{
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "6px" }}>
                <ShieldCheck
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: "#2D5BFF", flexShrink: 0 }}
                />
                <span
                  className="font-mono uppercase font-semibold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.58)",
                  }}
                >
                  Your privacy matters
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.36)", lineHeight: 1.65 }}>
                Your information is secure and will only be used to respond to your enquiry.
              </p>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              RIGHT — form card
          ────────────────────────────────────────── */}
          <form
            ref={formCardRef}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-7 will-change-transform rounded-md border border-white/[0.08] bg-[#080e1a] p-6 sm:p-8 md:p-10 lg:p-11"
            noValidate
          >
            {submitted ? (
              /* ── Success state ── */
              <div
                className="flex min-h-[320px] flex-col items-center justify-center sm:min-h-[420px] md:min-h-[520px]"
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(0,200,150,0.12)",
                    border: "1px solid rgba(0,200,150,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShieldCheck size={24} strokeWidth={1.5} style={{ color: "#00C896" }} />
                </div>
                <h3
                  className="font-display font-bold text-white text-center"
                  style={{
                    marginTop: "24px",
                    fontSize: "22px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Thanks — we&apos;ll be in touch.
                </h3>
                <p
                  className="text-center"
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.65,
                  }}
                >
                  A team member will reply within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "32px",
                    fontFamily: "inherit",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#2D5BFF",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              /* ── Form fields ── */
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

                <Field label="FULL NAME" error={errors.name?.message}>
                  <input
                    type="text"
                    autoComplete="name"
                    className="contact-input"
                    placeholder="Jane Tan"
                    {...register("name")}
                  />
                </Field>

                <Field label="EMAIL" error={errors.email?.message}>
                  <input
                    type="email"
                    autoComplete="email"
                    className="contact-input"
                    placeholder="jane@example.com"
                    {...register("email")}
                  />
                </Field>

                <Field label="PHONE" error={errors.phone?.message}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    className="contact-input"
                    placeholder="+65 0000 0000"
                    {...register("phone")}
                  />
                </Field>

                <Field label="ENQUIRY TYPE" error={errors.enquiryType?.message}>
                  <div className="contact-select-wrap">
                    <select className="contact-input" {...register("enquiryType")}>
                      <option value="personal">Personal exchange</option>
                      <option value="remittance">Remittance</option>
                      <option value="corporate">Corporate FX</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown
                      size={14}
                      strokeWidth={1.75}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    />
                  </div>
                </Field>

                <Field className="md:col-span-2" label="MESSAGE" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    className="contact-input"
                    placeholder="What can we help with?"
                    {...register("message")}
                  />
                </Field>

                {/* ── Trust badges — stacked on mobile, 3-col from md ── */}
                <div className="md:col-span-2 border-t border-white/[0.06] pt-5 md:border-t-0 md:pt-2">
                  <ul className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-5">
                    {TRUST_ITEMS.map(({ Icon, label, sub }) => (
                      <li
                        key={label}
                        className="flex items-start gap-3.5 rounded-sm border border-white/[0.06] bg-white/[0.02] p-4 md:border-0 md:bg-transparent md:p-0"
                      >
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2D5BFF]/20 bg-[#2D5BFF]/10"
                          aria-hidden
                        >
                          <Icon size={15} strokeWidth={1.5} className="text-[#2D5BFF]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-bold leading-snug text-white/70">
                            {label}
                          </span>
                          <span className="mt-1 block text-[12px] leading-relaxed text-white/40">
                            {sub}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Submit ── */}
                <div className="md:col-span-2 mt-1 flex flex-col gap-3 md:mt-0">
                  {submitError && (
                    <p
                      className="rounded-sm border border-[#FF5C5C]/30 bg-[#FF5C5C]/10 px-4 py-3 text-[13px] leading-relaxed text-[#FF5C5C]"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-btn-submit"
                  >
                    {isSubmitting ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight size={14} strokeWidth={2} />
                      </>
                    )}
                  </button>
                  <p
                    className="text-center font-mono"
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.28)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    We respect your privacy. No spam, ever.
                  </p>
                </div>

              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}

/* ── Field helper (visual redesign, logic unchanged) ── */
function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex w-full flex-col gap-1.5 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-[12px] leading-snug text-[#FF5C5C]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
