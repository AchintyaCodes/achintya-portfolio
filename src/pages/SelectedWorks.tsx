import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
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
    <div className="scroll-stack-card">
      
      {/* Top Section: ID, Client, and Button */}
      <div className="card-top-row">
        <div className="id-brand-group">
          <span className="huge-number">{project.id}</span>
          <div className="client-info">
            <span className="label">Client</span>
            <span className="client-name">{project.title}</span>
          </div>
        </div>

        <a href={project.links.live} className="live-btn">
          Live Project
        </a>
      </div>

      {/* Image Grid Section: 1 Large, 2 Small */}
      <div className="image-grid">
        <img 
          src={project.image} 
          className="main-image" 
          alt="Main feature" 
        />
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400" 
          className="sub-image" 
          alt="Detail 1" 
        />
        <img 
          src="https://images.unsplash.com/photo-1550684847-75bdda21cc95?w=400" 
          className="sub-image" 
          alt="Detail 2" 
        />
      </div>

      {/* Description below (Optional, or keep hidden to match reference exactly) */}
      <div className="mt-4">
        <p className="text-white/50 text-sm max-w-2xl">
          [{project.stack}] — {project.description}
        </p>
      </div>
    </div>
  );
};

// ScrollStack configuration
const CONFIG = {
  itemDistance: 100,
  itemScale: 0.02,
  itemStackDistance: 30,
  stackPosition: 0.15, // 15% of viewport
  scaleEndPosition: 0.08, // 8% of viewport
  baseScale: 0.9,
};

const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const lastScrollRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Cache card positions on mount and resize
  const cachePositions = useCallback(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    
    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + scrollY;
    });

    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement;
    if (endElement) {
      const rect = endElement.getBoundingClientRect();
      endOffsetRef.current = rect.top + scrollY;
    }
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scrollTop = window.scrollY;
    
    // Skip if scroll hasn't changed significantly
    if (Math.abs(scrollTop - lastScrollRef.current) < 0.5) return;
    lastScrollRef.current = scrollTop;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;
    
    if (!cards.length || !cardOffsets.length) return;

    const containerHeight = window.innerHeight;
    const stackPositionPx = CONFIG.stackPosition * containerHeight;
    const scaleEndPositionPx = CONFIG.scaleEndPosition * containerHeight;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];

      const triggerStart = cardTop - stackPositionPx - CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight * 0.5;

      // Calculate scale progress
      let scaleProgress = 0;
      if (scrollTop >= triggerEnd) {
        scaleProgress = 1;
      } else if (scrollTop > triggerStart) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      }

      const targetScale = CONFIG.baseScale + i * CONFIG.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      // Calculate translateY
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + CONFIG.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + CONFIG.itemStackDistance * i;
      }

      // Apply transform directly - no rounding for smoother animation
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
  }, []);

  const onScroll = useCallback(() => {
    if (rafIdRef.current) return;
    
    rafIdRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      rafIdRef.current = null;
    });
  }, [updateCardTransforms]);

  useEffect(() => {
    // Initial setup
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${CONFIG.itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    // Cache positions after a small delay to ensure layout is complete
    const initTimer = setTimeout(() => {
      cachePositions();
      updateCardTransforms();
    }, 100);

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cachePositions, { passive: true });

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cachePositions);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [cachePositions, updateCardTransforms, onScroll]);

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
