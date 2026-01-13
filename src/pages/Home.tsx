import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-foreground text-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm"
      >
        <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="font-sans text-sm uppercase tracking-widest font-medium">
            Marvin Ogah
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            <li>
              <Link to="/work" className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">
                About
              </Link>
            </li>
            <li>
              <a href="#contact" className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">
                Contact
              </a>
            </li>
            <li>
              <a href="#resume" className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity">
                Resume
              </a>
            </li>
          </ul>

          <span className="text-sm">©2025</span>
        </nav>
      </motion.header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight italic">
            Intelligent by Design
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-24 left-0 right-0 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-background/60 max-w-xl mx-auto leading-relaxed">
            Living for curiosity, designing for the world and
            passionate about the design and mechanics of
            everyday things.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
