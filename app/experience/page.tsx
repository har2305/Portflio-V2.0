import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SectionHeading } from "@/components/section-heading";
import { portfolioData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and impact highlights.",
};

export default function ExperiencePage() {
  return (
    <section className="section space-y-10">
      <SectionHeading
        eyebrow="Experience"
        title="Work history"
        subtitle="A concise timeline focused on outcomes, ownership, and technical scope."
      />
      <ExperienceTimeline experiences={portfolioData.experiences} />
    </section>
  );
}
