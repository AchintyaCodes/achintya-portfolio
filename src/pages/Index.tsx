import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Components
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import SkillsPhilosophy from "./SkillsPhilosophy";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Navigation from "@/components/Navigation";

// 1. The Dynamic Logo Component
const BrandLogo = () => {
  return (
    <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
      <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start">
        MAHESH
        <span className="text-xs md:text-lg font-medium ml-1 -mt-1 md:-mt-2">®</span>
      </h1>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      
      {/* 2. Insert the Logo */}
      <BrandLogo />

      {/* Navigation Menu */}
      <Navigation />

      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col justify-between px-6 py-12 md:px-16 md:py-16 sticky top-0 overflow-hidden z-0">
        <SplashCursor />

        {/* THE HEADLINE */}
        <div className="z-10 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[90vw]"
          >
            <h1 className="font-sans font-bold text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase text-left">
              Driven<br />
              by Logic
            </h1>
          </motion.div>
        </div>

        {/* THE SUBTEXT */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 md:col-span-5 lg:col-span-4"
          >
            {/* Visual Anchor Line */}
            <div className="w-12 h-[2px] bg-white mb-6 md:hidden"></div>

            <p className="font-sans text-xs md:text-sm font-medium text-white leading-relaxed tracking-wide uppercase text-left">
              Building robust software, automating the complex and focused on transforming static systems into intelligent ones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="relative z-10">
        <div id="about" className="bg-white text-black">
            <About />
        </div>
        
        <div id="work" className="bg-black text-white">
            <SelectedWorks />
        </div>
        
        <div id="philosophy" className="bg-white text-black">
            <SkillsPhilosophy />
        </div>
        
        <div className="bg-black text-white">
            <Testimonial />
        </div>

        {/* --- MODIFIED CONTACT SECTION --- */}
        {/* Added 'sticky top-0 z-0' so this section stays put while the footer slides over it */}
        <div id="contact" className="sticky top-0 z-0 bg-white text-black">
            <Contact />
        </div>
        
        {/* --- MODIFIED FOOTER WRAPPER --- */}
        {/* Added 'relative z-10' to ensure the footer sits ON TOP of the sticky contact section */}
        <div className="relative z-10 bg-black text-white">
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;