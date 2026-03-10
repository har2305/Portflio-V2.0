import { MotionReveal } from "@/components/motion-reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <MotionReveal>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-2)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold uppercase tracking-[0.06em] md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl leading-7 text-[color:var(--color-muted)]">{subtitle}</p>
      ) : null}
    </MotionReveal>
  );
}
