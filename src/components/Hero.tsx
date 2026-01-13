import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col px-8 pt-[15vh] pb-16 relative">
      {/* 1. Removed 'md:-ml-[5%]' (or 'ml-[5%]').
        2. Now simply uses 'ml-0' (implied) to align with the section padding.
        3. Kept 'max-w-5xl' to maintain the 5-line text layout.
      */}
      <div className="max-w-5xl ml-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-12 max-w-4xl leading-tight">
            I build digital experiences where elegant design meets robust functionality, bringing ideas to life through clean code and thoughtful architecture.
          </h1>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-16 right-8"
      >
        <a href="#work" className="editorial-link">
          View Selected Work
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;