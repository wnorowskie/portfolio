# Portfolio Backlog

Gaps found by auditing the codebase against [SPEC.md](SPEC.md), the 2026 resume
(`Eric Wnorowski Resume 2026.pdf` / `.docx`), and the acceptance checklist (SPEC §11).
Ordered by priority.

## P0 — Broken today

- [x] **Ship the 2026 resume PDF and fix the path.** [app/resume/page.tsx](app/resume/page.tsx#L9)
  embeds `/resume/Eric_Wnorowski_Resume_2025.pdf`, but the file on disk is
  `public/resume/Eric Wnorowski Resume 2025.pdf` (spaces, no underscores), so the inline
  viewer and Download button both 404. Fix both at once: move the new
  `Eric Wnorowski Resume 2026.pdf` (currently at repo root) to
  `public/resume/Eric_Wnorowski_Resume_2026.pdf`, update `resumePath`, and delete the
  stale 2025 PDF.
- [x] **Implement tag filtering + search on `/projects`.**
  [components/project-explorer.tsx](components/project-explorer.tsx) is currently a plain
  grid — no filter bar, no search, not even a client component. SPEC §4.3/§6.2 requires
  multi-select tag filters that update instantly. `lib/tags.ts` (`getProjectTags`) already
  exists and is unused. CLAUDE.md also describes this component as already doing filtering,
  so implementing it fixes doc drift too.

## P1 — Missing content (the "all of my information" gaps)

- [x] **Add the Software Engineer II promotion.** The 2026 resume's latest role is SWE II,
  but the site's most recent entry ([content/experience/constructconnect-swe.mdx](content/experience/constructconnect-swe.mdx))
  is still "Software Engineer I". Add a new SWE II entry (Elasticsearch API for 75,000+
  customers, ingestion pipelines, DevOps/Terraform ownership) and rescope the SWE I entry
  to the Modernized Search bullets it now carries on the resume (document viewer with
  1000+ page docs loading < 1s, Quality Engineering partnership on automation and
  performance tests).
- [x] **Add an Education section.** The resume lists an MS from College of Charleston
  (GPA 3.9, Software Engineering) and a BA from Vassar College (CS + Economics minor,
  GPA 3.7) — none of it appears anywhere on the site. Decide placement (home page section,
  experience page, or a small block driven from `site.json` / a new content type) and
  update SPEC §5.4 + validators if a schema is added.
- [x] **Add the "DevX AI Enablement" project.** On the 2026 resume (formerly "AI
  Multi-Agentic Autonomous Coder" on the 2025 draft) but has no `content/projects/*.mdx`
  file: AI Center of Excellence membership, Claude Code agents/skills/hooks across the
  SDLC, and an agentic workflow from JIRA ticket → code changes → docs → merge request →
  test plan. It's employer-adjacent, so write it sanitized per the confidentiality rules.
  Set `featured: false` to preserve the 3-featured cap.
- [x] **Add evidence images for Family Recipe App.** Done (2026-07-15): five screenshots
  (timeline, search, profile, add-recipe ×2) in `public/images/projects/family-recipe-app/`,
  wired into the project frontmatter.
- [x] **Add evidence images for Student Service Center.** Done (2026-07-15): nine
  screenshots (home, map, meals, meal plan, checkout, parking, tickets, ID profile, login)
  in `public/images/projects/student-service-center/`, wired into the project frontmatter.
- [x] **Turn the Evidence sections into real links.** All three project MDX bodies list
  evidence as plain text ("GitHub Repo", "Pipeline diagram and repo link") instead of
  actual markdown links. Link them or render evidence from frontmatter.
- [ ] **Add project walkthrough videos.** Decision (2026-07-15): instead of live demo
  links, Eric will record walkthrough videos of the apps. Needs: recordings, a hosting
  choice (YouTube unlisted vs. self-hosted in `public/`), and embedding on the project
  detail pages (likely a `video` field in frontmatter + player on the deep-dive page).
  Until then the "Demo coming soon" placeholders stay.
- [x] **Write the ATS text version of the resume.** Done (2026-07-15): plain-HTML version
  of the 2026 resume (experience, education, projects) replaces the placeholder box on
  `/resume`.
- [x] **Add `confidentialityNote` to the experience entries.** The schema and
  [components/experience-card.tsx](components/experience-card.tsx#L42-L44) support it, and
  SPEC §6.4 calls for a visible confidentiality note, but none of the three
  `content/experience/*.mdx` files set it.
- [x] **Resolve the experience timeline gap.** Resolved (2026-07-15): the Aug 2022 →
  Apr 2024 gap was senior year at Vassar plus the start of the Masters program — the
  Education section on `/experience` now accounts for it, so no site change needed.
- [x] **Verify the Soccer Data Pipeline repo URL.** Verified (2026-07-15):
  `https://gitlab.com/data-pipeline5324322` returns 200 for a logged-out visitor
  (public "Data Pipeline" GitLab group).

## P2 — SEO & metadata (SPEC §5.8, all currently missing)

- [x] **Add the production URL + `metadataBase`.** The 2026 resume header names the domain:
  `eric-wnorowski-portfolio.app`. Add it as a `url` field in `site.json` and wire it into
  `metadataBase` — needed for canonicals, OG tags, and the sitemap. (Verified: the custom
  domain does not resolve, so the canonical URL is
  `https://eric-wnorowski-portfolio.vercel.app`; swap `site.json`'s `url` if the custom
  domain is attached later.)
- [x] **Add `sitemap.ts` and `robots.ts`** in `app/` (generate project slugs from
  `getAllProjectSlugs()`).
- [x] **Add Open Graph / Twitter card metadata** — site-wide defaults in
  [app/layout.tsx](app/layout.tsx) plus per-project OG data in `generateMetadata`, and an
  OG image (static or `opengraph-image.tsx`).
- [x] **Add JSON-LD structured data.** Person schema on home, CreativeWork on project pages.

## P3 — Polish & hygiene

- [x] **Replace the default Next.js favicon** (`app/favicon.ico` is the stock one) with a
  personal icon.
- [x] **Open external links in a new tab.** GitHub/GitLab/LinkedIn links in the header,
  footer, cards, and contact page render without `target="_blank" rel="noreferrer"`.
- [x] **Trim Core strengths to 3–5 bullets.** Home page lists 7; SPEC §4.2 says 3–5 to keep
  signal density.
- [x] **Remove the phone number from `site.json`.** It's in the (public) repo but never
  rendered, and the 2026 resume dropped it from the header — remove it from the site
  config to match.
- [x] **Repo hygiene.** Commit `CLAUDE.md` (currently untracked); remove or relocate the
  stray `portfolio.jpeg` at the repo root (the site uses `public/images/portrait.jpeg`);
  delete or update the now-stale `eric_wnorowski_resume.tex` (still has 2025 content, the
  phone number, and the old project name); keep the 5.4 MB
  `Eric Wnorowski Resume 2026.docx` out of git (gitignore it) once the PDF is moved into
  `public/resume/`.
- [x] **Add a custom `not-found.tsx`** so bad project slugs get a branded 404.
- [x] **Run an accessibility + Lighthouse pass** (targets: ≥95 across the board, SPEC §2.3).
  Done (2026-07-15) against production (home, project detail, experience): Performance
  96–100, Best Practices 100, SEO 100, Accessibility 95–96. Sole a11y failure was
  color-contrast on low-opacity ink text (`text-ink/50` = 3.33:1, `text-ink/60` = 4.48:1
  vs. the 4.5:1 requirement) — fixed by bumping `/50 → /65` and `/60 → /70` site-wide.
  Heading order and tag-filter keyboard support passed; alt text was fixed in P3.
- [x] **Privacy-friendly analytics** (SPEC §5.9): Vercel Analytics added
  (`@vercel/analytics`, `<Analytics />` in the root layout). One manual step: enable
  Analytics for the project in the Vercel dashboard (project → Analytics tab → Enable);
  that same tab is where the numbers are read.
- [x] **Verify Vercel production deployment** with HTTPS: live at
  `https://eric-wnorowski-portfolio.vercel.app` (confirmed 2026-07-15). Decision: staying
  on the `.vercel.app` domain — the resume's `eric-wnorowski-portfolio.app` link should be
  updated to match, since that domain is unattached and does not resolve.
- [x] **Feature the athletic career.** Decided yes (2026-07-15): an `athletics` array in
  `site.json` renders an Athletics section on `/experience` below Education (SCU Heat /
  US Open Cup, College of Charleston NCAA DI, Real Central NJ USL2, Vassar NCAA DIII with
  the goalkeeping records), plus a first-person tie-in sentence in the Soccer Data
  Pipeline writeup.
