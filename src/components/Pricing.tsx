import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small businesses getting started with digital solutions.",
    features: [
      "1 product module",
      "Up to 5 users",
      "Basic analytics",
      "Email support",
      "Monthly updates",
      "Standard security",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Business",
    price: "$999",
    period: "/month",
    description: "Ideal for growing businesses needing comprehensive features.",
    features: [
      "Up to 3 product modules",
      "Up to 25 users",
      "Advanced analytics & reports",
      "Priority support (24/7)",
      "Weekly updates",
      "Enhanced security & backups",
      "API access",
      "Custom branding",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations requiring full customization and dedicated support.",
    features: [
      "All product modules",
      "Unlimited users",
      "Custom analytics & dashboards",
      "Dedicated account manager",
      "Real-time updates",
      "Enterprise-grade security",
      "Full API & integrations",
      "Custom development hours",
      "On-premise deployment option",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Simple, <span className="text-gradient-primary">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include setup, training, and ongoing support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={`glass-card p-8 flex flex-col relative ${
                tier.highlighted
                  ? "border-primary/50 ring-2 ring-primary/20"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-heading font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full text-center rounded-xl py-3 font-semibold transition-all ${
                  tier.highlighted
                    ? "btn-primary-glow"
                    : "border-2 border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
