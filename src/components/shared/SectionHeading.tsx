"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useInView } from "@/hooks/useInView";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {overline && (
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.08em] text-[#A0A0B8] mb-4 font-medium"
        >
          {overline}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-white leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base md:text-lg text-[#A0A0B8] leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
