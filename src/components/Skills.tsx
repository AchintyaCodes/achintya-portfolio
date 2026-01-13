import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs"],
  },
  {
    title: "Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"],
  },
];

const Skills = () => {
  return (
    <section className="py-32 px-8 border-t border-border bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-sm uppercase tracking-widest text-muted-foreground">
            Expertise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <h3 className="font-serif text-xl font-medium mb-6">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
