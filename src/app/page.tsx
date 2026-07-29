import { Hero } from "@/components/hero";
import { Plans } from "@/components/plans";
import { Revolutionize } from "@/components/revolutionize";
import { SmarterAI } from "@/components/smarter-ai";
import BentoCards from "@/components/ui/bento-cards";
import { LuminaSliderLazy } from "@/components/ui/lumina-slider-lazy";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoCards />
      <Revolutionize />
      <LuminaSliderLazy />
      <SmarterAI />
      <Plans />
      {/* Sections go here */}
    </>
  );
}
