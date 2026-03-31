import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, PiggyBank, Settings2 } from "lucide-react";

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
  {
    icon: PiggyBank,
    title: "Affordable Pricing",
    description: "Flexible packages designed to fit businesses of all sizes and budgets.",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Why EVO Solutions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-6">
              Technology that{" "}
              <span className="text-gradient-accent">drives results</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We combine deep industry expertise with cutting-edge technology to deliver software that doesn't just work — it transforms how you do business.
            </p>
            <a href="#contact" className="btn-primary-glow inline-flex items-center gap-2">
              Get Started Today
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <r.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
