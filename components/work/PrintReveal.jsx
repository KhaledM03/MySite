"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LAYERS = 48;
const PRINT_MS = 2600;

// Design to object, shown the way it actually happened: the real photo prints
// in over the Fusion 360 model one layer at a time, bottom to top, with the
// nozzle sweeping across each layer. It runs once when the card scrolls into
// view, and the button replays it or flips back to the model.
export default function PrintReveal({ model, photo }) {
  const rootRef = useRef(null);
  const frameRef = useRef(0);
  const playedRef = useRef(false);
  const [state, setState] = useState("model");
  const [layer, setLayer] = useState(0);

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const print = () => {
    window.cancelAnimationFrame(frameRef.current);
    playedRef.current = true;
    if (reducedMotion()) {
      setLayer(LAYERS);
      setState("printed");
      return;
    }
    setState("printing");
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / PRINT_MS);
      // Ease out so the last layers settle instead of slamming in.
      const eased = 1 - (1 - progress) ** 2;
      setLayer(Math.round(eased * LAYERS));
      if (progress < 1) frameRef.current = window.requestAnimationFrame(tick);
      else setState("printed");
    };
    frameRef.current = window.requestAnimationFrame(tick);
  };

  const showModel = () => {
    window.cancelAnimationFrame(frameRef.current);
    setLayer(0);
    setState("model");
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !playedRef.current && !reducedMotion()) {
        observer.disconnect();
        window.setTimeout(print, 350);
      }
    }, { threshold: 0.6 });
    observer.observe(root);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameRef.current);
    };
    // print only reads refs and stable setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percent = (layer / LAYERS) * 100;
  const status = state === "model"
    ? "Fusion 360 model"
    : state === "printing"
      ? `Printing · layer ${String(layer).padStart(2, "0")}/${LAYERS}`
      : "Printed · in use";

  return (
    <div ref={rootRef} className="print-reveal" data-state={state} style={{ "--printed": `${percent}%` }}>
      <Image className="print-reveal-model" src={model.src} alt={model.alt} width={model.width} height={model.height} sizes="(max-width: 760px) 92vw, 33vw" />
      <div className="print-reveal-photo">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 92vw, 33vw" />
      </div>
      <span className="print-reveal-nozzle" aria-hidden="true"><span /></span>
      <span className="print-reveal-status" aria-hidden="true">{status}</span>
      <button
        type="button"
        className="print-reveal-toggle"
        onClick={state === "model" ? print : showModel}
      >
        {state === "model" ? "Print it" : "Show the model"}
      </button>
      <span className="sr-only" aria-live="polite">{state === "printed" ? "Showing the printed shelf in use." : state === "model" ? "Showing the Fusion 360 model." : ""}</span>
    </div>
  );
}
