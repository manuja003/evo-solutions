import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden bg-[#030712] text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
                <div className="animate-bounce">{icon}</div>
                <span className="text-sm font-bold uppercase tracking-widest">{tagline}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight tracking-tight">
                Unlock the full potential of <span className="text-gradient-primary">{name}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#demo-form" className="btn-primary-glow text-lg px-8 py-4">
                  Request a Demo
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full opacity-50" />
              <img
                src={screenshots[0]}
                alt={screenshotAlts[0]}
                className="rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-white/10 relative z-10"
                width={1280}
                height={720}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
              Core <span className="text-gradient-primary">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Precision-engineered features to streamline your entire workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card !bg-white/5 p-8 group hover:-translate-y-2 transition-all duration-500 border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Check size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Gallery */}
      <section className="py-32 relative z-10 bg-white/5 backdrop-blur-3xl border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-10">
                Beyond the <span className="text-gradient-primary">Interface</span>
              </h2>
              <div className="space-y-6">
                {benefits.map((b, i) => (
                  <motion.div 
                    key={b.text} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <Check size={20} className="text-white" />
                    </div>
                    <p className="text-lg text-foreground/80 font-medium pt-2">{b.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={screenshots[activeScreenshot]}
                  alt={screenshotAlts[activeScreenshot]}
                  className="rounded-[2.5rem] shadow-2xl relative z-10 border border-white/10"
                />
              </div>
              
              {screenshots.length > 1 && (
                <div className="flex gap-4 p-4 rounded-[2rem] bg-white/5 max-w-fit mx-auto border border-white/5">
                  {screenshots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${i === activeScreenshot ? "border-primary scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img src={s} alt="" className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="demo-form" className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card !bg-white/5 p-1 md:p-2 rounded-[3.5rem] shadow-2xl shadow-black/40 border-white/10">
            <div className="grid lg:grid-cols-5 h-full overflow-hidden">
              <div className="lg:col-span-2 bg-[#111827] p-12 rounded-[2.5rem] text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6">Experience it first-hand.</h3>
                  <p className="text-white/60 mb-8 max-w-xs text-sm">Schedule a 1-on-1 session with our systems architect to see how {name} fits your specific business model.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">✓</div>
                    <span className="text-xs font-medium">30-minute tailored demo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">✓</div>
                    <span className="text-xs font-medium">Architecture consultation</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-14">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Name</label>
                      <input type="text" placeholder="John Doe" required className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                      <input type="email" placeholder="john@company.com" required className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-white text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Company</label>
                    <input type="text" placeholder="Evo Solutions Inc." className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-white text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Message</label>
                    <textarea rows={3} placeholder="How can we help?" className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none text-white text-sm" />
                  </div>
                  <button type="submit" className="w-full btn-primary-glow py-5 text-lg shadow-xl shadow-primary/20">
                    {submitted ? "✓ Demo Requested!" : "Secure My Demo Slot"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailLayout;
