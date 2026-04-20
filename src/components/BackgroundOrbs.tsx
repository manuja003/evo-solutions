import { motion } from "framer-motion";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#030712]">
      {/* Dynamic Mesh Gradient Base */}
      <div className="absolute inset-0 opacity-60 mix-blend-soft-light transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/30 via-transparent to-[#c2410c]/20" />
      </div>

      {/* Floating Orbs (Brighter for Dark Mode) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 40, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-15%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen gpu-accelerate"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -100, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-accent/20 rounded-full blur-[180px] mix-blend-screen gpu-accelerate"
      />

      {/* Noise Texture Overlay (CSS-Based for Reliability) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      {/* Subtle Grid Pattern (White/5) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_10%,transparent_90%)]" />
    </div>
  );
};

export default BackgroundOrbs;
