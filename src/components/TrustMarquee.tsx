import { motion } from "framer-motion";

const tech = [
  "AMAZON WEB SERVICES",
  "REACT ARCHITECTURE",
  "NODE.JS CORE",
  "POSTGRESQL ENGINE",
  "FRAMER DYNAMICS",
  "REDIS VELOCITY",
  "DOCKER CONTAINERIZATION",
  "KUBERNETES SCALE",
  "STRIPE PAYMENTS",
  "TYPE-SAFE SYSTEMS",
];

const TrustMarquee = () => {
  return (
    <div className="py-12 bg-black/40 backdrop-blur-md border-y border-white/5 overflow-hidden relative group">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap gap-20 items-center"
      >
        {[...tech, ...tech].map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
            <span className="text-[10px] sm:text-xs font-black tracking-[0.5em] text-foreground/20 hover:text-foreground/60 transition-colors cursor-default uppercase">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustMarquee;
