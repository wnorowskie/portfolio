type TagProps = {
  label: string;
};

export default function Tag({ label }: TagProps) {
  return (
    <span className="rounded-full border border-ink/15 bg-fog px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink/70">
      {label}
    </span>
  );
}
