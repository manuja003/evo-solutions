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
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Loved by <span className="text-gradient-accent">Our Clients</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass-card p-8 relative"
            >
              <Quote size={32} className="text-primary/15 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">"{t.quote}"</p>
              <div>
                <div className="font-heading font-bold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
