import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <section className="h-screen w-full bg-black text-white font-sans px-6 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col justify-center py-8">
        
        {/* Quote Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          {/* Quote symbol */}
          <div className="text-white text-6xl md:text-7xl font-black mb-2 leading-none">
            "
          </div>

          {/* The Typography Block */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight">
            <span className="text-white block font-sans font-bold">
              Working with Mahesh felt effortless.{" "}
            </span>
            <span className="text-neutral-400 font-sans font-bold">
              The development process was seamless, the full-stack architecture was solid, and every detail was built with intention. The final product wasn't just functional — it was thoughtfully engineered.
            </span>
          </h2>
        </motion.div>

        {/* Separator Line */}
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="h-[1px] bg-white/20 w-full my-8"
        />

        {/* Author Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mt-2"
        >
          {/* Avatar Image */}
          <div className="h-12 w-12 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/10">
             <img 
               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
               alt="Client Avatar" 
               className="h-full w-full object-cover grayscale-[50%]"
             />
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <p className="text-base font-bold text-white font-sans">
              Client Name
            </p>
            <p className="text-sm text-neutral-400 font-sans font-bold">
              Founder / Product Lead at Company Name
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonial;