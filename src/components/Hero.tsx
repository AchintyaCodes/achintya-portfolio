import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-24 pb-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="heading-editorial text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-12 max-w-4xl">
            I craft <em className="italic-emphasis">digital experiences</em> that 
            bridge the gap between elegant design and powerful functionality, 
            so ideas can <em className="italic-emphasis">come to life</em>. My work 
            is rooted <em className="italic-emphasis">in</em> a commitment to clean 
            code and thoughtful architecture.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-end mt-16"
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
