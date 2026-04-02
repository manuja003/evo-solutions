import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, GraduationCap, Landmark, Code2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    icon: Monitor,
    name: "EvoRes",
    tagline: "Restaurant Management System",
    description: "Complete POS, billing, inventory, and order management with real-time analytics for restaurants of any size.",
    features: ["Billing / POS", "Inventory Management", "Order Tracking", "Reports & Analytics"],
    color: "from-primary to-primary/60",
    link: "/products/evores",
  },
  {
    icon: GraduationCap,
    name: "LMS System",
    tagline: "Learning Management Platform",
    description: "End-to-end course management with student dashboards, progress tracking, and online examinations.",
    features: ["Course Management", "Student Dashboard", "Progress Tracking", "Online Exams"],
    color: "from-accent to-accent/60",
    link: "/products/lms",
  },
  {
    icon: Landmark,
    name: "Banking System",
    tagline: "Financial Management Suite",
    description: "Secure account management, transactions processing, and loan management with enterprise-grade security.",
    features: ["Account Management", "Transactions", "Loan Management", "Security Features"],
    color: "from-primary to-accent",
    link: "/products/banking",
  },
  {
    icon: Code2,
    name: "Custom Development",
    tagline: "Tailored Software Solutions",
    description: "Business websites, enterprise systems, UI/UX design, and seamless system integration built to your specs.",
    features: ["Business Websites", "Enterprise Systems", "UI/UX Design", "System Integration"],
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
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -12, transition: { duration: 0.4 } }}
      className="glass-card !bg-white/5 p-10 group cursor-pointer relative overflow-hidden h-full flex flex-col hover:!bg-white/10 transition-all duration-500 border-white/10 shadow-2xl shadow-black/20"
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-br ${product.color} flex items-center justify-center mb-8 shadow-lg shadow-black/10 group-hover:rotate-6 transition-transform duration-500`}>
        <product.icon size={32} className="text-white" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-3xl font-heading font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">{product.name}</h3>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary opacity-60 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0 group-hover:shadow-lg group-hover:shadow-primary/30">
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Explore System</span>
          <ArrowUpRight size={18} strokeWidth={3} />
        </div>
      </div>

      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">{product.tagline}</p>
      <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">{product.description}</p>
      
      <div className="mt-auto flex flex-wrap gap-3">
        {product.features.map((f) => (
          <span key={f} className="text-xs bg-white/10 text-foreground px-4 py-1.5 rounded-full font-bold border border-white/10 shadow-sm transition-colors group-hover:border-primary/30">
            {f}
          </span>
        ))}
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
    <section id="products" className="py-32 relative overflow-hidden bg-transparent">
      {/* Global Background is handled by BackgroundOrbs */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 font-bold uppercase tracking-widest text-xs">
             Our Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 tracking-tight">
            Specialized <span className="text-gradient-primary">Solutions.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enterprise-ready platforms designed to modernize your core operations and accelerate digital growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
