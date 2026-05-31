"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { SiteContent } from "@/data/siteContent";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function CSSParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <div className="hero-particle" style={{ left: "10%", top: "20%", animationDelay: "0s", animationDuration: "9s" }} />
      <div className="hero-particle hero-particle--green" style={{ left: "25%", top: "60%", animationDelay: "1.5s", animationDuration: "11s" }} />
      <div className="hero-particle hero-particle--purple-light" style={{ left: "45%", top: "15%", animationDelay: "3s", animationDuration: "8s" }} />
      <div className="hero-particle" style={{ left: "65%", top: "70%", animationDelay: "0.8s", animationDuration: "10s" }} />
      <div className="hero-particle hero-particle--green" style={{ left: "80%", top: "30%", animationDelay: "2.2s", animationDuration: "12s" }} />
      <div className="hero-particle" style={{ left: "15%", top: "80%", animationDelay: "4s", animationDuration: "9.5s" }} />
      <div className="hero-particle hero-particle--purple-light" style={{ left: "55%", top: "45%", animationDelay: "1s", animationDuration: "10.5s" }} />
      <div className="hero-particle hero-particle--green" style={{ left: "90%", top: "55%", animationDelay: "2.8s", animationDuration: "8.5s" }} />
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          let cur = 0;
          const step = target / 40;
          const id = setInterval(() => {
            cur += step;
            if (cur >= target) {
              setCount(target);
              clearInterval(id);
            } else setCount(Math.floor(cur));
          }, 35);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;

  const progressTarget = useRef(0);
  const progressRendered = useRef(0);
  const rafId = useRef(0);
  const expandedRef = useRef(false);
  const touchYRef = useRef(0);
  const isMobileRef = useRef(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const titleLine3Ref = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [, setExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const BASE_W = 340;
  const BASE_H = 230;

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const tick = useCallback(() => {
    const target = progressTarget.current;
    const rendered = lerp(progressRendered.current, target, 0.12);
    progressRendered.current = rendered;

    const p = rendered;
    const mob = isMobileRef.current;

    if (bgRef.current) {
      bgRef.current.style.opacity = String(1 - p);
    }

    if (mediaRef.current) {
      const maxW = mob ? 940 : 1540;
      const maxH = mob ? 650 : 810;
      const scaleX = (BASE_W + p * (maxW - BASE_W)) / BASE_W;
      const scaleY = (BASE_H + p * (maxH - BASE_H)) / BASE_H;
      const radius = Math.max(2, 20 - p * 18);
      mediaRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleX}, ${scaleY})`;
      mediaRef.current.style.borderRadius = `${radius / scaleX}px ${radius / scaleY}px`;
      const mediaOpacity = clamp(p * 4, 0, 1);
      mediaRef.current.style.opacity = String(mediaOpacity);
    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(0.55 - p * 0.35);
    }

    const shift = p * (mob ? 120 : 100);
    if (titleLine1Ref.current) {
      titleLine1Ref.current.style.transform = `translate3d(-${shift}vw, 0, 0)`;
    }
    if (titleLine2Ref.current) {
      titleLine2Ref.current.style.transform = `translate3d(${shift}vw, 0, 0)`;
    }
    if (titleLine3Ref.current) {
      titleLine3Ref.current.style.opacity = String(clamp(1 - p * 2.5, 0, 1));
    }

    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = String(p < 0.25 ? 1 : Math.max(0, 1 - (p - 0.25) * 8));
    }

    if (statsRef.current) {
      const show = p > 0.45 && !expandedRef.current;
      statsRef.current.style.opacity = show ? String(clamp((p - 0.45) * 5, 0, 1)) : "0";
      statsRef.current.style.transform = `translate3d(-50%, ${show ? 0 : 16}px, 0)`;
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          expandedRef.current = false;
          setExpanded(false);
          setShowOverlay(false);
          progressTarget.current = 0.95;
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      const next = clamp(progressTarget.current + e.deltaY * 0.0007, 0, 1);
      progressTarget.current = next;
      if (next >= 1 && !expandedRef.current) {
        expandedRef.current = true;
        setExpanded(true);
        setShowOverlay(true);
      } else if (next < 0.7) {
        setShowOverlay(false);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchYRef.current) return;
      const dy = touchYRef.current - e.touches[0].clientY;

      if (expandedRef.current) {
        if (dy < -20 && window.scrollY <= 5) {
          expandedRef.current = false;
          setExpanded(false);
          setShowOverlay(false);
          progressTarget.current = 0.95;
          e.preventDefault();
        }
        touchYRef.current = e.touches[0].clientY;
        return;
      }
      e.preventDefault();
      const factor = dy < 0 ? 0.006 : 0.0035;
      const next = clamp(progressTarget.current + dy * factor, 0, 1);
      progressTarget.current = next;
      if (next >= 1 && !expandedRef.current) {
        expandedRef.current = true;
        setExpanded(true);
        setShowOverlay(true);
      } else if (next < 0.7) {
        setShowOverlay(false);
      }
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      touchYRef.current = 0;
    };
    const onScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section id="home" className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <div
            ref={bgRef}
            className="absolute inset-0 z-0 will-change-[opacity]"
            style={{ opacity: 1 }}
          >
            <img
              src={hero.backgroundImage}
              alt=""
              className="w-full h-full object-cover hero-bg-fallback"
              loading="eager"
            />
            <div className="absolute inset-0 bg-dark/40" />
          </div>

          <CSSParticles />

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[1]">
            <svg
              width="500"
              height="500"
              viewBox="0 0 500 500"
              fill="none"
              className="absolute opacity-[0.02] hero-ring-rotate"
            >
              <circle cx="250" cy="250" r="220" stroke="#8B5CF6" strokeWidth="0.4" strokeDasharray="6 18" />
              <circle cx="250" cy="250" r="180" stroke="#06FFA5" strokeWidth="0.3" strokeDasharray="3 22" />
            </svg>
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                ref={mediaRef}
                className="absolute z-[2] top-1/2 left-1/2 overflow-hidden will-change-transform"
                style={{
                  width: `${BASE_W}px`,
                  height: `${BASE_H}px`,
                  maxWidth: "96vw",
                  maxHeight: "88vh",
                  transform: "translate3d(-50%, -50%, 0) scale(1, 1)",
                  borderRadius: "20px",
                  transformOrigin: "center center",
                  opacity: 0,
                }}
              >
                <video
                  src={hero.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: "scale(1.01)" }}
                />

                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-dark/60 will-change-[opacity]"
                  style={{ opacity: 0.55 }}
                />
              </div>

              <div className="flex items-center justify-center text-center w-full relative z-10 flex-col gap-1 pointer-events-none select-none">
                <div
                  ref={titleLine1Ref}
                  className="will-change-transform"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-black font-[family-name:var(--font-display)] tracking-tighter text-white leading-[0.9]">
                    {hero.titleLine1}
                  </h1>
                </div>

                <div
                  ref={titleLine2Ref}
                  className="will-change-transform"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-black font-[family-name:var(--font-display)] tracking-tighter leading-[0.9]">
                    <span className="text-shine-sweep">{hero.titleLine2}</span>
                  </h1>
                </div>

                <div
                  ref={titleLine3Ref}
                  className="mt-1 will-change-[opacity]"
                  style={{ opacity: 1 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-black font-[family-name:var(--font-display)] tracking-tighter text-gradient-animated leading-[0.9]">
                    {hero.titleLine3}
                  </h1>
                </div>
              </div>

              <div
                ref={scrollHintRef}
                className="absolute z-[3] flex flex-col items-center gap-2 pointer-events-none bottom-[10%] will-change-[opacity]"
                style={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-sm font-medium tracking-wide">
                  {content.siteDescription}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-xs hero-bounce-hint">
                  <ChevronDown className="w-4 h-4 text-brand-light" />
                  <span className="tracking-[0.2em] uppercase">{hero.scrollText}</span>
                  <ChevronDown className="w-4 h-4 text-brand-light" />
                </div>
              </div>

              <div
                ref={statsRef}
                className="absolute z-[3] bottom-6 left-1/2 flex items-center gap-8 sm:gap-14 will-change-transform"
                style={{ opacity: 0, transform: "translate3d(-50%, 16px, 0)" }}
              >
                {hero.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl sm:text-2xl font-black font-[family-name:var(--font-display)] text-white">
                      <Counter target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  key="post-expand"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center w-full px-6 pb-20 pt-10 text-center"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs text-gray-400 font-medium tracking-wide">{hero.tagline}</span>
                  </div>

                  <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
                    {hero.subtitle.split("excellence")[0]}
                    <span className="text-white font-medium">excellence</span>
                    {hero.subtitle.split("excellence")[1] || "."}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href="#contact"
                      className="group relative px-8 py-3.5 bg-gradient-to-r from-brand via-purple-600 to-brand-dark text-white font-bold rounded-full text-base overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {hero.ctaPrimary}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    <a
                      href="#services"
                      className="px-8 py-3.5 text-gray-300 font-semibold rounded-full border border-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all text-base"
                    >
                      {hero.ctaSecondary}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
