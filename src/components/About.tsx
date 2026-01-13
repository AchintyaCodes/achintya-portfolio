import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-32 px-8 border-t border-border">
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
            <p className="heading-editorial text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed">
              A full-stack developer with 8+ years <em className="italic-emphasis">crafting</em> digital 
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
  );
};

export default About;
