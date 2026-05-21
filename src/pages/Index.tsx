import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

// Components
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";

// Personal Data
import { personalInfo } from "../data/personalData";

// --- Music Player ---
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume to 40% for better background ambiance
    audio.volume = 0.4;
    audio.loop = true;
    
    // Skip first 5 seconds - start at 5s
    audio.currentTime = 5;

    // Try to play immediately on load
    const tryAutoPlay = () => {
      audio.currentTime = 5; // Ensure we start at 5s
      audio.play().then(() => {
        setIsPlaying(true);
        console.log('Music started playing from 5 seconds!');
      }).catch((error) => {
        console.log('Autoplay blocked, waiting for user interaction:', error);
      });
    };

    // Try autoplay immediately
    tryAutoPlay();

    // Also try on any user interaction
    const handleUserInteraction = () => {
      if (!isPlaying && !audio.paused === false) {
        audio.currentTime = 5; // Always start at 5s
        audio.play().then(() => {
          setIsPlaying(true);
          console.log('Music started after user interaction from 5 seconds!');
        }).catch(console.log);
      }
    };

    // When song ends, restart from 5 seconds (not 0)
    const handleEnded = () => {
      audio.currentTime = 5;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);

    // Listen for multiple interaction types
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('Music paused');
    } else {
      // Always start from 5 seconds when resuming
      if (audio.currentTime < 5) {
        audio.currentTime = 5;
      }
      audio.play().then(() => {
        setIsPlaying(true);
        console.log('Music resumed from', audio.currentTime, 'seconds');
      }).catch((error) => {
        console.log('Play failed:', error);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
    console.log('Music muted:', !isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
    >
      <audio 
        ref={audioRef} 
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="/YALA (Slowed).mp3" type="audio/mpeg" />
        <source src="/YALA%20(Slowed).mp3" type="audio/mpeg" />
      </audio>

      {/* Play/Pause Button - BIGGER */}
      <button
        onClick={togglePlay}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div className="relative w-6 h-6">
          {isPlaying ? (
            // Pause icon - BIGGER
            <div className="flex gap-1.5 justify-center">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
            </div>
          ) : (
            // Play icon - BIGGER
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          )}
        </div>

        {/* Animated ring */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
        )}
      </button>

      {/* Volume Button - BIGGER */}
      <button
        onClick={toggleMute}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 transition-all duration-300"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          {isMuted ? (
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.414A3.983 3.983 0 0013 10a3.983 3.983 0 00-1.172-2.829 1 1 0 010-1.414z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {/* Song Info - BIGGER */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full">
          <span className="text-sm font-bold text-white whitespace-nowrap tracking-wide">
            🎵 YALA (Slowed) {isPlaying ? '▶️' : '⏸️'}
          </span>
        </div>
      </motion.div>

      {/* Debug Info */}
      <div className="absolute -top-8 left-0 text-xs text-white/70">
        Status: {isPlaying ? 'Playing' : 'Paused'} | Muted: {isMuted ? 'Yes' : 'No'}
      </div>
    </motion.div>
  );
};
const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x, y }}
    />
  );
};

const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
    <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start">
      {personalInfo.name}
      <span className="text-xs md:text-lg font-medium ml-1 -mt-1 md:-mt-2">®</span>
    </h1>
  </div>
);

const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
    style={{ top: "2.25rem" }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
    </span>
    <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-white">
      {personalInfo.availability.status}
    </span>
  </motion.div>
);

