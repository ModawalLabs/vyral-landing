/**
 * Single source for the primary navigation — the header and the footer both
 * read from here, so the two can't drift apart.
 *
 * Anchors are root-relative ("/#features", not "#features") because these
 * render on every route: a bare hash looks for the id on the current page.
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/library", label: "Library" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "About/Contact" },
] as const;

// TODO: point these at real routes once the pages exist.
export const LEGAL_LINKS = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms & Conditions" },
] as const;
