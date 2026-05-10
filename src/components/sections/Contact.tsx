"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  enquiryType: z.enum(["personal", "corporate", "remittance", "other"]),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
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
    // Stub — wire to API route or external form provider later.
    await new Promise((r) => setTimeout(r, 600));
    console.log("Contact form submitted:", values);
    setSubmitted(true);
    reset();
  }

  return (
    <section id="contact" className="relative py-section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted tabular">
            Contact
          </span>
          <AnimatedText
            as="h2"
            className="mt-3 font-display text-display-md text-primary"
          >
            Talk to a person, not a chatbot.
          </AnimatedText>
          <p className="mt-4 text-muted max-w-md">
            Whether it&apos;s a one-off remittance or recurring corporate FX, our team replies within 2 business hours.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-center gap-4 text-primary/90">
              <MessageCircle size={16} className="text-accent" />
              <a href="https://wa.me/6500000000" className="hover:text-primary tabular">+65 0000 0000 (WhatsApp)</a>
            </li>
            <li className="flex items-center gap-4 text-primary/90">
              <Phone size={16} className="text-accent" />
              <a href="tel:+6500000000" className="hover:text-primary tabular">+65 0000 0000</a>
            </li>
            <li className="flex items-center gap-4 text-primary/90">
              <Mail size={16} className="text-accent" />
              <a href="mailto:hello@faizura-trading.sg" className="hover:text-primary">hello@faizura-trading.sg</a>
            </li>
            <li className="flex items-center gap-4 text-muted">
              <Clock size={16} className="text-accent/80" />
              <span className="tabular">Mon – Sat · 9:00 – 19:00 SGT</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-border bg-surface p-7 md:p-10"
          noValidate
        >
          {submitted ? (
            <div className="min-h-[400px] flex flex-col justify-center text-center">
              <h3 className="font-display text-2xl text-primary">Thanks — we&apos;ll be in touch.</h3>
              <p className="mt-3 text-muted">A team member will reply within 2 business hours.</p>
              <Button
                variant="ghost"
                className="mt-8 self-center"
                onClick={() => setSubmitted(false)}
              >
                Send another
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full name" error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  className={inputCls}
                  placeholder="Jane Tan"
                  {...register("name")}
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  className={inputCls}
                  placeholder="jane@example.com"
                  {...register("email")}
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  type="tel"
                  autoComplete="tel"
                  className={inputCls}
                  placeholder="+65 0000 0000"
                  {...register("phone")}
                />
              </Field>
              <Field label="Enquiry type" error={errors.enquiryType?.message}>
                <select className={inputCls} {...register("enquiryType")}>
                  <option value="personal">Personal exchange</option>
                  <option value="remittance">Remittance</option>
                  <option value="corporate">Corporate FX</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field className="md:col-span-2" label="Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  className={inputCls}
                  placeholder="What can we help with?"
                  {...register("message")}
                />
              </Field>
              <div className="md:col-span-2 mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-muted">We reply within 2 business hours.</p>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-primary/40 transition-colors";

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
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-[0.16em] text-muted">{label}</span>
      {children}
      {error && <span className="text-xs text-negative">{error}</span>}
    </label>
  );
}
