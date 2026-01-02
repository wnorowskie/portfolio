import Tag from "@/components/tag";
import { ExperienceEntry } from "@/lib/content";

type ExperienceCardProps = {
  entry: ExperienceEntry;
};

export default function ExperienceCard({ entry }: ExperienceCardProps) {
  const { frontmatter, content } = entry;
  const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleString("en-US", { month: "short", year: "numeric" }) : "Present";

  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
            {frontmatter.company} · {frontmatter.location}
          </p>
          <h3 className="text-xl font-semibold text-ink">{frontmatter.role}</h3>
          {frontmatter.team ? (
            <p className="text-sm text-ink/70">{frontmatter.team}</p>
          ) : null}
        </div>
        <p className="text-sm text-ink/60">
          {formatDate(frontmatter.start)} — {formatDate(frontmatter.end)}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-ink/70">
        {frontmatter.highlights.map((highlight) => (
          <li key={highlight}>• {highlight}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {frontmatter.confidentialityNote ? (
        <p className="mt-4 text-xs text-ink/50">{frontmatter.confidentialityNote}</p>
      ) : null}

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink/70">
          Details
        </summary>
        <div className="rich mt-4 text-sm text-ink/70">{content}</div>
      </details>
    </div>
  );
}
