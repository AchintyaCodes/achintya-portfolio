import { motion } from "framer-motion";

const About = () => {
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as const 
      },
    },
  };

  return (
    // Changed min-h-screen to h-screen and added overflow-hidden to force single window feel
    // Added flex/items-center to vertically center the grid in the viewport
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center relative">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Column: Context Label */}
        <motion.div 
          className="md:col-span-3 lg:col-span-3 pt-2"
          variants={itemVariants}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Background & Data
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        {/* Reduced gap significantly (gap-32 -> gap-10) to fit single screen */}
        <motion.div 
          className="md:col-span-9 lg:col-span-9 flex flex-col gap-10 md:gap-12"
          variants={containerVariants} 
        >
          
          {/* 01. EDUCATION */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              01. Education
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Indian Institute of Information Technology, Kottayam
              </p>
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                B.Tech, Computer Science & Engineering (2023–2027)
              </p>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              02. Experience
            </h3>
            
            <div className="flex flex-col gap-6">
              {/* Job 1 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  aiRender Technologies
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Full Stack Developer (May 2025 – May 2026)
                </p>
              </div>

              {/* Job 2 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Infosys Springboard
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Web Development Intern (Oct 2024 – Dec 2024)
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              03. Focus
            </h3>
            <ul className="flex flex-col">
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Software Engineering Architecture
              </li>
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Artificial Intelligence & Process Automation
              </li>
            </ul>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;