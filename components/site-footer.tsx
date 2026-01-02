import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export default function SiteFooter() {
  const site = getSiteConfig();

  return (
    <footer className="border-t border-ink/10 bg-canvas/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-ink">{site.name}</p>
          <p>{site.title}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </Link>
          <Link className="hover:text-ink" href={site.links.linkedin}>
            LinkedIn
          </Link>
          <Link className="hover:text-ink" href={site.links.github}>
            GitHub
          </Link>
          <Link className="hover:text-ink" href={site.links.gitlab}>
            GitLab
          </Link>
        </div>
      </div>
    </footer>
  );
}
