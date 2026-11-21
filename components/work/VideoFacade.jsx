"use client";

import Image from "next/image";
import { useState } from "react";

// Shows a local poster until the visitor presses play. Only then does the page
// load YouTube's privacy-enhanced player, so nobody who skips the video sends
// a request to Google, and the page stays fast.
export default function VideoFacade({ youtubeId, title, url, poster }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-facade" data-playing={playing ? "true" : "false"}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="video-facade-poster" onClick={() => setPlaying(true)}>
          <Image src={poster.src} alt="" width={poster.width} height={poster.height} sizes="(max-width: 760px) 92vw, 44vw" />
          <span className="video-facade-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
          <span className="video-facade-label">Play: {title}</span>
        </button>
      )}
      <a className="video-facade-link" href={url} target="_blank" rel="noreferrer">
        Watch on YouTube <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
