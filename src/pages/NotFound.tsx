import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Structural Anomaly detected at sector:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Complexity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card !bg-white/[0.03] p-16 md:p-32 text-center max-w-3xl relative z-10 shadow-2xl rounded-[4rem] border-white/10"
      >
        <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-primary/20 relative group">
           <AlertCircle size={64} className="text-primary group-hover:scale-110 transition-transform duration-700" strokeWidth={3} />
           <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse -z-10" />
        </div>
        
        <h1 className="text-8xl md:text-[10rem] font-heading font-black text-white mb-8 tracking-tighter italic leading-none">404</h1>
        <p className="text-3xl md:text-5xl font-heading font-black text-primary mb-10 italic tracking-tighter uppercase tracking-[0.2em]">Sector Anomaly.</p>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-16 leading-tight max-w-xl mx-auto font-medium tracking-tight">
          The requested data module is currently offline or has been relocated to an classified sector of the Evo Grid.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary-glow inline-flex items-center gap-4 px-12 py-6 scale-110"
        >
          <Home size={24} /> 
          <span className="text-sm font-black tracking-[0.3em] uppercase italic">Return to Command</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
