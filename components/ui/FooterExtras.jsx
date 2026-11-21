"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CAREER_LINKS } from "@/data/career";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

// Ticks every 20 seconds. On the server (and the first client render) it
// returns nothing, so the prerendered page never shows a stale time.
function subscribe(onChange) {
  const timer = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(timer);
}

function useNewYorkTime() {
  return useSyncExternalStore(subscribe, () => timeFormat.format(new Date()), () => null);
}

export function LocalTime() {
  const time = useNewYorkTime();
  if (!time) return null;
  return (
    <p className="site-footer-time">
      <span className="site-footer-time-dot" aria-hidden="true" />
      It&apos;s {time} for me in New York.
    </p>
  );
}

export function CopyEmail() {
  const [state, setState] = useState("idle");
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CAREER_LINKS.email);
      setState("copied");
    } catch {
      setState("unavailable");
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" className="site-footer-copy" onClick={copy} data-state={state}>
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "unavailable" ? "Select the address to copy" : "Copy email"}
      </span>
    </button>
  );
}
