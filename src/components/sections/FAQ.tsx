"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What services does BrandForge Media offer?",
    a: "We offer a comprehensive range of digital marketing services including brand identity design, web development, social media management, SEO optimization, paid advertising, content creation, and digital strategy consulting.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on scope. A logo design takes 3-5 days, brand identity 1-2 weeks, website development 2-4 weeks, and ongoing marketing campaigns are managed monthly. We always provide clear timelines upfront.",
  },
  {
    q: "What are your pricing plans?",
    a: "We offer flexible pricing tailored to your business needs. Packages start from affordable basic plans to comprehensive premium packages. Contact us for a free consultation and custom quote.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Absolutely! While we're based in India, we work with clients globally. Our digital-first approach means we can collaborate seamlessly regardless of location.",
  },
  {
    q: "What makes BrandForge different from other agencies?",
    a: "We combine premium design quality with strategic thinking. Every project gets personalized attention, we offer 24/7 support, fast turnaround times, and most importantly — we focus on measurable results, not just aesthetics.",
  },
  {
    q: "Can you handle ongoing social media management?",
    a: "Yes! We offer monthly social media management packages that include content creation, posting, engagement management, analytics reporting, and strategy optimization to keep your brand growing consistently.",
  },
];

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
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
          {faq.q}
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
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-white mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="rounded-2xl bg-dark-2 border border-white/5 p-5 sm:p-7"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
