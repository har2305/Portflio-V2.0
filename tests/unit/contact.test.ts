import { describe, expect, it, vi, beforeEach } from "vitest";
import { MAX_CONTACT_REQUEST_BYTES, sendContactEmail } from "@/lib/contact";

describe("contact security hardening", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("enforces a conservative request-size limit", () => {
    expect(MAX_CONTACT_REQUEST_BYTES).toBe(10_000);
  });

  it("does not include provider response body in thrown errors", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: vi.fn().mockResolvedValue("sensitive upstream details"),
      }),
    );

    await expect(
      sendContactEmail({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "A valid message that is long enough.",
      }),
    ).rejects.toThrowError("Email provider error (403)");
  });
});
