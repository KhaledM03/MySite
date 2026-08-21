"use client";

import { useEffect, useRef, useState } from "react";
import { CANONICAL_RESUME, CAREER_LINKS, PUBLIC_CODE } from "@/data/career";

export default function ContactFieldCard() {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState("idle");
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const copyTimerRef = useRef(0);

  useEffect(() => {
    const openCard = (event) => {
      restoreFocusRef.current = event.detail?.trigger?.isConnected
        ? event.detail.trigger
        : document.activeElement;
      setOpen(true);
    };
    const openFromTrigger = (event) => {
      const trigger = event.target.closest?.("[data-contact-trigger]");
      if (!trigger) return;
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("portfolio:contact", { detail: { trigger } }));
    };

    window.addEventListener("portfolio:contact", openCard);
    document.addEventListener("click", openFromTrigger);
    return () => {
      window.removeEventListener("portfolio:contact", openCard);
      document.removeEventListener("click", openFromTrigger);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const obscured = [...document.body.children]
      .filter((element) => !element.classList.contains("contact-field-root") && !["SCRIPT", "STYLE"].includes(element.tagName))
      .map((element) => ({ element, inert: element.inert }));
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 20);

    document.body.style.overflow = "hidden";
    obscured.forEach(({ element }) => { element.inert = true; });

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      obscured.forEach(({ element, inert }) => { element.inert = inert; });
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus();
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const closeCard = () => {
    setOpen(false);
    setCopyState("idle");
  };

  const onDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeCard();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...dialogRef.current.querySelectorAll("button:not([disabled]), a[href]")];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CAREER_LINKS.email);
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
    window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopyState("idle"), 2400);
  };

  return (
    <div className="contact-field-root">
      {open ? (
        <div className="contact-field-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeCard();
        }}>
          <section
            ref={dialogRef}
            className="contact-field-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-field-title"
            onKeyDown={onDialogKeyDown}
          >
            <header>
              <div>
                <span>Available channels · Direct signal</span>
                <h2 id="contact-field-title">Let&apos;s build something useful.</h2>
              </div>
              <button ref={closeRef} type="button" onClick={closeCard} aria-label="Close contact card">Esc <b aria-hidden="true">×</b></button>
            </header>

            <div className="contact-field-primary">
              <span>Email</span>
              <a href={CAREER_LINKS.mailto}>{CAREER_LINKS.email}</a>
              <div>
                <a className="button button-primary" href={CAREER_LINKS.mailto} data-magnetic>Open mail client <span aria-hidden="true">↗</span></a>
                <button className="button button-secondary" type="button" onClick={copyEmail}>
                  {copyState === "copied" ? "Email copied" : "Copy email"}
                </button>
              </div>
              <p className="contact-copy-status" aria-live="polite">
                {copyState === "copied" ? "SIGNAL COPIED · Email address is on your clipboard." : null}
                {copyState === "unavailable" ? "Clipboard access is unavailable. Select the email address above." : null}
              </p>
            </div>

            <nav className="contact-field-links" aria-label="Professional contact channels">
              <a href={CAREER_LINKS.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Professional profile</strong><i aria-hidden="true">↗</i></a>
              <a href={CAREER_LINKS.github} target="_blank" rel="noreferrer"><span>GitHub</span><strong>Public code record</strong><i aria-hidden="true">↗</i></a>
              <a href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer"><span>Résumé</span><strong>Open canonical PDF</strong><i aria-hidden="true">↗</i></a>
              <a href={PUBLIC_CODE.portfolio.href} target="_blank" rel="noreferrer"><span>View code</span><strong>{PUBLIC_CODE.portfolio.label}</strong><i aria-hidden="true">↗</i></a>
            </nav>

            <footer><i aria-hidden="true" /><span>Open channel · No forms, tracking, or stored contact data</span></footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
