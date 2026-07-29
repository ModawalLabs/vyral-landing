"use client";

import { Briefcase, User, Users } from "lucide-react";
import { useState } from "react";

import PricingCard from "@/components/ui/pricing-card-triple";

type Period = "monthly" | "annual" | "onetime";

const PERIODS: { id: Period; label: string; note?: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual", note: "Save 20%" },
  { id: "onetime", label: "One Time" },
];

// Kept short — the component renders this inline beside a 5xl price, so a long
// string wraps under it.
const PERIOD_SUFFIX: Record<Period, string> = {
  monthly: "/month",
  annual: "/month",
  onetime: "one-time",
};

// Tone accents are tuned for light backgrounds (text-*-600). This site is
// dark-only, so each card gets a brighter accent through the slot overrides
// the component exposes — twMerge keeps the later class.
const ACCENT = {
  blue: "text-blue-400",
  pink: "text-pink-400",
  amber: "text-amber-400",
};

// Shared deliberately: all three tiers currently list the same features, so
// one array keeps them from drifting apart by accident.
const FEATURES = [
  { label: "AI director & guided workflows" },
  { label: "Proof-before-generation previews" },
  { label: "Exports tuned for social platforms" },
  { label: "Credits that roll month to month" },
];

const SUBTITLE =
  "Perfect for beginners who want to explore powerful AI video without a heavy commitment.";

// TODO(pricing): every number here is a placeholder. Annual is monthly −20%;
// one-time is priced as a standalone purchase, not a subscription.
const PLANS = [
  {
    name: "Creator Plan",
    onetimeName: "Creator One-Time",
    credits: "3,000",
    tone: "blue" as const,
    accent: ACCENT.blue,
    icon: <User />,
    price: { monthly: 19, annual: 16, onetime: 19 },
  },
  {
    name: "Pro Plan",
    onetimeName: "Pro One-Time",
    credits: "5,500",
    tone: "pink" as const,
    accent: ACCENT.pink,
    icon: <Users />,
    price: { monthly: 29, annual: 24, onetime: 29 },
    // Badge shows on the annual view only — see the render below.
    popular: true,
    badgeClass: "bg-gradient-to-r from-pink-400 to-fuchsia-600 text-white",
  },
  {
    name: "Studio Plan",
    onetimeName: "Studio One-Time",
    credits: "17,000",
    tone: "amber" as const,
    accent: ACCENT.amber,
    icon: <Briefcase />,
    price: { monthly: 79, annual: 66, onetime: 79 },
  },
];

export function Plans() {
  // Annual by default — it's the plan we want people landing on.
  const [period, setPeriod] = useState<Period>("annual");

  return (
    <section
      id="pricing"
      className="mx-auto container scroll-mt-28 px-4 py-32 sm:py-48"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Plans That Fit Solo to Scale
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          Flexible credits and seats whether you&apos;re solo, growing fast, or
          scaling a full creative team — upgrade or pause anytime.
        </p>
      </div>

      {/* Billing switch. role="group" + aria-pressed rather than a radiogroup,
          which would also owe arrow-key navigation. */}
      <div className="mt-12 flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl"
        >
          {PERIODS.map((option) => {
            const active = option.id === period;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPeriod(option.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white text-black"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {option.label}
                {option.note && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${
                      active ? "bg-black/10 text-black" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {option.note}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          // Wrapper carries the badge so the card component stays untouched.
          // No overflow-hidden anywhere above it, so the pill can straddle
          // the card's top edge.
          <div key={plan.name} className="relative">
            {plan.popular && period === "annual" && (
              <span
                className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-lg shadow-black/30 ${plan.badgeClass}`}
              >
                Most popular
              </span>
            )}

            <PricingCard
              tone={plan.tone}
              icon={plan.icon}
              iconClassName={plan.accent}
              // The price size lives on a span inside this div, so it can only
              // be overridden with a child selector.
              priceClassName={`${plan.accent} ${
                period === "onetime" ? "[&>span:first-child]:text-4xl" : ""
              }`}
              name={period === "onetime" ? plan.onetimeName : plan.name}
              subtitle={SUBTITLE}
              price={plan.price[period]}
              periodLabel={PERIOD_SUFFIX[period]}
              // One-time is a credit purchase, so the allowance replaces the
              // feature list rather than sitting inside it.
              features={period === "onetime" ? [] : FEATURES}
              highlight={
                period === "onetime" ? (
                  <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-100 px-5 py-7 text-center dark:border-zinc-800 dark:bg-zinc-800/40">
                    <div
                      className={`text-5xl font-bold leading-none ${plan.accent}`}
                    >
                      {plan.credits}
                    </div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Credits included
                    </div>
                  </div>
                ) : undefined
              }
              cta={{
                href: "#cta",
                label: period === "onetime" ? "Buy Now" : "Choose Plan",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
