import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, GreenBite Restaurants",
    quote: "EvoDine completely transformed our restaurant operations. Billing is 40% faster and inventory management has never been this seamless.",
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
    <section id="testimonials" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
             Industry Sentiment
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-black mb-10 tracking-tighter italic leading-[0.9]">
            Validated by <br />
            <span className="text-primary italic">Global Authorities.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -16 }}
              className="glass-card !bg-white/[0.03] p-12 shadow-2xl border-white/10 hover:border-primary/40 transition-all duration-700 relative group"
            >
              <Quote size={64} className="text-primary/5 absolute top-10 right-10 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-2 mb-10">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={20} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-2xl text-muted-foreground leading-[1.25] mb-16 flex-grow italic font-medium tracking-tight">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                <div className="w-20 h-20 rounded-3xl border-2 border-primary/20 bg-secondary overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-110">
                  <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-2xl font-heading font-black text-foreground leading-none mb-1 italic tracking-tighter">{t.name}</div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{t.role}</div>
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
