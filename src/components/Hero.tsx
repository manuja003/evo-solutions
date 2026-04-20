import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play, Award, Zap, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center pt-44 pb-20 overflow-hidden bg-transparent">
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
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-foreground/80 tracking-tight">Trusted by 500+ Industry Leaders</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-8xl font-heading font-black leading-[0.9] text-foreground mb-12 tracking-tighter"
            >
              Architect Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift">Global Dominion.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-2xl text-muted-foreground mb-16 max-w-2xl leading-tight font-medium tracking-tight"
            >
              We engineer the world's most elite business ecosystems. Mission-critical architecture for the next generation of global market titans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8"
            >
              <a href="#contact" className="btn-primary-glow flex items-center gap-4">
                Initialize Architecture
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#products" className="group/btn relative flex items-center gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] pl-4 pr-10 py-4 hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 shadow-2xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-[1.2rem] border-4 border-background bg-secondary flex items-center justify-center overflow-hidden transition-transform group-hover/btn:translate-x-1">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Architect" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">View Global Systems</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">500+ Active Nodes</span>
                </div>
                <div className="absolute right-4 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-primary" strokeWidth={3} />
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-4 relative hidden lg:block"
          >
            {/* The System Core Visual */}
            <div className="relative group">
              {/* Outer Ring Glow */}
              <div className="absolute -inset-20 bg-primary/20 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="glass-card !bg-white/[0.03] !p-8 border-white/20 aspect-square flex flex-col justify-between relative z-10 hover:scale-[1.02] transition-all duration-1000">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Core</div>
                    <div className="text-4xl font-heading font-black tracking-tighter italic">ACTIVE</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                    <Zap size={24} className="text-primary" />
                  </div>
                </div>

                <div className="relative h-40 flex items-center justify-center">
                  {/* Decorative Architectural Lines */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                      className="absolute border border-white/5 rounded-full"
                      style={{ width: `${100 + i * 40}%`, height: `${100 + i * 40}%` }}
                    />
                  ))}
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-accent p-1 shadow-2xl shadow-primary/20 relative z-20">
                    <div className="w-full h-full bg-black rounded-[1.4rem] flex items-center justify-center">
                      <Award size={48} className="text-primary animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">Velocity Delta</span>
                      <span className="text-xl font-heading font-black text-primary">+99.9%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "99.9%" }} 
                        transition={{ duration: 3, delay: 1 }} 
                        className="h-full bg-gradient-to-r from-primary to-accent" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Scale Index</div>
                      <div className="text-lg font-black tracking-tighter">GLOBAL</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Threat Level</div>
                      <div className="text-lg font-black tracking-tighter">ZERO</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* High-Impact Floaties */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -left-12 glass-card !p-5 !rounded-2xl border-white/30 z-20 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-xs font-black tracking-widest uppercase">Protocol Secured</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 glass-card !p-5 !rounded-2xl border-primary/40 z-20 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="text-xs font-black tracking-widest uppercase flex flex-col">
                    <span>Revenue Surge</span>
                    <span className="text-primary">+42%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
