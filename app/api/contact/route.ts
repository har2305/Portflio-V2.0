import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  MAX_CONTACT_REQUEST_BYTES,
  sendContactEmail,
  validateContactRequest,
  type ContactResponse,
} from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
    }

    const rawBody = await request.text();
    const bodySize = new TextEncoder().encode(rawBody).length;
    if (bodySize > MAX_CONTACT_REQUEST_BYTES) {
      return NextResponse.json({ ok: false, error: "Request body is too large." }, { status: 413 });
    }

    const raw = JSON.parse(rawBody) as unknown;
    const payload = validateContactRequest(raw);
    await sendContactEmail(payload);

    const response: ContactResponse = { ok: true };
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "Malformed JSON payload." }, { status: 400 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid name, email, and message." },
        { status: 400 },
      );
    }

    const response: ContactResponse = { ok: false, error: "Unable to process your request right now." };
    return NextResponse.json(response, { status: 500 });
  }
}
