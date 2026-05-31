"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Heart,
  Globe,
  MessageSquare,
  Users,
  Rss,
} from "lucide-react";
import { SiteContent } from "@/data/siteContent";

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageSquare, href: "#", label: "Chat" },
  { icon: Users, href: "#", label: "Community" },
  { icon: Rss, href: "#", label: "Blog" },
];

export default function Footer({ content }: { content: SiteContent }) {
  const { footer } = content;

  return (
    <footer className="relative pt-32 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-10 sm:p-16 rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-purple-700 to-accent opacity-90 rounded-3xl" />
          <div className="absolute inset-0 bg-dark/30 rounded-3xl" />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
              {footer.ctaTitle}
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              {footer.ctaSubtitle}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {footer.ctaButton}
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)] text-white">
                {footer.brandName}<span className="text-brand-light">{footer.brandTagline}</span>
              </span>
            </a>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              {footer.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand/20 flex items-center justify-center transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-brand-light transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footer.links).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-6 font-[family-name:var(--font-display)] capitalize">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-brand-light transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            {footer.copyright}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Crafted with{" "}
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> by
            BrandForge Media
          </p>
        </div>
      </div>
    </footer>
  );
}
