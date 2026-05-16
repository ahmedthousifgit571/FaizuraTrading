import { z } from "zod";

/** Shared by Contact form (client) and /api/contact (server). */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  enquiryType: z.enum(["personal", "corporate", "remittance", "other"]),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ENQUIRY_TYPE_LABELS: Record<ContactFormValues["enquiryType"], string> = {
  personal: "Personal exchange",
  remittance: "Remittance",
  corporate: "Corporate FX",
  other: "Other",
};

export function formatContactEmailText(values: ContactFormValues): string {
  const { name, email, phone, enquiryType, message } = values;
  return [
    "New enquiry from faizura-trading.sg",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Enquiry type: ${ENQUIRY_TYPE_LABELS[enquiryType]}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

/** True when Resend + recipient env vars are set on the server. */
export function isContactEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_FROM_EMAIL?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim()
  );
}
