"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "100+", label: "Happy Clients", icon: "😊" },
  { value: "500+", label: "Projects Completed", icon: "🚀" },
  { value: "5+", label: "Years Experience", icon: "⏰" },
  { value: "98%", label: "Client Satisfaction", icon: "⭐" },
];

const marqueeItems = [
  "BRANDING",
  "✦",
  "WEB DESIGN",
  "✦",
  "SOCIAL MEDIA",
  "✦",
  "SEO",
  "✦",
  "CONTENT",
  "✦",
  "STRATEGY",
  "✦",
  "GROWTH",
  "✦",
  "ADS",
  "✦",
];

function MarqueeBand() {
  return (
    <div className="relative py-6 border-y border-white/[0.03] mb-20 overflow-hidden">
      <div className="flex">
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 gap-6 sm:gap-10 text-5xl sm:text-7xl font-black font-[family-name:var(--font-display)] text-white/[0.03] uppercase whitespace-nowrap pr-6 sm:pr-10 will-change-transform"
            animate={{ x: "-100%" }}
            transition={{
              x: { repeat: Infinity, duration: 30, ease: "linear" },
            }}
          >
            {marqueeItems.map((word, i) => (
              <span key={i} className={word === "✦" ? "text-brand/[0.06]" : ""}>
                {word}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <MarqueeBand />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="p-7 rounded-2xl bg-dark-2 border border-white/5 text-center hover:border-brand/15 transition-colors duration-300"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <div className="text-3xl sm:text-4xl font-black font-[family-name:var(--font-display)] text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
