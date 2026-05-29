"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What services does BrandForge Media offer?",
    answer: "We offer Social Media Management, Website Designing, Graphic & Video Editing, Branding & Promotions, Digital Marketing Services, and SEO Marketing. From basic setup to complete business branding.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Results vary by service. Social media growth typically shows within 2-4 weeks, SEO results in 2-3 months, and website projects are delivered within 1-3 weeks depending on complexity.",
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely! We work with businesses of all sizes. Whether you're just starting out or looking to scale, we have solutions tailored to your budget and goals.",
  },
  {
    question: "What makes BrandForge Media different?",
    answer: "We combine premium quality with personalized attention. Every project gets dedicated strategy, creative excellence, and measurable results — not cookie-cutter templates.",
  },
  {
    question: "How do I get started?",
    answer: "Simply reach out via our contact form or call us at 9311267085. We'll discuss your requirements and provide a custom solution within 24 hours.",
  },
];

export function FAQ() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with us"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 },
            },
          }}
          className="mt-12 space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#6C63FF]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-[#A0A0B8] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
