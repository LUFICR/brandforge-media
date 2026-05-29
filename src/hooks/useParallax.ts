"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

export function useParallax<T extends HTMLElement>({ speed = 50, direction = "up" }: ParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const yValue = direction === "up" ? -speed : speed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -yValue },
        {
          y: yValue,
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

    return () => ctx.revert();
  }, [speed, direction]);

  return ref;
}
