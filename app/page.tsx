import Link from "next/link";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { portfolioData } from "@/lib/portfolio";

const capabilityPillars = [
  {
    title: "Backend Conquest",
    summary:
      "I architect battle-ready APIs, event-driven services, and scalable backend systems that stay stable under pressure.",
    href: "/experience",
    cta: "Open voyage log",
  },
  {
    title: "Full-Stack Command",
    summary:
      "I lead features from idea to launch, connecting polished frontend journeys with reliable backend foundations.",
    href: "/projects",
    cta: "See legendary builds",
  },
  {
    title: "Cloud & Release Mastery",
    summary:
      "I run high-confidence CI/CD pipelines, observability, and cloud operations so teams can ship faster without chaos.",
    href: "/about",
    cta: "Read captain profile",
  },
];

export default function Home() {
  const { profile, projects, experiences, skillGroups, contact } = portfolioData;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    knowsAbout: skillGroups.flatMap((group) => group.skills),
  };

  return (
    <>
      <Hero profile={profile} />

      <section className="section">
        <SectionHeading
          eyebrow="Captain's Pitch"
          title="WHY TEAMS TRUST ME WITH THEIR MOST CRITICAL SOFTWARE MISSIONS"
          subtitle="This page is the executive summary. Detailed proof lives in Projects, Experience, About, and Contact."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-2)]">
              Years at Sea
            </p>
            <h3 className="mt-2 text-3xl font-semibold">4+ Years</h3>
            <p className="mt-3 leading-7 text-[color:var(--color-muted)]">
              Proven delivery across enterprise systems, fast-moving product teams, and production-critical
              software.
            </p>
          </article>
          <article className="card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-2)]">
              Treasure Built
            </p>
            <h3 className="mt-2 text-3xl font-semibold">{projects.length} Flagship Projects</h3>
            <p className="mt-3 leading-7 text-[color:var(--color-muted)]">
              Real systems that improved throughput, reliability, and user-facing value across multiple
              domains.
            </p>
          </article>
          <article className="card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-2)]">
              Crews Led
            </p>
            <h3 className="mt-2 text-3xl font-semibold">{experiences.length} Engineering Crews</h3>
            <p className="mt-3 leading-7 text-[color:var(--color-muted)]">
              Cross-team execution with product, QA, and engineering to turn complexity into shipped outcomes.
            </p>
          </article>
        </div>
      </section>

      <section className="section pt-0">
        <SectionHeading
          eyebrow="Power Set"
          title="What I can do better than most"
          subtitle="A fast scan of the capabilities I bring when you need a high-impact engineer from day one."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {capabilityPillars.map((pillar) => (
            <article key={pillar.title} className="card p-6">
              <h3 className="text-xl font-semibold text-[color:var(--color-accent-2)]">{pillar.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--color-muted)]">{pillar.summary}</p>
              <Link
                href={pillar.href}
                className="mt-5 inline-flex rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-2 text-sm hover:translate-y-[-2px]"
              >
                {pillar.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-2)]">
              Den Den Mushi
            </p>
            <h2 className="mt-2 text-3xl font-semibold">{contact.heading}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[color:var(--color-muted)]">{contact.description}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-medium text-[#25150a]"
          >
            {contact.cta}
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </>
  );
}
