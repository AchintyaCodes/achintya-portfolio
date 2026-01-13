import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Black */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-center px-8 relative">
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
      </section>

      {/* Statement Section - White */}
      <section className="min-h-screen bg-white flex flex-col px-8 pt-[15vh] pb-16 relative">
        <div className="max-w-4xl ml-[15%]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-black max-w-3xl leading-tight">
              I build digital experiences where elegant design meets robust functionality, bringing ideas to life through clean code and thoughtful architecture.
            </h2>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-16 right-8"
        >
          <a 
            href="#work" 
            className="text-black text-sm tracking-[0.1em] uppercase border-b border-black pb-1 hover:opacity-70 transition-opacity"
          >
            View Selected Work
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
