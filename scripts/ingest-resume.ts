import fs from "node:fs/promises";
import path from "node:path";
import { normalizeResume } from "@/lib/resume/normalize";
import { parseResumeText } from "@/lib/resume/parse";
import { resumeIngestionOutputSchema } from "@/lib/schemas";

async function main() {
  const sourcePath = process.argv[2];

  if (!sourcePath) {
    throw new Error("Usage: npm run ingest:resume -- <path-to-resume.pdf|docx>");
  }

  const absolutePath = path.resolve(sourcePath);
  const rawText = await parseResumeText(absolutePath);
  const normalized = normalizeResume(rawText, absolutePath);
  const validated = resumeIngestionOutputSchema.parse(normalized);

  const outputPath = path.resolve("content", "resume-ingestion.json");
  await fs.writeFile(outputPath, JSON.stringify(validated, null, 2), "utf-8");

  console.log(`Resume ingestion output written to ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
