import { useLocation, useNavigate, Link } from "react-router-dom";

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
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <button onClick={() => handleNavClick("home")} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold">E</span>
              </div>
              <span className="font-heading font-bold text-lg text-background">EVO Solutions</span>
            </button>
            <p className="text-background/50 text-sm leading-relaxed">
              Building scalable, custom software that grows your business.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><Link to="/products/evores" className="hover:text-primary transition-colors">EvoRes</Link></li>
              <li><Link to="/products/lms" className="hover:text-primary transition-colors">LMS System</Link></li>
              <li><Link to="/products/banking" className="hover:text-primary transition-colors">Banking System</Link></li>
              <li><button onClick={() => handleNavClick("products")} className="hover:text-primary transition-colors">Custom Development</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><button onClick={() => handleNavClick("solutions")} className="hover:text-primary transition-colors">Solutions</button></li>
              <li><button onClick={() => handleNavClick("process")} className="hover:text-primary transition-colors">Process</button></li>
              <li><button onClick={() => handleNavClick("testimonials")} className="hover:text-primary transition-colors">Testimonials</button></li>
              <li><button onClick={() => handleNavClick("contact")} className="hover:text-primary transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li>hello@evosolutions.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Innovation Blvd, Tech City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/40">
          © {new Date().getFullYear()} EVO Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
