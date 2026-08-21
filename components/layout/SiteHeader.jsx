"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Intro", href: "/#arrival", section: "home" },
  { label: "Profile", href: "/#profile", section: "home" },
  { label: "Engineering", href: "/#engineering", section: "home" },
  { label: "Work", href: "/work", section: "work" },
  { label: "Experience", href: "/experience", section: "experience" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const wordmarkRef = useRef(null);
  const restoreMenuFocusRef = useRef(true);
  const pendingHomeNavigationRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      navRef.current?.querySelector("a[href]")?.focus();
    }, 200);
    const obscuredContent = [...document.querySelectorAll("main > :not(.site-header)")]
      .map((element) => ({ element, inert: element.inert }));
    const getFocusableItems = () => [
      wordmarkRef.current,
      ...(navRef.current?.querySelectorAll("a[href]") ?? []),
      menuButton,
    ].filter((element) => element && !element.hasAttribute("disabled"));
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreMenuFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableItems = getFocusableItems();
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    obscuredContent.forEach(({ element }) => {
      element.inert = true;
    });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      obscuredContent.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      window.removeEventListener("keydown", onKeyDown);
      if (restoreMenuFocusRef.current) menuButton?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (open || !pendingHomeNavigationRef.current) return undefined;
    const detail = pendingHomeNavigationRef.current;
    pendingHomeNavigationRef.current = null;
    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail }));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const workIsCurrent = pathname.startsWith("/work");
  const experienceIsCurrent = pathname === "/experience";

  const navigateToHomeChapter = (event, href) => {
    const menuWasOpen = open;
    restoreMenuFocusRef.current = false;
    setOpen(false);
    if (pathname !== "/") return;

    event.preventDefault();
    const hash = href.slice(href.indexOf("#"));
    const detail = {
      hash,
      behavior: "smooth",
      historyMode: window.location.hash === hash ? "replace" : "push",
    };

    if (menuWasOpen) pendingHomeNavigationRef.current = detail;
    else window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail }));
  };

  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link ref={wordmarkRef} className="wordmark" href="/#arrival" onClick={(event) => navigateToHomeChapter(event, "/#arrival")}>
        <span className="wordmark-mark" aria-hidden="true">
          <Image className="wordmark-image" src="/brand/chibi-khaled-header.webp" alt="" width={64} height={64} priority sizes="(max-width: 760px) 32px, 36px" />
        </span>
        <span className="wordmark-name">Khaled Mousa</span>
      </Link>

      <nav
        ref={navRef}
        id="primary-navigation"
        className={`chapter-nav${open ? " is-open" : ""}`}
        aria-label="Portfolio chapters"
      >
        {links.map((link) => {
          const current = (link.section === "work" && workIsCurrent)
            || (link.section === "experience" && experienceIsCurrent);
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={(event) => link.section === "home"
                ? navigateToHomeChapter(event, link.href)
                : (() => {
                  restoreMenuFocusRef.current = false;
                  setOpen(false);
                })()}
            >
              {link.label}
            </Link>
          );
        })}
        <button
          type="button"
          className="mobile-nav-contact"
          data-contact-trigger
          data-signal="OPEN CONTACT"
          onClick={() => {
            restoreMenuFocusRef.current = false;
            setOpen(false);
          }}
        >
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </button>
      </nav>

      <button
        ref={menuButtonRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => {
          if (open) restoreMenuFocusRef.current = true;
          setOpen((value) => !value);
        }}
      >
        <span className="nav-toggle-label">{open ? "Close" : "Menu"}</span>
        <span className="nav-toggle-icon" aria-hidden="true"><i /><i /></span>
      </button>

      <button className="header-cta" type="button" data-contact-trigger data-magnetic data-signal="OPEN CONTACT">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </button>
    </header>
  );
}
