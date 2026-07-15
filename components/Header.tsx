"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/manufacturing#contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect x="0.5" y="0.5" width="33" height="33" stroke="var(--line)" />
        {/* IEC transformer symbol: two coupled coils */}
        <circle cx="13.5" cy="17" r="7" stroke="var(--cyan)" strokeWidth="1.5" />
        <circle cx="20.5" cy="17" r="7" stroke="var(--green)" strokeWidth="1.5" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-lg font-semibold tracking-[0.14em] text-ink">
          SVASCA
        </span>
        <span className="tech-label mt-1 block !text-[9px] !tracking-[0.3em]">
          Industries (India) Ltd.
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-cyan" : "text-muted hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/manufacturing#contact" className="btn btn-primary !px-5 !py-3">
            Request Quote
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

    </header>

      {/* mobile menu — sibling of <header> so the bar's backdrop-blur cannot
          become its containing block and collapse the fixed overlay */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-18 z-40 flex flex-col justify-between overflow-y-auto bg-bg-deep/97 px-5 pb-10 pt-10 backdrop-blur-md lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line-soft py-5"
              >
                <span className="tech-label">0{i + 1}</span>
                <span className="font-display text-3xl font-medium text-ink">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Link
              href="/manufacturing#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Request Quote
            </Link>
            <p className="tech-label mt-6 text-center">
              BIS certified · Since 1997
            </p>
          </div>
        </div>
      )}
    </>
  );
}
