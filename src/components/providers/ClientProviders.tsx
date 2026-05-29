"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { ParticleField } from "@/components/shared/ParticleField";
import { ScrollParallaxElements } from "@/components/motion/ScrollParallaxElements";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <ParticleField />
      <ScrollParallaxElements />
      {children}
    </SmoothScroll>
  );
}
