import Image from "next/image";
import Link from "next/link";

import { AmbientVideo } from "@/components/ui/ambient-video";

const SOCIALS = [
  {
    name: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "TikTok",
    icon: (
      <>
        <path d="M14.5 3v12.2a4.4 4.4 0 1 1-4.4-4.4" />
        <path d="M14.5 3.4A5.6 5.6 0 0 0 20 9" />
      </>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <>
        <path d="M22 12s0-3.5-.45-5.18a2.78 2.78 0 0 0-1.95-1.97C17.88 4.4 12 4.4 12 4.4s-5.88 0-7.6.45a2.78 2.78 0 0 0-1.95 1.97C2 8.5 2 12 2 12s0 3.5.45 5.18a2.78 2.78 0 0 0 1.95 1.97C6.12 19.6 12 19.6 12 19.6s5.88 0 7.6-.45a2.78 2.78 0 0 0 1.95-1.97C22 15.5 22 12 22 12z" />
        <path d="M10.2 15.2l4.8-3.2-4.8-3.2z" />
      </>
    ),
  },
];

const CLIP = {
  poster: "/assets/others/man-armor-poster.webp",
  sources: [{ src: "/assets/others/man-armor.mp4", type: "video/mp4" }],
};

type Media =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** Low-res source upscaled with hard edges — the concept before it resolves. */
      pixelated?: boolean;
      /** Decorative play affordance — the proof is approved, not yet running. */
      play?: boolean;
    }
  | { kind: "video"; sources: { src: string; type: string }[]; poster: string };

type Step = {
  number: string;
  title: string;
  body: string;
  media: Media;
  socials?: boolean;
};

// Titles frame this as the argument for proof-first, so it reads as a
// different point from the how-it-works steps in the bento section above.
//
// One clip through three states — blurred still, sharp still, playing loop —
// so the cards show the same shot resolving rather than three unrelated ones.
const STEPS: Step[] = [
  {
    number: "01",
    title: "See It First",
    body: "Preview the video concept, flow, and intent before committing resources.",
    media: {
      kind: "image",
      // A real 64x36 frame, not a CSS filter — blur can't produce hard pixel
      // blocks, only softness.
      src: "/assets/others/man-armor-pixel.png",
      alt: "Low-resolution concept preview of an armoured figure in a cloister",
      pixelated: true,
    },
  },
  {
    number: "02",
    title: "Then Generate",
    body: "Once approved, AI instantly transforms the proof into a high-quality video.",
    media: {
      kind: "image",
      src: CLIP.poster,
      alt: "Approved frame of an armoured figure walking a stone cloister",
      play: true,
    },
  },
  {
    number: "03",
    title: "Ready to Share!",
    body: "Your videos are auto-optimized for social platforms, making them ready to share, scale, and go viral.",
    media: { kind: "video", sources: CLIP.sources, poster: CLIP.poster },
    socials: true,
  },
];

export function SmarterAI() {
  return (
    // Full-bleed wrapper carries the tint; the container inside keeps the
    // gutters aligned with the neighbouring sections.
    <section className="bg-surface">
      <div className="mx-auto container px-4 py-32 sm:py-48">
        <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Smarter AI. Lower Costs.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          With{" "}
          <span className="font-medium text-foreground">
            Proof Before Generation
          </span>
          , you preview the concept, structure, and outcome before AI generates
          the final video — saving time, cost, and guesswork.
        </p>
      </div>

      <ol className="mx-auto mt-20 grid max-w-6xl gap-6 text-left md:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.number}
            // p-2 turns the card into a frame around the media; radius below
            // is 24 - 8 so the two curves stay concentric.
            className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2 ring-1 ring-inset ring-white/5 backdrop-blur-xl backdrop-saturate-150"
          >
            {/* Specular top edge — same glass recipe as the header */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              {step.media.kind === "video" ? (
                <AmbientVideo
                  sources={step.media.sources}
                  poster={step.media.poster}
                />
              ) : (
                <>
                  <Image
                    src={step.media.src}
                    alt={step.media.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    // unoptimized: Next would resample the 64px source and
                    // smooth away the very blocks we want.
                    unoptimized={step.media.pixelated}
                    className={
                      step.media.pixelated
                        ? "object-cover [image-rendering:pixelated]"
                        : "object-cover"
                    }
                  />

                  {step.media.play && (
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-black/40 text-white shadow-lg shadow-black/40 backdrop-blur-md">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 translate-x-px"
                        >
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </>
              )}

              {/* Number rides the media so the stage and its visual read as
                  one unit, and the copy below starts on the title. */}
              <span className="absolute left-3 top-3 grid size-8 place-items-center rounded-full border border-white/20 bg-black/40 font-mono text-[11px] text-white backdrop-blur-md">
                {step.number}
              </span>

              {step.socials && (
                <>
                  {/* Scrim so the tiles hold up over any frame */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"
                  />
                  {/* On the media, not below it: the icons say "this output,
                      ready for these platforms", and keeping them out of the
                      text column stops card 03 from towering over 01 and 02. */}
                  <ul className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                    {SOCIALS.map((social) => (
                      <li key={social.name}>
                        {/* Non-interactive: these indicate reach, not links */}
                        <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg border border-white/20 bg-black/40 text-white/90 backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-black/60 hover:text-white">
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-[18px]"
                          >
                            {social.icon}
                          </svg>
                          <span className="sr-only">{social.name}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </li>
          ))}
        </ol>

        {/* Text CTA rather than a button — the section's job is to explain,
            and a filled button here would compete with the pricing CTAs. */}
        <div className="mt-14 text-center">
          <Link
            href="/library"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            View Library
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
      </div>
    </section>
  );
}
