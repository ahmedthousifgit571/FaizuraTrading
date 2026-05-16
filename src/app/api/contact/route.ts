import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactFormSchema,
  ENQUIRY_TYPE_LABELS,
  formatContactEmailText,
  isContactEmailConfigured,
} from "@/lib/contact-form";

export async function POST(request: Request) {
  if (!isContactEmailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Contact email is not configured. Add Resend env vars (see .env.example).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const values = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL!;
  const from = process.env.RESEND_FROM_EMAIL!;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: values.email,
    subject: `New enquiry — ${ENQUIRY_TYPE_LABELS[values.enquiryType]} — ${values.name}`,
    text: formatContactEmailText(values),
  });

  if (error) {
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
