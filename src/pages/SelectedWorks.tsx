import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: "001",
    title: "Enterprise Resource Architecture",
    stack: "React / Node.js / Firebase / Firestore",
    description: "A full-stack ERP engine automating multi-currency invoicing, inventory logic, and international tax compliance for distributed teams.",
    links: { live: "#", code: "#" }
  },
  {
    id: "002",
    title: "Geospatial Workforce Analytics",
    stack: "React / Redux / Google Maps API",
    description: "Real-time tracking system implementing location-based validation protocols and live route visualization for workforce monitoring.",
    links: { live: "#", code: "#" }
  },
  {
    id: "003",
    title: "Aero Port: High-Availability Engine",
    stack: "PHP / MySQL / Relational Database",
    description: "A seamless flight booking architecture enabling complex user account management and secure administrative data control.",
    links: { live: "#", code: "#" }
  },
  {
    id: "004",
    title: "Checkmate: State Management Logic",
    stack: "Python / PyGame / XML Serialization",
    description: "A multiplayer chess engine featuring valid move detection algorithms and XML-based game state persistence.",
    links: { live: "#", code: "#" }
  },
];

const SelectedWorks = () => {
  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      
      {/* HEADER CONTAINER ("The Box")
        1. No global padding on section. We handle it here.
        2. py-32 md:py-52: Large EQUAL padding on top and bottom centers the content.
        3. border-b: The "horizontal white rule".
      */}
      <div className="w-full border-b border-white/20 overflow-hidden flex items-center py-32 md:py-52 mb-12 relative z-10 bg-black">
        <motion.div
          className="flex whitespace-nowrap items-center"
          // Seamless Loop Logic: Move from -50% to 0%
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
        >
          {/* Double the content to create the infinite ribbon */}
          {[0, 1].map((blockIndex) => (
            <div key={blockIndex} className="flex items-center">
                {[0, 1].map((textIndex) => (
                  <div key={textIndex} className="flex items-center">
                    
                    {/* TYPOGRAPHY: 
                        matches reference (Medium, Tight Tracking, Huge 13vw size) 
                    */}
                    <span className="text-[13vw] font-medium leading-[0.8] tracking-tighter text-white">
                      Selected Works
                    </span>
                    
                    {/* SEPARATOR: Em-dash vertically aligned */}
                    <span className="text-[13vw] font-light leading-[0.8] text-white/40 mx-[3vw] -translate-y-2">
                      —
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>

    </section>
  );
};

const ProjectRow = ({ project }: { project: typeof projects[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-b border-white/10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start"
    >
      
      {/* Column 1: ID */}
      <div className="md:col-span-1">
        <span className="font-sans font-bold text-sm text-white/40 group-hover:text-white transition-colors duration-300">
          {project.id}
        </span>
      </div>

      {/* Column 2: Title */}
      <div className="md:col-span-6 lg:col-span-6 pr-8">
        <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tight text-white group-hover:text-white/90 transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Column 3: Details & Links */}
      <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-6 md:pl-4 pt-2">
        {/* Tech Stack */}
        <div className="font-sans text-xs font-bold uppercase tracking-wider text-white/50">
          [{project.stack}]
        </div>
        
        {/* Description */}
        <p className="font-sans text-lg md:text-xl font-normal leading-relaxed text-white/80 max-w-lg">
          {project.description}
        </p>

        {/* Links Row */}
        <div className="flex items-center gap-8 mt-2">
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

    </motion.div>
  );
};

export default SelectedWorks;