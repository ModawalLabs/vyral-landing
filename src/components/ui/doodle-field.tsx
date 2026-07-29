/**
 * Tiling field of hand-drawn film-kit doodles.
 *
 * An SVG <pattern> rather than an image: it tiles seamlessly at any viewport
 * size, stays crisp on any display, costs no network request, and the whole
 * field is tuned with a single opacity value.
 *
 * Each doodle is drawn in its own 0–48 box, then placed with translate/rotate
 * inside a deliberately large tile so the repeat is hard to read.
 */
export function DoodleField({
  className = "",
  opacity = 0.07,
  tile = 640,
}: {
  className?: string;
  opacity?: number;
  tile?: number;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        {/* --- the doodles --- */}
        <g
          id="dd-clapper"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="20" width="40" height="24" rx="3" />
          <path d="M4 20l3-10 38-4-3 10z" />
          <path d="M15 9.4l-2.4 8M25 8l-2.4 8M35 6.6l-2.4 8" />
        </g>

        <g
          id="dd-reel"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="24" cy="24" r="19" />
          <circle cx="24" cy="24" r="3.5" />
          <circle cx="24" cy="11" r="4.5" />
          <circle cx="24" cy="37" r="4.5" />
          <circle cx="11" cy="24" r="4.5" />
          <circle cx="37" cy="24" r="4.5" />
        </g>

        <g
          id="dd-camera"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="19" width="27" height="19" rx="3" />
          <path d="M32 24.5l11-6.5v20l-11-6.5z" />
          <circle cx="14" cy="12" r="6" />
          <circle cx="26" cy="12" r="6" />
        </g>

        <g
          id="dd-light"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 6h15l4 15H13z" />
          <path d="M24.5 21v13" />
          <path d="M14 44l10.5-10L35 44" />
          <path d="M11 9L4 5M10 15l-7 1" />
        </g>

        <g
          id="dd-mic"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <rect x="18" y="5" width="12" height="21" rx="6" />
          <path d="M11 21a13 13 0 0 0 26 0" />
          <path d="M24 34v8M18 43h12" />
        </g>

        <g
          id="dd-filmstrip"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="13" width="40" height="22" rx="2" />
          <path d="M4 19h40M4 29h40" />
          <path d="M10 15.5v1M18 15.5v1M26 15.5v1M34 15.5v1" />
          <path d="M10 31.5v1M18 31.5v1M26 31.5v1M34 31.5v1" />
        </g>

        {/* --- the tile --- */}
        <pattern
          id="dd-pattern"
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
        >
          {/* Positions are irregular on purpose: an even grid would make the
              repeat obvious the moment the eye catches two of the same icon. */}
          <use href="#dd-clapper" transform="translate(58 74) rotate(-13) scale(1.15)" />
          <use href="#dd-reel" transform="translate(372 42) rotate(9)" />
          <use href="#dd-camera" transform="translate(196 268) rotate(-6) scale(1.25)" />
          <use href="#dd-light" transform="translate(506 236) rotate(12)" />
          <use href="#dd-mic" transform="translate(74 432) rotate(7)" />
          <use href="#dd-filmstrip" transform="translate(330 486) rotate(-9) scale(1.1)" />
          <use href="#dd-reel" transform="translate(538 470) rotate(-16) scale(0.8)" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#dd-pattern)" />
    </svg>
  );
}
