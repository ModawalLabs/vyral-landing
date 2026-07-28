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

// Titles frame this as the argument for proof-first, so it reads as a
// different point from the how-it-works steps in the bento section above.
const STEPS = [
  {
    number: "01",
    title: "See It First",
    body: "Preview the video concept, flow, and intent before committing resources.",
  },
  {
    number: "02",
    title: "Then Generate",
    body: "Once approved, AI instantly transforms the proof into a high-quality video.",
  },
  {
    number: "03",
    title: "Ready to Share!",
    body: "Your videos are auto-optimized for social platforms, making them ready to share, scale, and go viral.",
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

      <ol className="mx-auto mt-20 max-w-2xl text-left">
        {STEPS.map((step, index) => (
          <li key={step.number} className="relative flex gap-6 pb-14 last:pb-0">
            {/* Rail stops at the last marker so the sequence has an end */}
            {index < STEPS.length - 1 && (
              <span
                aria-hidden
                className="absolute bottom-0 left-5 top-11 w-px -translate-x-1/2 bg-gradient-to-b from-white/20 to-white/5"
              />
            )}

            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 font-mono text-xs text-white/70 ring-1 ring-inset ring-white/10 backdrop-blur-md">
              {step.number}
            </span>

            <div className="pt-1">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                {step.body}
              </p>

              {step.socials && (
                <ul className="mt-6 flex items-center gap-3">
                  {SOCIALS.map((social) => (
                    <li key={social.name}>
                      {/* Non-interactive: these indicate reach, they aren't links */}
                      <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white/5 text-white/80 ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-white/10 hover:text-white">
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
                          className="size-5"
                        >
                          {social.icon}
                        </svg>
                        <span className="sr-only">{social.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
