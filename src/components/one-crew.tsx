import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { Reveal } from "@/components/ui/reveal";

// Clips are matched to topics by filename. Each source orientation already
// agrees with its card shape, so object-cover crops nothing meaningful.
const CREWS: FocusRailItem[] = [
  {
    id: "launch",
    meta: "Commerce",
    title: "Product Launch",
    description:
      "Hero shot, feature beats, price card. Built to convert on a paid placement.",
    imageSrc: "/assets/usecases/product-launch-poster.webp",
    videoSrc: "/assets/usecases/product-launch-640.mp4",
  },
  {
    id: "wedding",
    meta: "Lifestyle",
    title: "Wedding Film",
    description:
      "Warm grade, long takes, music-led. Cut for the couple, not the algorithm.",
    imageSrc: "/assets/usecases/wedding-film-poster.webp",
    videoSrc: "/assets/usecases/wedding-film-640.mp4",
  },
  {
    id: "social",
    meta: "Performance",
    title: "Social Ad",
    description:
      "Vertical, hook in the first second, captions burned in for silent playback.",
    imageSrc: "/assets/usecases/social-ad-poster.webp",
    videoSrc: "/assets/usecases/social-ad-640.mp4",
  },
  {
    id: "brand",
    meta: "Identity",
    title: "Brand Story",
    description:
      "Slower pace, interview-driven, shaped around a single idea worth remembering.",
    imageSrc: "/assets/usecases/brand-story-poster.webp",
    videoSrc: "/assets/usecases/brand-story-960.mp4",
    // The only 16:9 source in the set.
    orientation: "landscape",
  },
  {
    id: "music",
    meta: "Culture",
    title: "Music Video",
    description:
      "Beat-matched edits and heavy looks. The crew that breaks the rules on purpose.",
    imageSrc: "/assets/usecases/music-video-poster.webp",
    videoSrc: "/assets/usecases/music-video-640.mp4",
  },
  {
    id: "cinematic",
    meta: "Narrative",
    title: "Cinematic Short",
    description:
      "Period detail, patient camera moves, and a graded look that carries a whole world in one shot.",
    // imageSrc doubles as the poster and the blurred backdrop.
    imageSrc: "/assets/others/man-armor-poster.webp",
    videoSrc: "/assets/others/man-armor.mp4",
    // The clip is natively 16:9 — landscape means object-cover stops
    // discarding the cloister arches at either side of frame.
    orientation: "landscape",
  },
];

export function OneCrew() {
  return (
    // py trimmed 10%: 128 -> 115px, 192 -> 173px.
    <section className="mx-auto container px-4 py-[115px] sm:py-[173px]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          One crew. Every kind of video.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          The specialists change with the job. A product launch gets a different
          crew than a wedding film — and Vyral assembles the right one before
          you&apos;ve finished describing what you need.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-16">
        {/* bg-transparent so the rail sits on the page rather than laying its
            own near-black band over it. */}
        <FocusRail items={CREWS} loop className="bg-transparent" />
      </Reveal>
    </section>
  );
}
