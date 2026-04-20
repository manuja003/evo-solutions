import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-32 pb-32 overflow-hidden bg-[#010309] border-t border-white/5 font-body">
      {/* Background Complexity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent_70%)] opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Massive Integrated CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="glass-card !p-12 md:p-24 mb-32 group hover:border-primary/30 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 italic">Ready for Deployment</div>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-8 leading-[0.9] tracking-tighter italic uppercase">
                Initialize Your <span className="text-primary">Global Dominion</span> Today.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl font-medium tracking-tight leading-snug">
                Join the elite network of business titans who have scaled their operations using our mission-critical architectural systems.
              </p>
            </div>
            <div className="flex flex-col gap-6 items-start lg:items-end">
               <button 
                onClick={() => handleNavClick("contact")}
                className="btn-primary-glow px-16 py-10 text-sm w-full md:w-auto scale-110 flex items-center justify-center gap-4 transition-transform hover:scale-115"
               >
                  <span className="tracking-[0.3em]">INITIALIZE PROTOCOL</span>
                  <ArrowRight size={24} />
               </button>
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span className="w-8 h-px bg-white/20" />
                  Technical Consultation Available 24/7
               </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <div onClick={() => handleNavClick("home")} className="flex items-center gap-5 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:rotate-[360deg] transition-all duration-1000">
                <span className="text-white font-heading font-black text-3xl italic">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-4xl tracking-tighter text-white leading-none italic uppercase">
                  EVO <span className="text-primary font-black">SOLUTIONS</span>
                </span>
                <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40 italic">Global Architecture</span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md leading-tight font-medium tracking-tight italic">
              Engineering the future of enterprise value through advanced architectural systems and world-class digital infrastructure.
            </p>

            <div className="flex gap-6">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <button 
                  key={i}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-20">
             <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10 italic">Systems</h4>
               <ul className="space-y-6">

                 <li><Link to="/products/evodine" className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">EvoDine System</Link></li>
                 <li><Link to="/products/evovilla" className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">EVOVilla Core</Link></li>
                 <li><Link to="/products/evoinventory" className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">EvoInventory Labs</Link></li>
                 <li><button onClick={() => handleNavClick("products")} className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">Strategic R&D</button></li>
               </ul>
             </div>

             <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10 italic">Strategy</h4>
               <ul className="space-y-6">
                 <li><button onClick={() => handleNavClick("solutions")} className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">Vertical Core</button></li>
                 <li><button onClick={() => handleNavClick("process")} className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">The Blueprint</button></li>
                 <li><button onClick={() => handleNavClick("testimonials")} className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">Industry Proof</button></li>
                 <li><button onClick={() => handleNavClick("contact")} className="text-lg text-muted-foreground hover:text-primary transition-colors font-semibold tracking-tighter italic">Architecture Series</button></li>
               </ul>
             </div>

             <div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10 italic">Command</h4>
               <ul className="space-y-6">
                 <li className="flex items-center gap-4 text-sm text-muted-foreground font-semibold tracking-tighter italic">
                   <Mail size={18} className="text-primary shrink-0" />
                   <a href="mailto:architect@evosolutions.com" className="hover:text-primary transition-all">architect@evosolutions.com</a>
                 </li>
                 <li className="flex items-center gap-4 text-sm text-muted-foreground font-semibold tracking-tighter italic">
                   <Phone size={18} className="text-primary shrink-0" />
                   <a href="tel:+15551234567" className="hover:text-primary transition-all">+1 (555) 000-EVO</a>
                 </li>
                 <li className="flex items-start gap-4 text-[10px] font-black tracking-widest opacity-40 uppercase">
                   <MapPin size={18} className="text-primary shrink-0 mt-1" />
                   <span>Global HQ:<br />Innovation Blvd,<br />Tech City, TC 10101</span>
                 </li>
               </ul>
             </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
              &copy; 2024 EVO SOLUTIONS ARCHITECTURE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-4 items-center">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-[8px] font-black tracking-[0.3em] opacity-30 text-white uppercase">System Status: Optimal Deployment</span>
            </div>
          </div>
          
          <div className="flex gap-12">
            {["Privacy_Protocol", "Terms_of_Authority", "Security_Core"].map((legal) => (
              <a key={legal} href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors italic">
                {legal}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
