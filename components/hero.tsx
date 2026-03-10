import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  const linkedin = profile.links.find((item) => item.label.toLowerCase().includes("linkedin"));
  const github = profile.links.find((item) => item.label.toLowerCase().includes("github"));

  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-[color:var(--color-border)] px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[1.2fr_0.8fr]">
        <MotionReveal className="wanted">
          <div className="poster-top">
            <div className="poster-tiny">WORLD GOVERNMENT MOST POWERFUL ENGINEER FILE</div>
            <h1 className="poster-title">Captain</h1>
            <div className="poster-role">The Pirate King of Software Engineering </div>
            <div className="bounty">Bounty: Elite Full-Stack Delivery + Production Reliability</div>
          </div>

          <div className="poster-portrait-wrap">
            <div
              className="poster-portrait"
              style={{ backgroundImage: "url('/assets/profile-photo.jpeg')" }}
            />
          </div>

          <div className="poster-quote">
            &quot;I ship hard problems to production, scale systems through rough seas, and turn product goals
            into legendary outcomes.&quot;
          </div>

          <p className="text-sm leading-7 text-[#2f1d0c]">{profile.summary}</p>

          <div className="stats-row">
            <div className="stat">
              <strong>30%</strong>
              <span>Faster API throughput</span>
            </div>
            <div className="stat">
              <strong>40%</strong>
              <span>Fewer failed deploys</span>
            </div>
            <div className="stat">
              <strong>Millions</strong>
              <span>Transactions navigated</span>
            </div>
          </div>
        </MotionReveal>

        <div className="grid gap-5">
          <MotionReveal delay={0.08} className="glass-card">
            <div className="card-title">Pirate Captain Profile</div>
            <div className="info-grid">
              <div className="info-row">
                <span>Name</span>
                <span>{profile.name}</span>
              </div>
              <div className="info-row">
                <span>Title</span>
                <span>{profile.title}</span>
              </div>
              <div className="info-row">
                <span>Home Port</span>
                <span>{profile.location}</span>
              </div>
              <div className="info-row">
                <span>Signal</span>
                <span>{profile.email}</span>
              </div>
              {profile.phone ? (
                <div className="info-row">
                  <span>Line</span>
                  <span>{profile.phone}</span>
                </div>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[linear-gradient(135deg,#b7862a,#f1d38a)] px-4 py-2 text-sm font-semibold text-[#241608]"
              >
                Hire the Captain
              </Link>
              {github ? (
                <Link
                  href={github.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-2 text-sm"
                >
                  GitHub
                </Link>
              ) : null}
              {linkedin ? (
                <Link
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-2 text-sm"
                >
                  LinkedIn
                </Link>
              ) : null}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.14} className="glass-card">
            <div className="card-title">Devil Fruit Level Capabilities</div>
            <p className="m-0 leading-8 text-[color:var(--color-muted)]">
              I dominate microservices, REST/SOAP/GraphQL APIs, multithreading, cloud delivery, and CI/CD
              workflows. Give me complex requirements and I return clean systems, speed, and measurable
              product impact.
            </p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
