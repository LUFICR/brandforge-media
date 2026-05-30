"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Every pixel crafted to perfection with attention to detail.",
    num: "01",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    desc: "Quick turnaround without compromising quality.",
    num: "02",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    desc: "Always available when you need us, anytime.",
    num: "03",
  },
  {
    icon: Users,
    title: "Result-Driven",
    desc: "Strategies that deliver measurable growth.",
    num: "04",
  },
];

export default function About() {
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
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl border border-brand/10 animate-morph" />
              <div className="absolute inset-4 rounded-3xl bg-dark-2 border border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mb-6">
                    <span className="text-3xl font-black text-white font-[family-name:var(--font-display)]">
                      BF
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-2">
                    BrandForge Media
                  </h3>
                  <p className="text-brand-light text-sm font-medium mb-8">
                    Since 2019
                  </p>

                  <div className="grid grid-cols-3 gap-4 w-full">
                    {[
                      { val: "5+", label: "Years" },
                      { val: "100+", label: "Clients" },
                      { val: "500+", label: "Projects" },
                    ].map((s, i) => (
                      <div key={i} className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-xl font-bold text-white font-[family-name:var(--font-display)]">
                          {s.val}
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
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-dark-2 border border-white/[0.06] text-sm text-white font-medium"
              >
                Top Rated Agency
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-dark-2 border border-white/[0.06] text-sm text-accent font-medium"
              >
                100+ Happy Clients
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
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-6 leading-tight">
              We Turn Businesses Into{" "}
              <span className="text-gradient">Powerful Brands</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              We&apos;re a team of creative strategists, designers, and marketers
              passionate about helping businesses establish a powerful online
              presence.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              At BrandForge Media, we believe every business deserves a premium
              digital identity. We combine creative excellence with data-driven
              strategy to deliver results that matter. From social media management
              to complete brand overhauls, we handle everything with the same level
              of care and professionalism.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Creative Strategy",
                "Brand Design",
                "Digital Marketing",
                "Social Media",
                "SEO",
              ].map((tag) => (
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
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-4">
              Built Different, Built <span className="text-gradient">Better</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
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
                  <f.icon className="w-6 h-6 text-brand-light" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-display)]">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
