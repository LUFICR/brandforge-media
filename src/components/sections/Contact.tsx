"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Clock, MessageCircle, LucideIcon } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

type FormStatus = "idle" | "submitting" | "success" | "error";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Clock,
};

export default function Contact({ content }: { content: SiteContent }) {
  const { contact } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormState({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            {contact.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-6">
            {contact.title} <span className="text-gradient">{contact.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contact.info.map((info, i) => {
              const Icon = iconMap[info.icon] || Mail;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-2 border border-white/5 hover:border-brand/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </motion.div>
              );
            })}

            <motion.a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
            >
              <MessageCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-white font-semibold">{contact.whatsappText}</div>
                <div className="text-emerald-400 text-sm">
                  {contact.whatsappSubtext}
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-dark-2 border border-white/5 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    {contact.formLabels.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-brand/40 focus:outline-none focus:ring-1 focus:ring-brand/20 text-white placeholder-gray-600 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    {contact.formLabels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-brand/40 focus:outline-none focus:ring-1 focus:ring-brand/20 text-white placeholder-gray-600 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    {contact.formLabels.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-brand/40 focus:outline-none focus:ring-1 focus:ring-brand/20 text-white placeholder-gray-600 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    {contact.formLabels.service}
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={(e) =>
                      setFormState({ ...formState, service: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-brand/40 focus:outline-none focus:ring-1 focus:ring-brand/20 text-white transition-all appearance-none"
                  >
                    <option value="" className="bg-[#12121a]">
                      Select a service
                    </option>
                    {contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#12121a]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {contact.formLabels.message}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-brand/40 focus:outline-none focus:ring-1 focus:ring-brand/20 text-white placeholder-gray-600 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-70"
              >
                {status === "success" ? (
                  <span className="flex items-center gap-2">
                    ✓ Message Sent Successfully!
                  </span>
                ) : status === "submitting" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span className="relative z-10">{contact.formLabels.submit}</span>
                    <Send className="w-5 h-5 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                {contact.responseTime}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
