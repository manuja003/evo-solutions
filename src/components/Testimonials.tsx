import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, GreenBite Restaurants",
    quote: "EvoRes completely transformed our restaurant operations. Billing is 40% faster and inventory management has never been this seamless.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Director, EduPrime Academy",
    quote: "The LMS system exceeded our expectations. Student engagement increased by 60% and our administrative overhead dropped significantly.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "CTO, FinServe Bank",
    quote: "EVO Solutions delivered a banking system with enterprise-grade security and 99.9% uptime. Their expertise in financial software is unmatched.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 font-bold uppercase tracking-widest text-xs">
             Client Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 tracking-tight">
            Trusted by the <span className="text-gradient-primary">Best.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card !bg-white/5 p-8 shadow-2xl shadow-black/20 hover:!bg-white/10 group border-white/10"
            >
              <Quote size={48} className="text-white/5 absolute top-10 right-10" />
              
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={18} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 flex-grow italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-border/50">
                <div className="w-14 h-14 rounded-full border-2 border-white bg-secondary overflow-hidden shadow-lg shadow-black/5">
                  <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} />
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-foreground leading-tight">{t.name}</div>
                  <div className="text-sm font-bold text-primary/60">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
