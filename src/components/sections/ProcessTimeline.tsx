"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useInView } from "@/hooks/useInView";

const steps = [
  { number: "01", title: "Discovery", description: "We learn about your business and goals" },
  { number: "02", title: "Strategy", description: "We create a custom growth plan" },
  { number: "03", title: "Design", description: "We craft premium visual assets" },
  { number: "04", title: "Launch", description: "We execute and go live" },
  { number: "05", title: "Growth", description: "We optimize and scale results" },
];

export function ProcessTimeline() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 lg:py-40">
      {/* Smooth gradient transition */}
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-[#12121A]/40" />
        <div className="absolute inset-x-0 top-32 bottom-32 bg-[#12121A]/40" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-transparent to-[#12121A]/40" />
      </div>
      {/* Parallax accents */}
      <div data-parallax="60" className="absolute top-10 right-20 w-[180px] h-[180px] rounded-full bg-[#6C63FF]/[0.03] blur-[80px]" />
      <div data-parallax="40" data-parallax-dir="down" className="absolute bottom-10 left-20 w-[150px] h-[150px] rounded-full bg-[#00D4AA]/[0.03] blur-[60px]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="Our Process"
          title="How We Work"
          description="A proven process that delivers results every time"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
          className="mt-16 relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`md:flex items-center gap-8 md:mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass rounded-2xl p-6 inline-block">
                    <span className="text-xs text-[#6C63FF] font-mono">{step.number}</span>
                    <h3 className="text-lg font-semibold text-white mt-1">{step.title}</h3>
                    <p className="text-sm text-[#A0A0B8] mt-1">{step.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex w-10 h-10 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/40 items-center justify-center shrink-0 z-10">
                  <div className="w-3 h-3 rounded-full bg-[#6C63FF]" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
