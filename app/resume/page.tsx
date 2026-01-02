import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view the resume PDF.",
};

const resumePath = "/resume/Eric_Wnorowski_Resume_2025.pdf";

export default function ResumePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Resume</p>
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

      <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 text-sm text-ink/70">
        <p className="font-semibold text-ink">ATS-friendly text</p>
        <p className="mt-2">
          A plain HTML version of the resume can live here for accessibility and SEO.
          Placeholder for now while we align on content.
        </p>
      </section>
    </div>
  );
}
