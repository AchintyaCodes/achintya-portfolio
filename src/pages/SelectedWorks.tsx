import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
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


const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);

  // We keep a local state just to wait until measurements are ready
  const [ready, setReady] = useState(false);

  // --- LENIS SCROLL HANDLER ---
  // This automatically runs precisely in sync with the smooth scroll frame
  // eliminating any bouncing or sync issues.
  useLenis(({ scroll }) => {
    if (!ready) return;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;

    if (!cards.length || !cardOffsets.length) return;

    const containerHeight = window.innerHeight;
    const firstCardHeight = cards[0].offsetHeight;

    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight * 0.5;

      let scaleProgress = 0;
      if (scroll >= triggerEnd) {
        scaleProgress = 1;
      } else if (scroll > triggerStart) {
        scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);
      }

      scaleProgress = Math.min(Math.max(scaleProgress, 0), 1);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) {
        translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      } else if (scroll > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 10) / 10}px, 0) scale(${scale})`;
    }
  });

  // --- MEASUREMENT LOGIC ---
  const cachePositions = useCallback(() => {
    setReady(false); // Pause scroll updates while measuring

    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    // Reset styles
    cards.forEach(card => card.style.transform = '');

    // Measure fresh from DOM
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

    setReady(true); // Re-enable scroll updates
  }, []);

  const calculateAndRender = useCallback(() => {
    cachePositions();
  }, [cachePositions]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
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

    window.addEventListener('resize', calculateAndRender, { passive: true });

    return () => {
      clearTimeout(initTimer);
      clearTimeout(backupTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateAndRender);
    };
  }, [calculateAndRender]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      <div className="w-full h-[25vh] md:h-[25vh] lg:h-[70vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map((blockIndex) => (
              <div key={blockIndex} className="marquee-selected-works__segment" aria-hidden={blockIndex > 0 ? "true" : undefined}>
                <span className="marquee-selected-works__text">Selected Works</span>
                <span className="marquee-selected-works__dash">—</span>
              </div>
            ))}
          </div>
        </div>
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