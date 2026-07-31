"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Gallery video: poster by default, plays on hover.
 *
 * The cost that matters with a wall of these is concurrent *decoders*, not
 * bytes. So playback is gated three ways:
 *   1. nothing is fetched until play is requested (preload="none")
 *   2. hover (or, on touch, entering the viewport) is what requests it
 *   3. a module-wide cap means only MAX_CONCURRENT ever decode at once
 */
const MAX_CONCURRENT = 2;

// Insertion-ordered, so the first entry is the longest-running.
const playing = new Set<HTMLVideoElement>();

function release(video: HTMLVideoElement) {
  playing.delete(video);
}

/**
 * @param evict hover is explicit user intent, so it may stop the oldest clip.
 *              Viewport-triggered playback never evicts — it just waits.
 */
function acquire(video: HTMLVideoElement, evict: boolean) {
  if (playing.has(video)) return true;
  if (playing.size >= MAX_CONCURRENT) {
    if (!evict) return false;
    const oldest = playing.values().next().value;
    if (oldest) {
      oldest.pause();
      release(oldest);
    }
  }
  playing.add(video);
  return true;
}

export function HoverVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  /** Describes the clip for assistive tech — the poster carries it. */
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  const start = useCallback((evict: boolean) => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Respect an explicit data-saver request; the poster is enough.
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    if (!acquire(video, evict)) return;
    video.muted = true;
    setActive(true);
    video.play().catch(() => {
      release(video);
      setActive(false);
    });
  }, []);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    // Rewind so the next hover starts from the poster frame, and so the
    // decoder isn't left holding a mid-stream position.
    video.currentTime = 0;
    release(video);
    setActive(false);
  }, []);

  // Touch devices have no hover, so fall back to play-on-visible there.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(hover: hover)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting ? start(false) : stop(),
        );
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      release(video);
    };
  }, [start, stop]);

  // Never leave a slot held by an unmounted element.
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) release(video);
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => start(true)}
      onPointerLeave={stop}
    >
      <video
        ref={videoRef}
        className="size-full object-cover"
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label={alt}
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Affordance — without it a still tile gives no hint there's video */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-2 left-2 grid size-6 place-items-center rounded-md border border-white/25 bg-black/50 text-white backdrop-blur-sm transition-opacity duration-200 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </div>
  );
}
