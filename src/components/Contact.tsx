import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 section-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4 text-surface-dark-foreground">
            Ready to <span className="text-gradient-primary">Transform</span> Your Business?
          </h2>
          <p className="text-surface-dark-foreground/60 max-w-2xl mx-auto">
            Let's discuss how we can build the perfect solution for your needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Us", value: "hello@evosolutions.com" },
                { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Visit Us", value: "123 Innovation Blvd, Tech City" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-surface-dark-foreground/50">{item.label}</div>
                    <div className="font-medium text-surface-dark-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <select className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground/70 focus:outline-none focus:border-primary/50 transition-colors">
              <option value="">Select a Product</option>
              <option>EvoRes — Restaurant Management</option>
              <option>LMS System</option>
              <option>Banking System</option>
              <option>Custom Development</option>
            </select>
            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="btn-primary-glow w-full flex items-center justify-center gap-2 text-base"
            >
              {submitted ? "✓ Message Sent!" : (<>Send Message <Send size={18} /></>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
