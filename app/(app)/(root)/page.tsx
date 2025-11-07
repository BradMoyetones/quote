'use client'
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";
import { Metadata } from "next";
import { Header } from "./components/animated-header";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { PreviewSection } from "./components/preview-section";
import { BenefitsSection } from "./components/benefits-section";
import { CTASection } from "./components/cta-section";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
   const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 1250);
    const timer2 = setTimeout(() => setIsLoaded(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className={cn('relative h-dvh', !isLoaded && 'overflow-y-hidden')}>
      <Header transition={transition} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PreviewSection />
      <BenefitsSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
