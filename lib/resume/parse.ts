import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export async function parseResumeText(filePath: string): Promise<string> {
  const extension = path.extname(filePath).toLowerCase();
  const fileBuffer = await fs.readFile(filePath);

  if (extension === ".pdf") {
    const parser = new PDFParse({ data: new Uint8Array(fileBuffer) });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  if (extension === ".docx") {
    const parsed = await mammoth.extractRawText({ buffer: fileBuffer });
    return parsed.value;
  }

  throw new Error("Unsupported file type. Please provide a .pdf or .docx resume.");
}
