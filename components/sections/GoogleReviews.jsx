import Card from "@/components/ui/Card";

/**
 * GoogleReviews — placeholder reviews list. Real review data comes later.
 */

const REVIEWS = [
  {
    name: "Reviewer One",
    initial: "R",
    body:
      "Placeholder review copy. Real Google review content will populate here in a later phase.",
  },
  {
    name: "Reviewer Two",
    initial: "R",
    body:
      "Placeholder review copy. Real Google review content will populate here in a later phase.",
  },
  {
    name: "Reviewer Three",
    initial: "R",
    body:
      "Placeholder review copy. Real Google review content will populate here in a later phase.",
  },
];

export default function GoogleReviews() {
  return (
    <Card
      eyebrow="Google Reviews"
      title="5.0"
      actions={<span className="text-xs">View all</span>}
      className="h-full"
    >
      <div className="-mt-2 mb-4 flex items-center gap-2">
        <Stars />
        <span className="text-xs text-ink-mute">Placeholder · 0 reviews</span>
      </div>

      <ul className="space-y-4">
        {REVIEWS.map((r, i) => (
          <li key={i} className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent-deep">
              {r.initial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink">{r.name}</span>
                <Stars size={10} />
              </div>
              <p className="mt-1 line-clamp-3 text-sm text-ink-soft">
                {r.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Stars({ size = 12 }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.3 2.8 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
