import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import VideoHero from "@/components/VideoHero";
import StickyVideoSection from "@/components/StickyVideoSection";
import ProductSwitcher from "@/components/ProductSwitcher";
import Reveal from "@/components/Reveal";
import FooterCTA from "@/components/FooterCTA";
import { VIDEOS, energyFlowSteps, productFamilies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products — SVASCA Industries",
  description:
    "Power transformers up to 20 MVA / 66 kV, distribution transformers up to 33 kV, VPI dry type, unitized sub-stations, and special application transformers.",
};

/* first two families render wide, the rest standard */
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export default function ProductsPage() {
  return (
    <>
      <VideoHero
        src={VIDEOS.exploded.src}
        poster={VIDEOS.exploded.poster}
        eyebrow="Product range"
        title={
          <>
            Engineered for{" "}
            <span className="bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
              every load profile
            </span>
          </>
        }
        subtitle="From 66 kV grid-class power transformers to packaged sub-stations and engineered-to-order special units — one manufacturer, one quality system."
        meta="FEED 02 — UNIT ASSEMBLY"
        length="short"
        captions={[
          { at: 0, text: "SEQ 01 — Assembled unit" },
          { at: 0.4, text: "SEQ 02 — Component separation" },
          { at: 0.75, text: "SEQ 03 — Active part exposed" },
        ]}
        actions={
          <a href="#families" className="btn btn-ghost">
            View product families
            <ArrowDown size={14} aria-hidden />
          </a>
        }
      />

      {/* product family modules */}
      <section id="families" className="border-t border-line bg-bg-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Product families
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Five families. One standard.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line-soft bg-line-soft lg:grid-cols-6">
            {productFamilies.map((family, i) => (
              <Reveal key={family.id} delay={(i % 3) * 0.08} className={`bg-bg-deep ${SPANS[i]}`}>
                <article className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-panel/60 sm:p-9">
                  <span
                    className="absolute right-6 top-6 font-display text-5xl font-medium text-line-soft transition-colors duration-300 group-hover:text-line sm:text-6xl"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <span className="tech-label !text-cyan">{family.code}</span>
                  <h3 className="mt-4 max-w-[80%] font-display text-2xl font-medium tracking-tight text-ink">
                    {family.name}
                  </h3>
                  <p className="mt-2 text-sm text-green">{family.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {family.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-6">
                    {family.specs.slice(0, 3).map((spec) => (
                      <span
                        key={spec.label}
                        className="border border-line-soft px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
                      >
                        {spec.value}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#specs"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan transition-colors hover:text-green"
                  >
                    View specifications
                    <ArrowDown size={12} aria-hidden />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* interactive spec panel */}
      <section id="specs" className="border-t border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Specification console
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Select a category. Read the numbers.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ProductSwitcher />
          </Reveal>
        </div>
      </section>

      <StickyVideoSection
        id="energy-flow"
        eyebrow="Energy flow"
        title="Seven stages between grid and load"
        intro="Follow the path energy takes through a SVASCA transformer — and the engineering decisions at each stage."
        src={VIDEOS.exploded.src}
        poster={VIDEOS.exploded.poster}
        meta="FEED 03 — EXPLODED VIEW"
        steps={energyFlowSteps}
      />

      <section className="border-t border-line-soft bg-bg-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
            Need a rating that isn&apos;t on this page?
          </p>
          <Link href="/manufacturing#contact" className="btn btn-primary shrink-0">
            Talk to engineering
          </Link>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
