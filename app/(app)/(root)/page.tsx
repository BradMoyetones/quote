'use client'
import { SiteFooter } from "@/components/site-footer";
import { Header } from "./components/header-animated";
import { FeaturesSection } from "./components/features-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { PreviewSection } from "./components/preview-section";
import { BenefitsSection } from "./components/benefits-section";
import { CTASection } from "./components/cta-section";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Hero } from "./components/hero-animated";
import { motion } from 'motion/react';

const CONTENT_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;

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
      {transition && (
        <>
          <div>
            <motion.div
              variants={CONTENT_VARIANTS}
              initial="hidden"
              animate={transition ? 'visible' : 'hidden'}
              className="w-full"
            >
              <Hero key={String(transition)} />
            </motion.div>
          </div>

          <FeaturesSection />
          <HowItWorksSection />
          <PreviewSection />
          <BenefitsSection />
          <CTASection />
          <SiteFooter />
        </>
      )}
    </main>
  );
}
