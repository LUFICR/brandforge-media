"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    description:
      "We learn about your business, goals, target audience, and competition through in-depth research.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: "02",
    title: "Strategy",
    description:
      "We create a custom growth plan tailored to your unique business needs and market.",
    icon: Lightbulb,
    color: "from-violet-500 to-purple-500",
  },
  {
    num: "03",
    title: "Design",
    description:
      "We craft premium visual assets and digital experiences that captivate your audience.",
    icon: PenTool,
    color: "from-pink-500 to-rose-500",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "We execute, test, and go live — ensuring everything is pixel-perfect and performing.",
    icon: Rocket,
    color: "from-orange-500 to-amber-500",
  },
  {
    num: "05",
    title: "Growth",
    description:
      "We continuously optimize, analyze, and scale results for sustained business growth.",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-500",
  },
];

export default function Process() {
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
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            How We <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A proven process that delivers results every time — transparent,
            efficient, and effective.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/30 via-accent/20 to-transparent hidden sm:block lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
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
                          <step.icon className="w-5 h-5 text-white" />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
