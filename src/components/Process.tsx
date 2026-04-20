import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Palette, Code2, TestTubeDiagonal, Rocket, Headphones } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Strategic Reconnaissance", description: "Deep architectural audit of your business requirements" },
  { icon: Palette, title: "Experience Architecture", description: "Crafting elite, behavior-driven user interfaces" },
  { icon: Code2, title: "Systems Engineering", description: "Building with mission-critical, low-latency technology" },
  { icon: TestTubeDiagonal, title: "Integrity Validation", description: "Rigorous stress-testing and automated security protocols" },
  { icon: Rocket, title: "Global Synchronicity", description: "Seamless market entry with zero operational friction" },
  { icon: Headphones, title: "Continuous Evolution", description: "Ongoing strategic updates and ecosystem maintenance" },
];

const Process = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
             Execution Roadmap
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-black mb-10 tracking-tighter italic leading-[0.9]">
            The Blueprint for <br />
            <span className="text-primary italic">Global Domination.</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-tight font-medium tracking-tight">
            An elite, architecture-first development cycle engineered for absolute reliability and market-dominating velocity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -16 }}
              className="glass-card !bg-white/[0.03] p-12 text-center group relative border-white/10 hover:border-primary/40 transition-all duration-700"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-foreground text-background flex items-center justify-center font-black text-xl italic shadow-2xl shadow-black/40 group-hover:bg-primary transition-all duration-700 group-hover:scale-110">
                <step.icon size={28} className="group-hover:text-white transition-colors" />
              </div>
              
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700">
                <step.icon size={40} className="text-primary" />
              </div>
              
              <h3 className="text-3xl font-heading font-black text-foreground mb-6 tracking-tighter italic">{step.title}</h3>
              <p className="text-muted-foreground leading-tight text-xl font-medium tracking-tight">{step.description}</p>
              
              <div className="absolute bottom-4 right-6 text-[8px] font-black uppercase tracking-[0.5em] opacity-10 group-hover:opacity-40 transition-opacity italic">Operational Sync</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
