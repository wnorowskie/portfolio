import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/tag";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.hero.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Link className="text-sm font-semibold text-ink/60 hover:text-ink" href="/projects">
          ← Back to projects
        </Link>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
            {project.frontmatter.category}
          </p>
          <h1 className="font-display text-3xl text-ink md:text-4xl">
            {project.frontmatter.title}
          </h1>
          <p className="max-w-2xl text-base text-ink/70">{project.frontmatter.hero.summary}</p>
        </div>
        {project.frontmatter.hero.impactBullets.length > 0 ? (
          <ul className="space-y-2 text-sm text-ink/70">
            {project.frontmatter.hero.impactBullets.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {project.frontmatter.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-ink/70">
          {project.frontmatter.links.repo ? (
            <Link className="hover:text-ink" href={project.frontmatter.links.repo}>
              Repository
            </Link>
          ) : null}
          {project.frontmatter.links.demo ? (
            <Link className="hover:text-ink" href={project.frontmatter.links.demo}>
              Live demo
            </Link>
          ) : null}
        </div>
      </section>

      {project.frontmatter.images.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2">
          {project.frontmatter.images.map((image) => (
            <div key={image} className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
              <Image
                src={image}
                alt={`${project.frontmatter.title} screenshot`}
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}

      <section className="rich space-y-6 rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
        {project.content}
      </section>
    </div>
  );
}
