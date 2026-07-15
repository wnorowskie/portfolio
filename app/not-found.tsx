import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">404</p>
      <h1 className="font-display text-3xl text-ink md:text-4xl">Page not found</h1>
      <p className="max-w-md text-base text-ink/70">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
        <Link
          className="rounded-full bg-ink px-5 py-3 text-white transition hover:bg-ink-strong"
          href="/"
        >
          Back to home
        </Link>
        <Link
          className="rounded-full border border-ink/20 px-5 py-3 text-ink transition hover:border-ink/50"
          href="/projects"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
