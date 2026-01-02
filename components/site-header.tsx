import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

export default function SiteHeader() {
  const site = getSiteConfig();

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <Link className="text-lg font-semibold tracking-tight text-ink" href="/">
              {site.name}
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-ink/60">
              {site.title}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 md:text-sm md:tracking-normal">
            <nav className="flex flex-wrap items-center gap-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  className="transition-colors hover:text-ink"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 md:text-sm"
              href={site.links.resume}
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
