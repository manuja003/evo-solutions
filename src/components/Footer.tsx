import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative mt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[3rem] bg-black/40 backdrop-blur-2xl border border-white/10 p-12 md:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
        {/* Massive CTA Section - Now integrated into a glass card */}
        <div className="glass-card p-8 md:p-16 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="md:flex items-center justify-between relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Ready to build the <span className="text-gradient-primary">future</span> together?
              </h2>
              <p className="text-lg text-muted-foreground">Let's discuss how we can transform your business with state-of-the-art software.</p>
            </div>
            <div className="mt-10 md:mt-0">
              <button 
                onClick={() => handleNavClick("contact")} 
                className="btn-primary-glow text-lg px-10 py-5 shadow-2xl shadow-primary/30 flex items-center gap-3 active:scale-95 transition-transform"
              >
                Start a Conversation
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Footer Pill */}
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/[0.03]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <button onClick={() => handleNavClick("home")} className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
                  <span className="text-primary-foreground font-heading font-bold text-xl">E</span>
                </div>
                <span className="font-heading font-bold text-2xl text-foreground tracking-tight">EVO</span>
              </button>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                Crafting premium software ecosystems that empower modern businesses to lead.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-foreground text-lg mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="/products/evores" className="hover:text-primary transition-colors flex items-center gap-2 underline-offset-4 hover:underline">EvoRes System</Link></li>
                <li><Link to="/products/lms" className="hover:text-primary transition-colors flex items-center gap-2 underline-offset-4 hover:underline">LMS Platform</Link></li>
                <li><Link to="/products/banking" className="hover:text-primary transition-colors flex items-center gap-2 underline-offset-4 hover:underline">Banking Core</Link></li>
                <li><button onClick={() => handleNavClick("products")} className="hover:text-primary transition-colors underline-offset-4 hover:underline">Custom Dev</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-foreground text-lg mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><button onClick={() => handleNavClick("solutions")} className="hover:text-primary transition-colors underline-offset-4 hover:underline">Success Stories</button></li>
                <li><button onClick={() => handleNavClick("process")} className="hover:text-primary transition-colors underline-offset-4 hover:underline">Our Process</button></li>
                <li><button onClick={() => handleNavClick("testimonials")} className="hover:text-primary transition-colors underline-offset-4 hover:underline">Client Love</button></li>
                <li><button onClick={() => handleNavClick("contact")} className="hover:text-primary transition-colors underline-offset-4 hover:underline">Careers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-foreground text-lg mb-6">Say Hello</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:hello@evosolutions.com" className="hover:text-primary transition-colors">hello@evosolutions.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-1" />
                  <span>123 Innovation Blvd,<br />Tech City, TC 10101</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} EVO Solutions Inc. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
