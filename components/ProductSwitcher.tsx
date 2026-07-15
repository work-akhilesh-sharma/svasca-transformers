"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/hooks";
import { productFamilies } from "@/lib/content";

export default function ProductSwitcher() {
  const [activeId, setActiveId] = useState(productFamilies[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const reduced = useReducedMotion();

  const active =
    productFamilies.find((p) => p.id === activeId) ?? productFamilies[0];

  useIsoLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduced || !panelRef.current) return;
    const tween = gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
    return () => {
      tween.kill();
    };
  }, [activeId, reduced]);

  return (
    <div className="grid gap-px border border-line bg-line-soft lg:grid-cols-[minmax(260px,1fr)_2fr]">
      {/* category selector */}
      <div
        role="tablist"
        aria-label="Product categories"
        aria-orientation="vertical"
        className="flex overflow-x-auto bg-bg lg:flex-col lg:overflow-visible"
      >
        {productFamilies.map((family) => {
          const selected = family.id === activeId;
          return (
            <button
              key={family.id}
              role="tab"
              id={`tab-${family.id}`}
              aria-selected={selected}
              aria-controls="product-spec-panel"
              onClick={() => setActiveId(family.id)}
              className={`group flex min-h-[64px] shrink-0 cursor-pointer items-center gap-4 border-b border-line-soft px-5 py-5 text-left transition-colors last:border-b-0 lg:px-7 ${
                selected ? "bg-panel" : "hover:bg-raised/60"
              }`}
            >
              <span
                className={`font-mono text-[11px] tracking-[0.2em] ${
                  selected ? "text-cyan" : "text-faint"
                }`}
              >
                {family.code}
              </span>
              <span
                className={`whitespace-nowrap font-display text-sm font-medium tracking-tight sm:text-base ${
                  selected ? "text-ink" : "text-muted group-hover:text-ink"
                }`}
              >
                {family.name}
              </span>
              <span
                className={`ml-auto hidden h-1.5 w-1.5 rounded-full lg:block ${
                  selected ? "bg-green" : "bg-transparent"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* spec panel */}
      <div
        id="product-spec-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="bg-bg p-6 sm:p-10"
      >
        <div ref={panelRef}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {active.name}
            </h3>
            <span className="tech-label !text-cyan">{active.code}</span>
          </div>
          <p className="mt-2 text-sm text-green">{active.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {active.description}
          </p>

          <dl className="mt-8">
            {active.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-6 border-b border-line-soft py-3.5"
              >
                <dt className="tech-label">{spec.label}</dt>
                <dd className="text-right font-display text-sm font-medium tabular-nums text-ink sm:text-base">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {active.features.map((feature) => (
              <li
                key={feature}
                className="border border-line-soft px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
              >
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/manufacturing#contact"
            className="btn btn-ghost mt-10 !px-5 !py-3"
          >
            Request quote
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
