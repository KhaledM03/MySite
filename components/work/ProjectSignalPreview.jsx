"use client";

import Image from "next/image";
import { useState } from "react";

const RESETWAVE_STEPS = [
  "Targets ready",
  "Validating input",
  "SSH connected",
  "Task running",
  "Complete · ≈10s",
];

const COVE_CAPTURES = [
  { label: "Home", src: "/media/the-cove-dev/home.webp", width: 1257, height: 798 },
  { label: "About", src: "/media/the-cove-dev/about.webp", width: 1263, height: 749 },
  { label: "Services", src: "/media/the-cove-dev/services.webp", width: 1263, height: 746 },
];

export default function ProjectSignalPreview({ project, variant = "home" }) {
  const [active, setActive] = useState(false);
  const [captureIndex, setCaptureIndex] = useState(0);

  if (project.slug === "resetwave") {
    return (
      <div className={`project-signal resetwave-signal${active ? " is-active" : ""}`} data-variant={variant}>
        <div className="project-signal-head">
          <span>Sanitized run signal</span>
          <button type="button" aria-pressed={active} onClick={() => setActive((value) => !value)}>
            {active ? "Hold" : "Run"}
          </button>
        </div>
        <ol aria-label="Conceptual ResetWave status sequence">
          {RESETWAVE_STEPS.map((step, index) => (
            <li key={step} style={{ "--signal-index": index }}><i aria-hidden="true" /><span>{step}</span></li>
          ))}
        </ol>
        <p>Conceptual status sequence · no private infrastructure detail</p>
      </div>
    );
  }

  if (project.slug === "engineering-lab") {
    return (
      <div className={`project-signal lab-card-signal${active ? " is-active" : ""}`} data-variant={variant}>
        <Image
          src="/media/engineering-lab/oscilloscope-card.webp"
          alt="Real oscilloscope and electronics bench capture"
          width={1600}
          height={1120}
          sizes={variant === "home" ? "(max-width: 760px) 88vw, 32vw" : "(max-width: 760px) 92vw, 43vw"}
        />
        <div className="lab-card-readout" aria-hidden="true">
          <span>Real bench capture</span>
          <strong>Observe · measure · validate</strong>
          <i /><i /><i />
        </div>
        <button type="button" aria-pressed={active} onClick={() => setActive((value) => !value)}>
          {active ? "Field active" : "Trace evidence"}
        </button>
      </div>
    );
  }

  const capture = COVE_CAPTURES[captureIndex];
  return (
    <div className="project-signal cove-card-signal" data-variant={variant}>
      <div className="cove-card-browser-bar" aria-hidden="true"><i /><i /><i /><span>thecovedev.com</span></div>
      <div className="cove-card-capture">
        <Image
          key={capture.label}
          src={capture.src}
          alt={`The Cove Dev ${capture.label.toLowerCase()} interface capture`}
          width={capture.width}
          height={capture.height}
          sizes={variant === "home" ? "(max-width: 760px) 88vw, 32vw" : "(max-width: 760px) 92vw, 43vw"}
        />
      </div>
      <div className="cove-card-switcher">
        <span>{String(captureIndex + 1).padStart(2, "0")} / 03 · {capture.label}</span>
        <button
          type="button"
          onClick={() => setCaptureIndex((index) => (index + 1) % COVE_CAPTURES.length)}
          aria-label="Show next verified The Cove Dev capture"
        >
          Next capture →
        </button>
      </div>
    </div>
  );
}
