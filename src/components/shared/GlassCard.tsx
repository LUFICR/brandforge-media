"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  variant?: "subtle" | "medium" | "strong";
  hover?: "lift" | "glow" | "none";
  className?: string;
}

const variantStyles = {
  subtle: "bg-white/[0.03] backdrop-blur-lg border border-white/[0.06]",
  medium: "bg-white/[0.05] backdrop-blur-xl border border-white/[0.08]",
  strong: "bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12]",
};

export function GlassCard({
  children,
  variant = "medium",
  hover = "lift",
  className,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6 relative overflow-hidden",
        variantStyles[variant],
        className
      )}
      whileHover={
        hover === "lift"
          ? { y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
          : hover === "glow"
            ? { boxShadow: "0 0 40px rgba(108,99,255,0.15)" }
            : undefined
      }
    >
      {hover === "lift" && (
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full"
          whileHover={{ opacity: 1, translateX: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
      {children}
    </motion.div>
  );
}
