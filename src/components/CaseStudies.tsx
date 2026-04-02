import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";

const cases = [
  {
    client: "GreenBite Chain",
    problem: "Manual billing processes causing long queues and inventory miscounts across 15 locations.",
    solution: "Deployed EvoRes across all branches with centralized real-time reporting.",
    results: ["40% faster billing", "25% reduction in food waste", "Real-time multi-branch analytics"],
  },
  {
    client: "EduPrime Academy",
    problem: "Outdated paper-based exam system unable to handle 5,000+ students during peak sessions.",
    solution: "Implemented a scalable LMS with online exams, auto-grading, and student progress dashboards.",
    results: ["60% higher engagement", "90% admin time saved", "2x course completion rate"],
  },
  {
    client: "FinServe Microbank",
    problem: "Legacy banking system couldn't handle growing transaction volumes securely.",
    solution: "Built a modern banking suite with real-time transaction processing and role-based security.",
    results: ["99.9% uptime", "50ms avg transaction speed", "Full regulatory compliance"],
  },
];

const CaseStudies = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="case-studies" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 font-bold uppercase tracking-widest text-xs">
             Proven Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 tracking-tight">
            Our Work in <span className="text-gradient-primary">Numbers.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore how our architecture-driven approach has solved critical bottlenecks for global industry leaders.
          </p>
        </motion.div>

        <div className="space-y-10 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="glass-card !bg-white/5 p-10 flex flex-col group relative overflow-hidden h-full border-white/10 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-foreground text-background flex items-center justify-center shrink-0">
                         <TrendingUp size={28} />
                      </div>
                      <h3 className="text-3xl font-heading font-black text-foreground tracking-tighter">{c.client}</h3>
                   </div>
                   <div className="space-y-6">
                      <div>
                         <span className="text-xs font-bold uppercase tracking-widest text-primary">The Challenge</span>
                         <p className="text-muted-foreground text-lg leading-relaxed mt-2">{c.problem}</p>
                      </div>
                      <div>
                         <span className="text-xs font-bold uppercase tracking-widest text-primary">The Solution</span>
                         <p className="text-muted-foreground text-lg leading-relaxed mt-2">{c.solution}</p>
                      </div>
                   </div>
                </div>

                <div className="lg:w-2/3 w-full">
                   <div className="grid sm:grid-cols-3 gap-6 h-full">
                      {c.results.map((r, idx) => (
                        <div key={r} className="glass-card p-8 border-none shadow-xl shadow-black/5 flex flex-col justify-center text-center hover:-translate-y-2 transition-transform">
                           <div className="text-3xl font-heading font-black text-primary mb-2 line-clamp-1">{r.split(' ')[0]}</div>
                           <div className="text-sm font-bold text-muted-foreground uppercase tracking-tighter leading-tight">
                              {r.split(' ').slice(1).join(' ')}
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* Decorative visual representing 'Metric Growth' */}
                   <div className="mt-10 h-32 w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl relative overflow-hidden flex items-end px-10 gap-2">
                       {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.95].map((h, idx) => (
                         <motion.div 
                           key={idx} 
                           initial={{ height: 0 }} 
                           animate={{ height: `${h * 100}%` }} 
                           transition={{ duration: 1, delay: idx * 0.1 }} 
                           className="flex-1 bg-primary/20 rounded-t-xl group-hover:bg-primary/40 transition-colors"
                         />
                       ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
