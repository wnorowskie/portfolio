import type { Metadata } from "next";
import ProjectExplorer from "@/components/project-explorer";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected backend, full-stack, and platform engineering projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Projects
        </p>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Project archive</h1>
        <p className="max-w-2xl text-base text-ink/70">
          A quick scan of personal projects I have shipped, from web applications to data
          pipelines. Each card highlights the scope, stack, and outcomes.
        </p>
      </div>
      <ProjectExplorer projects={projects} />
    </div>
  );
}
