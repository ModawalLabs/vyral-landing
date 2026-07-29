"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children on first scroll into view.
 *
 * The hidden state is in the server-rendered markup so there's no flash of
 * visible-then-hidden content. The `<noscript>` rule in layout.tsx unhides
 * everything when JS is off, so this can never permanently swallow content.
 *
 * Motion is a transition rather than a keyframe animation, so the global
 * prefers-reduced-motion guard in globals.css collapses it to an instant
 * state change instead of disabling the reveal.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** ms — stagger sibling blocks by 100–150ms for a settled feel. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const reveal = entries.some(
          (entry) =>
            entry.isIntersecting ||
            // Already scrolled past — End key, an anchor jump, or a restored
            // scroll position. Without this the block stays hidden for good.
            entry.boundingClientRect.bottom < 0,
        );
        if (reveal) {
          setShown(true);
          // One-shot: re-animating on every pass reads as a glitch.
          observer.disconnect();
        }
      },
      // Negative bottom margin holds the reveal until the block is properly
      // in frame, not the instant its first pixel clears the fold.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
