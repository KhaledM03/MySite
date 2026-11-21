"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// How long the pointer has to rest on the poster before a muted preview starts.
const HOVER_DELAY_MS = 1100;

// Shows a local poster until the visitor shows interest. Resting the pointer on
// it starts a muted, looping preview; pressing it plays with sound. Only then
// does the page load YouTube's privacy-enhanced player, so visitors who skip
// the video send nothing to Google.
export default function VideoFacade({
  youtubeId,
  title,
  url,
  poster,
  overlay = null,
  loop = null,
  sizes = "(max-width: 760px) 92vw, 44vw",
  priority = false,
}) {
  const [mode, setMode] = useState("poster");
  const hoverTimerRef = useRef(0);
  const loopRef = useRef(null);

  useEffect(() => () => window.clearTimeout(hoverTimerRef.current), []);

  // The silent loop plays only while it is on screen, and never for people
  // who asked for reduced motion; they see its first frame instead.
  useEffect(() => {
    const video = loopRef.current;
    if (!video || mode !== "poster") return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [mode]);

  // With a local loop already playing, a second muted YouTube preview on hover
  // would add nothing, so only posters get the hover preview.
  const canPreview = () =>
    !loop
    && window.matchMedia("(hover: hover) and (pointer: fine)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startHover = () => {
    if (mode !== "poster" || !canPreview()) return;
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setMode("preview"), HOVER_DELAY_MS);
  };

  const cancelHover = () => window.clearTimeout(hoverTimerRef.current);

  const params = mode === "preview"
    ? `autoplay=1&mute=1&loop=1&playlist=${youtubeId}&rel=0&playsinline=1`
    : "autoplay=1&rel=0&playsinline=1";

  return (
    <div className="video-facade" data-mode={mode}>
      {mode === "poster" ? (
        <button
          type="button"
          className="video-facade-poster"
          onClick={() => {
            cancelHover();
            setMode("playing");
          }}
          onPointerEnter={startHover}
          onPointerLeave={cancelHover}
        >
          {/* A short self-hosted clip, when there is one, loops silently in
              place of the poster. It needs nothing from YouTube. */}
          {loop ? (
            <video ref={loopRef} className="video-facade-loop" src={loop} poster={poster.src} muted loop playsInline preload="none" aria-hidden="true" />
          ) : (
            <Image src={poster.src} alt="" width={poster.width} height={poster.height} sizes={sizes} priority={priority} />
          )}
          <span className="video-facade-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
          <span className="video-facade-label">Play: {title}</span>
          {loop ? null : <span className="video-facade-hint" aria-hidden="true">Hover to preview</span>}
        </button>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      {mode !== "playing" ? overlay : null}
      <a className="video-facade-link" href={url} target="_blank" rel="noreferrer">
        Watch on YouTube <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
