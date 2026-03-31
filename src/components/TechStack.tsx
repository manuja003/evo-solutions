import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name: "React", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: ".NET Core", category: "Backend" },
  { name: "SQL Server", category: "Database" },
  { name: "TypeScript", category: "Language" },
  { name: "Azure", category: "Cloud" },
];

const TechStack = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Technology Stack</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-3 mb-4">
            Built with <span className="text-gradient-primary">Modern Tech</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card px-6 py-4 text-center"
            >
              <div className="font-heading font-bold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
