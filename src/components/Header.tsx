import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-medium tracking-tight">
          Alex Rivera
        </a>
        
        <ul className="hidden md:flex items-center gap-12">
          <li>
            <a href="#work" className="editorial-link">
              Work
            </a>
          </li>
          <li>
            <a href="#about" className="editorial-link">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="editorial-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
