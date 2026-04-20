import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Home, Boxes } from "lucide-react";

const solutions = [
  {
    icon: UtensilsCrossed,
    industry: "High-Volume Hospitality",
    product: "EvoDine",
    description: "Engineer your restaurant's operational velocity. From low-latency billing to predictive inventory telemetry — EvoDine is architected for mission-critical dining environments.",
    stats: [
      { value: "40%", label: "Throughput Up" },
      { value: "25%", label: "Margin Growth" },
      { value: "3x", label: "Velocity" },
    ],
  },
  {
    icon: Home,
    industry: "Luxury Property Ops",
    product: "EVOVilla",
    description: "Architecting the future of guest experiences. Consolidate complex property ecosystems into a single, high-availability control plane optimized for yield and satisfaction.",
    stats: [
      { value: "45%", label: "Yield Increase" },
      { value: "90%", label: "Process Sync" },
      { value: "99.9%", label: "Guest Satisfaction" },
    ],
  },
  {
    icon: Boxes,
    industry: "Precision Logistics",
    product: "EvoInventory",
    description: "Absolute asset accountability. Leverage real-time telemetry and predictive heuristics to orchestrate zero-loss supply chains across international warehouse clusters.",
    stats: [
      { value: "99.9%", label: "Accuracy" },
      { value: "50ms", label: "Sync Latency" },
      { value: "100%", label: "Audit Integrity" },
    ],
  },
];

const Solutions = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="solutions" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Mastery</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-black mb-8 tracking-tighter text-foreground">
            Vertical Industry <span className="text-gradient-primary">Domination.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Dominate your landscape with precision-engineered systems designed to solve the world's most complex operational challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={s.industry}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -16 }}
              className="glass-card !bg-white/[0.03] p-12 flex flex-col group relative overflow-hidden h-full border-white/10 hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 rounded-3xl bg-foreground text-background flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 scale-90 group-hover:scale-100 italic">
                  <s.icon size={36} />
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">{s.industry}</span>
                   <h3 className="text-4xl font-heading font-black text-foreground tracking-tighter italic leading-none">{s.product}</h3>
                </div>
              </div>

              <p className="text-muted-foreground leading-tight mb-12 flex-grow text-lg font-medium tracking-tight">
                {s.description}
              </p>

              <div className="pt-10 border-t border-white/5 grid grid-cols-3 gap-6">
                {s.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-foreground tracking-tighter italic leading-none mb-1">{stat.value}</div>
                    <div className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
