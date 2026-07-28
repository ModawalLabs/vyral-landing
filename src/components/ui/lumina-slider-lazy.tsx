"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// ssr:false keeps Three.js out of the server render and out of the page's
// initial chunk; the IntersectionObserver below keeps it from downloading at
// all until the section is nearly in view.
const LuminaSlider = dynamic(
  () => import("./lumina-interactive-list").then((mod) => mod.LuminaSlider),
  { ssr: false },
);

export function LuminaSliderLazy() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // Start fetching a screenful early so the fade-in has finished by the
      // time the section actually reaches the viewport.
      { rootMargin: "600px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The frame reserves the slider's exact height, so nothing shifts when the
  // real component swaps in.
  return (
    <div ref={frameRef} className="lumina-frame">
      {shouldLoad ? <LuminaSlider /> : null}
    </div>
  );
}
