import type { Metadata } from "next";
import ExperienceCard from "@/components/experience-card";
import { getAllExperience } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and ownership areas.",
};

export default async function ExperiencePage() {
  const experience = await getAllExperience();
  const { education } = getSiteConfig();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Experience
        </p>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Career highlights</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Roles focused on backend APIs, search relevance, data pipelines, web applications,
          machine learning, AI, quality engineering, and production reliability.
        </p>
      </div>
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-ink">Roles</h2>
        <div className="space-y-6">
          {experience.map((entry) => (
            <ExperienceCard key={`${entry.frontmatter.company}-${entry.frontmatter.role}`} entry={entry} />
          ))}
        </div>
      </section>

      {education.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-display text-2xl text-ink">Education</h2>
          <div className="space-y-6">
            {education.map((school) => (
              <div
                key={`${school.school}-${school.degree}`}
                className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{school.school}</h3>
                    <p className="text-sm text-ink/70">{school.degree}</p>
                  </div>
                  <p className="text-sm text-ink/60">{school.location}</p>
                </div>
                {school.detail ? (
                  <p className="mt-4 text-xs text-ink/50">{school.detail}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
