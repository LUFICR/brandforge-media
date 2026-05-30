"use client";

import { useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 90, damping: 28 });
  const sy = useSpring(my, { stiffness: 90, damping: 28 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    },
    [mx, my]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <motion.div
      className="hidden lg:block fixed pointer-events-none z-0 will-change-transform"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 65%)",
      }}
    />
  );
}
