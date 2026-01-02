import type { Metadata } from "next";
import ExperienceCard from "@/components/experience-card";
import { getAllExperience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and ownership areas.",
};

export default async function ExperiencePage() {
  const experience = await getAllExperience();

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
      <div className="space-y-6">
        {experience.map((entry) => (
          <ExperienceCard key={`${entry.frontmatter.company}-${entry.frontmatter.role}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}
