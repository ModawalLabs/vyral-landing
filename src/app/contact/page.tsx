import type { Metadata } from "next";

import { AmbientVideo } from "@/components/ui/ambient-video";
import { DoodleField } from "@/components/ui/doodle-field";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "Get in touch with the Vyral team.",
};

// Accent, and the top of the background gradient.
// Black text clears 6.9:1 on this orange; white would be 2.8:1 and fail.
const NEON_ORANGE = "#ff5f1f";

// Deeper end of the gradient. This is about as dark as the ramp can go while
// black text still clears 4.5:1, so the field stays usable if copy is ever
// placed on it — and it eases the hand-off into the near-black footer below.
const ORANGE_DEEP = "#cf460e";

const FIELDS = [
  {
    id: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Jordan Rivera",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@company.com",
  },
] as const;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[--accent] focus:ring-1 focus:ring-[--accent]";

export default function ContactPage() {
  return (
    <section
      // min-h-screen so the colour reads as the page, not a band. pt clears
      // the fixed header.
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-32 sm:pb-28 sm:pt-36"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${NEON_ORANGE}, ${ORANGE_DEEP})`,
      }}
    >
      {/* Stroke is pure black; opacity is what decides how much of the orange
          shows through. At 0.07 it read as a deeper orange — this is high
          enough to read as black ink. */}
      <DoodleField className="text-black" opacity={0.25} />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Black slab on the neon field — the same inversion the feature strip
            uses, and the only way white form text stays legible here. */}
        <div
          className="overflow-hidden rounded-3xl bg-[#0b0b0f] shadow-2xl shadow-black/30"
          style={{ ["--accent" as string]: NEON_ORANGE }}
        >
          {/* 646px = the content-driven height (604px) + 7%. Scoped to md+ so
              the stacked mobile layout still sizes to its content. */}
          <div className="grid md:min-h-[646px] md:grid-cols-2">
            {/* ---------- About: video field, copy anchored to the floor ---------- */}
            <div className="relative flex min-h-[440px] flex-col justify-end overflow-hidden border-b border-white/10 p-8 sm:min-h-[540px] sm:p-10 md:border-b-0 md:border-r lg:p-12">
              <AmbientVideo
                sources={[
                  { src: "/assets/others/cosmic-journey.mp4", type: "video/mp4" },
                ]}
                poster="/assets/others/cosmic-journey-poster.webp"
              />

              {/* Flat tint knocks the footage back; the upward scrim then
                  builds to near-solid under the copy so it stays readable
                  over the bright cream shapes in the lower frame. */}
              <div aria-hidden className="absolute inset-0 bg-black/40" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent"
              />

              <div className="relative">
                <p
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: NEON_ORANGE }}
                >
                  About us
                </p>

                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  We build the tool we wanted
                </h1>

                <p className="mt-5 text-pretty leading-relaxed text-white/70">
                  Vyral started because briefing, shooting and cutting a single
                  ad took weeks — and you only found out it missed after the
                  money was spent. So we built proof-before-generation: see the
                  concept first, approve it, then let the model finish the job.
                </p>
              </div>
            </div>

            {/* ---------- Contact form ---------- */}
            <div className="p-8 sm:p-10 lg:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Talk to us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tell us what you&apos;re trying to make.
              </p>

              {/* TODO(backend): wire to a route handler or form service —
                  this posts nowhere today. */}
              <form className="mt-8 space-y-5" action="#" method="post">
                {FIELDS.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/60"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      required
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="query"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/60"
                  >
                    Query
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    rows={5}
                    placeholder="What are you looking to create?"
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02] active:scale-100"
                  style={{ backgroundColor: NEON_ORANGE }}
                >
                  Send message
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
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
