import { Link } from "react-router-dom";

const products = [
  {
    variant: "orange",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2h18l-2 7H5L3 2z"/><path d="M5 9l1 9h12l1-9"/><circle cx="9" cy="20" r="1"/><circle cx="15" cy="20" r="1"/>
      </svg>
    ),
    name: "EvoDine",
    tagline: "Smart Restaurant Management",
    description: "A complete, real-time restaurant management platform connecting orders, kitchen, bar, cashier, and management analytics in one unified system.",
    features: ["Real-Time Order Sync", "Kitchen & Bar Display", "Cashier & Billing", "Live Dashboard Analytics", "7 Role-Based Access", "6 Order Stages"],
    link: "/products/evodine",
    status: "live" as const,
    cta: "Explore EvoDine",
  },
  {
    variant: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    name: "EVOVilla",
    tagline: "Smart Hospitality Management",
    description: "A high-performance property and guest management platform for hotels, villas, and boutique properties — streamline bookings, operations, and guest experiences.",
    features: ["Guest Profiles & Concierge", "Real-Time Room Dashboard", "Dynamic Pricing Engine", "Unified Booking System", "Automated Workflows", "Revenue Analytics"],
    link: "/products/evovilla",
    status: "live" as const,
    cta: "Explore EVOVilla",
  },
  {
    variant: "orange",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    name: "EvoInventory",
    tagline: "Supply Chain Intelligence",
    description: "A mission-critical inventory management platform for zero-loss operations — real-time asset tracking, predictive stock management, and automated fulfillment.",
    features: ["Real-Time Asset Tracking", "Predictive Stock Intelligence", "Automated Fulfillment", "Multi-Warehouse Sync", "Immutable Audit Trails", "API-First Integration"],
    link: "/products/evoinventory",
    status: "live" as const,
    cta: "Explore EvoInventory",
  },
];

const Products = () => {
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="products"
      style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle orb background */}
      <div style={{
        position: "absolute", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(255,107,43,.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div className="section-header" data-reveal>
          <div className="section-eyebrow">Our Products</div>
          <h2 className="section-title">
            Software Built for<br />
            <span className="gradient-text">Real Business Problems</span>
          </h2>
          <p className="section-desc">
            Each EvoSolutions product is purpose-engineered — clean, fast, and packed with
            features that make a real difference in daily operations.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {products.map((p, i) => {
            const isOrange = p.variant === "orange";
            const cardContent = (
              <div
                data-reveal
                data-delay={["0", "80", "160"][i]}
                className={`product-card ${p.variant}`}
                style={{ cursor: p.link.startsWith("/") ? "pointer" : "default" }}
              >
                {/* Icon + Status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                    background: isOrange ? "var(--ed-orange-soft)" : "var(--ed-blue-soft)",
                    color: isOrange ? "var(--ed-orange)" : "var(--ed-blue-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${isOrange ? "rgba(255,107,43,.2)" : "rgba(37,99,235,.2)"}`,
                  }}>
                    {p.icon}
                  </div>
                  <span className={`status-chip ${p.status}`}>
                    {p.status === "live" ? "● Live" : "In Development"}
                  </span>
                </div>

                {/* Name + Tagline */}
                <h3 style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--ed-text-white)",
                  marginBottom: 4,
                  letterSpacing: "-.02em",
                }}>
                  {p.name}
                </h3>
                <p style={{
                  fontSize: ".72rem",
                  fontWeight: 600,
                  color: isOrange ? "var(--ed-orange)" : "var(--ed-blue-light)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginBottom: 14,
                }}>
                  {p.tagline}
                </p>
                <p style={{ fontSize: ".9rem", color: "var(--ed-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
                  {p.description}
                </p>

                {/* Features */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, marginTop: "auto" }}>
                  {p.features.map((f) => (
                    <span key={f} style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: ".72rem", fontWeight: 500,
                      color: "var(--ed-text-secondary)",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid var(--ed-border)",
                      borderRadius: 9999, padding: "4px 10px",
                    }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                        stroke={isOrange ? "#FF6B2B" : "#3B82F6"} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px",
                  background: isOrange ? "var(--ed-orange-soft)" : "var(--ed-blue-soft)",
                  border: `1px solid ${isOrange ? "rgba(255,107,43,.2)" : "rgba(37,99,235,.2)"}`,
                  borderRadius: 12,
                }}>
                  <span style={{
                    fontSize: ".82rem", fontWeight: 600,
                    color: isOrange ? "var(--ed-orange)" : "var(--ed-blue-light)",
                    fontFamily: "var(--font-jakarta)",
                  }}>
                    {p.cta}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={isOrange ? "#FF6B2B" : "#3B82F6"} strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            );

            if (p.link.startsWith("/")) {
              return (
                <Link key={p.name} to={p.link} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  {cardContent}
                </Link>
              );
            }
            return (
              <button
                key={p.name}
                onClick={scrollToContact}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "block", textAlign: "left", height: "100%", width: "100%" }}
              >
                {cardContent}
              </button>
            );
          })}
        </div>

        {/* Bottom CTA note */}
        <div style={{ textAlign: "center", marginTop: 48 }} data-reveal data-delay="200">
          <p style={{ color: "var(--ed-text-muted)", fontSize: ".9rem", marginBottom: 20 }}>
            Need a custom solution?{" "}
            <button
              onClick={scrollToContact}
              style={{
                color: "var(--ed-orange)", fontWeight: 600, background: "none",
                border: "none", cursor: "pointer", fontSize: ".9rem",
                textDecoration: "underline", textDecorationColor: "rgba(255,107,43,.4)",
                fontFamily: "var(--font-body)",
              }}
            >
              Contact us for a bespoke build.
            </button>
          </p>
        </div>
      </div>

    </section>
  );
};

export default Products;
