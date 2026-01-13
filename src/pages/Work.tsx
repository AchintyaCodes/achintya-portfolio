import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with real-time inventory management",
    tech: ["React", "Node.js", "PostgreSQL"],
    year: "2024",
  },
  {
    title: "FinTech Dashboard",
    description: "Analytics platform processing millions of transactions daily",
    tech: ["TypeScript", "Next.js", "AWS"],
    year: "2023",
  },
  {
    title: "Healthcare Portal",
    description: "Patient management system with HIPAA compliance",
    tech: ["React", "GraphQL", "Docker"],
    year: "2023",
  },
];

const Work = () => {
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
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col px-8 pb-16 relative">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-12 max-w-4xl leading-tight italic">
                I build digital experiences where elegant design meets robust functionality, bringing ideas to life through clean code and thoughtful architecture.
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-16 right-8"
          >
            <a href="#work-section" className="editorial-link">
              View Selected Work
            </a>
          </motion.div>
        </section>

        {/* Work Section */}
        <section id="work-section" className="py-32 px-8 border-t border-border">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="font-serif text-sm uppercase tracking-widest text-muted-foreground">
                Selected Work
              </h2>
            </motion.div>

            <div className="space-y-0">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group py-12 border-b border-border cursor-pointer"
                >
                  <div className="grid md:grid-cols-12 gap-6 items-baseline">
                    <div className="md:col-span-1">
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-2xl md:text-3xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-2 justify-end">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs uppercase tracking-wider text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Work;
