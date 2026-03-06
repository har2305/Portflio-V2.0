import { contactRequestSchema } from "@/lib/schemas";

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = { ok: boolean; error?: string };

export function validateContactRequest(payload: unknown): ContactRequest {
  return contactRequestSchema.parse(payload);
}

export async function sendContactEmail(payload: ContactRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return { delivered: false, reason: "Email provider not configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: `Portfolio inquiry from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      reply_to: payload.email,
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`Email provider error: ${raw}`);
  }

  return { delivered: true };
}
