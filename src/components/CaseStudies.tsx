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
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Case Studies</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Real <span className="text-gradient-primary">Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">See the measurable impact our solutions have delivered.</p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-primary" />
                <h3 className="font-heading font-bold text-lg text-foreground">{c.client}</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-1">Challenge</div>
                  <p className="text-muted-foreground">{c.problem}</p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Solution</div>
                  <p className="text-muted-foreground">{c.solution}</p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Results</div>
                  <ul className="space-y-1">
                    {c.results.map((r) => (
                      <li key={r} className="text-primary font-semibold">✓ {r}</li>
                    ))}
                  </ul>
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
