"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          overline="Get In Touch"
          title="Let's Start Your Project"
          description="Share your requirements and our team will help you with the best solution for your business"
        />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 mt-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GlassCard variant="subtle" hover="none" className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-[#A0A0B8] mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-[#6B6B80] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-[#A0A0B8] mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-[#6B6B80] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs text-[#A0A0B8] mb-2">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-[#6B6B80] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]/50 transition-all"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs text-[#A0A0B8] mb-2">Service</label>
                    <select
                      id="service"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]/50 transition-all appearance-none"
                    >
                      <option value="" className="bg-[#12121A]">Select a service</option>
                      <option value="social" className="bg-[#12121A]">Social Media Management</option>
                      <option value="web" className="bg-[#12121A]">Website Designing</option>
                      <option value="graphic" className="bg-[#12121A]">Graphic & Video Editing</option>
                      <option value="branding" className="bg-[#12121A]">Branding & Promotions</option>
                      <option value="marketing" className="bg-[#12121A]">Digital Marketing</option>
                      <option value="seo" className="bg-[#12121A]">SEO Marketing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-[#A0A0B8] mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-[#6B6B80] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <MagneticButton
                  className="!w-full"
                  onClick={() => {}}
                >
                  {submitted ? "Message Sent!" : "Send Message"}
                </MagneticButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <GlassCard variant="medium" hover="none">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B80] mb-1">Phone</p>
                    <a href="tel:9311267085" className="text-white text-sm hover:text-[#6C63FF] transition-colors">
                      9311267085
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#00D4AA]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B80] mb-1">Email</p>
                    <a href="mailto:contact@brandforgemedia.com" className="text-white text-sm hover:text-[#00D4AA] transition-colors">
                      contact@brandforgemedia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B80] mb-1">Location</p>
                    <p className="text-white text-sm">India</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="subtle" hover="none" className="text-center">
              <p className="text-sm text-[#A0A0B8]">
                We typically respond within <span className="text-white font-medium">2 hours</span>
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
