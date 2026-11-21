"use client";

import { useEffect, useState } from "react";
import VideoFacade from "@/components/work/VideoFacade";
import { builds } from "@/data/builds";

const drone = builds.find((build) => build.id === "fpv-drone");

// Goggle-style on-screen display drawn over the drone footage: recording dot
// and flight timer, link quality, an artificial horizon, and pack voltage.
// Purely decorative, so it is hidden from assistive technology.
function FlightOsd() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const clock = `${String(Math.floor(seconds / 60) % 100).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flight-osd" aria-hidden="true">
      <span className="flight-osd-corner flight-osd-tl" />
      <span className="flight-osd-corner flight-osd-tr" />
      <span className="flight-osd-corner flight-osd-bl" />
      <span className="flight-osd-corner flight-osd-br" />
      <span className="flight-osd-rec"><i />REC {clock}</span>
      <span className="flight-osd-link">ELRS · LQ 100</span>
      <span className="flight-osd-horizon" />
      <span className="flight-osd-batt">4S 16.4V</span>
    </div>
  );
}

export default function HeroFlight() {
  return (
    <figure id="featured-flight" className="hero-flight" aria-labelledby="hero-flight-caption" tabIndex={-1}>
      <div className="hero-flight-screen">
        <VideoFacade
          {...drone.video}
          poster={drone.image}
          loop={drone.loop}
          overlay={<FlightOsd />}
          sizes="(max-width: 980px) 92vw, 42vw"
          priority
        />
      </div>
      <figcaption id="hero-flight-caption">
        <span className="hero-flight-eyebrow">Featured build</span>
        <span>A custom FPV drone I built, bound to my own radio, and fly from its live camera.</span>
        <a href="#fpv-drone">How it works <span aria-hidden="true">↓</span></a>
      </figcaption>
    </figure>
  );
}
