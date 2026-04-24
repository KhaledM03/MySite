import Card from "@/components/ui/Card";

/**
 * Hero — primary identity card.
 * Phase 1: placeholder copy + two CTA buttons. No animations.
 */
export default function Hero() {
  return (
    <Card
      eyebrow="Profile"
      className="h-full"
      bodyClassName="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-accent">
          Computer Engineering Technology · Electrical Engineering Technology
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Khaled Mousa
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-ink-soft">
          I build systems you can{" "}
          <span className="text-ink font-medium">see</span>,{" "}
          <span className="text-ink font-medium">understand</span>, and{" "}
          <span className="text-ink font-medium">trust</span>.
          <br />
          Blending engineering, web development, automation, and real-world
          problem solving.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="
            inline-flex items-center gap-2 rounded-md
            bg-ink px-4 py-2 text-sm font-medium text-paper-card
            shadow-soft hover:bg-ink-soft transition-colors
          "
        >
          View Projects
        </a>
        <a
          href="#resume"
          className="
            inline-flex items-center gap-2 rounded-md
            border border-paper-line bg-paper-card px-4 py-2
            text-sm font-medium text-ink
            hover:border-ink-mute transition-colors
          "
        >
          Download Resume
        </a>
      </div>
    </Card>
  );
}
