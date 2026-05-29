"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "primary" | "secondary" | "warm";
}

const gradients = {
  primary: "from-[#6C63FF] via-[#00D4AA] to-[#FF6B35]",
  secondary: "from-[#6C63FF] to-[#00D4AA]",
  warm: "from-[#FF6B35] to-[#6C63FF]",
};

export function GradientText({
  children,
  className,
  gradient = "primary",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[gradient],
        className
      )}
    >
      {children}
    </span>
  );
}
