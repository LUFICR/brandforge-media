"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { GradientText } from "@/components/shared/GradientText";
import { fadeUp } from "@/lib/animations";
import { EASING } from "@/lib/constants";

const HeroBlob = dynamic(
  () => import("@/components/three/HeroBlob").then((m) => m.HeroBlob),
  { ssr: false }
);

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,170,0.05)_0%,transparent_50%)]" />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#0A0A0F_100%)]" />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-[900px] mx-auto px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.08em] text-[#A0A0B8] mb-6 font-medium"
        >
          Digital Marketing Agency
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] leading-[1.05] tracking-tight"
        >
          We Build Brands That{" "}
          <GradientText>Dominate Online</GradientText>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-base md:text-lg text-[#A0A0B8] max-w-[600px] mx-auto leading-relaxed"
        >
          From social media to complete digital presence — premium solutions
          for ambitious businesses
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#contact">Start Your Project</MagneticButton>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium text-white/80 hover:text-white border border-white/10 rounded-xl hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            View Our Work
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D Blob */}
      <HeroBlob />

      {/* Floating orbs */}
      <div data-parallax="80" className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px] animate-pulse" />
      <div data-parallax="50" data-parallax-dir="down" className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-[#00D4AA]/[0.04] blur-[80px] animate-pulse delay-1000" />
    </section>
  );
}
