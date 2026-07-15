"use client";

import { useRef, type ReactNode } from "react";
import ScrubVideo, { type ScrubVideoHandle } from "./ScrubVideo";
import AutoVideo from "./AutoVideo";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/hooks";

export type HeroCaption = { at: number; text: string };

type Props = {
  src: string;
  poster: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  /** technical corner label, e.g. "FEED 01 — WINDING HALL" */
  meta?: string;
  /** captions revealed as the scrub passes their `at` progress (0..1) */
  captions?: HeroCaption[];
  /** long = 300vh runway (landing), short = 220vh (sub-pages) */
  length?: "long" | "short";
  scrollHint?: boolean;
};

/**
 * Pinned hero: the section provides a tall scroll runway; the viewport-height
 * inner panel sticks while scroll position drives the video playhead. The
 * intro copy fades out over the first quarter so the footage takes over.
 * Falls back to a static autoplay-loop hero under prefers-reduced-motion.
 */
export default function VideoHero({
  src,
  poster,
  eyebrow,
  title,
  subtitle,
  actions,
  meta,
  captions,
  length = "short",
  scrollHint = true,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const scrub = useRef<ScrubVideoHandle>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const capIndex = useRef(-1);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced) return;
    if (captions?.length && capRef.current) {
      capRef.current.textContent = captions[0].text;
      capIndex.current = 0;
    }
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-fade]", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          scrub.current?.setProgress(p);

          if (p > 0.001 && contentRef.current) {
            const fade = Math.min(1, p / 0.26);
            gsap.set(contentRef.current, {
              opacity: 1 - fade,
              y: -56 * fade,
              pointerEvents: fade > 0.6 ? "none" : "auto",
            });
          }
          if (barRef.current) gsap.set(barRef.current, { scaleX: p });
          if (pctRef.current) {
            pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
          }
          if (captions?.length && capRef.current) {
            let idx = 0;
            for (let i = 0; i < captions.length; i++) {
              if (p >= captions[i].at) idx = i;
            }
            if (idx !== capIndex.current) {
              capIndex.current = idx;
              capRef.current.textContent = captions[idx].text;
              gsap.fromTo(
                capRef.current,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
              );
            }
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, captions]);

  /* ---------- reduced motion: static autoplay hero ---------- */
  if (reduced) {
    return (
      <section className="relative flex min-h-dvh items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <AutoVideo eager src={src} poster={poster} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
          <div className="grid-overlay absolute inset-0 opacity-30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-44 sm:px-8">
          {eyebrow && (
            <p className="tech-label mb-6 flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          )}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
        </div>
      </section>
    );
  }

  /* ---------- scroll-scrub hero ---------- */
  return (
    <section
      ref={root}
      className={`relative ${length === "long" ? "h-[300vh]" : "h-[220vh]"}`}
    >
      <div className="sticky top-0 flex h-dvh items-end overflow-hidden">
        {/* media layer */}
        <div className="absolute inset-0" aria-hidden>
          <ScrubVideo ref={scrub} src={src} poster={poster} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
          <div className="grid-overlay absolute inset-0 opacity-30" />
        </div>

        {/* technical corner labels */}
        <div
          className="pointer-events-none absolute inset-x-0 top-24 z-10 hidden justify-between px-8 md:flex"
          aria-hidden
        >
          <span className="tech-label">{meta ?? "SVASCA / SCRUB FEED"}</span>
          <span className="tech-label flex items-center gap-2">
            <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-green" />
            REC 60076 · 50 Hz
          </span>
        </div>

        {/* intro copy — fades as the scrub takes over */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-44 sm:px-8 md:pb-32"
        >
          {eyebrow && (
            <p data-hero-fade className="tech-label mb-6 flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1
            data-hero-fade
            className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          {subtitle && (
            <p
              data-hero-fade
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {subtitle}
            </p>
          )}
          {actions && (
            <div data-hero-fade className="mt-10 flex flex-wrap gap-4">
              {actions}
            </div>
          )}
        </div>

        {/* scrub readout: caption + timeline */}
        <div
          className="pointer-events-none absolute bottom-8 right-5 z-10 flex flex-col items-end gap-2.5 sm:right-8"
          aria-hidden
        >
          <span ref={capRef} className="tech-label !text-ink" />
          <div className="flex items-center gap-3">
            <span ref={pctRef} className="tech-label tabular-nums !text-cyan">
              000%
            </span>
            <span className="relative block h-px w-24 bg-line sm:w-32">
              <span
                ref={barRef}
                className="absolute inset-0 origin-left bg-cyan"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>

        {scrollHint && (
          <div
            data-hero-fade
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
            aria-hidden
          >
            <span className="tech-label">Scroll to reveal</span>
            <span className="relative block h-12 w-px overflow-hidden bg-line">
              <span className="scroll-dot absolute left-0 top-0 block h-3 w-px bg-cyan" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
