"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/project-card";
import { ProjectFrontmatter } from "@/lib/content";
import { getProjectTags } from "@/lib/tags";

type ProjectExplorerProps = {
  projects: ProjectFrontmatter[];
};

export default function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const allTags = useMemo(() => getProjectTags(projects), [projects]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  function toggleTag(tag: string) {
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  }

  function clearFilters() {
    setActiveTags([]);
    setQuery("");
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return projects.filter((project) => {
      // Every selected tag must be present (multi-select AND).
      const matchesTags = activeTags.every((tag) => project.tags.includes(tag));

      if (!needle) {
        return matchesTags;
      }

      const haystack = [
        project.title,
        project.category,
        project.hero.summary,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesTags && haystack.includes(needle);
    });
  }, [projects, activeTags, query]);

  const hasFilters = activeTags.length > 0 || query.trim().length > 0;

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects by name, stack, or keyword"
            className="w-full max-w-md rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-sm text-ink placeholder:text-ink/40 shadow-sm transition focus:border-ink/40 focus:outline-none"
          />
        </div>

        {allTags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((tag) => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition ${
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 bg-fog text-ink/70 hover:border-ink/40"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink/50 underline-offset-4 transition hover:text-ink hover:underline"
              >
                Clear
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-ink/10 bg-white/70 p-10 text-center text-sm text-ink/60">
          No projects match those filters.
        </div>
      )}
    </div>
  );
}
