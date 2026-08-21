"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const COMMANDS = [
  { number: "01", label: "Intro", detail: "Arrival scene", href: "/#arrival", keywords: "home hero start" },
  { number: "02", label: "Profile", detail: "The builder", href: "/#profile", keywords: "about builder" },
  { number: "03", label: "Engineering", detail: "Capabilities", href: "/#engineering", keywords: "hardware software systems" },
  { number: "04", label: "Work", detail: "Project index", href: "/work", keywords: "projects portfolio" },
  { number: "05", label: "Experience", detail: "Field record", href: "/experience", keywords: "career boingo cove" },
  { number: "06", label: "ResetWave", detail: "Automation case study", href: "/work/resetwave", keywords: "python linux ssh" },
  { number: "07", label: "Engineering Lab", detail: "Electronics · logic · CAD", href: "/work/engineering-lab", keywords: "lab circuits logisim fusion oscilloscope" },
  { number: "08", label: "The Cove Dev", detail: "Client web products", href: "/work/the-cove-dev", keywords: "cove website full stack" },
  { number: "09", label: "Résumé", detail: "Open PDF", href: "/resume/khaled-mousa-resume.pdf", external: true, keywords: "resume cv" },
  { number: "10", label: "GitHub", detail: "Code record", href: "https://github.com/KhaledM03", external: true, keywords: "source repositories" },
  { number: "11", label: "LinkedIn", detail: "Professional profile", href: "https://www.linkedin.com/in/thekhaledmousa/", external: true, keywords: "network profile" },
  { number: "12", label: "Contact", detail: "Open email", href: "mailto:khaledmousa216@gmail.com", external: true, keywords: "email talk" },
];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchesCommand(command, query) {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const haystack = normalize(`${command.label} ${command.detail} ${command.keywords}`);
  return terms.every((term) => haystack.includes(term));
}

export default function FieldConsole() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const filteredCommands = useMemo(
    () => COMMANDS.filter((command) => matchesCommand(command, query)),
    [query],
  );

  useEffect(() => {
    const onGlobalKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        restoreFocusRef.current = document.activeElement;
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const obscured = [...document.body.children]
      .filter((element) => !element.classList.contains("field-console-root") && !["SCRIPT", "STYLE"].includes(element.tagName))
      .map((element) => ({ element, inert: element.inert }));
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20);

    document.body.style.overflow = "hidden";
    obscured.forEach(({ element }) => { element.inert = true; });

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      obscured.forEach(({ element, inert }) => { element.inert = inert; });
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  const closeConsole = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const runCommand = (command) => {
    closeConsole();

    if (command.external) {
      if (command.href.startsWith("mailto:")) window.open(command.href, "_self");
      else window.open(command.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (pathname === "/" && command.href.startsWith("/#")) {
      const hash = command.href.slice(1);
      window.dispatchEvent(new CustomEvent("portfolio:navigate", {
        detail: {
          hash,
          behavior: "smooth",
          historyMode: window.location.hash === hash ? "replace" : "push",
        },
      }));
      return;
    }

    router.push(command.href);
  };

  const onDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeConsole();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => {
        if (!filteredCommands.length) return 0;
        return (index + direction + filteredCommands.length) % filteredCommands.length;
      });
      return;
    }

    if (event.key === "Enter" && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...dialogRef.current.querySelectorAll("input, button:not([disabled]), a[href]")];
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

  return (
    <div className="field-console-root">
      <button
        ref={launcherRef}
        className="field-console-launcher"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          restoreFocusRef.current = launcherRef.current;
          setOpen(true);
        }}
        data-signal="OPEN CONSOLE"
      >
        <span aria-hidden="true">◆</span><span className="field-console-label">Field Console</span><kbd>⌘K</kbd>
      </button>

      {open ? (
        <div className="field-console-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeConsole();
        }}>
          <section
            ref={dialogRef}
            className="field-console"
            role="dialog"
            aria-modal="true"
            aria-labelledby="field-console-title"
            onKeyDown={onDialogKeyDown}
          >
            <header className="field-console-header">
              <div>
                <span>Navigation system · Field active</span>
                <h2 id="field-console-title">Field Console</h2>
              </div>
              <button type="button" onClick={closeConsole} aria-label="Close Field Console">
                Esc <span aria-hidden="true">×</span>
              </button>
            </header>

            <label className="field-console-search">
              <span className="sr-only">Filter destinations</span>
              <i aria-hidden="true">⌁</i>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search projects, chapters, or signals…"
                autoComplete="off"
                aria-controls="field-console-results"
                aria-activedescendant={filteredCommands[activeIndex] ? `field-command-${filteredCommands[activeIndex].number}` : undefined}
              />
              <kbd>Ctrl K</kbd>
            </label>

            <div id="field-console-results" className="field-console-results" role="listbox" aria-label="Portfolio destinations">
              {filteredCommands.length ? filteredCommands.map((command, index) => (
                <button
                  id={`field-command-${command.number}`}
                  key={command.number}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? "is-active" : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                >
                  <span>{command.number}</span>
                  <strong>{command.label}</strong>
                  <small>{command.detail}</small>
                  <i aria-hidden="true">{command.external ? "↗" : "→"}</i>
                </button>
              )) : (
                <p className="field-console-empty">No signal found. Try “lab,” “reset,” or “work.”</p>
              )}
            </div>

            <footer className="field-console-footer" aria-hidden="true">
              <span>↑↓ Navigate</span><span>Enter Open</span><span>Esc Close</span>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