const SocialStrip = () => {
  const socials = [
    { label: "GitHub", href: personalInfo.social.github },
    { label: "LinkedIn", href: personalInfo.social.linkedin },
    { label: "Email", href: personalInfo.social.email },
    { label: "Resume", href: "/resume.pdf", download: "Achintya_Gupta_Resume.pdf" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute z-20 hidden md:flex flex-col items-center"
      style={{ right: "64px", top: "112px", bottom: "194px", justifyContent: "center", gap: "1rem" }}
    >
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
      {socials.map(({ label, href, download }) => (
        <a
          key={label}
          href={href}
          download={download}
          target={href.startsWith("mailto") || download ? "_self" : "_blank"}
          rel="noopener noreferrer"
          title={label}
          className="group flex-shrink-0"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="font-sans font-black text-[10px] tracking-[0.22em] uppercase text-white group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </a>
      ))}
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
};

const SpinningCTA = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="absolute md:z-30 lg:z-10 hidden md:flex items-center justify-center"
    style={{ bottom: "4rem", right: "4rem" }}
  >
    <style>{`
      @keyframes ctaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cta-ring { animation: ctaSpin var(--cta-spin-duration, 10s) linear infinite; transform-origin: center; }
      .cta-wrap:hover .cta-ring { --cta-spin-duration: 3s; }
      .cta-wrap { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      .cta-wrap:hover { transform: scale(1.08); }
    `}</style>
    
    <a href="#contact" className="cta-wrap group relative flex items-center justify-center w-[130px] h-[130px]" aria-label="Get in touch">
      <svg viewBox="0 0 130 130" className="absolute inset-0 w-full h-full pointer-events-none">
        <circle cx="65" cy="65" r="62" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 130 130" className="cta-ring absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <path id="cta-circle-path" d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
        </defs>
        <text fill="rgba(255,255,255,1)" fontSize="8.5" fontFamily="'Inter', sans-serif" fontWeight="900" letterSpacing="4">
          <textPath href="#cta-circle-path">GET IN TOUCH · GET IN TOUCH · GET IN TOUCH ·&nbsp;</textPath>
        </text>
      </svg>
      <span className="absolute inset-4 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out" style={{ transformOrigin: "center" }} />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 w-6 h-6 text-white group-hover:text-black" style={{ transition: "color 0.3s ease" }}>
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  </motion.div>
);

const MobileSocialStrip = () => {
  const socials = [
    { label: "Github", icon: Github, href: personalInfo.social.github },
    { label: "LinkedIn", icon: Linkedin, href: personalInfo.social.linkedin },
    { label: "Email", icon: Mail, href: personalInfo.social.email },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
          className="text-white hover:opacity-75 transition-opacity duration-300 block">
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"]
  });

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Create parallax effect: Footer starts higher up and moves to normal position as we scroll into it
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className="min-h-screen relative bg-black selection:bg-white selection:text-black" style={{ opacity: showPreloader ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <BrandLogo />
        <CursorFollower />
        <Navigation />
        <MusicPlayer />

      {/* Fixed background About section */}
      <div className="fixed inset-0 z-0 bg-white text-black">
        <About />
      </div>

      {/* Hero */}
      <section className="relative h-screen bg-black flex flex-col px-6 py-12 md:px-16 md:py-16 z-20 overflow-hidden">
        <AvailabilityBadge />
        <SocialStrip />
        <SpinningCTA />
        <div className="hidden lg:block"><SplashCursor /></div>

        {/* Mobile Midpoint Buffer: 80px total height from top to clear hamburger (Hamburger at 24px + 56px height) */}
        <div className="h-[32px] w-full md:hidden" /> {/* py-12 (48px) + 32px = 80px */}

        {/* Dynamic Centering Container for Mobile Socials */}
        <div className="flex-1 flex flex-col items-end justify-center md:hidden pr-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <MobileSocialStrip />
          </div>
        </div>

        <div className="z-10 mt-auto mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit"
          >
            <div className="flex flex-col gap-4 mb-6 md:hidden">
              <a href="#contact" className="group relative overflow-hidden border border-white/30 px-5 py-3 flex items-center gap-3 hover:border-white transition-colors duration-500 w-fit">
                <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <span className="relative font-sans font-black text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-300 z-10">Get in touch</span>
                <svg className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 6h10M6 1l5 5-5 5" />
                </svg>
              </a>
              
              <a 
                href="/resume.pdf" 
                download="Achintya_Gupta_Resume.pdf" 
                className="group relative overflow-hidden border border-white/30 px-5 py-3 flex items-center gap-3 hover:border-white transition-colors duration-500 w-fit"
                onClick={(e) => {
                  console.log('Resume button clicked!');
                  // Force download
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Achintya_Gupta_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <span className="relative font-sans font-black text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-300 z-10">Download Resume</span>
                <svg className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </div>
            
            <h1 className="font-sans font-bold text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase text-left">
              {personalInfo.headline}
            </h1>
          </motion.div>
        </div>

        <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 md:col-span-5 lg:col-span-4"
          >
            <div className="w-12 h-[2px] bg-white mb-6 md:hidden" />
            <p className="font-sans text-xs md:text-sm font-medium text-white leading-relaxed tracking-wide uppercase text-left">
              {personalInfo.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content stack */}
      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="work" className="bg-black text-white relative z-20">
          <SelectedWorks />
        </div>

        <div className="bg-white text-black relative z-20">
          <VectorBridge />
        </div>

        <div className="bg-black text-white relative z-20">
          <Testimonial />
        </div>

        {/* Change contact layer to z-20 and relative so it scrolls normally OVER the footer */}
        <div id="contact" className="relative z-20 bg-white text-black">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Index;