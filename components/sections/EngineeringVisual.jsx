import Card from "@/components/ui/Card";

/**
 * EngineeringVisual — placeholder for the central engineering illustration
 * (e.g. an exploded mechanical part or a 3D scene). For Phase 1 we render
 * a clean SVG blueprint placeholder so the layout reads correctly.
 */
export default function EngineeringVisual() {
  return (
    <Card
      eyebrow="Engineering Visual"
      title="Systems Diagram"
      className="h-full"
      bodyClassName="pt-2"
    >
      <div
        className="
          relative aspect-[4/3] w-full overflow-hidden rounded-lg
          border border-paper-line
          bg-blueprint
        "
      >
        {/* Centered placeholder schematic */}
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Outer ring */}
          <circle
            cx="200"
            cy="150"
            r="90"
            fill="none"
            stroke="#3E6BE0"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="150"
            r="60"
            fill="none"
            stroke="#3E6BE0"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="150"
            r="28"
            fill="#FFFFFF"
            stroke="#0F1B2D"
            strokeWidth="1"
          />
          {/* Crosshair */}
          <line
            x1="40"
            y1="150"
            x2="360"
            y2="150"
            stroke="#0F1B2D"
            strokeOpacity="0.15"
            strokeDasharray="2 4"
          />
          <line
            x1="200"
            y1="20"
            x2="200"
            y2="280"
            stroke="#0F1B2D"
            strokeOpacity="0.15"
            strokeDasharray="2 4"
          />
          {/* Annotation dots */}
          {[
            [110, 150],
            [290, 150],
            [200, 60],
            [200, 240],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3" fill="#3E6BE0" />
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill="none"
                stroke="#3E6BE0"
                strokeOpacity="0.4"
              />
            </g>
          ))}
          {/* Center label */}
          <text
            x="200"
            y="154"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="#0F1B2D"
          >
            KM-01
          </text>
        </svg>

        {/* Corner registration marks */}
        <CornerMark className="left-2 top-2" />
        <CornerMark className="right-2 top-2 rotate-90" />
        <CornerMark className="left-2 bottom-2 -rotate-90" />
        <CornerMark className="right-2 bottom-2 rotate-180" />
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Placeholder schematic. A real engineering visual (3D model, system
        diagram, or interactive widget) will live here in a later phase.
      </p>
    </Card>
  );
}

function CornerMark({ className = "" }) {
  return (
    <svg
      className={"absolute h-3 w-3 text-ink-mute/60 " + className}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5V1H5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
