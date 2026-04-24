import Card from "@/components/ui/Card";

/**
 * ShowcaseMode — call-to-action card for an immersive "showcase" view.
 * Phase 1: static placeholder. The actual showcase experience comes later.
 */
export default function ShowcaseMode() {
  return (
    <Card
      eyebrow="Showcase Mode"
      title="Experience My Work"
      className="h-full"
    >
      <p className="text-sm text-ink-soft">
        An interactive showcase of my best projects. Coming soon.
      </p>

      <div className="mt-4 overflow-hidden rounded-lg border border-paper-line bg-blueprint">
        <div className="grid aspect-video place-items-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-paper-card shadow-soft ring-1 ring-paper-line">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              className="ml-0.5 text-ink"
              aria-hidden="true"
            >
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          </div>
        </div>
      </div>

      <a
        href="#showcase"
        className="
          mt-4 inline-flex w-full items-center justify-center gap-2
          rounded-md bg-accent px-4 py-2 text-sm font-medium text-white
          hover:bg-accent-deep transition-colors
        "
      >
        Enter Showcase Mode
      </a>
    </Card>
  );
}
