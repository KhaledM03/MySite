"use client";

import Link from "next/link";
import { useState } from "react";
import { SYSTEMS_MAP_NODES } from "@/data/career";

export default function SystemsMap() {
  const [activeId, setActiveId] = useState(SYSTEMS_MAP_NODES[0].id);
  const activeNode = SYSTEMS_MAP_NODES.find((node) => node.id === activeId) ?? SYSTEMS_MAP_NODES[0];

  return (
    <section id="systems-map" className="systems-map" aria-labelledby="systems-map-title" tabIndex={-1}>
      <header className="systems-map-header">
        <div>
          <p className="section-label">Systems map · Evidence across layers</p>
          <h2 id="systems-map-title">From current<br /><em>to code.</em></h2>
        </div>
        <p>
          The work is connected: observe a physical system, understand its logic, operate its infrastructure, automate the workflow, and ship the result clearly.
        </p>
      </header>

      <div className="systems-map-frame">
        <div className="systems-map-coordinates" aria-hidden="true"><span>X / 06</span><span>FIELD 40.7°N</span><span>SIGNAL PATH</span></div>
        <ol className="systems-map-nodes" aria-label="Evidence-backed engineering layers">
          {SYSTEMS_MAP_NODES.map((node) => (
            <li key={node.id} className={activeId === node.id ? "is-active" : ""}>
              <Link
                href={node.href}
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                aria-label={`${node.number} ${node.label}. ${node.evidence}: ${node.proof}. Open evidence.`}
                data-signal="TRACE EVIDENCE"
              >
                <span className="systems-node-number">{node.number}</span>
                <span className="systems-node-dot" aria-hidden="true" />
                <span className="systems-node-copy">
                  <small>{node.action}</small>
                  <strong>{node.label}</strong>
                  <em>{node.evidence}</em>
                </span>
                <span className="systems-node-mobile-proof">{node.proof}</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </li>
          ))}
        </ol>

        <aside className="systems-map-evidence" aria-live="polite" aria-label="Selected systems-map evidence">
          <div className="systems-map-status"><i aria-hidden="true" /> Signal verified</div>
          <span>{activeNode.number} / {activeNode.action}</span>
          <h3>{activeNode.evidence}</h3>
          <p>{activeNode.detail}</p>
          <dl>
            <div><dt>Layer</dt><dd>{activeNode.label}</dd></div>
            <div><dt>Tools</dt><dd>{activeNode.stack}</dd></div>
            <div><dt>Proof</dt><dd>{activeNode.proof}</dd></div>
          </dl>
          <Link href={activeNode.href} data-magnetic data-signal="OPEN EVIDENCE">
            Open evidence <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
