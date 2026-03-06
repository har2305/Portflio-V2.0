import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sendContactEmail, validateContactRequest, type ContactResponse } from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const payload = validateContactRequest(raw);
    await sendContactEmail(payload);

    const response: ContactResponse = { ok: true };
    return NextResponse.json(response);
  } catch (error) {
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
