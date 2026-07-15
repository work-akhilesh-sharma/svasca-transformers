"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/hooks";

type Props = {
  value: number;
  /** starting number for the count-up (e.g. 1900 for a year) */
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export default function StatCounter({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  label,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : from);

  useIsoLayoutEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const counter = { val: from };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        onUpdate: () => setDisplay(Math.round(counter.val)),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, value, from]);

  return (
    <div ref={root} className="px-6 py-10 sm:px-8 lg:py-14">
      <p className="font-display text-4xl font-medium tabular-nums tracking-tight text-ink sm:text-5xl lg:text-6xl">
        {prefix}
        {display}
        {suffix && <span className="ml-1 text-cyan">{suffix}</span>}
      </p>
      <p className="tech-label mt-4">{label}</p>
    </div>
  );
}
