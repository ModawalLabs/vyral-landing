import Link from "next/link";

import { LEGAL_LINKS, NAV_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto container px-4 py-16 sm:py-20">
        {/* Brand block is given twice the width of each link column so the
            tagline and CTA have room to breathe. */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-tight text-white"
            >
              Vyral
            </Link>

            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              Describe your idea once and publish a finished, on-brand video the
              same day.
            </p>

            <Link
              href="/#cta"
              className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white py-3 pl-6 pr-5 text-sm font-medium text-black shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-[1.03] active:scale-100"
            >
              Try Vyral Now
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-tight text-white">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white">
              Legal
            </h2>
            <ul className="mt-5 space-y-3.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-sm text-muted">
          © {new Date().getFullYear()} Vyral. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
