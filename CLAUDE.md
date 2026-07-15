# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A minimalist personal portfolio / "living resume" site for Eric Wnorowski (Next.js App Router + TypeScript + Tailwind v4). Static-first: all content is generated at build time from local MDX/JSON, no database, no auth. Full product spec lives in [SPEC.md](SPEC.md) — read it for page requirements, content schema rationale, and design intent before making structural changes.

## Commands

```bash
npm run dev      # start dev server (webpack, not turbopack)
npm run build    # production build (webpack) — also runs frontmatter validation, will fail the build on invalid content
npm start        # serve the production build
npm run lint     # eslint (eslint-config-next core-web-vitals + typescript)
```

There is no test suite configured. Package manager is npm (see `package-lock.json`); don't introduce yarn/pnpm lockfiles.

## Architecture

**Content-as-data pipeline.** Projects and experience entries are MDX files with required frontmatter, not hardcoded in components:

- `content/projects/*.mdx` — one file per project, filename must equal `slug` in frontmatter
- `content/experience/*.mdx` — one file per role
- `content/site.json` — global site config (name, summary, nav, keywords, social links) loaded via `getSiteConfig()` in [lib/site.ts](lib/site.ts)
- `lib/content.ts` is the single loader/parser module: reads files with `fs`, parses frontmatter with `gray-matter`, compiles MDX bodies with `next-mdx-remote/rsc`'s `compileMDX`, and **throws at build time** if required frontmatter fields are missing (`validateProject` / `validateExperience`). When adding fields to the content schema, update the corresponding type and validator together, and update SPEC.md §5.4's documented frontmatter shape.
- Both `lib/content.ts` and `lib/site.ts` are marked `"server-only"` — they use Node `fs` and must never be imported from client components.
- Pages call `getAllProjects()` / `getFeaturedProjects()` / `getProjectBySlug()` / `getAllExperience()` directly as server components (App Router, no client-side fetching for content).

**Routing** (`app/`): `/` (home), `/projects` (filterable grid via [components/project-explorer.tsx](components/project-explorer.tsx), the one client component that does tag filtering), `/projects/[slug]` (deep-dive using `generateStaticParams` off `getAllProjectSlugs()`), `/experience`, `/resume` (static PDF embed), `/contact`.

**Styling**: Tailwind v4 with the theme defined inline in [app/globals.css](app/globals.css) via `@theme inline` (custom color tokens: `canvas`, `fog`, `mist`, `ice`, `ink`, `ink-strong`, `accent` — "Arctic Reflection" palette). Fonts are `next/font/google`: Fraunces (`--font-fraunces`, display/headings) and Sora (`--font-sora`, body), wired up in [app/layout.tsx](app/layout.tsx). MDX body content renders inside a `.rich` wrapper class (see `@layer components` in globals.css) that styles headings/paragraphs/lists/links for prose — style MDX output there, not per-component.

**Path alias**: `@/*` maps to repo root (see [tsconfig.json](tsconfig.json)), e.g. `@/lib/content`, `@/components/tag`.

## Content authoring conventions (from SPEC.md)

- Featured projects are capped at 3 (Family Recipe App, Soccer Data Pipeline, Student Service Center) — keep it that way to preserve signal density.
- Experience writeups must be sanitized: no confidential employer specifics, internal names, or customer data — describe architecture/decisions at a high level only.
- Every project deep-dive should include a tradeoffs discussion and at least one evidence item (repo/demo/screenshot).
- Images referenced from frontmatter live under `public/images/...` and are rendered with `next/image`.
