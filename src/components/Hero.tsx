import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-10 shadow-sm"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-foreground/80 tracking-tight">Trusted by 500+ Industry Leaders</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black leading-[0.95] text-foreground mb-10 tracking-tighter"
            >
              Architecting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift">Digital Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            >
              We engineer premium software ecosystems that simplify complexity and empower your business to scale effortlessly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <a href="#products" className="btn-primary-glow text-lg px-10 py-5 shadow-2xl shadow-primary/20">
                Explore Our Systems
              </a>
              <button className="flex items-center gap-3 px-8 py-5 rounded-2xl border-2 border-border font-bold hover:border-primary/50 transition-all group">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play size={18} className="fill-current" />
                </div>
                Watch Showcase
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 xl:col-span-4 relative hidden lg:block"
          >
            {/* Visual element representing "Architecture/System" */}
            <div className="relative z-10 glass-card !p-1 bg-white/20 border-white/40 shadow-2xl shadow-primary/10 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-700">
               <div className="bg-white/5 rounded-[2.5rem] p-10 text-foreground aspect-square flex flex-col justify-between overflow-hidden relative border border-white/10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                  <div className="text-6xl font-heading font-black">99.9%</div>
                  <div className="space-y-4">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: "99.9%" }} transition={{ duration: 2, delay: 1 }} className="h-full bg-primary" />
                    </div>
                    <div className="text-xl font-bold opacity-60">System Stability Guaranteed</div>
                  </div>
               </div>
            </div>
            
            {/* Floating cards */}
            <motion.div 
               animate={{ y: [0, -15, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
               className="absolute -top-12 -left-12 glass-card !p-6 shadow-xl shadow-black/5 rounded-3xl z-20 border-white"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                     <Play size={20} />
                  </div>
                  <div>
                     <div className="font-bold text-foreground">Live Tracking</div>
                     <div className="text-xs text-muted-foreground">Active Sessions: 1,280</div>
                  </div>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 15, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
               className="absolute -bottom-10 -right-8 glass-card !p-6 shadow-xl shadow-black/5 rounded-3xl z-20 border-white"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                     <ArrowRight size={20} />
                  </div>
                  <div>
                     <div className="font-bold text-foreground">Revenue Boost</div>
                     <div className="text-xs text-muted-foreground">+42% This Quarter</div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
