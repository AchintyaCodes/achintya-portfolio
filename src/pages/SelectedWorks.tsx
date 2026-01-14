import { motion } from "framer-motion";
import { useState, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from 'lenis';
import './ScrollStack.css';

const projects = [
  {
    id: "001",
    title: "Enterprise Resource Architecture",
    stack: "React / Node.js / Firebase / Firestore",
    description: "A full-stack ERP engine automating multi-currency invoicing, inventory logic, and international tax compliance for distributed teams.",
    links: { live: "#", code: "#" },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: "002",
    title: "Geospatial Workforce Analytics",
    stack: "React / Redux / Google Maps API",
    description: "Real-time tracking system implementing location-based validation protocols and live route visualization for workforce monitoring.",
    links: { live: "#", code: "#" },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    id: "003",
    title: "Aero Port: High-Availability Engine",
    stack: "PHP / MySQL / Relational Database",
    description: "A seamless flight booking architecture enabling complex user account management and secure administrative data control.",
    links: { live: "#", code: "#" },
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
  },
  {
    id: "004",
    title: "Checkmate: State Management Logic",
    stack: "Python / PyGame / XML Serialization",
    description: "A multiplayer chess engine featuring valid move detection algorithms and XML-based game state persistence.",
    links: { live: "#", code: "#" },
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=600&fit=crop"
  },
];

// ScrollStack Card Component
interface ScrollStackCardProps {
  project: typeof projects[0];
  index: number;
}

const ScrollStackCard = ({ project, index }: ScrollStackCardProps) => {
  return (
    <div 
      className="scroll-stack-card bg-zinc-900 flex flex-col md:flex-row gap-8 items-center"
      style={{ 
        backgroundColor: `hsl(${220 + index * 15}, 15%, ${8 + index * 2}%)` 
      }}
    >
      {/* Image Section */}
      <div className="w-full md:w-2/5 h-48 md:h-full rounded-2xl overflow-hidden flex-shrink-0">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs font-bold text-white/40 tracking-widest">
            {project.id}
          </span>
          <span className="font-sans text-xs font-medium text-white/50 uppercase tracking-wide">
            [{project.stack}]
          </span>
        </div>
        
        <h3 className="font-sans text-2xl md:text-4xl font-black uppercase leading-[0.95] tracking-tight text-white">
          {project.title}
        </h3>
        
        <p className="font-sans text-sm md:text-base font-normal leading-relaxed text-white/70 max-w-lg">
          {project.description}
        </p>
        
        <div className="flex items-center gap-6 mt-2">
          <a 
            href={project.links.live}
            className="font-sans text-xs font-bold uppercase tracking-wider text-white hover:underline underline-offset-4 decoration-1 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live ↗
          </a>
          <a 
            href={project.links.code}
            className="font-sans text-xs font-bold uppercase tracking-wider text-white hover:underline underline-offset-4 decoration-1 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code ↗
          </a>
        </div>
      </div>
    </div>
  );
};

// Integrated ScrollStack behavior
interface ScrollStackConfig {
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  blurAmount?: number;
}

const SelectedWorks = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const config: ScrollStackConfig = {
    itemDistance: 80,
    itemScale: 0.02,
    itemStackDistance: 25,
    stackPosition: '15%',
    scaleEndPosition: '8%',
    baseScale: 0.88,
    blurAmount: 0,
  };

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight,
    };
  }, []);

  const getElementOffset = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(config.stackPosition!, containerHeight);
    const scaleEndPositionPx = parsePercentage(config.scaleEndPosition!, containerHeight);

    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement;
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - config.itemStackDistance! * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - config.itemStackDistance! * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = config.baseScale! + i * config.itemScale!;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + config.itemStackDistance! * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + config.itemStackDistance! * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        card.style.transform = transform;
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [calculateProgress, parsePercentage, getScrollData, getElementOffset, config]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${config.itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [setupLenis, updateCardTransforms, config.itemDistance]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      
      {/* HEADER: Marquee */}
      <div className="w-full border-b border-white/20 overflow-hidden flex items-center py-32 md:py-52 relative z-10 bg-black">
        <motion.div
          className="flex whitespace-nowrap items-center"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
        >
          {[0, 1].map((blockIndex) => (
            <div key={blockIndex} className="flex items-center">
              {[0, 1].map((textIndex) => (
                <div key={textIndex} className="flex items-center">
                  <span className="text-[13vw] font-medium leading-[0.8] tracking-tighter text-white">
                    Selected Works
                  </span>
                  <span className="text-[13vw] font-light leading-[0.8] text-white/40 mx-[3vw] -translate-y-2">
                    —
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* SCROLL STACK SECTION */}
      <div className="scroll-stack-inner px-6 md:px-12 lg:px-16">
        {projects.map((project, index) => (
          <ScrollStackCard key={project.id} project={project} index={index} />
        ))}
        <div className="scroll-stack-end" />
      </div>

    </section>
  );
};

export default SelectedWorks;
