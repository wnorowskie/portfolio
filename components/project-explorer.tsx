import ProjectCard from "@/components/project-card";
import { ProjectFrontmatter } from "@/lib/content";

type ProjectExplorerProps = {
  projects: ProjectFrontmatter[];
};

export default function ProjectExplorer({ projects }: ProjectExplorerProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
