const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold">E</span>
              </div>
              <span className="font-heading font-bold text-lg text-background">EVO Solutions</span>
            </div>
            <p className="text-background/50 text-sm leading-relaxed">
              Building scalable, custom software that grows your business.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><a href="#products" className="hover:text-primary transition-colors">EvoRes</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">LMS System</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Banking System</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Custom Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><a href="#solutions" className="hover:text-primary transition-colors">Solutions</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
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
