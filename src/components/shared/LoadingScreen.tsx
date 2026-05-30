"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["DESIGNING", "CRAFTING", "BUILDING", "LAUNCHING"];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 10 + 4;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return next;
      });
    }, 55);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 550);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-dark flex items-center justify-center overflow-hidden"
        >
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-[180px]"
            style={{
              top: "30%",
              left: "30%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand via-purple-600 to-accent flex items-center justify-center mx-auto animate-pulse-glow">
                <span className="text-2xl font-black text-white font-[family-name:var(--font-display)]">
                  BF
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl font-bold font-[family-name:var(--font-display)] text-white mb-2"
            >
              BrandForge<span className="text-brand-light">.media</span>
            </motion.p>

            <div className="h-5 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block text-[10px] tracking-[0.35em] uppercase text-brand-light font-medium"
                >
                  {words[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #8B5CF6, #06FFA5)",
                  transition: "width 0.1s ease",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[10px] text-gray-600 mt-3 font-mono tabular-nums"
            >
              {Math.min(Math.floor(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
