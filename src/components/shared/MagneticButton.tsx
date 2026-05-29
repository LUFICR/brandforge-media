"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticRadius?: number;
  magneticStrength?: number;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className,
  magneticRadius = 40,
  magneticStrength = 0.3,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < magneticRadius) {
      x.set(distX * magneticStrength);
      y.set(distY * magneticStrength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200",
          "bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white",
          "hover:shadow-[0_0_30px_rgba(108,99,255,0.3)] hover:scale-[1.03]",
          "active:scale-[0.97]",
          className
        )}
      >
        {children}
      </Component>
    </motion.div>
  );
}
