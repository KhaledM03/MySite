"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// How long the pointer has to rest on the poster before a muted preview starts.
const HOVER_DELAY_MS = 1100;

// Shows a local poster until the visitor shows interest. Resting the pointer on
// it starts a muted, looping preview; pressing it plays with sound. Only then
// does the page load YouTube's privacy-enhanced player, so visitors who skip
// the video send nothing to Google.
export default function VideoFacade({ youtubeId, title, url, poster }) {
  const [mode, setMode] = useState("poster");
  const hoverTimerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(hoverTimerRef.current), []);

  const canPreview = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
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
          <Image src={poster.src} alt="" width={poster.width} height={poster.height} sizes="(max-width: 760px) 92vw, 44vw" />
          <span className="video-facade-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
          <span className="video-facade-label">Play: {title}</span>
          <span className="video-facade-hint" aria-hidden="true">Hover to preview</span>
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
      <a className="video-facade-link" href={url} target="_blank" rel="noreferrer">
        Watch on YouTube <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
