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

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const workIsCurrent = pathname.startsWith("/work");
  const experienceIsCurrent = pathname === "/experience";

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
      <Link className="wordmark" href="/#arrival" onClick={(event) => navigateToHomeChapter(event, "/#arrival")}>
        <span className="wordmark-mark" aria-hidden="true">
          <Image className="wordmark-image" src="/brand/chibi-khaled-header.webp" alt="" width={64} height={64} priority sizes="(max-width: 760px) 32px, 36px" />
        </span>
        <span className="wordmark-name">Khaled Mousa</span>
      </Link>

      <nav
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
