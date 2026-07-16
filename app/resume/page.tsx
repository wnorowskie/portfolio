import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view the resume PDF.",
};

const resumePath = "/resume/Eric_Wnorowski_Resume_2026.pdf";

export default function ResumePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/65">Resume</p>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Resume PDF</h1>
        <p className="max-w-2xl text-base text-ink/70">
          View the PDF inline or download a copy for offline review.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-strong"
          href={resumePath}
          download
        >
          Download PDF
        </Link>
        <Link
          className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/50"
          href="/contact"
        >
          Contact me
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-sm">
        <iframe
          className="h-[85vh] w-full"
          src={resumePath}
          title="Eric Wnorowski resume"
          loading="lazy"
        />
      </div>

      <section
        aria-label="Plain-text resume"
        className="space-y-8 rounded-2xl border border-ink/10 bg-white/70 p-8 text-sm leading-6 text-ink/70 shadow-sm"
      >
        <div>
          <h2 className="font-display text-2xl text-ink">Eric Wnorowski</h2>
          <p className="mt-1">
            ericwnorowski@gmail.com · linkedin.com/in/eric-wnorowski ·
            eric-wnorowski-portfolio.vercel.app · NJ/NYC
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold uppercase tracking-wide text-ink">
            Professional Experience
          </h3>
          <div>
            <p className="font-semibold text-ink">ConstructConnect — Cincinnati, Ohio (Remote)</p>
            <p className="mt-2 font-medium text-ink">Software Engineer II · ConstructConnect Platform</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Cut p99 search latency ~9.4s → ~1.4s (p95 ~250ms) on the flagship search API
                cross-search rollout, validated with 220k-request load campaigns at up to 8×
                production peak with zero 5xx errors.
              </li>
              <li>
                Own event-driven ingestion pipelines (C#, Python, Logstash) keeping a 360k+
                project search corpus fresh on 30-minute delta cycles across seven pipelines,
                serving 75,000+ customers.
              </li>
              <li>
                Operate a multi-tier (hot/warm/cold) production Elasticsearch deployment (~7TB),
                shipping to production multiple times per month behind security scans and
                rollback plans.
              </li>
            </ul>
            <p className="mt-3 font-medium text-ink">Software Engineer I · Modernized Search</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Built a modern React/Next.js (TypeScript) document viewer with Python backend —
                cut per-page renders ~5–10× (to ~0.2s/page) on docs up to 1,100 pages and
                backend API p95 ~384ms → ~138ms (−64%).
              </li>
              <li>
                Partnered with Quality Engineering to make k6/pytest performance suites a
                release gate — serving ~100k document-project loads per day.
              </li>
            </ul>
            <p className="mt-3 font-medium text-ink">Associate Software Engineer</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Co-designed the cloud-native document processing pipeline that now carries 100%
                of document traffic (~291k packages, 75M+ pages annually), fully replacing the
                legacy OCR stack.
              </li>
              <li>
                Cut package resubmission from 21.5% to under 1% (~96% less manual intervention),
                sustaining ~350k pages/day; built the Node.js (TypeScript) microservices on
                Cloud Functions that run it.
              </li>
            </ul>
            <p className="mt-3 font-medium text-ink">Data Science Intern · Takeoff Boost</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Prototyped multiple Python ML models (object detection, image segmentation,
                image classification, text classification) to explore new production
                capabilities using construction documents and project data — work that became
                Takeoff Boost, the leading AI takeoff product in the construction software
                industry.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold uppercase tracking-wide text-ink">Education</h3>
          <p>
            <span className="font-medium text-ink">College of Charleston</span>, Charleston, SC —
            Master of Science, Computer and Information Sciences (Software Engineering) · GPA 3.9
          </p>
          <p>
            <span className="font-medium text-ink">Vassar College</span>, Poughkeepsie, NY —
            Bachelor of Arts, Computer Science; Economics Minor · GPA 3.7
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold uppercase tracking-wide text-ink">Projects</h3>
          <div>
            <p className="font-medium text-ink">Family Recipe App</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Shipped a full-stack web app with backend services that gives users a social
                media-like experience for recipe sharing, built as a true production system:
                DevOps pipeline, infrastructure-as-code, observability, and application security.
              </li>
              <li>
                Tech: Next.js frontend, Python API on Cloud Run, Cloud SQL Postgres, GCS
                uploads, GitHub Actions CI/CD (security + unit/e2e gates), Terraform.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink">DevX AI Enablement</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Member of the organization&rsquo;s AI Center of Excellence, building and designing
                AI agents, skills, and hooks that assist developers across the software
                development lifecycle.
              </li>
              <li>
                Built an agentic workflow taking agents from a JIRA ticket to code changes,
                docs, a merge request, and a testing plan — adopted by ~3 in 4 product engineers
                weekly with a ~98% suggestion-acceptance rate.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink">Soccer Data Pipeline</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Shipped an ETL pipeline that transforms raw soccer data into a Postgres database
                consumable by APIs, with serverless functions ingesting data in real time.
              </li>
              <li>
                Tech: Python, Terraform, Postgres, Google Cloud (Functions, SQL, Scheduler,
                Pub/Sub), GitLab.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink">Student Service Center</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Worked in a small, startup-style team to build a full-stack web app centralizing
                key university student services, iterating on UI flows through user interviews
                and usability tests with Figma and Vercel v0.
              </li>
              <li>Tech: Next.js, React, SQLite, Vercel, Figma, GitHub.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
