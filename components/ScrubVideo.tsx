"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type ScrubVideoHandle = {
  /** Target progress 0..1 — the video seeks smoothly toward it. */
  setProgress: (p: number) => void;
};

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Per-tick lerp factor toward the target time (higher = snappier). */
  smoothing?: number;
};

/**
 * A video whose playhead is driven externally (scroll), not by playback.
 * The parent feeds progress via ref; a GSAP ticker lerps currentTime toward
 * it so scrubbing feels damped instead of stuttery. Sources are encoded with
 * dense keyframes (g=4) specifically so these seeks are cheap.
 */
const ScrubVideo = forwardRef<ScrubVideoHandle, Props>(function ScrubVideo(
  { src, poster, className = "", smoothing = 0.16 },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const state = useRef({ target: 0, current: 0, duration: 0 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (p: number) => {
        state.current.target = Math.min(1, Math.max(0, p));
      },
    }),
    [],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      state.current.duration = video.duration || 0;
      // nudge the decoder so the first frame paints without play()
      try {
        video.currentTime = 0.001;
      } catch {}
      setReady(true);
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // plain rAF loop (not gsap.ticker) so scrubbing cannot be affected by
    // ticker sleep states or instance mismatches
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const s = state.current;
      if (!s.duration) return;
      s.current += (s.target - s.current) * smoothing;
      const t = s.current * s.duration;
      // skip micro-seeks and never queue a seek on top of a pending one
      if (!video.seeking && Math.abs(video.currentTime - t) > 1 / 48) {
        video.currentTime = t;
      }
    };
    rafId = requestAnimationFrame(tick);

    // start buffering the full file only once the section approaches
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          video.load();
          io.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    io.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [smoothing]);

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
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
});

export default ScrubVideo;
