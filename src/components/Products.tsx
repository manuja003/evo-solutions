import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Home, Boxes, Code2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    icon: Monitor,
    name: "EvoDine",
    tagline: "Strategic Restaurant Architecture",
    description: "A mission-critical POS and operational intelligence ecosystem engineered for high-volume hospitality environments.",
    features: ["Operational Intelligence", "Inventory Sync", "Real-time Telemetry", "Strategic Analytics"],
    color: "from-primary to-primary/60",
    link: "/products/evodine",
  },
  {
    icon: Home,
    name: "EVOVilla",
    tagline: "High-Performance Property Control",
    description: "A strategic hospitality management platform engineered to maximize guest experience and operational yield.",
    features: ["Yield Optimization", "Guest Engineering", "Smart Scheduling", "Unified Control"],
    color: "from-accent to-accent/60",
    link: "/products/evovilla",
  },
  {
    icon: Boxes,
    name: "EvoInventory",
    tagline: "Logistics Velocity Engine",
    description: "A low-latency inventory and supply chain architecture built for absolute precision and zero-loss operations.",
    features: ["Asset Telemetry", "Predictive Scaling", "Multi-Node Sync", "Audit Integrity"],
    color: "from-primary to-accent",
    link: "/products/evoinventory",
  },
  {
    icon: Code2,
    name: "Strategic R&D",
    tagline: "Custom Architecture Labs",
    description: "Bespoke software engineering and systems integration designed to solve non-linear business complexities.",
    features: ["Enterprise Architecture", "R&D Prototyping", "UI/UX Engineering", "Deep Integration"],
    color: "from-accent to-primary",
    link: "#contact",
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -16, transition: { duration: 0.5 } }}
      className="glass-card !bg-white/[0.03] p-12 group cursor-pointer relative overflow-hidden h-full flex flex-col border-white/10 hover:border-primary/40 transition-all duration-700 shadow-2xl"
    >
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="flex justify-between items-start mb-12">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-2xl shadow-black/40 group-hover:rotate-[10deg] transition-transform duration-700`}>
          <product.icon size={40} className="text-white" />
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-1 italic">Module ID</div>
          <div className="text-xs font-black tracking-widest text-primary">DP-00{index + 1}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-4xl font-heading font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-500 italic">
          {product.name}
        </h3>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-6 italic">{product.tagline}</p>
      <p className="text-muted-foreground text-lg mb-12 leading-tight font-medium tracking-tight">
        {product.description}
      </p>
      
      <div className="mt-auto pt-10">
        <div className="flex flex-wrap gap-3 mb-10">
          {product.features.map((f) => (
            <span key={f} className="text-[9px] bg-white/5 text-foreground/80 px-4 py-2 rounded-xl font-black uppercase tracking-widest border border-white/5 group-hover:border-primary/20 transition-colors">
              {f}
            </span>
          ))}
        </div>
        
        <div className="w-full py-6 px-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground group-hover:text-primary-foreground transition-colors">
            {product.link.startsWith("/") ? `Enter ${product.name} Ecosystem` : "Initialize Lab Inquiry"}
          </span>
          <ArrowUpRight size={20} className="text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={4} />
        </div>
      </div>
    </motion.div>
  );

  const wrapperClass = "block h-full no-underline transition-none";
  if (product.link.startsWith("/")) {
    return (
      <Link 
        to={product.link} 
        className={wrapperClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }
  return (
    <a 
      href={product.link} 
      className={wrapperClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
};

const Products = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="products" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-10 font-black uppercase tracking-[0.4em] text-[10px] italic">
            Strategic Infrastructure
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-black mb-10 tracking-tighter leading-[0.9]">
            Global <br />
            <span className="text-primary italic">Operational Units.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-tight font-medium tracking-tight">
            High-performance enterprise ecosystems engineered for absolute market control. These are not services, they are **Systemic Advantages**.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
