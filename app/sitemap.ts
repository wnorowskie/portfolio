import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();

  const staticRoutes = ["/", "/projects", "/experience", "/resume", "/contact"].map(
    (route) => ({
      url: `${site.url}${route === "/" ? "" : route}`,
    })
  );

  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${site.url}/projects/${slug}`,
  }));

  return [...staticRoutes, ...projectRoutes];
}
