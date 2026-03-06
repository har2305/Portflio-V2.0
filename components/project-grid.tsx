"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MotionReveal } from "@/components/motion-reveal";
import type { Project } from "@/lib/types";

type ProjectGridProps = {
  projects: Project[];
  featuredOnly?: boolean;
};

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
                ? "bg-[color:var(--color-accent)] text-black"
                : "border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                activeTag === tag
                  ? "bg-[color:var(--color-accent)] text-black"
                  : "border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2" data-testid="project-grid">
        {filteredProjects.map((project, index) => (
          <MotionReveal key={project.slug} delay={index * 0.06} className="card p-6" y={18}>
            <article className="space-y-4" data-testid="project-card">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                {project.featured ? (
                  <span className="rounded-full bg-[color:var(--color-accent)]/20 px-2 py-1 text-xs">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="text-[color:var(--color-muted)]">{project.description}</p>
              <p className="text-sm text-[color:var(--color-text)]">{project.impact}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[color:var(--color-border)] px-2 py-1 text-xs text-[color:var(--color-muted)]"
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
                  className="inline-flex text-sm font-medium text-[color:var(--color-accent)] underline-offset-2 hover:underline"
                >
                  View details
                </Link>
              ) : null}
            </article>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
