import { describe, expect, it } from "vitest";
import { normalizeResume } from "@/lib/resume/normalize";

describe("normalizeResume", () => {
  it("extracts sections and basic profile info", () => {
    const sample = `
Harsha Idarapalli
harsha@example.com
SUMMARY
Software engineer focused on product impact.
EXPERIENCE
Built scalable APIs with Node.js.
PROJECTS
Built a Next.js platform with PostgreSQL analytics.
`;

    const result = normalizeResume(sample, "resume.pdf");

    expect(result.inferredProfile.name).toBe("Harsha Idarapalli");
    expect(result.inferredProfile.email).toBe("harsha@example.com");
    expect(result.sections.summary?.length).toBeGreaterThan(0);
    expect(result.inferredProjects.length).toBeGreaterThan(0);
    expect(result.inferredProjects[0]?.technologies).toContain("Next.js");
  });
});
