# Eric Wnorowski Portfolio (“Living Resume”) — Product & Technical Specification

## 1) Overview

### 1.1 Vision

Create a minimalist, high-signal portfolio website that functions as a **living resume**: recruiters can skim in under a minute, and hiring managers can validate depth via project case studies and selected (sanitized) work experience writeups.

### 1.2 Target roles

- Backend Engineering
- Full Stack Engineering
- DevOps / Platform Engineering
- Search / Elasticsearch Engineering

### 1.3 Primary audiences

- **Recruiters:** fast scan → confirm fit → schedule screen
- **Hiring Managers / Engineers:** validate depth → architecture + tradeoffs → evidence (links, screenshots, diagrams)

---

## 2) Goals, Non-Goals, Success Metrics

### 2.1 Goals

1. **Skimmable first impression**: in <30 seconds, a visitor knows your domain focus (backend/search/platform) and your strongest proof points.
2. **Fast verification**: 2–5 minutes to validate:
   - real shipped projects (Family Recipe App, Soccer Data Pipeline, Student Service Center)
   - production mindset (IaC, observability, security, performance)
3. **Easy to maintain**: updating the site should feel like updating a resume entry—simple content edits, no UI rebuilds.

### 2.2 Non-goals

- Blog / long-form writing platform
- Complex backend, authentication, or user accounts
- Heavy animations or “portfolio gimmicks”
- Public disclosure of confidential employer IP

### 2.3 Success metrics (practical)

- Time-to-proof: user can reach a project deep dive within **2 clicks**
- Lighthouse: **Performance ≥ 95**, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Conversion: measurable via email link clicks / LinkedIn clicks (optional privacy-friendly analytics)

---

## 3) Core Product Requirements

### 3.1 Site map (v1)

1. **Home** (`/`)
2. **Projects** (`/projects`)
3. **Project detail** (`/projects/[slug]`)
4. **Experience** (`/experience`)
5. **Resume** (`/resume`) (embedded PDF + download)
6. **Contact** (`/contact`) (links only; optional minimal form if on Vercel)

### 3.2 Primary navigation

- Home
- Projects
- Experience
- Resume
- Contact

### 3.3 Content focus (must be crystal clear)

Featured projects:

- **Family Recipe App**
- **Soccer Data Pipeline**
- **Student Service Center**

Experience:

- ConstructConnect roles summarized with sanitized, outcomes-focused bullets.

---

## 4) UX / UI Specification

### 4.1 Design principles

