"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Small things the illustration says when someone clicks it. Purely for fun:
// the illustration is decorative and hidden from assistive technology.
const LINES = ["Hi! 👋", "Still here.", "Okay, I'm dizzy."];

export default function IntroArt() {
  const artRef = useRef(null);
  const [hops, setHops] = useState(0);
  const [hopping, setHopping] = useState(false);

  useEffect(() => {
    const art = artRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    // The character leans a few pixels toward the cursor; the glow behind it
    // moves the other way, which reads as depth.
    const apply = () => {
      frame = 0;
      art.style.setProperty("--lean-x", x.toFixed(3));
      art.style.setProperty("--lean-y", y.toFixed(3));
    };
    const onPointerMove = (event) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      x = event.clientX / window.innerWidth - 0.5;
      y = event.clientY / window.innerHeight - 0.5;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const hop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHops((count) => count + 1);
    setHopping(false);
    // Restart the animation even on rapid clicks.
    window.requestAnimationFrame(() => setHopping(true));
  };

  return (
    <div
      ref={artRef}
      className={`intro-art${hopping ? " is-hopping" : ""}`}
      aria-hidden="true"
      onClick={hop}
      onAnimationEnd={(event) => {
        if (event.animationName === "intro-hop") setHopping(false);
      }}
    >
      <div className="intro-burst" />
      <Image
        src="/characters/khaled-hero.webp"
        alt=""
        width={1023}
        height={1537}
        priority
        sizes="(max-width: 760px) 70vw, 40vw"
      />
      {hops > 0 ? (
        <span key={hops} className="intro-bubble">{LINES[Math.min(hops, LINES.length) - 1]}</span>
      ) : null}
    </div>
  );
}
