"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { SERVICES } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import {
  Share2,
  Monitor,
  Film,
  Sparkles,
  TrendingUp,
  Search,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  share2: Share2,
  monitor: Monitor,
  film: Film,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  search: Search,
};

export function Services() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              overline="What We Do"
              title="Services That Drive Growth"
              description="From basic setup to complete business branding — we handle everything professionally."
              align="left"
            />
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[#6C63FF] hover:text-[#00D4AA] transition-colors"
            >
              Get Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <GlassCard className="h-full group cursor-pointer hover:border-[#6C63FF]/30 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4AA]/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#6C63FF]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#A0A0B8] leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more
                      <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
