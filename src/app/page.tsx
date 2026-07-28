import { Hero } from "@/components/hero";
import { Plans } from "@/components/plans";
import { SiteFooter } from "@/components/site-footer";
import { Revolutionize } from "@/components/revolutionize";
import { SiteHeader } from "@/components/site-header";
import { SmarterAI } from "@/components/smarter-ai";
import BentoCards from "@/components/ui/bento-cards";
import { LuminaSliderLazy } from "@/components/ui/lumina-slider-lazy";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BentoCards />
        <Revolutionize />
        <LuminaSliderLazy />
        <SmarterAI />
        <Plans />
        {/* Sections go here */}
      </main>
      <SiteFooter />
    </>
  );
}
