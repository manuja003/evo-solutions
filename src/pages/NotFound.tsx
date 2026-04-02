import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card !bg-white/5 p-12 md:p-20 text-center max-w-2xl relative z-10 shadow-2xl shadow-black/40 rounded-[3rem] border-white/10"
      >
        <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 shadow-lg shadow-primary/10">
           <AlertCircle size={48} className="text-primary" />
        </div>
        <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 tracking-tighter">404</h1>
        <p className="text-xl md:text-2xl font-heading font-bold text-white mb-6">Sector Not Found.</p>
        <p className="text-sm md:text-lg text-muted-foreground mb-12 leading-relaxed">
          The requested data module is currently offline or has been relocated to another sector of the Evo Grid.
        </p>
        <Link 
          to="/" 
          className="btn-primary-glow inline-flex items-center gap-3 px-8 py-4 text-lg font-bold"
        >
          <Home size={22} /> Return to Mission Control
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
