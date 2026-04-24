import Card from "@/components/ui/Card";

/**
 * FeaturedProjects — three placeholder project tiles in a responsive row.
 */

const PROJECTS = [
  {
    title: "Project One",
    blurb: "Short placeholder description of the project and what it does.",
    stat: "—",
    statLabel: "Placeholder metric",
  },
  {
    title: "Project Two",
    blurb: "Short placeholder description of the project and what it does.",
    stat: "—",
    statLabel: "Placeholder metric",
  },
  {
    title: "Project Three",
    blurb: "Short placeholder description of the project and what it does.",
    stat: "—",
    statLabel: "Placeholder metric",
  },
];

export default function FeaturedProjects() {
  return (
    <Card
      eyebrow="Featured Projects"
      title="Selected Work"
      actions={<span className="text-xs">View all</span>}
      className="h-full"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <article
            key={i}
            className="
              flex flex-col overflow-hidden rounded-lg
              border border-paper-line bg-paper
              transition-colors hover:border-ink-mute
            "
          >
            {/* Image placeholder */}
            <div className="relative aspect-[16/10] w-full bg-blueprint">
              <div className="absolute inset-0 grid place-items-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  Image · Placeholder
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
              <p className="text-xs leading-relaxed text-ink-soft">{p.blurb}</p>
              <div className="mt-auto pt-3">
                <div className="text-lg font-semibold text-ink">{p.stat}</div>
                <div className="text-[11px] uppercase tracking-wider text-ink-mute">
                  {p.statLabel}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
