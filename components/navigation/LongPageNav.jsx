"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getDestinationTop(target, navElement) {
  const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  const navHeight = navElement?.getBoundingClientRect().height || 0;
  const anchorGap = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--site-anchor-gap"),
  ) || 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - navHeight - anchorGap);
}

export default function LongPageNav({ items, ariaLabel, className = "", topId }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const update = () => {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
      const navHeight = navRef.current?.offsetHeight ?? 0;
      const marker = headerHeight + navHeight + 28;
      let current = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });
      setActiveId(current.id);

      const start = sections[0].offsetTop;
      const end = sections.at(-1).offsetTop + sections.at(-1).offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start))));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  useEffect(() => {
    let timer;
    const positionHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!items.some((item) => item.id === id)) return;
      const target = document.getElementById(id);
      if (!target) return;

      const placeTarget = () => {
        window.scrollTo({ top: getDestinationTop(target, navRef.current), behavior: "instant" });
        target.focus({ preventScroll: true });
      };

      window.requestAnimationFrame(placeTarget);
      timer = window.setTimeout(placeTarget, 240);
    };

    positionHash();
    window.addEventListener("hashchange", positionHash);
    window.addEventListener("popstate", positionHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", positionHash);
      window.removeEventListener("popstate", positionHash);
    };
  }, [items]);

  const navigate = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    history.pushState(null, "", `#${id}`);
    window.scrollTo({
      top: getDestinationTop(target, navRef.current),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    target.focus({ preventScroll: true });
  };

  const returnToTop = () => {
    const target = document.getElementById(topId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (target) {
      window.scrollTo({
        top: target.offsetTop === 0 ? 0 : getDestinationTop(target, navRef.current),
        behavior: reduceMotion ? "auto" : "smooth",
      });
      target.focus({ preventScroll: true });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`long-page-nav ${className}`.trim()}
        aria-label={ariaLabel}
        style={{ "--reading-progress": progress }}
      >
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
            onClick={(event) => navigate(event, item.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </a>
        ))}
      </nav>
      <button
        className={`back-to-top${progress > 0.12 ? " is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={returnToTop}
      >
        <Image src="/brand/chibi-khaled-header.webp" alt="" width={48} height={48} />
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
