import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/shared/FloatingCTA";

const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs").then((m) => m.WhyChooseUs));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then((m) => m.Portfolio));
const Statistics = dynamic(() => import("@/components/sections/Statistics").then((m) => m.Statistics));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));
const ProcessTimeline = dynamic(() => import("@/components/sections/ProcessTimeline").then((m) => m.ProcessTimeline));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Portfolio />
        <Statistics />
        <Testimonials />
        <ProcessTimeline />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
