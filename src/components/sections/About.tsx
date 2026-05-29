"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { useInView } from "@/hooks/useInView";
import { GradientText } from "@/components/shared/GradientText";

export function About() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 lg:py-40">
      {/* Parallax decorative orbs */}
      <div data-parallax="60" className="absolute top-20 right-10 w-[200px] h-[200px] rounded-full bg-[#6C63FF]/[0.04] blur-[80px]" />
      <div data-parallax="40" data-parallax-dir="down" className="absolute bottom-20 left-10 w-[150px] h-[150px] rounded-full bg-[#00D4AA]/[0.03] blur-[60px]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square max-w-[500px] mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6C63FF]/20 via-[#00D4AA]/10 to-[#FF6B35]/10 blur-3xl" />
            <div className="relative h-full rounded-3xl glass overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <Image
                  src="/logo.png"
                  alt="BrandForge Media"
                  width={160}
                  height={160}
                  className="rounded-full mx-auto"
                />
                <p className="mt-4 text-sm text-[#A0A0B8]">Since 2019</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#6C63FF]/10 blur-xl" />
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-[#00D4AA]/10 blur-xl" />
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <SectionHeading
              overline="About BrandForge Media"
              title="We Turn Businesses Into Brands"
              description="We're a team of creative strategists, designers, and marketers passionate about helping businesses establish a powerful online presence."
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 space-y-4 text-[#A0A0B8] text-sm leading-relaxed"
            >
              <p>
                At BrandForge Media, we believe every business deserves a premium digital identity.
                We combine creative excellence with data-driven strategy to deliver results that matter.
              </p>
              <p>
                From social media management to complete brand overhauls, we handle everything
                with the same level of care and professionalism — because your brand deserves nothing less.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {[
                { value: "5+", label: "Years" },
                { value: "100+", label: "Clients" },
                { value: "500+", label: "Projects" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
                    <GradientText gradient="secondary">{item.value}</GradientText>
                  </div>
                  <p className="text-xs text-[#6B6B80] mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
