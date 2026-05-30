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
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Complete brand identity design including logo, colors, typography & brand guidelines that make you unforgettable.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Globe,
    title: "Web Design & Dev",
    description:
      "Premium, responsive websites crafted with cutting-edge technology to convert visitors into loyal customers.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Share2,
    title: "Social Media",
    description:
      "Strategic social media management that builds communities, drives engagement, and grows your audience.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: BarChart3,
    title: "SEO & Analytics",
    description:
      "Data-driven SEO strategies that boost rankings, increase traffic, and deliver measurable ROI.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description:
      "High-performing ad campaigns across Google, Meta & more — optimized for maximum conversions.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description:
      "Professional content production — from photography to video and copywriting that tells your story.",
    color: "from-indigo-500 to-violet-600",
  },
];

export default function Services() {
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
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            Services That Drive <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From basic setup to complete business branding — we handle everything
            professionally.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
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
                    <service.icon className="w-6 h-6 text-white" />
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
          ))}
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
            Get Free Consultation
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
