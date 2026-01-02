import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Quick ways to get in touch.",
};

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Contact</p>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Let’s connect</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Fastest response via email or LinkedIn. Always happy to talk about backend,
          search, or platform work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
            Email
          </p>
          <Link className="mt-3 block text-lg font-semibold text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </Link>
          <p className="mt-2 text-sm text-ink/70">{site.location}</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
            Links
          </p>
          <div className="mt-3 space-y-2 text-sm text-ink/70">
            <Link className="block hover:text-ink" href={site.links.linkedin}>
              LinkedIn
            </Link>
            <Link className="block hover:text-ink" href={site.links.github}>
              GitHub
            </Link>
            <Link className="block hover:text-ink" href={site.links.gitlab}>
              GitLab
            </Link>
            <Link className="block hover:text-ink" href="/resume">
              Resume PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
