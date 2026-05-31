"use client";

import dynamic from "next/dynamic";
import { SiteContent } from "@/data/siteContent";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/shared/LoadingScreen";
import CursorGlow from "@/components/shared/CursorGlow";

const Scene3D = dynamic(() => import("@/components/three/Scene3D"), { ssr: false });
const MarqueeStats = dynamic(() => import("@/components/sections/MarqueeStats"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Process = dynamic(() => import("@/components/sections/ProcessTimeline"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function ClientPage({ content }: { content: SiteContent }) {
  return (
    <div className="relative bg-dark min-h-screen w-full overflow-x-hidden">
      <LoadingScreen />
      <Scene3D />
      <CursorGlow />

      <div className="relative z-10 w-full">
        <Navbar content={content} />
        <Hero content={content} />
        <div className="glow-line mx-auto max-w-5xl" />
        <Services content={content} />
        <About content={content} />
        <MarqueeStats content={content} />
        <Portfolio content={content} />
        <Process content={content} />
        <Testimonials content={content} />
        <FAQ content={content} />
        <Contact content={content} />
        <Footer content={content} />
      </div>
    </div>
  );
}
