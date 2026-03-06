import type { ResumeIngestionOutput } from "@/lib/types";

const sectionHeaders = [
  "summary",
  "experience",
  "work experience",
  "projects",
  "skills",
  "education",
  "certifications",
] as const;

function inferSection(line: string) {
  const lowered = line.trim().toLowerCase();
  return sectionHeaders.find((header) => lowered === header) ?? null;
}

function extractEmail(text: string) {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0];
}

function extractName(text: string) {
  const [firstLine] = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return firstLine?.replace(/[^a-zA-Z\s.'-]/g, "") || undefined;
}

function inferTechnologies(line: string) {
  const known = [
    "typescript",
    "javascript",
    "react",
    "next.js",
    "node.js",
    "python",
    "java",
    "aws",
    "postgresql",
    "docker",
  ];

  return known
    .filter((tech) => line.toLowerCase().includes(tech))
    .map((tech) =>
      tech === "next.js" ? "Next.js" : tech === "node.js" ? "Node.js" : tech[0].toUpperCase() + tech.slice(1),
    );
}

export function normalizeResume(rawText: string, filePath: string): ResumeIngestionOutput {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Record<string, string[]> = {};
  let currentSection = "general";
  sections[currentSection] = [];

  for (const line of lines) {
    const discoveredSection = inferSection(line);
    if (discoveredSection) {
      currentSection = discoveredSection;
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      continue;
    }

    sections[currentSection].push(line);
  }

  const projectLines = sections.projects ?? [];
  const inferredProjects = projectLines
    .filter((line) => line.length > 24)
    .slice(0, 5)
    .map((line, index) => ({
      name: `Project ${index + 1}`,
      description: line,
      technologies: inferTechnologies(line),
    }));

  return {
    filePath,
    normalizedAt: new Date().toISOString(),
    rawText,
    sections,
    inferredProfile: {
      name: extractName(rawText),
      email: extractEmail(rawText),
      summary: (sections.summary ?? sections.general ?? []).slice(0, 2).join(" "),
      title: "Software Engineer",
      location: "United States",
      links: [],
    },
    inferredProjects,
  };
}
