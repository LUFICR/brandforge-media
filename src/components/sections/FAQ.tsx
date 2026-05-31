"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-white group-hover:text-brand-light transition-colors duration-200 pr-4 font-[family-name:var(--font-display)]">
          {faq.question}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "bg-brand text-white rotate-0" : "bg-white/5 text-gray-400"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400 leading-relaxed text-sm sm:text-base pr-10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ content }: { content: SiteContent }) {
  const { faq } = content;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" />

      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-5">
            {faq.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-4">
            {faq.title} <span className="text-gradient">{faq.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="rounded-2xl bg-dark-2 border border-white/5 p-5 sm:p-7"
        >
          {faq.items.map((item, i) => (
            <FAQItem
              key={item.id}
              faq={item}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
