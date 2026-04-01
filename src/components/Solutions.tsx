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
    <section id="solutions" className="py-24 sm:py-32 section-dark relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Solutions by Industry</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Built for <span className="text-gradient-primary">Your Industry</span>
          </h2>
          <p className="text-surface-dark-foreground/60 max-w-2xl mx-auto">
            Domain-specific solutions designed by experts who understand your industry's unique challenges.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div
              key={s.industry}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass-card !bg-surface-dark-foreground/5 border-surface-dark-foreground/10 p-8 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <s.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">{s.industry}</span>
                      <h3 className="font-heading font-bold text-lg text-surface-dark-foreground">{s.product}</h3>
                    </div>
                  </div>
                  <p className="text-surface-dark-foreground/60 leading-relaxed">{s.description}</p>
                </div>
                <div className="flex sm:flex-col gap-6 sm:gap-4 sm:min-w-[160px]">
                  {s.stats.map((stat) => (
                    <div key={stat.label} className="text-center sm:text-right">
                      <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-surface-dark-foreground/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
