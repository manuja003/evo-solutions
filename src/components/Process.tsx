import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Palette, Code2, TestTubeDiagonal, Rocket, Headphones } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Requirements", description: "Deep dive into your business needs" },
  { icon: Palette, title: "UI/UX Design", description: "Craft intuitive, beautiful interfaces" },
  { icon: Code2, title: "Development", description: "Build with modern, scalable tech" },
  { icon: TestTubeDiagonal, title: "Testing", description: "Rigorous QA and security testing" },
  { icon: Rocket, title: "Deployment", description: "Smooth launch with zero downtime" },
  { icon: Headphones, title: "Support", description: "Ongoing maintenance and updates" },
];

const Process = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}
      <div className="absolute bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 font-bold uppercase tracking-widest text-xs">
             Our Methodology
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 tracking-tight">
            From Blueprint to <span className="text-gradient-primary">Brilliance.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A precise, architecture-first development cycle designed for reliability and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border/50 to-transparent -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-10 text-center group relative z-10 hover:!bg-white/10"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg shadow-xl shadow-black/10 group-hover:bg-primary transition-colors">
                {i + 1}
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <step.icon size={32} className="text-primary" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
