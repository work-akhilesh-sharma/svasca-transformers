"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/hooks";
import { processStages } from "@/lib/content";

export default function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 55%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className="relative">
      {/* rail */}
      <div className="absolute bottom-0 left-4 top-0 w-px bg-line-soft sm:left-6" aria-hidden>
        <div
          data-progress
          className="h-full w-px origin-top bg-gradient-to-b from-cyan to-green"
          style={{ transform: reduced ? undefined : "scaleY(0)" }}
        />
      </div>

      <ol className="space-y-4">
        {processStages.map((stage) => (
          <li
            key={stage.code}
            data-stage
            className="relative ml-12 border border-line-soft bg-raised/40 p-6 transition-colors duration-300 hover:border-line sm:ml-16 sm:p-8"
          >
            {/* node on the rail */}
            <span
              className="absolute -left-[2.55rem] top-9 h-2 w-2 rotate-45 border border-cyan bg-bg sm:-left-[2.8rem]"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm tracking-[0.25em] text-cyan">
                  {stage.code}
                </span>
                <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {stage.title}
                </h3>
              </div>
              <span className="tech-label border border-line-soft px-2.5 py-1 !text-[10px]">
                {stage.tag}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {stage.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
