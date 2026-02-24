import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
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
      <Navbar transparent />
      <HeroSection />
      <HowItWorksSection />
      <RegenerationTools />
      <FeaturedProjects />
      <CTASection />
      <Footer />
    </>
  );
}
