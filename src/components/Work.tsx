import { motion } from "framer-motion";

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
    <section id="work" className="py-32 px-8 border-t border-border">
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
  );
};

export default Work;
