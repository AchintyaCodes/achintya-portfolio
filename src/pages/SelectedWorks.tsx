import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import StarBorder from "../components/StarBorder"; 
import './ScrollStack.css';

const projects = [
  {
    id: "001",
    title: "Enterprise Resource Architecture",
    stack: "React / Node.js / Firebase / Firestore",
    description: "A full-stack ERP engine automating multi-currency invoicing, inventory logic, and international tax compliance for distributed teams.",
    // UPDATED LINK
    links: { live: "https://erpbeta.netlify.app", code: "#" },
    // UPDATED IMAGE (Referencing file in public folder)
    image: "/p1.png"
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

interface ScrollStackCardProps {
  project: typeof projects[0];
  index: number;
}

const ScrollStackCard = ({ project, index }: ScrollStackCardProps) => {
  return (
    <StarBorder 
      as="div" 
      className="scroll-stack-card" 
      color="#00f2fe, #4facfe, #7000ff"
      speed="8s"
    >
      <div className="card-top-row">
        <div className="id-brand-group">
          <span className="huge-number">{project.id}</span>
          <div className="client-info">
            <span className="label">{project.title}</span>
            <span className="client-name">{project.stack}</span>
          </div>
        </div>

        <StarBorder 
          as="a" 
          // UPDATED: Now uses the dynamic link from the project data
          href={project.links.live} 
          target="_blank"
          rel="noopener noreferrer"
          className="live-btn-star"
          color="#f6d365, #fda085"
          speed="3s"
        >
          Live Project
        </StarBorder>
      </div>

      <div className="content-grid">
        <img src={project.image} className="main-image" alt={project.title} />
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
    </StarBorder>
  );
};

// ScrollStack configuration
const CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const lastScrollRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [marqueeDuration, setMarqueeDuration] = useState(25);

  useEffect(() => {
    const handleResize = () => {
      // CHANGED: Now checks for < 1024px to include both Mobile AND Tablet
      if (window.innerWidth < 1024) {
        setMarqueeDuration(10); // Fast speed for Mobile & Tablet
      } else {
        setMarqueeDuration(25); // Normal speed for Desktop
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      let scaleProgress = 0;
      if (scrollTop >= triggerEnd) {
        scaleProgress = 1;
      } else if (scrollTop > triggerStart) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      }

      const targetScale = CONFIG.baseScale + i * CONFIG.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + CONFIG.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + CONFIG.itemStackDistance * i;
      }

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
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${CONFIG.itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    const initTimer = setTimeout(() => {
      cachePositions();
      updateCardTransforms();
    }, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cachePositions, { passive: true });

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cachePositions);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [cachePositions, updateCardTransforms, onScroll]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      
      {/* UPDATED HEIGHTS:
          Mobile (<768px): h-[25vh]
          Tablet (≥768px): h-[50vh]
          Desktop (≥1024px): h-[75vh]
      */}
      <div className="w-full h-[25vh] md:h-[50vh] lg:h-[75vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black">
        <motion.div
          className="flex whitespace-nowrap items-center"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: marqueeDuration }}
        >
          {[0, 1].map((blockIndex) => (
            <div key={blockIndex} className="flex items-center">
              {[0, 1].map((textIndex) => (
                <div key={textIndex} className="flex items-center">
                  <span className="text-[13vw] font-medium leading-[0.8] tracking-tighter">Selected Works</span>
                  <span className="text-[13vw] font-light mx-[3vw] -translate-y-2">—</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

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