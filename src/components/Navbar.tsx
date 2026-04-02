import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "Products", href: "products" },
  { label: "Solutions", href: "solutions" },
  { label: "Process", href: "process" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 px-4 sm:px-6 pointer-events-none">
      <div 
        className={`pointer-events-auto mx-auto max-w-7xl rounded-full transition-all duration-700 ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] py-3 px-8"
            : "bg-transparent py-6 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <button onClick={() => handleNavClick("home")} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
              <span className="text-primary-foreground font-heading font-bold text-lg">E</span>
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-100'}`}>
              EVO <span className="text-gradient-primary">Solutions</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => handleNavClick("contact")} className="btn-primary-glow text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40">
              Request Demo
            </button>
          </div>

          <button
            className="md:hidden text-foreground w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden absolute top-24 left-4 right-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl px-4 py-3 text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <button onClick={() => handleNavClick("contact")} className="btn-primary-glow w-full text-center mt-2">
                Request Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
