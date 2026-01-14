import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <footer className="bg-white text-black font-sans px-6 py-24 md:px-12 md:py-32 lg:px-16 border-t border-black">
      <motion.div
        className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Column 1: IDENTIFICATION */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          {/* Explicit font-sans and size corrections */}
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">
            Identification
          </h3>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
            Mahesh P Pai
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-black/60">
            Full Stack Engineer
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-black/60">
            Kerala, India [Lat: 9.7, Long: 76.5]
          </p>
        </motion.div>

        {/* Column 2: CHANNELS */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">
            Channels
          </h3>
          <div className="flex flex-col gap-2">
            <a 
              href="mailto:hello@example.com" 
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              Email ↗
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Column 3: COLOPHON + YEAR */}
        {/* Used 'flex flex-col h-full' to push the Year to the bottom */}
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">
              Colophon
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-black/60">
              Built With: React / Three.js
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-black/60">
              Typeface: Inter
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-black/60">
              Deployed On: Vercel
            </p>
          </div>

          {/* The Year: Pushed to bottom via mt-auto to create diagonal balance with ID */}
          <div className="mt-12 md:mt-auto pt-8">
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-black">
              2026
            </p>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;