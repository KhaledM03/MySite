"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// This site sets no cookies. The note is a joke with an honest punchline, and
// the only thing it stores is the visitor's answer, so it doesn't ask again.
export const COOKIE_NOTE_STORAGE_KEY = "cookie-note-answer";

const REPLIES = {
  accepted: "Nom. Thank you, that was delicious.",
  declined: "Fair enough. I won't ask again.",
};

function readAnswer() {
  try {
    return window.localStorage.getItem(COOKIE_NOTE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveAnswer(answer) {
  try {
    window.localStorage.setItem(COOKIE_NOTE_STORAGE_KEY, answer);
  } catch {
    // Storage can be blocked (private windows, strict settings). The note
    // still closes; it may simply ask again on the next visit.
  }
}

function CookieIcon({ bitten }) {
  return (
    <svg className="cookie-note-icon" viewBox="0 0 64 64" aria-hidden="true" data-bitten={bitten ? "true" : "false"}>
      <defs>
        <mask id="cookie-bite">
          <rect width="64" height="64" fill="white" />
          <g className="cookie-note-bite">
            <circle cx="55" cy="10" r="11" fill="black" />
            <circle cx="60" cy="22" r="7" fill="black" />
          </g>
        </mask>
      </defs>
      <g mask="url(#cookie-bite)">
        <circle cx="32" cy="32" r="28" className="cookie-note-dough" />
        <circle cx="22" cy="22" r="4" className="cookie-note-chip" />
        <circle cx="39" cy="28" r="3.2" className="cookie-note-chip" />
        <circle cx="26" cy="41" r="3.6" className="cookie-note-chip" />
        <circle cx="42" cy="44" r="4.2" className="cookie-note-chip" />
        <circle cx="16" cy="33" r="2.4" className="cookie-note-chip" />
      </g>
    </svg>
  );
}

export default function CookieNote() {
  const [phase, setPhase] = useState("hidden");
  const [answer, setAnswer] = useState(null);
  const replyRef = useRef(null);
  const hideTimerRef = useRef(0);

  useEffect(() => {
    if (readAnswer()) return undefined;
    const show = () => setPhase("asking");

    // On phones the note would cover the intro, so it waits for the first
    // real scroll. Larger screens get it after a short pause in the corner.
    if (window.matchMedia("(max-width: 760px)").matches) {
      const onScroll = () => {
        if (window.scrollY < 240) return;
        window.removeEventListener("scroll", onScroll);
        show();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const showTimer = window.setTimeout(show, 900);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimerRef.current), []);

  useEffect(() => {
    if (phase === "replied") replyRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const respond = (value) => {
    saveAnswer(value);
    setAnswer(value);
    setPhase("replied");
    hideTimerRef.current = window.setTimeout(() => setPhase("hidden"), 2600);
  };

  if (phase === "hidden") return null;

  return (
    <section className="cookie-note" data-phase={phase} aria-labelledby="cookie-note-title">
      <div className="cookie-note-head">
        <CookieIcon bitten={answer === "accepted"} />
        <p id="cookie-note-title" className="cookie-note-title">May I have a cookie?</p>
      </div>
      <div className="cookie-note-body">
        {phase === "asking" ? (
          <>
            <p>
              Full disclosure: this site doesn&apos;t use any. No tracking, no ads, no analytics. I just think it&apos;s polite to ask.
            </p>
            <div className="cookie-note-actions">
              <button className="button button-primary" type="button" onClick={() => respond("accepted")}>
                Sure, have one
              </button>
              <button className="button button-secondary" type="button" onClick={() => respond("declined")}>
                No cookies for you
              </button>
            </div>
            <Link className="cookie-note-link" href="/privacy">How this site handles privacy</Link>
          </>
        ) : (
          <p ref={replyRef} className="cookie-note-reply" role="status" tabIndex={-1}>{REPLIES[answer]}</p>
        )}
      </div>
    </section>
  );
}
