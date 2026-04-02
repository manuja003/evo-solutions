import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, GraduationCap, Building2 } from "lucide-react";

const solutions = [
  {
    icon: UtensilsCrossed,
    industry: "Restaurants",
    product: "EvoRes",
    description: "Streamline your restaurant operations with our all-in-one management system. From table management to kitchen orders, billing to inventory — EvoRes handles it all.",
    stats: [
      { value: "40%", label: "Faster Billing" },
      { value: "25%", label: "Less Food Waste" },
      { value: "3x", label: "Order Speed" },
    ],
  },
  {
    icon: GraduationCap,
    industry: "Education",
    product: "LMS System",
    description: "Transform your institution with a modern learning management system. Engage students, track progress, and deliver exams — all from one unified platform.",
    stats: [
      { value: "60%", label: "Student Engagement" },
      { value: "90%", label: "Time Saved" },
      { value: "2x", label: "Course Completion" },
    ],
  },
  {
    icon: Building2,
    industry: "Finance",
    product: "Banking System",
    description: "Secure, scalable banking infrastructure with real-time transaction processing, loan management, and comprehensive reporting built on enterprise-grade security.",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "50ms", label: "Transaction Speed" },
      { value: "100%", label: "Compliance" },
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
             <span className="text-xs font-bold uppercase tracking-widest text-primary">Industry Expertise</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 tracking-tight text-foreground">
            Precision Built for <span className="text-gradient-primary">Your Industry.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Domain-specific systems engineered to solve the unique complexities of your business landscape.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={s.industry}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass-card !bg-white/5 p-10 flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-[1.25rem] bg-foreground text-background flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <s.icon size={28} />
                </div>
                <div>
                   <span className="text-xs font-bold uppercase tracking-widest text-primary">{s.industry}</span>
                   <h3 className="text-2xl font-heading font-bold text-foreground">{s.product}</h3>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-10 flex-grow text-lg">
                {s.description}
              </p>

              <div className="pt-8 border-t border-border/50 grid grid-cols-3 gap-4">
                {s.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{stat.label}</div>
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
