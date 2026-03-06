# Portfolio Site

A bold, clean, recruiter-friendly portfolio built with Next.js 16 + TypeScript.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS (v4)
- Framer Motion
- Zod
- Vitest + Playwright

## Scripts

- `npm run dev`: Start dev server
- `npm run build`: Production build
- `npm run start`: Run production server
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript check
- `npm run format`: Format code with Prettier
- `npm run format:check`: Prettier check
- `npm run test`: Unit tests (Vitest)
- `npm run test:e2e`: End-to-end tests (Playwright)
- `npm run ingest:resume -- <path-to-resume.pdf|docx>`: Parse resume into structured JSON

## Resume Ingestion

The one-time ingestion script writes `content/resume-ingestion.json`.

Example using your provided resume path:

```bash
npm run ingest:resume -- "C:\Users\bandu\Downloads\Harsha_idarapalli_Software Engineer.pdf"
```

Then update `content/portfolio.json` with polished content and links.

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.vercel.app
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

If email variables are missing, contact API still returns success for local UX testing.
