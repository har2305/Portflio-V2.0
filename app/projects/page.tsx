import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { portfolioData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and technical outcomes.",
};

export default function ProjectsPage() {
  return (
    <section className="section space-y-10">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="Filter by technology to quickly review implementation depth and scope."
      />
      <ProjectGrid projects={portfolioData.projects} />
    </section>
  );
}
