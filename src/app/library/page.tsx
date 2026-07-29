import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { PlusFrame } from "@/components/ui/plus-frame";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A gallery of videos and images generated with Vyral — see the prompts behind them.",
};

type Tile = {
  shape: "landscape" | "portrait";
  /**
   * Adding media is a one-line change: set `src` (and `alt`) on a tile and the
   * placeholder is swapped out. Padding, radius, cropping and the `sizes` hint
   * all live in MediaSlot, so nothing about the geometry has to be touched.
   */
  src?: string;
  alt?: string;
};

// The order is the layout. On the six-column grid, 5 landscape (2x1) and
// 10 portrait (1x2) tiles fill exactly 6 x 5 cells with no holes — but only
// in this sequence, since auto-placement fills the first gap that fits.
const TILES: Tile[] = [
  { shape: "landscape" },
  { shape: "landscape" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "landscape" },
  { shape: "landscape" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "portrait" },
  { shape: "landscape" },
];

// Kept short on purpose: at this size an 80/20 strip only fits ~2 lines in a
// portrait card and ~9 characters per line in a landscape one.
const CAPTION = "Prompt, model, and settings appear here.";

// Landscape media is ~2x the width of portrait media, so they can't share one
// hint without over-fetching for one of them.
const SIZES = {
  landscape:
    "(min-width: 1536px) 400px, (min-width: 1024px) 330px, (min-width: 640px) 290px, 46vw",
  portrait:
    "(min-width: 1536px) 240px, (min-width: 1024px) 195px, (min-width: 640px) 145px, 46vw",
} as const;

/** 80% media / 20% caption: split horizontally for landscape, vertically for portrait. */
function TileBody({ tile }: { tile: Tile }) {
  const landscape = tile.shape === "landscape";
  return (
    // Clipping lives here, not on the frame: the corner plus icons sit
    // outside the frame's bounds and overflow-hidden there would cut them off.
    <div
      className={`flex h-full overflow-hidden rounded-[7px] ${
        landscape ? "flex-row" : "flex-col"
      }`}
    >
      {/* 80% — media, inset 5px inside its own column/row */}
      <div className="flex basis-4/5 p-[5px]">
        {/* flex-1, not h-full: a % height can't resolve against a padded
            flex item, and the media would collapse. */}
        <div className="relative flex-1 overflow-hidden rounded-lg bg-zinc-900">
          {tile.src ? (
            <Image
              src={tile.src}
              alt={tile.alt ?? ""}
              fill
              sizes={SIZES[tile.shape]}
              className="object-cover"
            />
          ) : (
            <MediaPlaceholder label={landscape ? "16:8" : "8:16"} />
          )}
        </div>
      </div>

      {/* 20% — caption */}
      <div className="basis-1/5 overflow-hidden p-3 text-sm leading-snug text-zinc-400">
        {CAPTION}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    // pt clears the fixed header, which no page can sit under.
    <section className="mx-auto container px-4 pb-32 pt-40 sm:pb-48 sm:pt-44">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Library
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          Nothing here was filmed. Every frame started as a sentence — and took
          minutes, not weeks.
        </p>
      </Reveal>

      {/* Row height tracks column width per breakpoint so a 2-col tile lands
          near 16:8 and a 2-row tile near 8:16. grid-flow-row-dense keeps the
          packing tight at column counts other than six. */}
      <Reveal
        delay={120}
        className="mt-20 grid grid-flow-row-dense grid-cols-2 auto-rows-[167px] gap-6 sm:grid-cols-4 sm:auto-rows-[134px] md:auto-rows-[166px] lg:grid-cols-6 lg:auto-rows-[145px] xl:auto-rows-[188px]"
      >
        {TILES.map((tile, i) => (
          <li
            key={i}
            className={tile.shape === "landscape" ? "col-span-2" : "row-span-2"}
          >
            <PlusFrame className="h-full w-full">
              <TileBody tile={tile} />
            </PlusFrame>
          </li>
        ))}
      </Reveal>

      {/* Text CTA, matching the "View Library" link in the Smarter AI section
          so the two secondary actions read as the same kind of thing. */}
      <div className="mt-20 text-center">
        <Link
          href="/#cta"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Visit Vyral
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
    </section>
  );
}
