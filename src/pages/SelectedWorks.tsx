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
    links: { live: "https://erpbeta.netlify.app", code: "#" },
    image: "/p1.png",
    cta: "Live Project"
  },
  {
    id: "002",
    title: "Geospatial Workforce Analytics",
    stack: "React / Redux / Google Maps API/ Firebase",
    description: "Real-time tracking system implementing location-based validation protocols and live route visualization for workforce monitoring.",
    links: { live: "#", code: "#" },
    image: "/p2.png",
    cta: "Live Project"
  },
  {
    id: "003",
    title: "OrderEase: Real-time online table food ordering system",
    stack: "React / Firebase / Node.js",
    description: "A real-time restaurant table ordering system that allows customers to place food orders directly from their table while enabling admins to manage menus, waiters, and assign waiters to customers for seamless service coordination.",
    links: { live: "https://github.com/MAHESHPPAI/OrderEase", code: "#" },
    image: "./p3.png",
    cta: "View on Github"
  },
  {
    id: "004",
    title: "BusBuddy: Transit Management Logic",
    stack: "React / Firebase / Springboot / ngrok",
    description: "A real-time campus transportation platform that enables students to book seats and track buses live, drivers to stream GPS data during journeys, and transport officers to manage fleet availability, monitoring, and notifications seamlessly.",
    links: { live: "https://github.com/MAHESHPPAI/Busbuddy-latest", code: "#" },
    image: "./p4.png",
    cta: "View on Github"
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
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="live-btn-star"
          color="#f6d365, #fda085"
          speed="3s"
        >
          {project.cta}
        </StarBorder>
      </div>

      <div className="content-grid">
        <img
          src={project.image}
          className="main-image w-full h-auto object-contain"
          alt={project.title}
          onLoad={() => window.dispatchEvent(new Event('resize'))}
        />
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
    </StarBorder>
  );
};


const BASE_CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

/** Returns config with stackPosition adjusted for tablets (768-1024px) */
const getConfig = () => {
  const w = window.innerWidth;
  if (w >= 768 && w < 1024) {
    // Tablet: push stacking point to ~30% from top (≈ vertical centre)
    return { ...BASE_CONFIG, stackPosition: 0.30 };
  }
  return BASE_CONFIG;
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
      if (window.innerWidth < 1024) {
        setMarqueeDuration(10);
      } else {
        setMarqueeDuration(25);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- UPDATED LOGIC HERE ---
  const updateCardTransforms = useCallback(() => {
    const scrollTop = window.scrollY;
    // Always run on mobile to ensure smoothness even if scroll delta is small
    lastScrollRef.current = scrollTop;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;

    if (!cards.length || !cardOffsets.length) return;

    const cfg = getConfig();
    const containerHeight = window.innerHeight;
    const stackPositionPx = cfg.stackPosition * containerHeight;
    const scaleEndPositionPx = cfg.scaleEndPosition * containerHeight;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - cfg.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight * 0.5;

      let scaleProgress = 0;
      if (scrollTop >= triggerEnd) {
        scaleProgress = 1;
      } else if (scrollTop > triggerStart) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      }

      const targetScale = cfg.baseScale + i * cfg.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + cfg.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + cfg.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
  }, []);

  // --- CRITICAL FIX IN THIS FUNCTION ---
  const cachePositions = useCallback(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    // 1. TEMPORARILY RESET TRANSFORMS
    // We must clear the 'transform' style so we can measure the element's 
    // true position in the document flow, unaffected by previous scroll animations.
    cards.forEach(card => card.style.transform = '');

    // 2. MEASURE
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

    // 3. RE-APPLY TRANSFORMS IMMEDIATELY
    // If we don't do this, there might be a visible flash where cards jump to 
    // their natural position before the next scroll frame picks them up.
    updateCardTransforms();

  }, [updateCardTransforms]);

  const onScroll = useCallback(() => {
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      rafIdRef.current = null;
    });
  }, [updateCardTransforms]);

  const calculateAndRender = useCallback(() => {
    cachePositions();
  }, [cachePositions]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${getConfig().itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    const resizeObserver = new ResizeObserver(() => {
      calculateAndRender();
    });

    cards.forEach((card) => {
      resizeObserver.observe(card);
    });

    calculateAndRender();
    const initTimer = setTimeout(calculateAndRender, 100);
    const backupTimer = setTimeout(calculateAndRender, 500);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calculateAndRender, { passive: true });

    return () => {
      clearTimeout(initTimer);
      clearTimeout(backupTimer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calculateAndRender);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [calculateAndRender, onScroll]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      <div className="w-full h-[25vh] md:h-[50vh] lg:h-[70vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black">
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
        {/* Added some bottom padding to ensure the last card has room to unpin nicely on mobile */}
        <div className="scroll-stack-end h-[20vh]" />
      </div>
    </section>
  );
};

export default SelectedWorks;