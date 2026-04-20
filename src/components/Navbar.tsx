import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "Products", href: "products" },
  { label: "Solutions", href: "solutions" },
  { label: "Process", href: "process" },
  { label: "Case Studies", href: "testimonials" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700 pt-4 px-4 md:px-8 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-[1400px] transition-all duration-1000 relative group ${scrolled
            ? "bg-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] py-6 px-12 rounded-[2.5rem]"
            : "bg-transparent py-10 px-6 border border-transparent rounded-none"
          }`}
      >
        {/* Subtle top glow line for 'Command Bridge' effect */}
        <div className={`absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="flex items-center justify-between">
          <button onClick={() => handleNavClick("home")} className="flex items-center gap-5 group/logo">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-1000 group-hover/logo:rotate-[360deg] group-hover/logo:scale-110 relative">
              <span className="text-primary-foreground font-heading font-black text-2xl relative z-10">E</span>
              <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-3xl tracking-tighter leading-none italic uppercase">
                  EVO <span className="text-primary">SOLUTIONS</span>
                </span>
              </div>
              <span className="text-[9px] font-black tracking-[0.5em] uppercase opacity-40 group-hover/logo:opacity-100 transition-all duration-700 italic">Core Mission Infrastructure</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative group/link text-[13px] font-black uppercase tracking-[0.2em] text-foreground/50 hover:text-primary transition-all duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover/link:w-full" />
                <span className="absolute -top-1 -right-2 text-[6px] opacity-0 group-hover/link:opacity-40 transition-opacity text-primary">0{navLinks.indexOf(link) + 1}</span>
              </button>
            ))}

            <div className="w-px h-8 bg-white/10 mx-2" />

            <button
              onClick={() => handleNavClick("contact")}
              className="btn-primary-glow px-8 py-4 text-[13px] shadow-2xl shadow-primary/20 hover:shadow-primary/40"
            >
              Initialize Deep Dive
            </button>
          </div>

          <button
            className="lg:hidden text-foreground w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="pointer-events-auto lg:hidden absolute top-32 left-4 right-4 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between text-lg font-black uppercase tracking-widest text-foreground/60 hover:text-primary hover:bg-white/5 rounded-2xl px-6 py-4 transition-all group"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={18} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </button>
              ))}
              <div className="h-px bg-white/10 my-4 mx-4" />
              <button onClick={() => handleNavClick("contact")} className="btn-primary-glow w-full text-center mt-2 py-6 text-xs uppercase tracking-[0.3em] font-black shadow-primary/30">
                Initialize Deep Dive
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
