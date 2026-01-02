import { ProjectFrontmatter } from "@/lib/content";

export function normalizeTag(tag: string) {
  return tag.trim();
}

export function getProjectTags(projects: ProjectFrontmatter[]) {
  const tagSet = new Set<string>();

  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(normalizeTag(tag)));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}
