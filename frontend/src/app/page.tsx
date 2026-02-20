import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { CTASection } from "@/components/sections/CTASection";

import { RegenerationTools } from "@/components/sections/RegenerationTools";

export const metadata: Metadata = {
  title: "Regen Peru — DAO para el Voluntariado y la Regeneración",
  description:
    "Únete a la comunidad que está cambiando Perú. Vota por proyectos de impacto social usando blockchain. Gratuito, transparente y democrático.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <RegenerationTools />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}
