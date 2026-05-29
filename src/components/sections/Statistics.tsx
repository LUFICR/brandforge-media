"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CountUp } from "@/components/motion/CountUp";
import { STATS } from "@/lib/constants";

export function Statistics() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#12121A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.05)_0%,transparent_60%)]" />
      <div data-parallax="30" className="absolute top-0 left-1/3 w-[200px] h-[200px] rounded-full bg-[#FF6B35]/[0.03] blur-[80px]" />

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="relative max-w-[1400px] mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="text-center relative"
            >
              {i < STATS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-white">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-[#A0A0B8]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
