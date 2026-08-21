"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DEVICES = [
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

const CAPTURES = [
  {
    id: "home",
    label: "Home",
    src: "/media/the-cove-dev/home.webp",
    width: 1257,
    height: 798,
    alt: "The Cove Dev home interface capture",
  },
  {
    id: "about",
    label: "About",
    src: "/media/the-cove-dev/about.webp",
    width: 1263,
    height: 749,
    alt: "The Cove Dev about interface capture",
  },
  {
    id: "services",
    label: "Services",
    src: "/media/the-cove-dev/services.webp",
    width: 1263,
    height: 746,
    alt: "The Cove Dev services interface capture",
  },
];

export default function LiveProjectPortal() {
  const [device, setDevice] = useState("desktop");
  const [active, setActive] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [narrow, setNarrow] = useState(true);
  const [captureIndex, setCaptureIndex] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const usesLiveFrame = active && !narrow;
  const capture = CAPTURES[captureIndex];

  const nextCapture = (direction) => {
    setCaptureIndex((index) => (index + direction + CAPTURES.length) % CAPTURES.length);
  };

  return (
    <section className="live-project-portal" aria-label="Interactive preview of The Cove Dev">
      <header className="live-portal-bar">
        <div className="live-portal-controls" aria-hidden="true"><i /><i /><i /></div>
        <span className="live-portal-address"><b aria-hidden="true">⌁</b> thecovedev.com</span>
        <span className={`live-portal-status${frameReady ? " is-ready" : ""}`}>
          {usesLiveFrame ? (frameReady ? "Live build" : "Connecting") : "Preview ready"}
        </span>
      </header>

      <div className="live-portal-device-controls" role="group" aria-label="Preview device">
        {DEVICES.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={device === option.id}
            onClick={() => setDevice(option.id)}
          >
            <span aria-hidden="true" className={`device-icon device-icon-${option.id}`} />
            {option.label}
          </button>
        ))}
      </div>

      <div className="live-portal-stage" data-device={device} data-mode={usesLiveFrame ? "live" : "poster"}>
        <div className="live-portal-viewport">
          {usesLiveFrame ? (
            <iframe
              src="https://thecovedev.com/"
              title="Live interactive preview of The Cove Dev"
              loading="lazy"
              sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setFrameReady(true)}
            />
          ) : (
            <div className={`live-portal-poster${active ? " is-active" : ""}`}>
              <Image
                key={capture.id}
                src={capture.src}
                alt={capture.alt}
                width={capture.width}
                height={capture.height}
                priority
                sizes="(max-width: 760px) 94vw, 58vw"
              />
              {!active ? (
                <div className="live-portal-poster-note">
                  <span>Lightweight portal</span>
                  <strong>Load the live build only when you ask.</strong>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {active && narrow ? (
        <div className="live-portal-capture-nav" aria-label="Preserved interface captures">
          <button type="button" onClick={() => nextCapture(-1)} aria-label="Previous interface capture">←</button>
          <span><b>{String(captureIndex + 1).padStart(2, "0")} / 03</b> {capture.label} capture</span>
          <button type="button" onClick={() => nextCapture(1)} aria-label="Next interface capture">→</button>
        </div>
      ) : null}

      <footer className="live-portal-footer">
        <div>
          <span>{narrow ? "Controlled preview" : "External live build"}</span>
          <p>{narrow
            ? "Tap through verified captures without introducing a nested scrolling surface."
            : "The external site is isolated and loads only after explicit interaction."}</p>
        </div>
        <div className="live-portal-actions">
          {!active ? (
            <button
              type="button"
              className="button live-portal-interact"
              onClick={() => setActive(true)}
              data-magnetic
              data-signal="INTERACT"
            >
              Interact with build <span aria-hidden="true">↗</span>
            </button>
          ) : null}
          <a
            className="button live-portal-open"
            href="https://thecovedev.com/"
            target="_blank"
            rel="noreferrer"
            data-magnetic
            data-signal="LAUNCH ↗"
          >
            Open full site <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
