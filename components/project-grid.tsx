"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MotionReveal } from "@/components/motion-reveal";
import type { Project } from "@/lib/types";

type ProjectGridProps = {
  projects: Project[];
  featuredOnly?: boolean;
};

function projectGlyph(name: string) {
  const lowered = name.toLowerCase();
  if (lowered.includes("ticket")) return "ET";
  if (lowered.includes("dashboard")) return "DB";
  if (lowered.includes("ai") || lowered.includes("prediction")) return "AI";
  return "PR";
}

export function ProjectGrid({ projects, featuredOnly = false }: ProjectGridProps) {
  const baseProjects = featuredOnly ? projects.filter((project) => project.featured) : projects;
  const tags = useMemo(
    () => Array.from(new Set(baseProjects.flatMap((project) => project.technologies))).sort(),
    [baseProjects],
  );
  const [activeTag, setActiveTag] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return baseProjects;
    }

    return baseProjects.filter((project) => project.technologies.includes(activeTag));
  }, [activeTag, baseProjects]);

  return (
    <section className="space-y-8">
      {!featuredOnly ? (
        <div className="flex flex-wrap gap-2" data-testid="project-filters">
          <button
            type="button"
            onClick={() => setActiveTag("All")}
            className={`rounded-full px-3 py-2 text-sm transition ${
              activeTag === "All"
                ? "bg-[color:var(--color-accent)] text-[#25150a]"
                : "border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-text)] hover:translate-y-[-2px]"
            }`}
          >
            All Seas
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                activeTag === tag
                  ? "bg-[color:var(--color-accent)] text-[#25150a]"
                  : "border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-text)] hover:translate-y-[-2px]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-testid="project-grid">
        {filteredProjects.map((project, index) => (
          <MotionReveal key={project.slug} delay={index * 0.06} className="card overflow-hidden" y={18}>
            <article className="space-y-4" data-testid="project-card">
              <div className="grid h-28 place-items-center border-b border-[color:var(--color-border)] bg-[radial-gradient(circle_at_50%_30%,rgba(243,207,132,0.28),transparent_45%),linear-gradient(135deg,rgba(167,29,42,0.44),rgba(4,79,120,0.18))] text-3xl font-bold text-[color:var(--color-accent-2)]">
                {projectGlyph(project.name)}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-[color:var(--color-accent-2)]">{project.name}</h3>
                </div>
                <p className="leading-7 text-[color:var(--color-muted)]">{project.description}</p>
                <p className="text-sm text-[color:var(--color-text)]">{project.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[color:var(--color-border)] bg-white/5 px-2 py-1 text-xs text-[#bfe3f1]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-[color:var(--color-accent-2)] underline-offset-2 hover:underline"
                  >
                    View details
                  </Link>
                ) : null}
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
