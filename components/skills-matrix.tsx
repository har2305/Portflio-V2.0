import { MotionReveal } from "@/components/motion-reveal";
import type { SkillGroup } from "@/lib/types";

export function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {skillGroups.map((group, index) => (
        <MotionReveal key={group.title} delay={index * 0.08} className="card p-6">
          <h3 className="text-lg font-semibold">{group.title}</h3>
          <ul className="mt-4 space-y-2 text-[color:var(--color-muted)]">
            {group.skills.map((skill) => (
              <li key={skill}>- {skill}</li>
            ))}
          </ul>
        </MotionReveal>
      ))}
    </div>
  );
}
