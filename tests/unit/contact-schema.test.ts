import { describe, expect, it } from "vitest";
import { contactRequestSchema } from "@/lib/schemas";

describe("contactRequestSchema", () => {
  it("accepts valid payload", () => {
    const parsed = contactRequestSchema.parse({
      name: "Harsha",
      email: "harsha@example.com",
      message: "I would like to discuss a software engineering role.",
    });

    expect(parsed.name).toBe("Harsha");
  });

  it("rejects invalid email", () => {
    const parsed = contactRequestSchema.safeParse({
      name: "Harsha",
      email: "invalid-email",
      message: "This message is long enough for schema validation.",
    });

    expect(parsed.success).toBe(false);
  });
});
