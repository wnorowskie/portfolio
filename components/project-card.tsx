import Link from "next/link";
import Tag from "@/components/tag";
import { ProjectFrontmatter } from "@/lib/content";

type ProjectCardProps = {
  project: ProjectFrontmatter;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.date).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  const detailHref = project.links.writeup || `/projects/${project.slug}`;
  const impactHighlights = project.hero.impactBullets.slice(0, 2);

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-sm transition hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
          <span>{project.category}</span>
          <span>{formattedDate}</span>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-ink">{project.title}</h3>
          <p className="text-base text-ink/70">{project.hero.summary}</p>
        </div>
      </div>
      {impactHighlights.length > 0 ? (
        <ul className="space-y-2 text-sm text-ink/70">
          {impactHighlights.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-semibold text-ink/70">
        <Link className="hover:text-ink" href={detailHref}>
          View case study
        </Link>
        {project.links.demo ? (
          <Link className="hover:text-ink" href={project.links.demo}>
            Live demo
          </Link>
        ) : null}
        {project.links.repo ? (
          <Link className="hover:text-ink" href={project.links.repo}>
            Repo
          </Link>
        ) : null}
      </div>
    </div>
  );
}
