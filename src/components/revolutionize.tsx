"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// Hues sweep the wheel in order, so scrolling the strip reads as one spectrum.
// Every value is luminous enough that black text clears WCAG AA against it
// (the magenta is the floor at 6.6:1) — that constraint is why the blues and
// purples here are electric rather than deep.
const FEATURES = [
  {
    label: "Text to Ads",
    neon: "#c77dff",
    icon: (
      <>
        <path d="M4 10v4h3l7 4V6l-7 4H4z" />
        <path d="M17.5 9.5a4 4 0 0 1 0 5" />
      </>
    ),
  },
  {
    label: "Video Generation",
    neon: "#38bdf8",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" />
      </>
    ),
  },
  {
    label: "Url to Ads",
    neon: "#22d3ee",
    icon: (
      <>
        <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 1 0-5.7-5.7l-1.2 1.2" />
        <path d="M13.5 10.5a4 4 0 0 0-5.7 0L5.5 12.8a4 4 0 1 0 5.7 5.7l1.2-1.2" />
      </>
    ),
  },
  {
    label: "Sound Effects",
    neon: "#2de2c5",
    icon: (
      <>
        <path d="M4 10v4h3l4 3V7L7 10H4z" />
        <path d="M14.5 9.5a4 4 0 0 1 0 5" />
        <path d="M17.5 7a8 8 0 0 1 0 10" />
      </>
    ),
  },
  {
    label: "Audio Generation",
    neon: "#3dffa8",
    icon: <path d="M4 10.5v3M8 7.5v9M12 9v6M16 6v12M20 10.5v3" />,
  },
  {
    label: "Text to Image",
    neon: "#39ff14",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M12 8.5l1.1 2.4 2.4 1.1-2.4 1.1L12 15.5l-1.1-2.4L8.5 12l2.4-1.1L12 8.5z" />
      </>
    ),
  },
  {
    label: "Lip Sync",
    neon: "#c6ff00",
    icon: (
      <>
        <path d="M20.5 11.8a7.7 7.7 0 0 1-8.3 7.7 8 8 0 0 1-3.5-.8L4 20.5l1.6-4.6A7.7 7.7 0 0 1 12.2 4a7.7 7.7 0 0 1 8.3 7.8z" />
        <path d="M9.5 11.5v1.5M12.2 10v4.5M15 11.5v1.5" />
      </>
    ),
  },
  {
    label: "Script Generation",
    neon: "#fde047",
    icon: (
      <>
        <path d="M6 3.5h8L18.5 8v12.5H6z" />
        <path d="M14 3.5V8h4.5" />
        <path d="M9 12.5h6M9 16h4" />
      </>
    ),
  },
  {
    label: "Avatar Video",
    neon: "#ffb020",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <circle cx="12" cy="10.5" r="2.5" />
        <path d="M7.5 17a5 5 0 0 1 9 0" />
      </>
    ),
  },
  {
    label: "Image to Video",
    neon: "#ff7847",
    icon: (
      <>
        <rect x="3" y="5" width="13.5" height="11" rx="2.5" />
        <path d="M3.5 13.5l3.5-3.5 3 3" />
        <circle cx="17.5" cy="16.5" r="4" />
        <path d="M16.4 14.9l2.5 1.6-2.5 1.6z" />
      </>
    ),
  },
  {
    label: "Image Generation",
    neon: "#ff5c8a",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M3.5 17l5-5 4.5 4.5 3-3 4.5 4.5" />
      </>
    ),
  },
  {
    label: "Image Modification",
    neon: "#ff10f0",
    icon: (
      <>
        <path d="M4 7h3M11 7h9" />
        <circle cx="9" cy="7" r="2" />
        <path d="M4 12h9M17 12h3" />
        <circle cx="15" cy="12" r="2" />
        <path d="M4 17h1M9 17h11" />
        <circle cx="7" cy="17" r="2" />
      </>
    ),
  },
];

export function Revolutionize() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });

    // Card count per view changes with width, so the end state can flip
    // without any scrolling happening.
    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", syncEdges);
      observer.disconnect();
    };
  }, [syncEdges]);

  const page = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  // Only fade an edge when there is actually more content past it.
  const fade = `linear-gradient(to right,
    ${atStart ? "#000 0" : "transparent 0"},
    #000 5rem,
    #000 calc(100% - 5rem),
    ${atEnd ? "#000 100%" : "transparent 100%"})`;

  return (
    // Full-bleed wrapper carries the tint; the container inside keeps the
    // gutters aligned with the sections above and below.
    <section className="bg-surface">
      <div className="mx-auto container px-4 py-32 sm:py-48">
        <div className="flex items-end justify-between gap-8">
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Revolutionize Video Creation
          </h2>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Transform your creative workflow with our comprehensive suite of
            advanced AI tools, designed to elevate every aspect of content
            creation.
          </p>
        </div>

        {/* Touch devices swipe, so the arrows are desktop-only affordances */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <ArrowButton
            direction="prev"
            disabled={atStart}
            onClick={() => page(-1)}
          />
          <ArrowButton
            direction="next"
            disabled={atEnd}
            onClick={() => page(1)}
          />
        </div>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="AI tools"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-white/25 [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map((feature) => (
          <div
            key={feature.label}
            style={{ "--neon": feature.neon } as React.CSSProperties}
            // The border is transparent at rest and picks up the hue on hover —
            // without it the inverted black card would vanish into the page.
            className="group flex h-[168px] w-[184px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-transparent bg-[var(--neon)] p-5 transition-colors duration-300 hover:border-[var(--neon)] hover:bg-black"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-black text-white transition-colors duration-300 group-hover:bg-[var(--neon)] group-hover:text-black">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                {feature.icon}
              </svg>
            </span>

            <h3 className="text-base font-semibold leading-snug text-black transition-colors duration-300 group-hover:text-[var(--neon)]">
              {feature.label}
            </h3>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ArrowButton = ({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? "Scroll left" : "Scroll right"}
    className="grid size-10 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
  >
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  </button>
);
