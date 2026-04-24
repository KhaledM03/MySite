import Card from "@/components/ui/Card";

/**
 * ResumeTimeline — vertical timeline of education + experience.
 * Phase 1: placeholder entries only.
 */

const ITEMS = [
  { year: "2026", title: "Placeholder Role", org: "Placeholder Org" },
  { year: "2025", title: "Placeholder Role", org: "Placeholder Org" },
  { year: "2024", title: "Placeholder Role", org: "Placeholder Org" },
  { year: "2023", title: "Placeholder Role", org: "Placeholder Org" },
];

export default function ResumeTimeline() {
  return (
    <Card
      eyebrow="Resume Timeline"
      title="Experience & Education"
      className="h-full"
      actions={<span className="text-xs">View full</span>}
    >
      <ol className="relative mt-2 space-y-5 border-l border-paper-line pl-5">
        {ITEMS.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[23px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-paper-card ring-1 ring-paper-line">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <div className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">
              {item.year}
            </div>
            <div className="text-sm font-medium text-ink">{item.title}</div>
            <div className="text-xs text-ink-soft">{item.org}</div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
