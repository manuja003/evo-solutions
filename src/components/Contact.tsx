import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 font-bold uppercase tracking-widest text-xs">
             Let's Connect
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-10 tracking-tight text-foreground leading-none">
            Ready to Build Your <br />
            <span className="text-gradient-primary">Next Big Thing?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design the future of your business with a tailored enterprise software ecosystem.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24 items-start max-w-7xl mx-auto">
          <div className="space-y-12">
            <motion.div 
               initial={{ opacity: 0, x: -40 }}
               animate={inView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 0.8 }}
               className="space-y-8"
            >
               {[
                 { icon: Mail, label: "Direct inquiry", value: "hello@evosolutions.com", color: "text-primary" },
                 { icon: Phone, label: "Talk to Sales", value: "+1 (555) 123-4567", color: "text-accent" },
                 { icon: MapPin, label: "Global HQ", value: "112 Innovation Square, Silicon Valley", color: "text-foreground" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-8 group">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg shadow-black/5 group-hover:border-primary transition-all duration-500 group-hover:-rotate-6">
                     <item.icon size={28} className={item.color} />
                   </div>
                   <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-2xl font-heading font-bold text-foreground">{item.value}</div>
                   </div>
                 </div>
               ))}
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="glass-card !bg-foreground p-10 rounded-[2.5rem] text-background relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles size={80} />
               </div>
               <h4 className="text-3xl font-heading font-black mb-6">Expert-Led Advisory</h4>
               <p className="opacity-70 text-lg mb-8">Our architects will review your business model and suggest the optimal tech stack for your specific scale — completely free of charge.</p>
               <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
               </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card !bg-white/5 p-10 md:p-14 shadow-2xl shadow-primary/5 rounded-[3.5rem] space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Name</label>
                  <input type="text" placeholder="John Doe" required className="w-full px-6 py-5 rounded-2xl bg-black/[0.03] border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                  <input type="email" placeholder="john@company.com" required className="w-full px-6 py-5 rounded-2xl bg-black/[0.03] border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Interested In</label>
                <select className="w-full px-6 py-5 rounded-2xl bg-black/[0.03] border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer">
                  <option>EvoRes — Restaurant Management</option>
                  <option>LMS System — Education Core</option>
                  <option>Banking Core System</option>
                  <option>Fully Custom Ecosystem</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">The Mission</label>
                <textarea rows={4} placeholder="Describe the challenges we'll solve together..." className="w-full px-6 py-5 rounded-2xl bg-black/[0.03] border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" />
              </div>

              <button type="submit" className="w-full btn-primary-glow flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-primary/20 group">
                {submitted ? "✓ Mission Received." : (<>Engage Now <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
