"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; type: string };

/**
 * Decorative looping video that fills its (positioned) parent.
 *
 * preload="none" means nothing is fetched until the effect asks for it, so
 * reduced-motion users never download the file — the poster is all they get.
 */
export function AmbientVideo({
  sources,
  poster,
}: {
  sources: Source[];
  poster: string;
}) {
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
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover"
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden
      tabIndex={-1}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
