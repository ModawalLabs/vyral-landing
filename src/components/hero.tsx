"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const POSTER = "/assets/hero/hero-motocross-poster.webp";

const MODELS = [
  "ByteDance Seedance 2.0",
  "Google Veo",
  "Kling 3.0",
  "MiniMax Hailuo 2.3",
  "Runway Gen-4.5",
  "Luma Ray3",
  "Wan 2.7",
  "LTX-2.3",
];

// Generation settings shown above the composer. Icons are stroke-only so they
// sit at the same visual weight as the + button below them.
const CONTROLS = [
  {
    label: "Veo",
    icon: (
      <>
        <path d="M11 3.5l1.7 4L16.5 9l-3.8 1.5L11 14.5 9.3 10.5 5.5 9l3.8-1.5L11 3.5z" />
        <path d="M17.5 14.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7z" />
      </>
    ),
  },
  {
    label: "10s",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 1.8" />
      </>
    ),
  },
  {
    label: "16:8",
    icon: <rect x="2.5" y="6.5" width="19" height="11" rx="2" />,
  },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (motion.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      // preload="none" means nothing is fetched until we ask for it here,
      // so reduced-motion users never pay for the download.
      video.muted = true;
      video.play().catch(() => {
        // Autoplay refused — the poster stays up, which is a fine fallback.
      });
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-black">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 size-full object-cover"
        poster={POSTER}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden
        tabIndex={-1}
      >
        <source src="/assets/hero/hero-motocross.webm" type="video/webm" />
        <source src="/assets/hero/hero-motocross.mp4" type="video/mp4" />
      </video>

      {/* Even scrim for legibility — a directional one would pull focus
          off-centre now that the copy is centred. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/[0.36]" />
      {/* Vertical scrim: lifts the glass bar, then fades into the section below */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-background"
      />

      <div className="relative w-full px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Fluid size keeps this on one line at every width — a fixed
              step scale would overflow the viewport on small phones. */}
          <h1
            className="animate-rise whitespace-nowrap text-[clamp(1.75rem,6.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
            style={{ animationDelay: "80ms" }}
          >
            Next-Gen AI Engine
          </h1>

          <p
            className="animate-rise mx-auto mt-6 text-lg leading-relaxed text-white/70 sm:text-xl lg:whitespace-nowrap"
            style={{ animationDelay: "220ms" }}
          >
            Designed to understand intent, style, and storytelling — not just words.
          </p>

          <div
            className="animate-rise mt-10 flex justify-center"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white py-3.5 pl-7 pr-6 text-sm font-medium text-black shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-[1.03] active:scale-100"
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

          {/* Liquid glass panel — 70% of the menu bar's width, which is the
              same max-w-4xl track this container sits on. */}
          <div
            className="animate-rise mx-auto mt-16 w-[85%] sm:w-[70%]"
            style={{ animationDelay: "500ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-[5px] shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10 backdrop-blur-2xl backdrop-saturate-150">
              {/* Sheen falling from the top edge gives the slab thickness */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent"
              />
              {/* Specular highlight along the top bevel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
              {/* Refracted glow pooling in the lower corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-10 size-56 rounded-full bg-white/10 blur-3xl"
              />

              {/* Inner panel. Radius is outer 24px minus the 5px inset so the
                  two curves stay concentric. `relative` lifts it above the
                  decorative layers above. */}
              <div className="relative flex w-full flex-col rounded-[19px] bg-[#2b2b2e] p-3">
                {/* Generation settings */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {CONTROLS.map((control) => (
                    <button
                      key={control.label}
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-3.5"
                      >
                        {control.icon}
                      </svg>
                      {control.label}
                    </button>
                  ))}
                </div>

                {/* Prompt composer */}
                <div className="flex items-center gap-2 rounded-xl p-2 pl-4 text-left transition-shadow focus-within:ring-1 focus-within:ring-white/25">
                  <label htmlFor="vyral-prompt" className="sr-only">
                    Describe your Vyral idea
                  </label>
                  <input
                    id="vyral-prompt"
                    type="text"
                    placeholder="Describe your Vyral idea, and we will generate your masterpiece"
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  />

                  <button
                    type="button"
                    aria-label="Add attachment"
                    className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="shrink-0 rounded-lg bg-gradient-to-r from-[#6d4aff] to-[#a855f7] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#6d4aff]/30 transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[#6d4aff]/45"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model marquee. Absolute so it pins to the bottom without pulling the
          centred hero copy upward. */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 py-4">
        {/* The window is capped below one copy's width (~1490px) so the same
            model name can never appear twice on screen — with only 8 items a
            full-bleed rail always shows the wrap-around on desktop. */}
        <div className="mx-auto max-w-6xl [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                // The second copy is a visual duplicate — hide it from AT so
                // the list isn't announced twice.
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center"
              >
                {MODELS.map((model) => (
                  <li
                    key={model}
                    className="flex items-center gap-12 whitespace-nowrap pr-12 text-sm text-white/60"
                  >
                    {model}
                    <span
                      aria-hidden
                      className="size-1 shrink-0 rounded-full bg-white/30"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
