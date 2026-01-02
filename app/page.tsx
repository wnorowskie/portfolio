import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";

export default function Home() {
  const site = getSiteConfig();
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {site.name}
          </h1>
          <p className="text-lg text-ink/70">{site.title}</p>
          <p className="max-w-xl text-base leading-7 text-ink/70">
            {site.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {site.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-ink/15 bg-fog px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/70"
              >
                {keyword}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              className="rounded-full bg-ink px-5 py-3 text-white transition hover:bg-ink-strong"
              href="/projects"
            >
              View projects
            </Link>
            <Link
              className="rounded-full border border-ink/20 px-5 py-3 text-ink transition hover:border-ink/50"
              href="/resume"
            >
              Resume PDF
            </Link>
            <Link
              className="rounded-full border border-ink/20 px-5 py-3 text-ink transition hover:border-ink/50"
              href={`mailto:${site.email}`}
            >
              Email me
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-48 w-48 rounded-full bg-ice/40 blur-2xl" />
          <div className="absolute -right-10 bottom-6 h-56 w-56 rounded-full bg-mist/40 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white/80 p-4 shadow-lg">
            <Image
              src={site.headshot}
              alt={`${site.name} portrait`}
              width={520}
              height={620}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Featured projects</h2>
          <Link className="text-sm font-semibold text-ink/70 hover:text-ink" href="/projects">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-ink">Core strengths</h2>
          <ul className="space-y-3 text-sm text-ink/70">
            <li>Backend APIs with measurable performance wins</li>
            <li>Search and data pipeline engineering with Elasticsearch</li>
            <li>Infrastructure-as-code and production reliability ownership</li>
            <li>Practical full-stack delivery with modern React/Next.js</li>
            <li>Machine learning and AI integration</li>
            <li>Quality engineering and test automation</li>
            <li>Cross-functional collaboration and leadership</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
            Quick links
          </p>
          <div className="mt-4 space-y-2 text-sm text-ink/70">
            <Link className="block hover:text-ink" href={site.links.github}>
              GitHub
            </Link>
            <Link className="block hover:text-ink" href={site.links.gitlab}>
              GitLab
            </Link>
            <Link className="block hover:text-ink" href={site.links.linkedin}>
              LinkedIn
            </Link>
            <Link className="block hover:text-ink" href="/experience">
              Experience timeline
            </Link>
            <Link className="block hover:text-ink" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