- **Minimal/clean** (white space, restrained typography, subtle borders)
- **High signal density** without feeling crowded
- **Mobile-first** but optimized for desktop (where most recruiting happens)
- **Neutral tones** based on the "Arctic Reflection" palette (https://www.figma.com/color-palettes/arctic-reflection/)
- **Typography**: Display font "Fraunces", body font "Sora"

### 4.2 Home page layout

- Header: Name + short title line (e.g., “Software Engineer — Backend / Search / Platform”)
- 1–2 sentence summary + key tech keywords (Elasticsearch, .NET, GCP, Terraform, Next.js)
- Portfolio photo/headshot included in the hero area
- “Featured Projects” section (3 cards)
- “Core strengths” section (3–5 bullets)
- Quick links: GitHub, LinkedIn, Email, Resume

### 4.3 Projects page

- Filterable project grid:
  - Filters: `Backend`, `Full Stack`, `DevOps`, `Search`, `GCP`, `Terraform`, `Python`, `C#`, `Next.js`
- Each project card includes:
  - Title
  - 1-line impact statement
  - Tags
  - Links (Demo, GitHub/GitLab, Case Study)

### 4.4 Project detail page (“verify mode”)

Use a consistent deep-dive template (see §6.3).

Required sections:

- Summary (what it is, why it matters)
- Problem / Motivation
- Architecture (diagram or structured bullets)
- Key technical decisions + tradeoffs
- Reliability / performance / security notes (as relevant)
- What you’d improve next
- Evidence: screenshots, repo link(s), demo link, notable commits (optional)

### 4.5 Experience page

- Timeline / grouped by company
- For each role:
  - 2–4 bullet highlights (sanitized)
  - “What I owned” (systems, tooling, reliability, devops)
  - “Tech stack” tags
  - Optional expandable “Details” area (keep short)

### 4.6 Resume page

- Embedded PDF viewer
- Clear “Download PDF” button
- Optionally: “ATS text version” (plain HTML) for accessibility + SEO

### 4.7 Accessibility requirements

- Semantic headings
- Keyboard navigation
- High contrast
- Alt text for images/diagrams
- Avoid text in images for key information

---

## 5) Technical Specification

### 5.1 Tech stack

**Frontend**

- Next.js (App Router) + TypeScript
- TailwindCSS + shadcn/ui (minimal components)
- MDX for content-driven pages (project deep dives, experience details)
- Optional: `next-sitemap` for sitemap generation
- Package manager: npm

**Content**

- Local, repo-based content:
  - `/content/projects/*.mdx`
  - `/content/experience/*.mdx`
  - `/content/site.json` (global config)
- Images in `/public/images/...`

**Hosting options**

- **Vercel**
  - Easiest deploy, great performance, preview deployments for PRs
  - Allows optional serverless routes (e.g., simple contact form, GitHub API caching)

### 5.2 Architectural stance: “Static-first”

The site should be fully functional as static pages:

- Projects and experience are generated at build time from MDX/JSON.
- No database.
- No authentication.
- Optional analytics can be client-side.

This keeps costs effectively zero and removes maintenance overhead.

### 5.3 Rendering strategy

- Static generation for all routes:
  - `/projects/[slug]` generated from MDX collection
  - `/experience` from MDX collection
  - `/resume` static PDF embed

### 5.4 Data model (content schema)

#### Project MDX frontmatter (required)

```yaml
---
slug: family-recipe-app
title: Family Recipe App
date: 2025-12-01
featured: true
category: full-stack
tags:
  - Next.js
  - React
  - Python
  - Postgres
  - Terraform
  - GCP
links:
  repo: "https://github.com/..."
  demo: "https://..."
  writeup: "/projects/family-recipe-app"
hero:
  summary: "Full-stack production-grade recipe sharing app with IaC, observability, and secure deployment."
  impactBullets:
    - "Shipped end-to-end app used by family"
    - "Infra-as-code + CI/CD + monitoring"
images:
  - "/images/projects/family-recipe-app/hero.png"
---
```

#### Experience MDX frontmatter (required)

```yaml
---
company: ConstructConnect
location: "Remote"
role: "Software Engineer"
team: "Modernized Search"
start: 2022-05-01
end: null
tags:
  - C#
  - .NET
  - Elasticsearch
  - GCP
  - Cloud Run
  - Terraform
highlights:
  - "High-performance Elasticsearch-powered API (sanitized)"
  - "Data ingestion pipelines (Python/C#/Logstash)"
  - "DevOps ownership: reliability, performance, security"
confidentialityNote: "Details sanitized; architecture and tradeoffs described at a high level."
---
```

### 5.5 Repo Structure

```
portfolio/
  app/
     (routes...)
  components/
  content/
     projects/
     experience/
     site.json
  lib/
     content.ts        # loaders/parsers for MDX
     tags.ts           # tag normalization + filters
  public/
     images/
        portrait.jpeg
     resume/
        Eric_Wnorowski_Resume_2025.pdf
  next.config.js
  package.json
```

### 5.6 Content Pipeline

Use a small loader in `lib/content.ts` to:

- Read MDX files
- Parse frontmatter via `gray-matter`
- Render MDX via `next-mdx-remote`
- Validate required fields (runtime validation)
- Compute derived values (reading time optional, tag counts, featured list)

**Validation requirement:** Fail the build if required frontmatter fields are missing.

### 5.7 Performance requirements

- Use `next/image` for images
- Avoid heavy libraries (no big animation libs)
- Keep page JS minimal; prefer server components where applicable (while still static-export compatible)
- Target < 200KB JS for initial load if possible

### 5.8 SEO requirements

- Unique `<title>` + meta description per page
- Open Graph/Twitter cards
- JSON-LD:
  - Person schema on Home
  - CreativeWork on project pages
- Sitemap + robots.txt
- Clean canonical URLs

### 5.9 Security / privacy

- No tracking by default; if analytics are used, prefer privacy-friendly solutions
- No third-party form handlers unless needed
- If Vercel contact form is used:
  - Rate limit (basic)
  - Bot protection (honeypot)
  - Email delivery via provider (optional; can also just use `mailto:` to keep zero infra)

---

## 6) Detailed Page Specifications

### 6.1 Home (`/`)

**Components**

- Hero (title, short summary)
- Featured projects (3 cards)
- Strengths (bullets + tech chips)
- Footer (links)

**Acceptance criteria**

- Featured projects visible without scrolling on desktop
- One click to a project deep dive

### 6.2 Projects (`/projects`)

**Components**

- Filter bar (multi-select tags)
- Search (client-side fuzzy optional; can be exact substring)
- Project grid

**Acceptance criteria**

- Filters update instantly (no reload)
- Projects can be grouped by category or featured at top

  6.3 Project detail (/projects/[slug])

Deep-dive template

Summary

Problem / Motivation

Architecture

Key decisions + tradeoffs

Reliability / performance / security

Results / impact

Next improvements

Links + screenshots

Acceptance criteria

Each deep dive contains at least one “tradeoff” section

Each includes at least one evidence item (repo, demo, screenshot, diagram)

### 6.4 Experience (`/experience`)

**Components**

- Timeline list
- Each role card expandable/collapsible
- "Confidentiality note" for private work

**Acceptance criteria**

- No confidential details
- Clear mapping to target roles (backend/search/platform)

### 6.5 Resume (`/resume`)

**Components**

- PDF embed + download button
- Optional "ATS view" section (plain HTML text version for accessibility + SEO)

**Acceptance criteria**

- PDF loads quickly and is mobile-friendly
- Download link works

### 6.6 Contact (`/contact`)

**Components**

- Direct links only (email, LinkedIn, GitHub)

**Acceptance criteria**

- Zero friction to contact

---

## 7) Deployment & CI/CD

### 7.1 Vercel deployment (recommended)

- Connect GitHub repo
- Preview deployments on PRs
- Production deploy on merge to main

---

## 8) Content Authoring Workflow

### 8.1 Adding a project

- Create `content/projects/<slug>.mdx`
- Add images to `public/images/projects/<slug>/`
- Confirm frontmatter validation passes
- Ensure it is tagged properly for filters

### 8.2 Updating experience

- Update `content/experience/*.mdx`
- Keep bullets outcome-focused and sanitized

---

## 9) MVP Plan (build order)

### Phase 1 — MVP (1–2 sessions)

- Next.js + Tailwind skeleton
- Site shell + navigation
- Content loader + frontmatter validation
- Home + Projects + Project Detail pages
- Resume page (PDF)
- Deploy (Vercel)

### Phase 2 — Polish (1 session)

- Experience page
- Tag filtering + search
- SEO metadata + OG images
- Accessibility pass

### Phase 3 — Optional enhancements

- "Evidence" sections (diagrams) for each project
- JSON-LD structured data
- Privacy-friendly analytics

---

## 10) Risks & Mitigations

### 10.1 Confidential work details

**Risk:** accidental disclosure of proprietary specifics.

**Mitigation:** enforce a "sanitized writeup" format:

- Describe architecture patterns and decisions at a high level
- Avoid identifiers, internal names, customer data, exact index names, etc.

### 10.2 Maintenance drift

**Risk:** site becomes outdated.

**Mitigation:** content-as-data approach + short update checklist.

- Updating a project = editing a single MDX file
- Featured projects limited to 3 to keep quality high

---

## 11) Acceptance Checklist (Definition of Done)

- All pages present and linked in nav
- Featured projects are:
  - Family Recipe App
  - Soccer Data Pipeline
  - Student Service Center
- Each featured project has a deep-dive page with:
  - Architecture section
  - Tradeoffs section
  - Evidence (repo/demo/screenshot)
- Lighthouse scores ≥ 95 across the board
- Deployed to Vercel with HTTPS
- No confidential details included
