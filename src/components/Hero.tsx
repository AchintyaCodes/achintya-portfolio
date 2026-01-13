import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col px-8 pt-[10vh] pb-16 relative">
      <div className="max-w-4xl ml-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-12 max-w-3xl leading-tight">
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
