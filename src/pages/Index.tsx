import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-medium tracking-tight mb-24">
          Intelligent by Design
        </h1>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-24 text-center max-w-2xl text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase leading-relaxed"
      >
        Living for curiosity, designing for the world and passionate about the design and mechanics of everyday things.
      </motion.p>
    </div>
  );
};

export default Index;
