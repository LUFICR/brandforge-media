"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

export default function Testimonials({ content }: { content: SiteContent }) {
  const { testimonials } = content;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % testimonials.items.length);
  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.items.length) % testimonials.items.length);
  const t = testimonials.items[idx];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-5">
            {testimonials.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-4">
            {testimonials.title} <span className="text-gradient">{testimonials.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {testimonials.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <div className="relative p-8 sm:p-12 rounded-3xl bg-dark-2 border border-white/5 overflow-hidden">
            <div className="absolute top-5 right-6 text-brand/[0.06]">
              <Quote className="w-20 h-20" />
            </div>

            <div className="relative min-h-[220px] sm:min-h-[200px]">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <blockquote className="text-lg sm:text-2xl text-white font-medium leading-relaxed mb-8 font-[family-name:var(--font-display)]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white font-bold text-base">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
              <div className="flex gap-2">
                {testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === idx
                        ? "w-6 bg-brand"
                        : "w-2 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
