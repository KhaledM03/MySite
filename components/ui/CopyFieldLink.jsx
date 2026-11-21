"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyFieldLink({ targetId, label = "Copy link to this section" }) {
  const [state, setState] = useState("idle");
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${targetId}`;
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("unavailable");
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <span className="copy-field-link">
      <button type="button" onClick={copyLink}>
        {state === "copied" ? "Link copied" : label} <span aria-hidden="true">#</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Link copied to clipboard" : null}
        {state === "unavailable" ? "Clipboard access unavailable" : null}
      </span>
    </span>
  );
}
