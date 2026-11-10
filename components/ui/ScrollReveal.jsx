"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Blocks that enter as one unit. Anything inside the scripted journey, the
// header, or a dialog is left alone: those already have their own motion.
const BLOCK_SELECTOR = [
  "main section > *",
  ".site-shell > section > *",
  ".site-footer > *",
].join(", ");

// Containers whose children should arrive one after another instead of as a slab.
const GROUP_SELECTOR = [
  ".field-brief-signal-grid",
  ".field-brief-proof-list",
  ".home-project-grid",
  ".project-list",
  ".boingo-evidence-grid",
  ".review-rail",
  ".approach-grid",
  ".experience-teaser-evidence",
  ".site-footer-links",
  ".cove-overview-grid",
  ".cove-decision-grid",
  ".cove-evidence-grid",
  ".evidence-grid",
  ".lab-fact-grid",
].join(", ");

const EXCLUDED = ".journey, .site-header, [role='dialog'], .long-page-nav, .case-progress-nav";
const STAGGER_MS = 70;
const MAX_STAGGER = 5;
const SETTLE_MS = 1100;

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const timers = new Set();
    const armed = new Set();

    const release = (element) => {
      armed.delete(element);
      element.removeAttribute("data-reveal");
      element.style.removeProperty("--reveal-delay");
    };

    const reveal = (element, order) => {
      element.style.setProperty("--reveal-delay", `${Math.min(order, MAX_STAGGER) * STAGGER_MS}ms`);
      element.dataset.reveal = "in";
      // Drop the attribute once settled so the element's own hover/focus
      // transitions and positioning context are exactly as authored.
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        release(element);
      }, SETTLE_MS + MAX_STAGGER * STAGGER_MS);
      timers.add(timer);
    };

    const observer = new IntersectionObserver((entries) => {
      let order = 0;
      entries.forEach((entry) => {
        // Also release anything already scrolled past (anchor jumps, End key).
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
        observer.unobserve(entry.target);
        if (entry.isIntersecting) reveal(entry.target, order++);
        else release(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });

    const candidates = [];
    document.querySelectorAll(BLOCK_SELECTOR).forEach((element) => {
      if (element.closest(EXCLUDED)) return;
      if (element.matches(GROUP_SELECTOR)) candidates.push(...element.children);
      else candidates.push(element);
    });

    const viewportHeight = window.innerHeight;
    candidates.forEach((element) => {
      // Only arm what is still below the fold. Content visible at load is never
      // hidden, so there is no flash and no cost to first paint.
      if (element.getBoundingClientRect().top < viewportHeight) return;
      if (element.closest("[data-reveal]")) return;
      element.dataset.reveal = "armed";
      armed.add(element);
      observer.observe(element);
    });

    const releaseAll = () => [...armed].forEach(release);
    const onMotionChange = () => {
      if (reducedMotion.matches) releaseAll();
    };

    reducedMotion.addEventListener("change", onMotionChange);
    window.addEventListener("beforeprint", releaseAll);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("beforeprint", releaseAll);
      document.querySelectorAll("[data-reveal]").forEach(release);
    };
  }, [pathname]);

  return null;
}
