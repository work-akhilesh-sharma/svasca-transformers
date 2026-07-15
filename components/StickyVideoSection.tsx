"use client";

import { useRef, useState } from "react";
import ScrubVideo, { type ScrubVideoHandle } from "./ScrubVideo";
import AutoVideo from "./AutoVideo";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/hooks";
import type { Step } from "@/lib/content";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  src: string;
  poster: string;
  meta?: string;
  steps: Step[];
};

/**
 * Sticky video panel whose playhead is driven by progress through the steps
 * column: each step scrolled reveals the next segment of the footage. Steps
 * light up as they cross the viewport centre. On mobile the panel sticks
 * under the header while steps scroll beneath it.
 */
export default function StickyVideoSection({
  id,
  eyebrow,
  title,
  intro,
  src,
  poster,
  meta,
  steps,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const scrub = useRef<ScrubVideoHandle>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      // steps progress drives the video playhead
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 70%",
        end: "bottom 45%",
        onUpdate: (self) => {
          const p = self.progress;
          scrub.current?.setProgress(p);
          if (barRef.current) gsap.set(barRef.current, { scaleX: p });
          if (pctRef.current) {
            pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}%`;
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id={id}
      ref={root}
      data-motion={reduced ? "off" : "on"}
      className="relative border-t border-line bg-bg"
    >
      {/* section header */}
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:pt-28">
        <p className="tech-label flex items-center gap-3 !text-cyan">
          <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {intro}
          </p>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-16">
        {/* sticky media column — sticks under the header on mobile,
            centres in the viewport on desktop */}
        <div className="sticky top-18 z-20 -mx-5 bg-bg px-5 pb-3 pt-4 sm:-mx-8 sm:px-8 lg:top-0 lg:z-auto lg:mx-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:bg-transparent lg:p-0">
          <div className="relative border border-line">
            {/* corner ticks */}
            <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-cyan" aria-hidden />
            <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-cyan" aria-hidden />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-cyan" aria-hidden />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-cyan" aria-hidden />

            {reduced ? (
              <AutoVideo src={src} poster={poster} className="aspect-video max-h-[36vh] w-full lg:max-h-none" />
            ) : (
              <ScrubVideo
                ref={scrub}
                src={src}
                poster={poster}
                className="aspect-video max-h-[36vh] w-full lg:max-h-none"
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3" aria-hidden>
              <span className="tech-label !text-[10px]">{meta ?? "FEED 02"}</span>
              <span className="tech-label flex items-center gap-2 !text-[10px]">
                <span className="blink inline-block h-1 w-1 rounded-full bg-green" />
                SCRUB
              </span>
            </div>
          </div>

          {/* step + scrub readout */}
          <div className="mt-4 flex items-center gap-4 lg:pb-20" aria-hidden>
            <span className="tech-label tabular-nums !text-cyan">
              {steps[active]?.code ?? "01"} / {String(steps.length).padStart(2, "0")}
            </span>
            <div className="flex flex-1 gap-1.5">
              {steps.map((step, i) => (
                <span
                  key={step.code}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= active ? "bg-cyan" : "bg-line-soft"
                  }`}
                />
              ))}
            </div>
            <span className="hidden items-center gap-3 sm:flex">
              <span ref={pctRef} className="tech-label tabular-nums">
                000%
              </span>
              <span className="relative block h-px w-16 bg-line-soft">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left bg-green"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </span>
          </div>
        </div>

        {/* scrolling steps column */}
        <div ref={stepsRef} className="pb-10 pt-6 lg:py-[30vh]">
          {steps.map((step, i) => (
            <article
              key={step.code}
              data-step
              data-active={i === active}
              className="flex min-h-[42vh] flex-col justify-center border-l border-line-soft py-10 pl-6 sm:pl-10 lg:min-h-[56vh]"
            >
              <p className="step-code font-mono text-sm tracking-[0.3em]">
                {step.code}
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
