import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse_glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[100px] animate-pulse_glow" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/80">Trusted by 500+ businesses worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-tight text-primary-foreground mb-6"
          >
            We don't just build software —{" "}
            <span className="text-gradient-primary">we build solutions</span>{" "}
            that grow your business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/60 mb-10 max-w-xl"
          >
            Scalable, custom software systems designed to transform how you operate — from restaurants to banks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#products" className="btn-primary-glow flex items-center gap-2 text-base">
              View Products <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border-2 border-primary-foreground/20 text-primary-foreground font-semibold rounded-xl px-8 py-3 hover:border-primary-foreground/40 transition-colors"
            >
              <Play size={18} /> Watch Demo
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-primary-foreground/10"
          >
            {[
              { value: "500+", label: "Clients Served" },
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "40%", label: "Avg. Cost Reduction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
