import type { Metadata } from "next";
import { Award, FlaskConical, Leaf, MapPin, ShieldCheck } from "lucide-react";
import VideoHero from "@/components/VideoHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/Reveal";
import { CONTACT, tests, VIDEOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manufacturing & Quality — SVASCA Industries",
  description:
    "In-house manufacturing from CRGO processing to final testing at Palwal, Haryana and Rudrapur, Uttarakhand. BIS certified, BEE approved, NABL type-tested.",
};

const KIND_LABEL: Record<string, string> = {
  RT: "Routine",
  TT: "Type",
  ST: "Special",
};

const TRUST = [
  {
    icon: ShieldCheck,
    title: "BIS Certified",
    body: "Licensed by the Bureau of Indian Standards — every marked unit is built and audited to the applicable IS specification.",
  },
  {
    icon: Leaf,
    title: "BEE Approved",
    body: "Energy-efficient designs approved by the Bureau of Energy Efficiency, with star-rated distribution transformers in serial production.",
  },
  {
    icon: FlaskConical,
    title: "NABL Type-Tested",
    body: "Type and special tests performed at NABL-accredited national laboratories — CPRI, ERDA, and NTH — with certificates supplied on delivery.",
  },
  {
    icon: Award,
    title: "In-House Quality System",
    body: "ISO-aligned quality management across both plants: incoming material QC, stage inspections, calibrated instruments, and full traceability.",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <VideoHero
        src={VIDEOS.manufacturing.src}
        poster={VIDEOS.manufacturing.poster}
        eyebrow="Manufacturing & quality"
        title={
          <>
            Precision manufacturing,{" "}
            <span className="bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
              end to end
            </span>
          </>
        }
        subtitle="Every core process — from copper wire drawing to final paint — runs inside our own plants at Palwal and Rudrapur, under one quality system."
        meta="FEED 04 — FOUNDRY LINE"
        length="short"
        captions={[
          { at: 0, text: "SEQ 01 — Molten copper" },
          { at: 0.4, text: "SEQ 02 — Continuous casting" },
          { at: 0.75, text: "SEQ 03 — Precision forming" },
        ]}
      />

      {/* process timeline */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Production sequence
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Ten stages. Zero outsourcing of the critical path.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Raw material to dispatch — the full sequence runs in-house, so
              quality is controlled where it is created, not inspected in later.
            </p>
          </Reveal>
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* testing */}
      <section className="border-t border-line bg-bg-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Test protocol
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Proven before it ships.
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {Object.entries(KIND_LABEL).map(([kind, label]) => (
                <span key={kind} className="tech-label flex items-center gap-2">
                  <span
                    className={`inline-block h-1.5 w-1.5 rotate-45 ${
                      kind === "RT" ? "bg-cyan" : kind === "TT" ? "bg-green" : "bg-blue"
                    }`}
                    aria-hidden
                  />
                  {kind} — {label} test
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test, i) => (
              <Reveal key={test.code} delay={(i % 3) * 0.05} className="bg-bg-deep">
                <div className="flex h-full items-center justify-between gap-4 p-5 transition-colors duration-300 hover:bg-panel/60 sm:p-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                      {test.code}
                    </span>
                    <span className="text-sm font-medium text-ink">{test.name}</span>
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-1 font-mono text-[10px] tracking-[0.2em] ${
                      test.kind === "RT"
                        ? "border-cyan/40 text-cyan"
                        : test.kind === "TT"
                          ? "border-green/40 text-green"
                          : "border-blue/60 text-[#4fb3e8]"
                    }`}
                  >
                    {test.kind}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* trust */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Certifications & accreditation
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Trust, documented.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.08} className="bg-bg">
                <article className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-panel/60">
                  <span className="flex h-11 w-11 items-center justify-center border border-line text-green">
                    <item.icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="relative overflow-hidden border-t border-line bg-bg-deep scroll-mt-20">
        <div className="grid-overlay absolute inset-0 opacity-40" aria-hidden />
        <div className="glow-radial absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="tech-label flex items-center gap-3 !text-cyan">
              <span className="inline-block h-px w-10 bg-cyan" aria-hidden />
              Contact
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {CONTACT.company}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line-soft bg-line-soft lg:grid-cols-3">
            {[CONTACT.unit1, CONTACT.unit2].map((unit) => (
              <Reveal key={unit.label} className="bg-bg-deep">
                <div className="flex h-full flex-col p-7 sm:p-8">
                  <span className="flex items-center gap-3">
                    <MapPin size={16} className="text-cyan" aria-hidden />
                    <span className="tech-label !text-cyan">{unit.label}</span>
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{unit.address}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.1} className="bg-bg-deep">
              <div className="flex h-full flex-col justify-between gap-6 p-7 sm:p-8">
                <div>
                  <span className="tech-label !text-cyan">Write to us</span>
                  <div className="mt-4 space-y-2">
                    {CONTACT.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block font-mono text-sm text-ink transition-colors hover:text-cyan"
                      >
                        {email}
                      </a>
                    ))}
                    <p className="pt-2 font-mono text-sm text-muted">{CONTACT.website}</p>
                  </div>
                </div>
                <a href={`mailto:${CONTACT.emails[0]}?subject=Quote%20request`} className="btn btn-primary">
                  Request Quote
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
