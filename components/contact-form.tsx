"use client";

import { type FormEvent, useState } from "react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !json.ok) {
        setState({ status: "error", message: json.error ?? "Something went wrong" });
        return;
      }

      setState({ status: "success", message: "Message sent successfully." });
      event.currentTarget.reset();
    } catch {
      setState({ status: "error", message: "Unable to send your message right now." });
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="card space-y-4 p-6"
      data-testid="contact-form"
    >
      <label className="block text-sm">
        <span className="mb-1 block text-[color:var(--color-muted)]">Name</span>
        <input name="name" className="input" placeholder="Your name" required />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-[color:var(--color-muted)]">Email</span>
        <input name="email" type="email" className="input" placeholder="you@example.com" required />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-[color:var(--color-muted)]">Message</span>
        <textarea name="message" rows={6} className="input" placeholder="How can I help?" required />
      </label>
      <button
        type="submit"
        disabled={state.status === "loading"}
        className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm font-medium text-black transition disabled:opacity-70"
      >
        {state.status === "loading" ? "Sending..." : "Send message"}
      </button>
      {state.message ? (
        <p
          className={state.status === "success" ? "text-sm text-emerald-300" : "text-sm text-red-300"}
          data-testid="contact-status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
