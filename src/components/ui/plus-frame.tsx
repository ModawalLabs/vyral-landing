import React from "react";

import { cn } from "@/lib/utils";

/** Dashed card surface shared by the bento section and the library grid. */
export const plusFrameShell =
  "relative rounded-lg border border-dashed border-zinc-400 bg-white dark:border-zinc-700 dark:bg-zinc-950";

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

/**
 * The icons sit outside the card's bounds, so neighbouring cards on an
 * aligned grid overlap theirs into a single crosshair at each intersection.
 * That only holds while card edges line up — it breaks under masonry.
 */
export const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
);

export function PlusFrame({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn(plusFrameShell, className)}>
      <CornerPlusIcons />
      {children}
    </div>
  );
}
