"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  /** Eager videos (heroes) start loading immediately; others wait for viewport. */
  eager?: boolean;
  className?: string;
};

/**
 * Autoplaying, muted, looping video that plays only while near the viewport.
 * Shows a scanning-placeholder while loading and a technical fallback if the
 * media file is missing.
 */
export default function AutoVideo({ src, poster, eager = false, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [failed]);

  if (failed) {
    return (
      <div className={`relative overflow-hidden bg-raised ${className}`}>
        <div className="grid-overlay absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="tech-label">
            <span className="blink mr-3 inline-block h-1.5 w-1.5 bg-green align-middle" />
            feed offline — media unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-raised ${className}`}>
      {!ready && (
        <div
          className="media-loading"
          style={poster ? { backgroundImage: `url(${poster})` } : undefined}
          aria-hidden
        />
      )}
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={eager}
        preload={eager ? "auto" : "none"}
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
}
