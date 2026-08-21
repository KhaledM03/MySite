"use client";

import { useRef, useState } from "react";

export default function EvidenceHotspots({ items, label, variant = "evidence" }) {
  const [activeId, setActiveId] = useState(null);
  const triggerRefs = useRef(new Map());
  const activeItem = items.find((item) => item.id === activeId);

  const closeNote = () => {
    const previousId = activeId;
    setActiveId(null);
    window.requestAnimationFrame(() => triggerRefs.current.get(previousId)?.focus());
  };

  return (
    <div className={`evidence-hotspots evidence-hotspots-${variant}`} aria-label={label} onKeyDown={(event) => {
      if (event.key === "Escape" && activeId) {
        event.preventDefault();
        closeNote();
      }
    }}>
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(element) => {
            if (element) triggerRefs.current.set(item.id, element);
            else triggerRefs.current.delete(item.id);
          }}
          className={`evidence-hotspot${activeId === item.id ? " is-active" : ""}`}
          type="button"
          style={{ "--hotspot-x": `${item.x}%`, "--hotspot-y": `${item.y}%` }}
          aria-expanded={activeId === item.id}
          aria-controls={`${item.id}-note`}
          aria-label={`${String(index + 1).padStart(2, "0")} ${item.label}: ${item.title}`}
          onClick={() => setActiveId((value) => value === item.id ? null : item.id)}
          data-signal="INSPECT"
        >
          <span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" />
        </button>
      ))}

      {activeItem ? (
        <aside id={`${activeItem.id}-note`} className="evidence-hotspot-note" tabIndex={-1} onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeNote();
          }
        }}>
          <div>
            <span>{activeItem.label}</span>
            <button type="button" onClick={closeNote} aria-label="Close evidence note">×</button>
          </div>
          <strong>{activeItem.title}</strong>
          <p>{activeItem.body}</p>
        </aside>
      ) : null}
    </div>
  );
}
