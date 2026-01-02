import "server-only";
import fs from "fs";
import path from "path";

export type SiteLink = {
  github: string;
  linkedin: string;
  resume: string;
  gitlab: string;
};

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  headshot: string;
  links: SiteLink;
  keywords: string[];
  nav: SiteNavItem[];
};

const SITE_PATH = path.join(process.cwd(), "content", "site.json");

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(SITE_PATH, "utf8");
  const parsed = JSON.parse(raw) as SiteConfig;

  if (!parsed.name || !parsed.title || !parsed.email) {
    throw new Error("Site config is missing required fields.");
  }

  return parsed;
}
