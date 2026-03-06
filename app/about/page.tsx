import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { portfolioData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: "Background, education, and professional focus.",
};

export default function AboutPage() {
  const { profile, education } = portfolioData;

  return (
    <section className="section space-y-10">
      <SectionHeading
        eyebrow="About"
        title={`Hi, I'm ${profile.name}`}
        subtitle="I enjoy shipping products that are reliable, fast, and deeply usable."
      />

      <div className="grid gap-8 md:grid-cols-3">
        <article className="card p-6 md:col-span-2">
          <h3 className="text-xl font-semibold">Professional summary</h3>
          <p className="mt-4 leading-relaxed text-[color:var(--color-muted)]">{profile.summary}</p>
          <p className="mt-4 leading-relaxed text-[color:var(--color-muted)]">
            My approach combines product thinking, engineering rigor, and practical delivery. I prioritize
            clear communication, maintainable architecture, and measurable outcomes.
          </p>
        </article>

        <aside className="card p-6">
          <h3 className="text-xl font-semibold">Education</h3>
          <div className="mt-4 space-y-4">
            {education.map((item) => (
              <div key={`${item.school}-${item.degree}`}>
                <p className="font-medium">{item.degree}</p>
                <p className="text-sm text-[color:var(--color-muted)]">{item.school}</p>
                <p className="text-xs text-[color:var(--color-muted)]">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
