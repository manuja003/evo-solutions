import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";

const cases = [
  {
    client: "GreenBite Chain",
    problem: "Manual billing processes causing long queues and inventory miscounts across 15 locations.",
    solution: "Deployed EvoDine across all branches with centralized real-time reporting.",
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
    <section id="case-studies" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
             Architecture Proof
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black mb-10 tracking-tighter italic leading-[0.9]">
            The Impact of <br />
            <span className="text-primary italic">Precision Engineering.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-tight font-medium tracking-tight">
            Explore how our systems-first philosophy has redefined operational limits for global industry leaders.
          </p>
        </motion.div>

        <div className="space-y-16 max-w-7xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -16 }}
              className="glass-card !bg-white/[0.03] p-16 flex flex-col group relative overflow-hidden h-full border-white/10 hover:border-primary/40 transition-all duration-700"
            >
              <div className="flex flex-col xl:flex-row gap-20 items-start">
                <div className="xl:w-1/3">
                   <div className="flex items-center gap-6 mb-10">
                      <div className="w-20 h-20 rounded-3xl bg-foreground text-background flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-700">
                         <TrendingUp size={40} />
                      </div>
                      <h3 className="text-4xl font-heading font-black text-foreground tracking-tighter italic">{c.client}</h3>
                   </div>
                   <div className="space-y-10">
                      <div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic mb-2 block">The Strategic Barrier</span>
                         <p className="text-muted-foreground text-lg leading-tight font-medium tracking-tight">{c.problem}</p>
                      </div>
                      <div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic mb-2 block">Titan Intervention</span>
                         <p className="text-muted-foreground text-lg leading-tight font-medium tracking-tight">{c.solution}</p>
                      </div>
                   </div>
                </div>

                <div className="xl:w-2/3 w-full">
                   <div className="grid sm:grid-cols-3 gap-8 h-full">
                      {c.results.map((r, idx) => (
                        <div key={r} className="glass-card !bg-white/5 p-10 border-none shadow-2xl flex flex-col justify-center text-center hover:-translate-y-2 transition-all duration-500">
                           <div className="text-4xl font-black text-primary mb-3 italic leading-none">{r.split(' ')[0]}</div>
                           <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-tight opacity-60">
                              {r.split(' ').slice(1).join(' ')}
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="mt-12 h-40 w-full bg-white/5 rounded-[2rem] relative overflow-hidden flex items-end px-12 gap-3 border border-white/5">
                       {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.95].map((h, idx) => (
                         <motion.div 
                           key={idx} 
                           initial={{ height: 0 }} 
                           animate={{ height: `${h * 100}%` }} 
                           transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }} 
                           className="flex-1 bg-primary/10 rounded-t-2xl group-hover:bg-primary/30 transition-all duration-700"
                         />
                       ))}
                       <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 italic text-[8px] font-black tracking-[0.5em] uppercase px-6 opacity-40">System Efficiency Threshold</div>
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
