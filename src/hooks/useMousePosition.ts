"use client";

import { useState, useEffect, useCallback } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    let frameId: number;
    let lastX = 0.5;
    let lastY = 0.5;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX / window.innerWidth;
      lastY = e.clientY / window.innerHeight;
    };

    const update = () => {
      setPosition((prev) => ({
        x: prev.x + (lastX - prev.x) * 0.1,
        y: prev.y + (lastY - prev.y) * 0.1,
      }));
      frameId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove);
    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return position;
}
