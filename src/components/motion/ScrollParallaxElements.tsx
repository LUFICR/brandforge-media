"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ScrollParallaxElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "50");
        const direction = el.dataset.parallaxDir === "down" ? 1 : -1;

        gsap.fromTo(
          el,
          { y: speed * direction * -1 },
          {
            y: speed * direction,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-rotate]").forEach((el) => {
        const rotation = parseFloat(el.dataset.scrollRotate || "5");
        gsap.fromTo(
          el,
          { rotation: -rotation },
          {
            rotation: rotation,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return null;
}
