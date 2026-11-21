"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gallery } from "@/data/gallery";

// A bento grid of real photos. Pressing one opens it larger in a dialog; where
// the browser supports view transitions, the photo grows out of its tile.
export default function Gallery() {
  const dialogRef = useRef(null);
  const tileRefs = useRef([]);
  const swipeRef = useRef(null);
  const [active, setActive] = useState(-1);
  const item = active >= 0 ? gallery[active] : null;

  const canAnimate = () =>
    typeof document.startViewTransition === "function"
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const open = (index) => {
    const tile = tileRefs.current[index];
    const show = () => {
      if (tile) tile.style.viewTransitionName = "";
      flushSync(() => setActive(index));
      dialogRef.current?.showModal();
    };
    if (!canAnimate() || !tile) return show();
    tile.style.viewTransitionName = "gallery-photo";
    document.startViewTransition(show);
  };

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    const tile = tileRefs.current[active];
    const hide = () => {
      dialog.close();
      if (tile) tile.style.viewTransitionName = "gallery-photo";
    };
    if (!canAnimate() || !tile) {
      dialog.close();
      return;
    }
    const transition = document.startViewTransition(hide);
    transition.finished.finally(() => { tile.style.viewTransitionName = ""; });
  }, [active]);

  const step = useCallback((delta) => {
    setActive((current) => (current + delta + gallery.length) % gallery.length);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onClose = () => {
      const index = active;
      setActive(-1);
      tileRefs.current[index]?.focus({ preventScroll: true });
    };
    dialog?.addEventListener("close", onClose);
    return () => dialog?.removeEventListener("close", onClose);
  }, [active]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    if (event.key === "Escape") { event.preventDefault(); close(); }
  };

  // Swipe sideways on touch screens to move between photos.
  const onPointerDown = (event) => { swipeRef.current = event.clientX; };
  const onPointerUp = (event) => {
    if (swipeRef.current === null) return;
    const dx = event.clientX - swipeRef.current;
    swipeRef.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <section id="gallery" className="home-section gallery" aria-labelledby="gallery-title">
      <header className="home-section-header">
        <h2 id="gallery-title">On the bench</h2>
        <p>Real photos from labs, builds, and the internship. Tap one to look closer.</p>
      </header>

      <ul className="gallery-grid">
        {gallery.map((photo, index) => (
          <li key={photo.id} className={`gallery-tile gallery-${photo.shape}`}>
            <button
              type="button"
              ref={(element) => { tileRefs.current[index] = element; }}
              onClick={() => open(index)}
              aria-label={`Open photo: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
              />
              <span className="gallery-tag" aria-hidden="true">{photo.tag}</span>
              <span className="gallery-caption" aria-hidden="true">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-label={item ? `Photo ${active + 1} of ${gallery.length}` : "Photo viewer"}
        onKeyDown={onKeyDown}
        onClick={(event) => { if (event.target === dialogRef.current) close(); }}
      >
        {item ? (
          <figure onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <div className="gallery-dialog-frame" style={{ "--photo-max": `${Math.round(item.width * 1.25)}px`, "--ar": item.width / item.height, aspectRatio: `${item.width} / ${item.height}` }}>
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="92vw"
                style={{ viewTransitionName: "gallery-photo" }}
              />
            </div>
            <figcaption>
              <span className="gallery-count">{String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
              {item.caption}
            </figcaption>
          </figure>
        ) : null}
        <div className="gallery-dialog-controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo"><span aria-hidden="true">→</span></button>
          <button type="button" className="gallery-close" onClick={close} aria-label="Close photo viewer"><span aria-hidden="true">✕</span></button>
        </div>
      </dialog>
    </section>
  );
}
