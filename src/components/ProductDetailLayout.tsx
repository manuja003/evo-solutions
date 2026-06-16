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

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      <Navbar />

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero */}
      <section className="pt-48 pb-32 relative z-10">
        <div className="container mx-auto px-4">
          <Link
            to="/#products"
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 hover:text-primary transition-all mb-20 group italic"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" strokeWidth={3} />
            Return to Operations
          </Link>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-12 font-black uppercase tracking-[0.4em] text-[10px] italic">
                <div className="relative">
                  {icon}
                  <div className="absolute inset-0 bg-primary/40 blur-lg animate-pulse" />
                </div>
                <span className="ml-2">{tagline}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-heading font-black mb-12 leading-[0.9] tracking-tighter italic">
                Master the <br />
                <span className="text-primary italic">Architecture of {name}.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-tight mb-16 max-w-xl font-medium tracking-tight">
                {description}
              </p>
              <div className="flex flex-wrap gap-8">
                <a href="#showcase" className="btn-primary-glow px-12 py-6 text-sm">
                  INITIALIZE SHOWCASE
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
              <img
                src={screenshots[0]}
                alt={screenshotAlts[0]}
                className="rounded-[3rem] shadow-2xl relative z-10 border dark:border-white/10 border-black/10 group-hover:border-primary/40 transition-all duration-1000"
                width={1280}
                height={720}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Capabilities */}
      <section className="py-40 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
              Strategic Module Details
            </div>
            <h2 className="text-4xl md:text-7xl font-heading font-black mb-10 tracking-tighter italic leading-[0.9]">
              Module <span className="text-primary italic">Capabilities.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-tight font-medium tracking-tight">
              World-class features engineered for market leaders who demand absolute operational precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -16 }}
                className="glass-card p-12 group transition-all duration-700 dark:border-white/10 border-black/8 hover:border-primary/40 shadow-2xl h-full"
              >
                <div className="w-16 h-16 rounded-2xl dark:bg-white/5 bg-black/5 flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 shadow-2xl group-hover:rotate-[10deg]">
                  <Check size={32} className="text-primary group-hover:text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-heading font-black mb-6 tracking-tighter italic">{f.title}</h3>
                <p className="text-muted-foreground leading-tight text-lg font-medium tracking-tight">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yield & Analysis */}
      <section className="py-40 relative z-10 dark:bg-white/[0.02] bg-black/[0.02] dark:border-y dark:border-white/5 border-y border-black/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
                Yield maximization results
              </div>
              <h2 className="text-4xl md:text-7xl font-heading font-black mb-12 tracking-tighter italic leading-[0.9]">
                Absolute <br />
                <span className="text-primary italic">Operational Yield.</span>
              </h2>
              <div className="space-y-8 max-w-xl">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex gap-8 p-10 rounded-[2.5rem] dark:bg-white/[0.03] bg-black/[0.02] dark:border-white/5 border border-black/6 hover:border-primary/20 transition-all duration-500 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-2xl shadow-primary/20 group-hover:rotate-12 transition-transform">
                      <Check size={32} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-lg sm:text-xl text-foreground font-medium tracking-tight leading-tight pt-2">{b.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 60 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                <img
                  src={screenshots[activeScreenshot]}
                  alt={screenshotAlts[activeScreenshot]}
                  className="rounded-[3.5rem] shadow-2xl relative z-10 border dark:border-white/10 border-black/10 group-hover:border-primary/40 transition-all duration-1000"
                />
              </div>

              {screenshots.length > 1 && (
                <div className="flex gap-6 p-6 rounded-[2.5rem] dark:bg-white/5 bg-black/[0.03] max-w-fit mx-auto dark:border-white/5 border border-black/6">
                  {screenshots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`w-32 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 ${
                        i === activeScreenshot
                          ? "border-primary scale-110 shadow-2xl shadow-primary/20"
                          : "border-transparent opacity-40 hover:opacity-100"
                      }`}
                    >
                      <img src={s} alt="" className="w-full h-full object-cover rounded-xl" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Dive Showcase */}
      <section id="showcase" className="py-40 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto glass-card p-1.5 rounded-[4rem] shadow-2xl dark:border-white/5 border-black/6 overflow-hidden">
            <div className="grid lg:grid-cols-2 h-full">
              <div className="bg-foreground p-24 rounded-[3.5rem] text-background flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative z-10">
                  <h3 className="text-4xl sm:text-5xl font-heading font-black mb-12 leading-[0.9] italic tracking-tighter">
                    Witness <br />Dominion.
                  </h3>
                  <p className="text-background/60 mb-16 max-w-sm text-lg sm:text-xl font-medium tracking-tight leading-tight">
                    Watch how {name} empowers global titans to secure their position through absolute architectural precision.
                  </p>

                  <div className="space-y-8">
                    {[{ num: "01", label: "Market Synchronization" }, { num: "02", label: "Yield Optimization" }].map(({ num, label }) => (
                      <div key={num} className="flex items-center gap-6 group/item">
                        <div className="w-14 h-14 rounded-2xl bg-background/5 text-background flex items-center justify-center font-black text-xl italic group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                          {num}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-20 relative z-10">
                  <div className="flex -space-x-6 mb-8 group-hover:space-x-0 transition-all duration-700">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/120?img=${i + 30}`}
                        className="w-16 h-16 rounded-[1.5rem] border-4 border-background shadow-2xl"
                        alt="Titan"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Trusted by Global Business Leaders</p>
                </div>
              </div>

              <div className="p-20 md:p-32 flex flex-col justify-center">
                <div className="space-y-12">
                  {[
                    { title: "Strategic Architecture Deep-Dive", duration: "12:30" },
                    { title: "Market Domination Blueprint",       duration: "09:45" },
                    { title: "Operational Velocity Showcase",     duration: "11:20" },
                  ].map((video, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-8 p-10 rounded-[2.5rem] dark:bg-white/5 bg-black/[0.03] dark:border-white/5 border border-black/6 hover:border-primary/20 transition-all duration-700 cursor-pointer group shadow-2xl"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:scale-110 transition-all duration-700 group-hover:rotate-12">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-heading font-black text-foreground group-hover:text-primary transition-colors italic tracking-tighter leading-none mb-3">
                          {video.title}
                        </h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">
                          Blueprint Series • {video.duration}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center opacity-20">
                      All Showcases are Architect-Led
                    </p>
                  </div>
                </div>
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
