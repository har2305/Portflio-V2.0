import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(75,232,175,0.28),_transparent_40%),radial-gradient(circle_at_20%_25%,_rgba(255,105,61,0.34),_transparent_38%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
        <MotionReveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
            Software Engineer
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            {profile.name} builds clean, resilient web products with measurable impact.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-muted)]">
            {profile.summary}
          </p>
        </MotionReveal>
        <MotionReveal delay={0.1} className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-medium text-black transition hover:translate-y-[-1px]"
          >
            Explore projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[color:var(--color-border)] px-6 py-3 font-medium transition hover:bg-white/10"
          >
            Contact me
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
