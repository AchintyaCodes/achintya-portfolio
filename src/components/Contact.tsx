import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-8 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl font-medium mb-8">
            Let's build something <em className="italic-emphasis">remarkable</em> together.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            I'm currently available for freelance projects and full-time opportunities. 
            Whether you have a specific project in mind or just want to explore possibilities, 
            I'd love to hear from you.
          </p>
          <a 
            href="mailto:hello@alexrivera.dev" 
            className="editorial-link text-lg"
          >
            hello@alexrivera.dev
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
