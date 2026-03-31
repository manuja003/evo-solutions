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
    <section id="process" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Our Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            From Idea to <span className="text-gradient-primary">Launch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven 6-step development process that ensures quality, speed, and alignment with your goals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <step.icon size={26} className="text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-1">Step {i + 1}</div>
              <h3 className="font-heading font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
