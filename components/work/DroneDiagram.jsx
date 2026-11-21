// How the FPV drone's control and video paths fit together. Drawn as inline
// SVG so it stays sharp and needs no extra requests. The text equivalent is in
// the figcaption and the list below the drawing.
const CONTROL = [
  { label: "TX15", sub: "radio transmitter" },
  { label: "ELRS receiver", sub: "on the drone" },
  { label: "Flight controller", sub: "stabilizes and mixes" },
  { label: "4 ESCs", sub: "motor drivers" },
  { label: "4 motors", sub: "thrust" },
];

const VIDEO = [
  { label: "Camera", sub: "front-mounted" },
  { label: "Video transmitter", sub: "on the drone" },
  { label: "FPV view", sub: "what I fly by" },
];

function Row({ nodes, y, linkLabel, linkAfter, tone }) {
  const width = 150;
  const gap = 46;
  return (
    <g>
      {nodes.map((node, index) => {
        const x = 20 + index * (width + gap);
        const isLast = index === nodes.length - 1;
        return (
          <g key={node.label}>
            <rect x={x} y={y} width={width} height={62} rx={12} className={`drone-node drone-node-${tone}`} />
            <text x={x + width / 2} y={y + 27} className="drone-node-label">{node.label}</text>
            <text x={x + width / 2} y={y + 46} className="drone-node-sub">{node.sub}</text>
            {!isLast ? (
              <g>
                <path d={`M${x + width + 4} ${y + 31} h${gap - 12}`} className={`drone-link drone-link-${tone}`} markerEnd={`url(#drone-arrow-${tone})`} />
                {index === linkAfter ? (
                  <text x={x + width + gap / 2} y={y - 8} className="drone-link-label">{linkLabel}</text>
                ) : null}
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

export default function DroneDiagram() {
  return (
    <figure className="drone-diagram">
      <figcaption>
        <strong>How the drone works.</strong> My sticks go out over an ExpressLRS radio link to the flight controller, which drives the motors. Separately, the camera feed comes back as live video, and that&apos;s what I fly by.
      </figcaption>
      {/* Scrolls sideways on narrow screens, so it must be reachable by keyboard. */}
      <div className="drone-diagram-scroll" role="region" aria-label="Drone diagram, scrolls sideways on small screens" tabIndex={0}>
        <svg viewBox="0 0 980 250" role="img" aria-labelledby="drone-diagram-title">
          <title id="drone-diagram-title">FPV drone block diagram: control path and video path</title>
          <defs>
            {["plum", "coral"].map((tone) => (
              <marker key={tone} id={`drone-arrow-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" className={`drone-arrow-${tone}`} />
              </marker>
            ))}
          </defs>
          <text x="20" y="24" className="drone-row-title">Control</text>
          <Row nodes={CONTROL} y={44} linkLabel="ExpressLRS radio link" linkAfter={0} tone="plum" />
          <text x="20" y="160" className="drone-row-title">Video</text>
          <Row nodes={VIDEO} y={178} linkLabel="live video link" linkAfter={1} tone="coral" />
        </svg>
      </div>
      <ol className="sr-only">
        <li>Control path: TX15 transmitter, ExpressLRS radio link, receiver, flight controller, four ESCs, four motors.</li>
        <li>Video path: camera, video transmitter, live video link, FPV view.</li>
      </ol>
    </figure>
  );
}
