import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
      >
        <nav className="container mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-medium tracking-tight">
            Alex Rivera
          </Link>

          <ul className="hidden md:flex items-center gap-12">
            <li>
              <Link to="/work" className="editorial-link">
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className="editorial-link">
                About
              </Link>
            </li>
            <li>
              <a href="#contact" className="editorial-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </motion.header>

      <main className="pt-32">
        <section className="py-16 px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-sm uppercase tracking-widest text-muted-foreground mb-6">
                  About
                </h2>
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed">
                  A full-stack developer with 8+ years <em className="italic">crafting</em> digital
                  solutions that make a difference.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in building scalable web applications using React, TypeScript,
                  Node.js, and modern cloud infrastructure. From early-stage startups to
                  established enterprises, I bring ideas from concept to production.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My approach combines technical excellence with an eye for design,
                  ensuring every project not only works flawlessly but feels intuitive
                  and refined for end users.
                </p>
                <div className="pt-6">
                  <a href="#contact" className="editorial-link">
                    Get in Touch
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
