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
    <section className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
             The Systems Stack
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-10 tracking-tighter italic">
            Engineered for <span className="text-primary italic">Absolute Zero Latency.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card !bg-white/[0.03] px-12 py-8 text-center border-white/10 hover:border-primary/40 transition-all duration-700 shadow-2xl"
            >
              <div className="text-3xl font-heading font-black text-foreground mb-2 italic tracking-tighter">{t.name}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">{t.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
