import Link from "next/link";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { SkillsMatrix } from "@/components/skills-matrix";
import { portfolioData } from "@/lib/portfolio";

export default function Home() {
  const { profile, projects, experiences, skillGroups, contact } = portfolioData;
  const creativeWorks = projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
  }));

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    knowsAbout: skillGroups.flatMap((group) => group.skills),
    hasOccupation: {
      "@type": "Occupation",
      name: profile.title,
    },
    subjectOf: creativeWorks,
  };

  return (
    <>
      <Hero profile={profile} />

      <section className="section">
        <SectionHeading
          eyebrow="Featured"
          title="Projects with clear product outcomes"
          subtitle="A curated set of work that combines technical depth with user-facing impact."
        />
        <div className="mt-10">
          <ProjectGrid projects={projects} featuredOnly />
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Experience"
          title="Engineering execution from idea to production"
          subtitle="I focus on building maintainable systems and measurable product improvements."
        />
        <div className="mt-10">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Skills"
          title="Technical range without losing focus"
          subtitle="Modern frontend and backend capabilities with quality engineering practices."
        />
        <div className="mt-10">
          <SkillsMatrix skillGroups={skillGroups} />
        </div>
      </section>

      <section className="section">
        <div className="card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-semibold">{contact.heading}</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-muted)]">{contact.description}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-medium text-black"
          >
            {contact.cta}
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </>
  );
}
