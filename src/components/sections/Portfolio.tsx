"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { useInView } from "@/hooks/useInView";

const projects = [
  { title: "Luxe Fashion Brand", category: "Branding", gradient: "from-[#6C63FF] to-[#4338ca]" },
  { title: "TechStart SaaS Platform", category: "Web Design", gradient: "from-[#00D4AA] to-[#059669]" },
  { title: "FoodieHub Restaurant", category: "Social Media", gradient: "from-[#FF6B35] to-[#dc2626]" },
  { title: "FitLife Wellness App", category: "Digital Marketing", gradient: "from-[#6C63FF] to-[#00D4AA]" },
  { title: "Urban Realty Group", category: "SEO & Web", gradient: "from-[#FF6B35] to-[#6C63FF]" },
  { title: "CloudSync Enterprise", category: "Branding", gradient: "from-[#00D4AA] to-[#6C63FF]" },
];

export function Portfolio() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section id="portfolio" ref={ref} className="relative py-24 md:py-32 lg:py-40">
      {/* Parallax background accents */}
      <div data-parallax="70" className="absolute top-1/4 left-0 w-[250px] h-[250px] rounded-full bg-[#FF6B35]/[0.03] blur-[100px]" />
      <div data-parallax="50" data-parallax-dir="down" className="absolute bottom-1/4 right-0 w-[200px] h-[200px] rounded-full bg-[#6C63FF]/[0.04] blur-[80px]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="Our Work"
          title="Projects That Speak For Themselves"
          description="A selection of our recent work across branding, web design, and digital marketing"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <GlassCard hover="lift" className="group cursor-pointer overflow-hidden p-0 !border-0">
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden rounded-2xl`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-medium text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
