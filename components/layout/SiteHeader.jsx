"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CANONICAL_RESUME } from "@/data/career";

const links = [
  { label: "Work", href: "/work", isCurrent: (pathname) => pathname.startsWith("/work") },
  { label: "Experience", href: "/experience", isCurrent: (pathname) => pathname === "/experience" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const wordmarkRef = useRef(null);
  const restoreMenuFocusRef = useRef(true);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      navRef.current?.querySelector("a[href]")?.focus();
    }, 200);
    // Everything behind the open menu becomes inert so focus and screen
    // readers stay inside it.
    const obscuredContent = [...document.querySelectorAll(".site-shell > :not(.site-header)")]
      .map((element) => ({ element, inert: element.inert }));
    const getFocusableItems = () => [
      wordmarkRef.current,
      ...(navRef.current?.querySelectorAll("a[href], button") ?? []),
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

  const closeForNavigation = () => {
    restoreMenuFocusRef.current = false;
    setOpen(false);
  };

  return (
    <header className="site-header" aria-label="Site">
      <Link ref={wordmarkRef} className="wordmark" href="/" onClick={closeForNavigation}>
        <span className="wordmark-mark" aria-hidden="true">
          <Image className="wordmark-image" src="/brand/chibi-khaled-header.webp" alt="" width={64} height={64} priority sizes="(max-width: 760px) 32px, 36px" />
        </span>
        <span className="wordmark-name">Khaled Mousa</span>
      </Link>

      <nav
        ref={navRef}
        id="primary-navigation"
        className={`chapter-nav${open ? " is-open" : ""}`}
        aria-label="Main"
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={link.isCurrent(pathname) ? "page" : undefined}
            onClick={closeForNavigation}
          >
            {link.label}
          </Link>
        ))}
        <a href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer" onClick={closeForNavigation}>
          Résumé <span className="sr-only">(PDF, opens in a new tab)</span>
        </a>
        <button
          type="button"
          className="mobile-nav-contact"
          data-contact-trigger
          onClick={closeForNavigation}
        >
          Contact
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

      <button className="header-cta" type="button" data-contact-trigger>
        Contact
      </button>
    </header>
  );
}
