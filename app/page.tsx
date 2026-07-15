import Link from "next/link";
import { ArrowRight, Factory, Gauge, ShieldCheck } from "lucide-react";
import VideoHero from "@/components/VideoHero";
import StickyVideoSection from "@/components/StickyVideoSection";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/Reveal";
import FooterCTA from "@/components/FooterCTA";
import { VIDEOS, deliverySteps } from "@/lib/content";

const BENEFITS = [
  {
    code: "B-01",
    icon: Gauge,
    title: "Efficient",
    body: "BEE-approved energy-efficient designs with low no-load losses, high power factor performance, and reduced temperature levels — losses cost money for thirty years; ours are engineered down from day one.",
    points: ["BEE star-rated designs", "Low / no-load loss cores", "Low noise, compact build"],
  },
  {
    code: "B-02",
    icon: ShieldCheck,
    title: "Tested",
    body: "Type-tested at NABL-accredited laboratories — CPRI, ERDA, and NTH — and routine-tested in-house on every unit before dispatch. Certification is the floor, not the ceiling.",
    points: ["BIS certified", "CPRI · ERDA · NTH type tests", "Full routine test sequence"],
  },
  {
    code: "B-03",
    icon: Factory,
    title: "Built In-House",
    body: "Wire drawing, CRGO processing, winding, tank fabrication, oil centrifuging, testing, and painting all happen inside our own plants — one quality system from raw material to dispatch.",
    points: ["2 manufacturing units", "In-house design & testing", "Timely, scheduled delivery"],
  },
];

export default function Home() {
  return (
    <>
      <VideoHero
        src={VIDEOS.energyFlow.src}
        poster={VIDEOS.energyFlow.poster}
        eyebrow="BIS-certified transformer manufacturer"
        title={
          <>
            Powering reliable{" "}
            <span className="bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
              energy infrastructure
            </span>{" "}
            since 1997
          </>
        }
        subtitle="BIS-certified power and distribution transformers engineered for efficiency, safety, and long service life."
        meta="FEED 01 — WINDING HALL"
        length="long"
        captions={[
          { at: 0, text: "SEQ 01 — Copper windings, drawn in-house" },
          { at: 0.35, text: "SEQ 02 — Field energised" },
          { at: 0.7, text: "SEQ 03 — Energy in flow" },
        ]}
        scrollHint
        actions={
          <>
            <Link href="/products" className="btn btn-primary">
              Explore Transformers
              <ArrowRight size={14} aria-hidden />
            </Link>
            <Link href="/manufacturing#contact" className="btn btn-ghost">
              Request Demo
            </Link>
          </>
        }
      />

      {/* stats band */}
      <section
        className="relative border-t border-line bg-bg-deep"
        aria-label="Company statistics"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line-soft border-x border-line-soft lg:grid-cols-4">
          <StatCounter value={1997} from={1900} label="Operational since" />
          <StatCounter value={20} suffix="MVA" label="Power rating up to" />
          <StatCounter value={66} suffix="kV" label="Voltage class" />
          <StatCounter value={2} label="Manufacturing units" />
        </div>
      </section>

      <StickyVideoSection
        eyebrow="How we deliver"
        title="From grid demand to engineered delivery"
        intro="Every unit follows one controlled path — specified, designed, built, and proven before it ever sees load."
        src={VIDEOS.exploded.src}
        poster={VIDEOS.exploded.poster}
        meta="FEED 02 — UNIT ASSEMBLY"
        steps={deliverySteps}
      />

      {/* benefits */}
      <section className="relative border-t border-line bg-bg-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Why SVASCA
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Engineered for the long service life.
            </h2>
          </Reveal>

          {/* schematic connector */}
          <svg
            className="mt-12 hidden h-6 w-full lg:block"
            viewBox="0 0 1200 24"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="12" x2="1200" y2="12" stroke="var(--line-soft)" />
            <line x1="0" y1="12" x2="1200" y2="12" stroke="var(--cyan)" strokeOpacity="0.5" className="dash-flow" />
            {[200, 600, 1000].map((x) => (
              <rect key={x} x={x - 4} y="8" width="8" height="8" transform={`rotate(45 ${x} 12)`} stroke="var(--cyan)" fill="var(--bg)" />
            ))}
          </svg>

          <div className="mt-8 grid gap-px border border-line-soft bg-line-soft md:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.code} delay={i * 0.1} className="bg-bg-deep">
                <article className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-panel/60 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-line text-cyan">
                      <benefit.icon size={20} aria-hidden />
                    </span>
                    <span className="tech-label">{benefit.code}</span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-medium tracking-tight text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {benefit.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-6">
                    {benefit.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 font-mono text-xs text-muted">
                        <span className="inline-block h-1 w-1 rotate-45 bg-green" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
