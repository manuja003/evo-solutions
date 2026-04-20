import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    // Placeholder number - Replace with real Titan Hotline
    const phoneNumber = "1234567890"; 
    const message = encodeURIComponent("Initialize Strategic Consultation. I am ready to dominate my market.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Bottom-Right: Command Navigation */}
      <div className="fixed bottom-12 right-12 z-[100] flex flex-col gap-6">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white shadow-2xl shadow-black/60 group relative overflow-hidden gpu-accelerate"
              title="Return to Command"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowUp size={24} strokeWidth={3} className="relative z-10" />
              <div className="absolute top-0 left-0 w-full h-full border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom-Left: Strategic Connection (WhatsApp) */}
      <div className="fixed bottom-12 left-12 z-[100] flex items-center gap-4">
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={openWhatsApp}
          className="group relative flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-[0_15px_40px_rgba(37,211,102,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Official WhatsApp SVG Logo */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 relative z-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>

            {/* Signal Ring */}
            <div className="absolute inset-0 border-4 border-[#25D366] rounded-2xl animate-ping opacity-20" />
          </div>

          {/* Senior Dev Refined Label */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-xl px-4 py-3 transition-all group-hover:bg-white/[0.08] group-hover:border-white/20 shadow-2xl">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#25D366] mb-1">Direct Hotline</div>
             <div className="text-sm font-black tracking-tighter text-white">Talk to an Architect</div>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingActions;
