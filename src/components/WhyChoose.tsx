import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Settings2 } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast & Scalable",
    description: "Built with modern architecture that scales effortlessly as your business grows.",
  },
  {
    icon: Settings2,
    title: "Custom-Built",
    description: "Every solution is tailored to your unique business requirements and workflows.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime and continuous monitoring.",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 font-bold uppercase tracking-widest text-xs">
               The Evo Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 tracking-tight text-foreground leading-[1.1]">
              Technology that <br />
              <span className="text-gradient-primary">Drives Results.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl">
              We fuse deep industrial logic with cutting-edge engineering to create software that doesn't just function — it scales your vision.
            </p>
            <div className="flex flex-wrap gap-6">
               <a href="#contact" className="btn-primary-glow text-lg px-8 py-4">
                 Optimize My Business
               </a>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-8 shadow-2xl shadow-black/5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                  <r.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
