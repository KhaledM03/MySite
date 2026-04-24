/**
 * Card — shared surface used by every dashboard section.
 *
 * Usage:
 *   <Card eyebrow="Featured Projects" title="Selected Work" actions={...}>
 *     ...content...
 *   </Card>
 *
 * Keep this component visual-only. Section components own their content.
 */
export default function Card({
  eyebrow,
  title,
  actions,
  className = "",
  bodyClassName = "",
  children,
}) {
  return (
    <section
      className={
        "relative rounded-xl2 border border-paper-line bg-paper-card shadow-card " +
        className
      }
    >
      {(eyebrow || title || actions) && (
        <header className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
          <div className="min-w-0">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            {title && (
              <h2 className="mt-1 text-base font-semibold text-ink">
                {title}
              </h2>
            )}
          </div>
          {actions && (
            <div className="shrink-0 text-sm text-ink-mute">{actions}</div>
          )}
        </header>
      )}
      <div className={"px-6 pb-6 " + bodyClassName}>{children}</div>
    </section>
  );
}
