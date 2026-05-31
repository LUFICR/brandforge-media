"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Rocket, Shield, LucideIcon } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Rocket,
  Shield,
  Users,
};

export default function About({ content }: { content: SiteContent }) {
  const { about } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-3xl border border-brand/10 animate-morph" />
              <div className="absolute inset-4 rounded-3xl bg-dark-2 border border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mb-6">
                    <span className="text-3xl font-black text-white font-[family-name:var(--font-display)]">
                      {about.companyShort}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-2">
                    {about.companyName}
                  </h3>
                  <p className="text-brand-light text-sm font-medium mb-8">
                    {about.foundedYear}
                  </p>

                  <div className="grid grid-cols-3 gap-4 w-full">
                    {about.stats.map((s, i) => (
                      <div key={i} className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-xl font-bold text-white font-[family-name:var(--font-display)]">
                          {s.value}
                        </div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-2 right-2 px-4 py-2 rounded-xl bg-dark-2 border border-white/[0.06] text-sm text-white font-medium"
              >
                Top Rated Agency
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute bottom-2 left-2 px-4 py-2 rounded-xl bg-dark-2 border border-white/[0.06] text-sm text-accent font-medium"
              >
                {about.stats[1]?.value} Happy Clients
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              {about.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-6 leading-tight">
              {about.title}{" "}
              <span className="text-gradient">{about.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {about.description}
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              {about.descriptionSecondary}
            </p>

            <div className="flex flex-wrap gap-3">
              {about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-sm font-medium mb-6">
              {about.whyChooseUsBadge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-4">
              {about.whyChooseUsTitle} <span className="text-gradient">{about.whyChooseUsHighlight}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.features.map((f, i) => {
              const Icon = iconMap[f.icon] || Award;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-dark-2 border border-white/5 hover:border-brand/20 transition-all duration-500 text-center"
                >
                  <div className="absolute -top-3 -right-3 text-5xl font-black text-white/[0.03] font-[family-name:var(--font-display)]">
                    {f.num}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/20 transition-colors">
                    <Icon className="w-6 h-6 text-brand-light" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-display)]">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
