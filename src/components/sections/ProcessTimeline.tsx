"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, PenTool, Rocket, TrendingUp, LucideIcon } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Lightbulb,
  PenTool,
  Rocket,
  TrendingUp,
};

export default function Process({ content }: { content: SiteContent }) {
  const { process } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            {process.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            {process.title} <span className="text-gradient">{process.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {process.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/30 via-accent/20 to-transparent hidden sm:block lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {process.steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i }}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <div
                      className={`inline-block p-8 rounded-2xl bg-dark-2 border border-white/5 hover:border-brand/20 transition-all duration-500 group max-w-lg ${
                        i % 2 === 0 ? "lg:ml-auto" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5 shrink-0`}
                        >
                          <div className="w-full h-full rounded-xl bg-dark-2 flex items-center justify-center group-hover:bg-transparent transition-colors">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 hidden sm:flex">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm font-[family-name:var(--font-display)] shadow-lg`}
                    >
                      {step.num}
                    </div>
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
