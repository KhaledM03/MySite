"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Intro", href: "/#arrival", section: "home" },
  { label: "Profile", href: "/#profile", section: "home" },
  { label: "Engineering", href: "/#engineering", section: "home" },
  { label: "Work", href: "/work", section: "work" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const workIsCurrent = pathname.startsWith("/work");

  const navigateToHomeChapter = (event, href) => {
    setOpen(false);
    if (pathname !== "/") return;

    event.preventDefault();
    const hash = href.slice(href.indexOf("#"));
    window.dispatchEvent(new CustomEvent("portfolio:navigate", {
      detail: {
        hash,
        behavior: "smooth",
        historyMode: window.location.hash === hash ? "replace" : "push",
      },
    }));
  };

  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link className="wordmark" href="/">
        <span className="wordmark-mark">KM</span>
        <span className="wordmark-name">Khaled Mousa</span>
      </Link>

      <nav
        id="primary-navigation"
        className={`chapter-nav${open ? " is-open" : ""}`}
        aria-label="Portfolio chapters"
      >
        {links.map((link) => {
          const current = link.section === "work" && workIsCurrent;
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={(event) => link.section === "home"
                ? navigateToHomeChapter(event, link.href)
                : setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <a className="mobile-nav-contact" href="mailto:khaledmousa216@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <button
        ref={menuButtonRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-label">{open ? "Close" : "Menu"}</span>
        <span className="nav-toggle-icon" aria-hidden="true"><i /><i /></span>
      </button>

      <a className="header-cta" href="mailto:khaledmousa216@gmail.com">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
