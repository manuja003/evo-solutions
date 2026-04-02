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
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 font-bold uppercase tracking-widest text-xs">
             Our Core Tech
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tight">
            Built with <span className="text-gradient-primary">Modern Excellence.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-card !bg-white/5 px-10 py-6 text-center border-white/10 shadow-xl shadow-black/20"
            >
              <div className="text-2xl font-heading font-bold text-foreground mb-1">{t.name}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary/60">{t.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
