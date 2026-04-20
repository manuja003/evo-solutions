import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface TitanLoadingScreenProps {
  onComplete: () => void;
}

const TitanLoadingScreen = ({ onComplete }: TitanLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 1000);
          }, 800);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#010309] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Complexity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]" />

          <div className="relative">
            {/* Architectural Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute border border-white/5 rounded-full"
                style={{
                  width: `${300 + i * 100}px`,
                  height: `${300 + i * 100}px`,
                  top: `-${(300 + i * 100) / 2}px`,
                  left: `-${(300 + i * 100) / 2}px`
                }}
              />
            ))}

            {/* Core Visualization */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)] mb-12">
                <Zap size={48} className="text-white animate-pulse" />
              </div>

              <div className="text-center space-y-8">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Initialization Matrix v4.0</div>

                <div className="space-y-2">
                  <div className="text-7xl md:text-8xl font-heading font-black italic tracking-tighter text-white tabular-nums leading-none">
                    {Math.floor(progress)}%
                  </div>
                  <div className="flex gap-1 h-2 w-64 md:w-80 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
                    <motion.div
                      className="h-full bg-primary shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-28 flex flex-col items-center gap-4 opacity-40">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white italic">Titan Core Online</p>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Branding */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
            <div className="text-2xl font-heading font-black italic tracking-widest text-white opacity-20">EVO SOLUTIONS</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TitanLoadingScreen;
