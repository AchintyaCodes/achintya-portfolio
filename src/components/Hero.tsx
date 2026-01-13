import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-start justify-start px-8 pt-32 pb-16">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-12 max-w-4xl leading-tight">
            I build digital experiences where elegant design meets robust functionality, bringing ideas to life through clean code and thoughtful architecture.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <a href="#work" className="editorial-link">
            View Selected Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
