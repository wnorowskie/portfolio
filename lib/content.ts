import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export type ProjectLinks = {
  repo?: string;
  demo?: string;
  writeup?: string;
};

export type ProjectHero = {
  summary: string;
  impactBullets: string[];
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  date: string;
  featured: boolean;
  category: string;
  tags: string[];
  links: ProjectLinks;
  hero: ProjectHero;
  images: string[];
};

export type ProjectContent = {
  frontmatter: ProjectFrontmatter;
  content: React.ReactNode;
};

export type ExperienceFrontmatter = {
  company: string;
  location: string;
  role: string;
  team?: string;
  start: string;
  end: string | null;
  tags: string[];
  highlights: string[];
  confidentialityNote?: string;
};

export type ExperienceEntry = {
  frontmatter: ExperienceFrontmatter;
  content: React.ReactNode;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const EXPERIENCE_DIR = path.join(process.cwd(), "content", "experience");

function getMdxFiles(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));
}

function validateProject(frontmatter: Partial<ProjectFrontmatter>, filePath: string) {
  const required = [
    "slug",
    "title",
    "date",
    "featured",
    "category",
    "tags",
    "links",
    "hero",
  ];

  const missing = required.filter((field) => frontmatter[field as keyof ProjectFrontmatter] === undefined);
  if (missing.length > 0) {
    throw new Error(`Project frontmatter missing fields: ${missing.join(", ")} (${filePath})`);
  }

  if (!Array.isArray(frontmatter.tags)) {
    throw new Error(`Project tags must be an array (${filePath})`);
  }

  if (!frontmatter.hero || typeof frontmatter.hero.summary !== "string") {
    throw new Error(`Project hero.summary is required (${filePath})`);
  }

  if (!Array.isArray(frontmatter.hero.impactBullets)) {
    throw new Error(`Project hero.impactBullets must be an array (${filePath})`);
  }
}

function validateExperience(frontmatter: Partial<ExperienceFrontmatter>, filePath: string) {
  const required = ["company", "location", "role", "start", "tags", "highlights"];
  const missing = required.filter(
    (field) => frontmatter[field as keyof ExperienceFrontmatter] === undefined
  );

  if (missing.length > 0) {
    throw new Error(`Experience frontmatter missing fields: ${missing.join(", ")} (${filePath})`);
  }

  if (!Array.isArray(frontmatter.tags)) {
    throw new Error(`Experience tags must be an array (${filePath})`);
  }

  if (!Array.isArray(frontmatter.highlights)) {
    throw new Error(`Experience highlights must be an array (${filePath})`);
  }
}

export function getAllProjects(): ProjectFrontmatter[] {
  const files = getMdxFiles(PROJECTS_DIR);

  const projects = files.map((file) => {
    const filePath = path.join(PROJECTS_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    const frontmatter = data as ProjectFrontmatter;

    validateProject(frontmatter, filePath);

    const expectedSlug = file.replace(/\.mdx$/, "");
    if (frontmatter.slug !== expectedSlug) {
      throw new Error(`Project slug does not match filename (${filePath})`);
    }

    return frontmatter;
  });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedProjects(): ProjectFrontmatter[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllProjectSlugs() {
  return getAllProjects().map((project) => project.slug);
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  validateProject(frontmatter, filePath);

  return {
    frontmatter,
    content,
  };
}

export async function getAllExperience(): Promise<ExperienceEntry[]> {
  const files = getMdxFiles(EXPERIENCE_DIR);
  const entries = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(EXPERIENCE_DIR, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { content, frontmatter } = await compileMDX<ExperienceFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      validateExperience(frontmatter, filePath);

      return {
        frontmatter,
        content,
      };
    })
  );

  return entries.sort(
    (a, b) => new Date(b.frontmatter.start).getTime() - new Date(a.frontmatter.start).getTime()
  );
}
