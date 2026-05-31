"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

export default function Portfolio({ content }: { content: SiteContent }) {
  const { portfolio } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
            {portfolio.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            {portfolio.title} <span className="text-gradient">{portfolio.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {portfolio.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {portfolio.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              layout
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-dark-2 border border-white/5 hover:border-brand/20 transition-all duration-500">
                <div
                  className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                        <ExternalLink className="w-7 h-7" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <span className="text-xs text-brand-light font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2 font-[family-name:var(--font-display)] flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-brand-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
