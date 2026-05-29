"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { useInView } from "@/hooks/useInView";
import { Zap, Clock, Headphones, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Premium Quality",
    description: "Every pixel crafted to perfection with attention to detail",
    number: "01",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick turnaround without compromising quality",
    number: "02",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always available when you need us",
    number: "03",
  },
  {
    icon: Target,
    title: "Result-Driven",
    description: "Strategies that deliver measurable growth",
    number: "04",
  },
];

export function WhyChooseUs() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="Why Choose Us"
          title="Built Different, Built Better"
          description="We combine creativity with strategy to deliver results that matter"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.3 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.number}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <GlassCard className="h-full text-center group">
                <span className="text-5xl font-bold text-white/[0.04] font-[family-name:var(--font-display)] absolute top-4 right-4">
                  {feature.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4AA]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-[#6C63FF]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#A0A0B8] leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
