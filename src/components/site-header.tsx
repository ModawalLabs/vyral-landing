"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "/library", label: "Library" },
  { href: "#pricing", label: "Pricing" },
  { href: "#cta", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5">
      <div className="mx-auto w-full max-w-3xl">
        {/* Liquid glass — same material recipe as the hero panel so the two
            read as one surface. A pill while collapsed; softens to a rounded
            rect when the mobile menu pushes it open. */}
        <div
          className={`relative overflow-hidden border border-white/10 bg-white/5 ring-1 ring-inset ring-white/10 backdrop-blur-2xl backdrop-saturate-150 transition-[border-radius] duration-200 ${
            open ? "rounded-3xl" : "rounded-full"
          }`}
        >
          {/* Specular highlight along the top bevel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
          {/* Sheen falling from the top edge gives the slab thickness */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent"
          />

          <div className="relative flex h-12 items-center justify-between gap-4 py-1.5 pl-5 pr-1.5">
            <Link
              href="/"
              className="shrink-0 text-[15px] font-semibold tracking-tight text-white"
            >
              Vyral
            </Link>

            <nav aria-label="Main" className="hidden items-center md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-[13px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5">
              <Link
                href="#"
                className="rounded-full bg-black px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-black/80"
              >
                Login
              </Link>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label="Toggle menu"
                className="grid size-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="size-4"
                >
                  {open ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {open && (
            <nav
              id="mobile-nav"
              aria-label="Mobile"
              className="relative border-t border-white/10 px-2.5 pb-2.5 pt-1.5 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-3 py-2 text-[13px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
