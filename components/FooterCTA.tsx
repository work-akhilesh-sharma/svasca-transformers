import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/content";

export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-bg-deep">
      <div className="grid-overlay absolute inset-0 opacity-40" aria-hidden />
      <div className="glow-radial absolute inset-0" aria-hidden />
      <Reveal className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <p className="tech-label !text-cyan">Ready when the grid is</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          Specify your next transformer with the team that builds it.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Share your load profile and site conditions — our engineering team
          responds with a designed, priced, and scheduled proposal.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/manufacturing#contact" className="btn btn-primary">
            Request Quote
            <ArrowRight size={14} aria-hidden />
          </Link>
          <a
            href={`mailto:${CONTACT.emails[0]}`}
            className="btn btn-ghost !normal-case !tracking-wide"
          >
            {CONTACT.emails[0]}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
