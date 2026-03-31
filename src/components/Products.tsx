import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, GraduationCap, Landmark, Code2, ArrowUpRight } from "lucide-react";

const products = [
  {
    icon: Monitor,
    name: "EvoRes",
    tagline: "Restaurant Management System",
    description: "Complete POS, billing, inventory, and order management with real-time analytics for restaurants of any size.",
    features: ["Billing / POS", "Inventory Management", "Order Tracking", "Reports & Analytics"],
    color: "from-primary to-primary/60",
  },
  {
    icon: GraduationCap,
    name: "LMS System",
    tagline: "Learning Management Platform",
    description: "End-to-end course management with student dashboards, progress tracking, and online examinations.",
    features: ["Course Management", "Student Dashboard", "Progress Tracking", "Online Exams"],
    color: "from-accent to-accent/60",
  },
  {
    icon: Landmark,
    name: "Banking System",
    tagline: "Financial Management Suite",
    description: "Secure account management, transactions processing, and loan management with enterprise-grade security.",
    features: ["Account Management", "Transactions", "Loan Management", "Security Features"],
    color: "from-primary to-accent",
  },
  {
    icon: Code2,
    name: "Custom Development",
    tagline: "Tailored Software Solutions",
    description: "Business websites, enterprise systems, UI/UX design, and seamless system integration built to your specs.",
    features: ["Business Websites", "Enterprise Systems", "UI/UX Design", "System Integration"],
    color: "from-accent to-primary",
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-8 group cursor-pointer relative overflow-hidden"
    >
      {/* Gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
        <product.icon size={28} className="text-primary-foreground" />
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-heading font-bold text-foreground">{product.name}</h3>
        <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm text-primary font-medium mb-3">{product.tagline}</p>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>

      <div className="flex flex-wrap gap-2">
        {product.features.map((f) => (
          <span key={f} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium">
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Products = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="products" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Our Products</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Powerful Systems for{" "}
            <span className="text-gradient-primary">Every Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From restaurant management to banking solutions — we deliver enterprise-grade software that scales with your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
