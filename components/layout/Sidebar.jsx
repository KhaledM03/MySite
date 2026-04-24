/**
 * Sidebar — left vertical navigation.
 *
 * Phase 1: static structure only. No active-route logic, no animations.
 * Active state is hard-coded to "Home" as a placeholder.
 */

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        sticky top-0 z-20
        hidden lg:flex
        h-screen w-60 shrink-0
        flex-col justify-between
        border-r border-paper-line bg-paper-card/80 backdrop-blur
      "
    >
      {/* Logo / wordmark */}
      <div className="px-5 pt-6">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-paper-card">
            <span className="font-mono text-[13px] font-semibold tracking-tight">
              KM
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">Khaled Mousa</div>
            <div className="text-[11px] text-ink-mute">Engineer & Developer</div>
          </div>
        </a>
      </div>

      {/* Nav */}
      <nav className="mt-8 flex-1 px-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = idx === 0; // placeholder active state
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={
                    "block rounded-md px-3 py-2 text-sm transition-colors " +
                    (isActive
                      ? "bg-accent-soft text-accent-deep font-medium"
                      : "text-ink-soft hover:bg-paper hover:text-ink")
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer slot */}
      <div className="border-t border-paper-line px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-ink-mute">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Available for opportunities</span>
        </div>
      </div>
    </aside>
  );
}
