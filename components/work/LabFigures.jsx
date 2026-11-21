// Clean, readable versions of each lab's key result, drawn in the site's style.
// The original simulator screenshots stay in the engineering-labs repository.

// From the ALU testbench: A = 14 (1110), B = 13 (1101). Each row is asserted.
const ALU_CASES = [
  ["000", "A + B", "11011", 27],
  ["001", "A − B", "00001", 1],
  ["010", "A − 1", "01101", 13],
  ["011", "A + 1", "01111", 15],
  ["100", "A AND B", "01100", 12],
  ["101", "A OR B", "01111", 15],
  ["110", "NOT A", "00001", 1],
  ["111", "A XOR B", "00011", 3],
];

export function AluFigure() {
  return (
    <figure className="lab-figure lab-figure-alu">
      <figcaption>Testbench with A = 14, B = 13: all 8 checks pass</figcaption>
      <table>
        <thead>
          <tr><th scope="col">Sel</th><th scope="col">Operation</th><th scope="col">F</th><th scope="col"><span className="sr-only">Result</span></th></tr>
        </thead>
        <tbody>
          {ALU_CASES.map(([sel, operation, bits, value]) => (
            <tr key={sel}>
              <td className="lab-mono">{sel}</td>
              <td>{operation}</td>
              <td className="lab-mono">{bits} <span className="lab-decimal">= {value}</span></td>
              <td><span className="lab-pass" aria-label="passed">✓</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

// Power into the load for the 90.77 V, 198.2 Ω Thévenin equivalent. This is the
// same curve the Multisim parameter sweep traced (peak 10.39 W at 198.5 Ω).
const V_TH = 90.767;
const R_TH = 198.22;
const power = (r) => (V_TH * V_TH * r) / ((R_TH + r) ** 2);

export function PowerFigure() {
  const width = 320;
  const height = 196;
  const left = 40;
  const right = 12;
  const top = 26;
  const bottom = 34;
  const rMin = 100;
  const rMax = 300;
  const pMin = 9.2;
  const pMax = 10.6;
  const x = (r) => left + ((r - rMin) / (rMax - rMin)) * (width - left - right);
  const y = (p) => top + (1 - (p - pMin) / (pMax - pMin)) * (height - top - bottom);
  const points = Array.from({ length: 81 }, (_, index) => rMin + (index * (rMax - rMin)) / 80);
  const curve = points.map((r, index) => `${index ? "L" : "M"}${x(r).toFixed(1)} ${y(power(r)).toFixed(1)}`).join(" ");
  const peak = power(R_TH);

  return (
    <figure className="lab-figure lab-figure-plot">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="power-plot-title">
        <title id="power-plot-title">Load power versus load resistance, peaking at 10.39 watts at 198 ohms</title>
        {[9.4, 9.8, 10.2, 10.6].map((p) => (
          <g key={p}>
            <line x1={left} x2={width - right} y1={y(p)} y2={y(p)} className="plot-grid" />
            <text x={left - 6} y={y(p) + 3.5} className="plot-tick" textAnchor="end">{p.toFixed(1)}</text>
          </g>
        ))}
        {[100, 150, 200, 250, 300].map((r) => (
          <text key={r} x={x(r)} y={height - bottom + 15} className="plot-tick" textAnchor="middle">{r}</text>
        ))}
        <text x={(left + width - right) / 2} y={height - 4} className="plot-axis" textAnchor="middle">Load resistance (Ω)</text>
        <text x={left} y={12} className="plot-axis">Power (W)</text>
        <line x1={x(R_TH)} x2={x(R_TH)} y1={y(peak)} y2={height - bottom} className="plot-peak-line" />
        <path d={curve} className="plot-curve" />
        <circle cx={x(R_TH)} cy={y(peak)} r="5" className="plot-peak" />
        <text x={x(R_TH) + 9} y={y(peak) - 8} className="plot-label">10.39 W at 198 Ω = R<tspan baselineShift="sub" fontSize="8">TH</tspan></text>
      </svg>
    </figure>
  );
}

export function ComparatorFigure() {
  return (
    <figure className="lab-figure lab-figure-diagram">
      <svg viewBox="0 0 320 196" role="img" aria-labelledby="comparator-title">
        <title id="comparator-title">Block diagram: inputs A and B feed unsigned and signed comparators, and a mode bit picks which result reaches the less-than, equal, and greater-than outputs</title>
        <defs>
          <marker id="cmp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="diagram-arrowhead" />
          </marker>
        </defs>
        <text x="14" y="82" className="diagram-input">A[3:0]</text>
        <text x="14" y="102" className="diagram-input">B[3:0]</text>
        <path d="M58 78 H66 V98 M58 98 H66 M66 88 H78" className="diagram-wire" />
        <path d="M78 52 V124" className="diagram-bus" />
        <circle cx="78" cy="88" r="2.6" className="diagram-node" />
        <path d="M78 52 H96" className="diagram-wire" markerEnd="url(#cmp-arrow)" />
        <path d="M78 124 H96" className="diagram-wire" markerEnd="url(#cmp-arrow)" />
        <rect x="98" y="32" width="88" height="40" rx="8" className="diagram-block" />
        <text x="142" y="50" className="diagram-block-label" textAnchor="middle">Unsigned</text>
        <text x="142" y="63" className="diagram-block-sub" textAnchor="middle">compare</text>
        <rect x="98" y="104" width="88" height="40" rx="8" className="diagram-block" />
        <text x="142" y="122" className="diagram-block-label" textAnchor="middle">Signed</text>
        <text x="142" y="135" className="diagram-block-sub" textAnchor="middle">two&apos;s complement</text>
        <path d="M186 52 H214 M186 124 H214" className="diagram-wire" markerEnd="url(#cmp-arrow)" />
        <path d="M216 28 L246 40 V136 L216 148 Z" className="diagram-mux" />
        <text x="231" y="92" className="diagram-block-sub" textAnchor="middle">MUX</text>
        <text x="231" y="182" className="diagram-input" textAnchor="middle">Mode</text>
        <path d="M231 170 V144" className="diagram-wire" markerEnd="url(#cmp-arrow)" />
        <path d="M246 62 H272 M246 88 H272 M246 114 H272" className="diagram-wire" markerEnd="url(#cmp-arrow)" />
        <text x="276" y="66" className="diagram-output">A &lt; B</text>
        <text x="276" y="92" className="diagram-output">A = B</text>
        <text x="276" y="118" className="diagram-output">A &gt; B</text>
      </svg>
    </figure>
  );
}
