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
    <section id="contact" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
             The Strategic Hub
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-black mb-10 tracking-tighter italic leading-[0.9]">
            Architecture <br />
            <span className="text-primary italic">Showcases.</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-tight font-medium tracking-tight">
            Watch the world's most elite business systems in action. These blueprints are engineered to dominate markets through absolute architectural precision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-32 items-start max-w-7xl mx-auto">
          <div className="space-y-16">
            <motion.div 
               initial={{ opacity: 0, x: -60 }}
               animate={inView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-12"
            >
               {[
                 { icon: Mail, label: "Strategic Inquiry", value: "architect@evosolutions.com", color: "text-primary" },
                 { icon: Phone, label: "Titan Hotline", value: "+1 (555) 000-EVO", color: "text-accent" },
                 { icon: MapPin, label: "Global Command", value: "Unit 01, Infinity Tower, Global Heights", color: "text-foreground" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-10 group">
                   <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl transition-all duration-700 group-hover:border-primary group-hover:-rotate-[10deg]">
                     <item.icon size={32} className={item.color} />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic mb-2">{item.label}</div>
                      <div className="text-3xl font-heading font-black text-foreground italic tracking-tighter leading-none">{item.value}</div>
                   </div>
                 </div>
               ))}
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 60 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="glass-card !bg-foreground p-16 rounded-[3rem] text-background relative overflow-hidden group shadow-2xl"
            >
               <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Sparkles size={120} />
               </div>
               <h4 className="text-4xl font-heading font-black mb-8 italic tracking-tighter leading-none">Titan Partnership</h4>
               <p className="opacity-80 text-xl mb-12 font-medium tracking-tight leading-tight">We don't just build software. We architect the future of your industry. Engage with our senior leadership for a 1-on-1 strategic reconnaissance session.</p>
               <div className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-white/40" />
               </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 60 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10"
          >
            {[
               { title: "EvoDine: High-Volume Intelligence", duration: "12:45", category: "Hospitality" },
              { title: "EVOVilla: Yield Maximization", duration: "08:20", category: "Property Ops" },
              { title: "EvoInventory: Zero-Loss Chain", duration: "10:15", category: "Logistics" },
              { title: "Strategic R&D: System Integration", duration: "15:30", category: "Architecture" },
            ].map((video, i) => (
              <div key={i} className="glass-card !bg-white/[0.03] p-10 rounded-[2.5rem] group cursor-pointer border-white/10 hover:border-primary/40 transition-all duration-700 shadow-2xl h-full flex items-center justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-700">
                    <Send size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 italic">{video.category} • {video.duration}</div>
                    <h5 className="text-2xl font-heading font-black text-foreground italic tracking-tighter leading-none group-hover:text-primary transition-colors">{video.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
