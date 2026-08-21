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
    let frame = 0;

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

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
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

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <>
      <nav
        ref={navRef}
        className={`long-page-nav ${className}`.trim()}
        aria-label={ariaLabel}
        style={{ "--reading-progress": progress, "--section-count": items.length }}
      >
        <div className="long-page-nav-compact" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <strong>{activeItem?.label}</strong>
          <i><b /></i>
        </div>
        <div className="long-page-nav-links">
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
        </div>
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
