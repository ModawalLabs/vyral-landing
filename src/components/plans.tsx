import { Briefcase, User, Users } from "lucide-react";

import PricingCard from "@/components/ui/pricing-card-triple";

// Tone accents are tuned for light backgrounds (text-*-600). This site is
// dark-only, so each card gets a brighter accent through the slot overrides
// the component exposes — twMerge keeps the later class.
const ACCENT = {
  blue: "text-blue-400",
  pink: "text-pink-400",
  amber: "text-amber-400",
};

export function Plans() {
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

      <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
        <PricingCard
          tone="blue"
          icon={<User />}
          iconClassName={ACCENT.blue}
          priceClassName={ACCENT.blue}
          name="Creator Plan"
          subtitle="Perfect for beginners who want to explore powerful AI video without a heavy commitment."
          price={19}
          periodLabel="/month"
          features={[
            { label: "100 video credits per month" },
            { label: "1 seat" },
            { label: "1080p exports, watermark-free" },
            { label: "All AI tools and models" },
            { label: "Team workspace and roles", included: false },
            { label: "Priority rendering queue", included: false },
            { label: "API access", included: false },
          ]}
          cta={{ href: "#cta", label: "Choose Plan" }}
        />

        <PricingCard
          tone="pink"
          icon={<Users />}
          iconClassName={ACCENT.pink}
          priceClassName={ACCENT.pink}
          name="Pro Plan"
          subtitle="Perfect for beginners who want to explore powerful AI video without a heavy commitment."
          price={29}
          periodLabel="/month"
          features={[
            { label: "600 video credits per month" },
            { label: "5 seats" },
            { label: "4K exports, watermark-free" },
            { label: "All AI tools and models" },
            { label: "Team workspace and roles" },
            { label: "Priority rendering queue" },
            { label: "API access", included: false },
          ]}
          cta={{ href: "#cta", label: "Choose Plan" }}
        />

        <PricingCard
          tone="amber"
          icon={<Briefcase />}
          iconClassName={ACCENT.amber}
          priceClassName={ACCENT.amber}
          name="Studio Plan"
          subtitle="Perfect for beginners who want to explore powerful AI video without a heavy commitment."
          price={79}
          periodLabel="/month"
          features={[
            { label: "2,500 video credits per month" },
            { label: "20 seats" },
            { label: "4K exports, watermark-free" },
            { label: "All AI tools and models" },
            { label: "Team workspace and roles" },
            { label: "Priority rendering queue" },
            { label: "API access and webhooks" },
          ]}
          cta={{ href: "#cta", label: "Choose Plan" }}
        />
      </div>
    </section>
  );
}
