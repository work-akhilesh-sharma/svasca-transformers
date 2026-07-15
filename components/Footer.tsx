import Link from "next/link";
import { CONTACT } from "@/lib/content";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/manufacturing#contact", label: "Contact" },
];

const FAMILIES = [
  "Power Transformers",
  "Distribution Transformers",
  "VPI Dry Type Transformers",
  "Unitized Sub-stations",
  "Special Transformers",
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.14em]">SVASCA</p>
          <p className="tech-label mt-1 !text-[9px] !tracking-[0.3em]">
            Industries (India) Ltd.
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            BIS-certified power and distribution transformers, designed, built,
            and tested in-house since 1997.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="tech-label mb-5">Navigate</p>
          <ul className="space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-cyan"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="tech-label mb-5">Products</p>
          <ul className="space-y-3">
            {FAMILIES.map((f) => (
              <li key={f}>
                <Link
                  href="/products"
                  className="text-sm text-muted transition-colors hover:text-cyan"
                >
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="tech-label mb-5">Contact</p>
          <p className="text-sm leading-relaxed text-muted">{CONTACT.unit1.address}</p>
          <div className="mt-4 space-y-1">
            {CONTACT.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="block font-mono text-xs text-cyan transition-colors hover:text-green"
              >
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-8">
          <p className="tech-label !normal-case !tracking-normal">
            © 2026 {CONTACT.company} All rights reserved.
          </p>
          <div className="flex flex-wrap gap-2">
            {["BIS Certified", "BEE Approved", "NABL Tested"].map((badge) => (
              <span
                key={badge}
                className="tech-label border border-line-soft px-3 py-1.5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
