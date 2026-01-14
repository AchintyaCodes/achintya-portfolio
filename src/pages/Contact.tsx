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
        // FIX: Added 'as const' here to satisfy TypeScript types
        ease: [0.22, 1, 0.36, 1] as const 
      }, 
    },
  };

  return (
    <section className="min-h-screen bg-white text-black font-sans px-6 py-24 md:px-12 md:py-32 lg:px-16 lg:py-40 relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-x-24 max-w-[1600px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Left Column: Massive Headline & Context */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <motion.div variants={itemVariants}>
            {/* The Massive Swiss Headline */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Contact <br />
              Me <span className="inline-block ml-4">→</span>
            </h1>
          </motion.div>

          {/* Contextual Information at the Bottom */}
          <motion.div variants={itemVariants} className="mt-20 lg:mt-0">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-black/60">
              Contact Form
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-black/80 max-w-md text-left">
              Send me a message and I'll get back to you as soon as possible. Let's build something great together.
            </p>
          </motion.div>
        </div>

        {/* Right Column: The Form */}
        <motion.div className="lg:col-span-5" variants={itemVariants}>
          <form className="flex flex-col gap-12">
            
            {/* Form Group: Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-bold uppercase tracking-wider">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full bg-transparent border-b border-black/30 py-2 text-xl font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-bold uppercase tracking-wider">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full bg-transparent border-b border-black/30 py-2 text-xl font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Form Group: Email & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-black/30 py-2 text-xl font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider">
                  Subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-transparent border-b border-black/30 py-2 text-xl font-medium focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Form Group: Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider">
                Message*
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full bg-transparent border-b border-black/30 py-2 text-xl font-medium focus:border-black focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="group flex items-center gap-4 text-xl font-bold uppercase tracking-wider hover:text-black/70 transition-colors"
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