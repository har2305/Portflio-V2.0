import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { portfolioData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about engineering opportunities.",
};

export default function ContactPage() {
  const { profile, contact } = portfolioData;

  return (
    <section className="section space-y-10">
      <SectionHeading eyebrow="Contact" title={contact.heading} subtitle={contact.description} />
      <div className="grid gap-8 md:grid-cols-2">
        <ContactForm />
        <aside className="card p-6">
          <h3 className="text-xl font-semibold">Reach me directly</h3>
          <p className="mt-4 text-[color:var(--color-muted)]">Email: {profile.email}</p>
          <div className="mt-4 space-y-2">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="block text-[color:var(--color-accent)] underline-offset-2 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
