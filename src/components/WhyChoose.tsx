import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Settings2 } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Velocity & Scale",
    description: "Built with low-latency architecture that scales effortlessly during peak global demand.",
  },
  {
    icon: Settings2,
    title: "Bespoke Engineering",
    description: "Every module is precision-engineered to integrate with your specific operational DNA.",
  },
  {
    icon: Shield,
    title: "Mission Critical",
    description: "High-integrity security with 99.99% uptime and deep telemetry monitoring.",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
               The Strategic Advantage
            </div>
            <h2 className="text-4xl md:text-7xl font-heading font-black mb-12 tracking-tighter text-foreground leading-[0.9] italic">
              Absolute <br />
              <span className="text-primary italic">Market Control.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-tight mb-16 max-w-xl font-medium tracking-tight">
              We fuse elite industrial logic with superior engineering. Our software doesn't just function — it secures your position at the top of the global food chain.
            </p>
            <div className="flex flex-wrap gap-8">
               <a href="#contact" className="btn-primary-glow px-12 py-6 text-sm">
                 Initialize My Advantage
               </a>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12 }}
                className="glass-card !p-10 shadow-2xl border-white/10 hover:border-primary/40 transition-all duration-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                  <r.icon size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-heading font-black text-foreground mb-6 tracking-tighter italic">{r.title}</h3>
                <p className="text-muted-foreground leading-[1.3] text-lg font-medium tracking-tight">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
