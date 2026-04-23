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
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    name: "EvoPos",
    tagline: "Point of Sale & Billing Platform",
    description: "A powerful, modern POS system built for speed and accuracy — inventory management, receipt printing, shift reports, and multi-payment support.",
    features: ["Fast POS Interface", "Inventory Tracking", "Multi-Payment Methods", "Shift & Daily Reports", "Barcode Scanner Support", "Cloud Sync"],
    link: "#contact",
    status: "dev" as const,
    cta: "Request Early Access",
  },
  {
    variant: "orange",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    name: "EvoReservation",
    tagline: "Reservation & Booking Solution",
    description: "A smart reservation management platform for restaurants and hospitality venues — online bookings, table planning, guest notifications, and capacity control.",
    features: ["Online Booking Portal", "Table Plan Management", "SMS/Email Notifications", "Waitlist Management", "Capacity Control", "Reports & Analytics"],
    link: "#contact",
    status: "dev" as const,
    cta: "Request Early Access",
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          className="products-grid">
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

      <style>{`
        @media (max-width: 900px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default Products;
