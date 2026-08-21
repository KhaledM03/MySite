"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EvidenceLightbox({ src, alt, width, height, children, className = "", indexLabel }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className={`evidence-zoom ${className}`}
        type="button"
        aria-label={`Inspect evidence — ${alt}`}
        onClick={() => setOpen(true)}
      >
        {children}
        <span className="evidence-zoom-label" aria-hidden="true">Inspect evidence <b>↗</b></span>
      </button>

      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Evidence viewer: ${alt}`} onClick={() => setOpen(false)}>
          <button ref={closeRef} className="lightbox-close" type="button" onClick={() => setOpen(false)}>
            Close <span aria-hidden="true">×</span>
          </button>
          {indexLabel ? <span className="lightbox-index">Evidence {indexLabel}</span> : null}
          <div className="lightbox-image-wrap" onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} width={width} height={height} sizes="96vw" />
          </div>
          <p>{alt}</p>
        </div>
      ) : null}
    </>
  );
}
