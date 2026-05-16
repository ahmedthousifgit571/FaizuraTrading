import type { ContactFormValues } from "@/lib/contact-form";

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * POST enquiry to /api/contact (Resend). Enable with
 * NEXT_PUBLIC_CONTACT_FORM_LIVE=true once domain + keys are ready.
 */
export async function submitContactEnquiry(
  values: ContactFormValues
): Promise<SubmitContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await res.json().catch(() => ({}))) as { error?: string };

    if (!res.ok) {
      return {
        ok: false,
        error:
          data.error ??
          (res.status === 503
            ? "Email is not configured yet. Please try again later or contact us directly."
            : "Something went wrong. Please try again or email us directly."),
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
