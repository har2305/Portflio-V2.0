import { MotionReveal } from "@/components/motion-reveal";
import type { Experience } from "@/lib/types";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <ol className="relative space-y-6 border-l border-[color:var(--color-border)] pl-6">
      {experiences.map((experience, index) => (
        <MotionReveal key={`${experience.company}-${experience.role}`} delay={index * 0.08}>
          <li className="relative card p-6">
            <span className="absolute -left-[34px] top-8 h-3 w-3 rounded-full bg-[color:var(--color-accent)]" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {experience.startDate} - {experience.endDate}
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              {experience.role}{" "}
              <span className="text-[color:var(--color-muted)]">@ {experience.company}</span>
            </h3>
            {experience.location ? (
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">{experience.location}</p>
            ) : null}
            <ul className="mt-4 space-y-2 text-[color:var(--color-muted)]">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>- {highlight}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[color:var(--color-border)] px-2 py-1 text-xs text-[color:var(--color-muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </li>
        </MotionReveal>
      ))}
    </ol>
  );
}
