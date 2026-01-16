import { motion } from "framer-motion";
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import SkillsPhilosophy from "./SkillsPhilosophy";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";


const Index = () => {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Hero Section - Sticky so content scrolls over it */}
      <section className="h-screen bg-black flex flex-col justify-between px-6 py-12 md:px-16 md:py-16 sticky top-0 overflow-hidden">
        {/* SplashCursor only on hero section */}
        <SplashCursor />
        
        {/* 1. THE HEADLINE: Flush left, massive scale, tight tracking, Neo-Grotesque */}
        <div className="z-10 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom bezier for snappy "Swiss" motion
            className="w-full max-w-[90vw]"
          >
            <h1 className="font-sans font-bold text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase text-left">
              Driven<br />
              by Logic
            </h1>
          </motion.div>
        </div>

        {/* 2. THE SUBTEXT: Strictly aligned to grid, objective, treating text as block element */}
        {/* Using a 12-col grid to place the subtext mathematically */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 md:col-span-5 lg:col-span-4"
          >
            {/* Visual Anchor Line - Common in Swiss Design */}
            <div className="w-12 h-[2px] bg-white mb-6 md:hidden"></div>

            <p className="font-sans text-xs md:text-sm font-medium text-white leading-relaxed tracking-wide uppercase text-left">
              Building robust software, automating the complex and focused on transforming static systems into intelligent ones.
            </p>
          </motion.div>
        </div>
        
      </section>

      {/* Content wrapper - scrolls over the sticky hero */}
      <div className="relative z-10">
        <About />
        <SelectedWorks/>
        <SkillsPhilosophy/>
        <Testimonial/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
};

export default Index;