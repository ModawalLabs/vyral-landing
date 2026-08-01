import { Hero } from "@/components/hero";
import { OneCrew } from "@/components/one-crew";
import { Plans } from "@/components/plans";
import { Revolutionize } from "@/components/revolutionize";
import BentoCards from "@/components/ui/bento-cards";
import { LuminaSliderLazy } from "@/components/ui/lumina-slider-lazy";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoCards />
      <LuminaSliderLazy />
      <Revolutionize />
      <OneCrew />
      <Plans />
      {/* Sections go here */}
    </>
  );
}
