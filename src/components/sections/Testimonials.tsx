"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "BrandForge Media transformed our online presence completely. Our engagement grew 300% in just 3 months.",
    name: "Rahul Sharma",
    business: "TechStart Solutions",
    rating: 5,
  },
  {
    quote: "The website they designed for us is stunning. We've seen a 5x increase in leads since launch.",
    name: "Priya Patel",
    business: "Luxe Interiors",
    rating: 5,
  },
  {
    quote: "Professional, creative, and results-driven. They truly understand digital marketing.",
    name: "Amit Verma",
    business: "FoodieHub Restaurant",
    rating: 5,
  },
  {
    quote: "Their branding work gave our startup the premium identity we needed to attract investors.",
    name: "Sneha Gupta",
    business: "CloudSync Enterprise",
    rating: 5,
  },
];

export function Testimonials() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="Testimonials"
          title="What Our Clients Say"
          description="Real results from real businesses we've helped grow"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard variant="medium" hover="none" className="text-center p-8 md:p-10">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-white leading-relaxed italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-[#A0A0B8] mt-1">
                      {testimonials[current].business}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-[#6C63FF] w-6" : "bg-white/20"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
