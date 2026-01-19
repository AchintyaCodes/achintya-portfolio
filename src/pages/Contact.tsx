import { motion } from "framer-motion";

const Contact = () => {
  // Animation variants for a clean, staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }, 
    },
  };

  return (
    // CHANGE: min-h-screen -> h-screen, added overflow-hidden, flex items-center for vertical centering
    <section className="h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center relative">
      <motion.div
        // CHANGE: Reduced gap-y-20 to gap-y-8, added h-full/max-h
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Left Column: Headline & Context */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          <motion.div variants={itemVariants}>
            {/* The Swiss Headline - Scaled down to fit */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Contact <br />
              Me <span className="inline-block ml-2">→</span>
            </h1>
          </motion.div>

          {/* Contextual Information */}
          {/* CHANGE: Reduced margin top */}
          <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">
              Contact Form
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
              Send me a message and I'll get back to you as soon as possible. Let's build something great together.
            </p>
          </motion.div>
        </div>

        {/* Right Column: The Form */}
        <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
          {/* CHANGE: Reduced gap-12 to gap-5 for tighter fit */}
          <form className="flex flex-col gap-5">
            
            {/* Form Group: Name */}
            {/* CHANGE: Reduced gap-12 to gap-4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Form Group: Email & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">
                  Subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Form Group: Message */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">
                Message*
              </label>
              <textarea
                id="message"
                // CHANGE: Reduced rows from 6 to 3
                rows={3}
                className="w-full bg-transparent border-b border-black/30 py-1 text-lg font-medium focus:border-black focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="group flex items-center gap-3 text-lg font-bold uppercase tracking-wider hover:text-black/70 transition-colors"
              >
                Send Message
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>

          </form>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Contact;