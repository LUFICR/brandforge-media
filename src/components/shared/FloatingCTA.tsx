"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { MessageCircle, X } from "lucide-react";

export function FloatingCTA() {
  const scrollProgress = useScrollProgress();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (scrollProgress > 0.3 && !dismissed) {
      setVisible(true);
    }
  }, [scrollProgress, dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <button
            onClick={() => { setVisible(false); setDismissed(true); }}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>

          <a
            href="https://wa.me/919311267085"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:scale-110 transition-transform duration-200"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-10 right-0 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Chat with us
            </span>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
