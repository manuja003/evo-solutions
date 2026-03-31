import { motion } from "framer-motion";
import { ArrowLeft, Check, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Feature {
  title: string;
  description: string;
}

interface Benefit {
  text: string;
}

interface ProductDetailProps {
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  benefits: Benefit[];
  screenshots: string[];
  screenshotAlts: string[];
  color: string;
  icon: React.ReactNode;
}

const ProductDetailLayout = ({
  name,
  tagline,
  description,
  features,
  benefits,
  screenshots,
  screenshotAlts,
  color,
  icon,
}: ProductDetailProps) => {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="section-dark pt-32 pb-20 relative overflow-hidden">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-20`} style={{ background: `var(--gradient-primary)` }} />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                {icon}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-4">
                {name}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">{tagline}</p>
              <p className="text-surface-dark-foreground/60 text-lg leading-relaxed mb-8 max-w-lg">{description}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#demo-form" className="btn-primary-glow flex items-center gap-2">Request Demo</a>
                <button className="flex items-center gap-2 border-2 border-surface-dark-foreground/20 text-surface-dark-foreground font-semibold rounded-xl px-8 py-3 hover:border-surface-dark-foreground/40 transition-colors">
                  <Play size={18} /> Watch Video
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img
                src={screenshots[0]}
                alt={screenshotAlts[0]}
                className="rounded-2xl shadow-2xl w-full"
                width={1280}
                height={720}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Key Features</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-3">
              Everything You Need
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6"
              >
                <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-3 mb-8">
                Why Businesses Choose <span className="text-gradient-primary">{name}</span>
              </h2>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{b.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Screenshot gallery */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src={screenshots[activeScreenshot]}
                alt={screenshotAlts[activeScreenshot]}
                className="rounded-2xl shadow-xl w-full mb-4"
                loading="lazy"
                width={1280}
                height={720}
              />
              {screenshots.length > 1 && (
                <div className="flex gap-2">
                  {screenshots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === activeScreenshot ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={s} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section id="demo-form" className="py-24 section-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-surface-dark-foreground mb-4">
              Request a <span className="text-gradient-primary">Free Demo</span>
            </h2>
            <p className="text-surface-dark-foreground/60">See {name} in action. Fill in your details and we'll set up a personalized demo.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" />
              <input type="email" placeholder="Work Email" required className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors" />
            <textarea rows={3} placeholder="Any specific requirements?" className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            <button type="submit" className="btn-primary-glow w-full text-base">
              {submitted ? "✓ Request Sent!" : "Request Free Demo"}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailLayout;
