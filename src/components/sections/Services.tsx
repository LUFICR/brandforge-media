"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  Globe,
  Share2,
  BarChart3,
  Megaphone,
  Camera,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { SiteContent } from "@/data/siteContent";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Globe,
  Share2,
  BarChart3,
  Megaphone,
  Camera,
};

export default function Services({ content }: { content: SiteContent }) {
  const { services } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-sm font-medium mb-6">
            {services.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            {services.title} <span className="text-gradient">{services.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon] || Palette;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-dark-2 border border-white/5 hover:border-brand/20 transition-all duration-500 overflow-hidden cursor-pointer text-center">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6 mx-auto`}
                  >
                    <div className="w-full h-full rounded-xl bg-dark-2 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-display)] flex items-center justify-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-brand-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-full hover:shadow-lg hover:shadow-brand/20 transition-all"
          >
            {services.ctaText}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
