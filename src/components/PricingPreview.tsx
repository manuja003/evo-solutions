import { useNavigate } from "react-router-dom";

const fmt = (n: number) => "LKR " + n.toLocaleString("en-LK");
const savePct = (orig: number, now: number) => Math.round(((orig - now) / orig) * 100);

interface Tier {
  name: string;
  badge?: string;
  orig?: number;
  price?: number;
  contactUs?: boolean;
  oneTime?: boolean;
  popular: boolean;
  features: string[];
}

interface Product {
  product: string;
  color: string;
  soft: string;
  border: string;
  glow: string;
  icon: JSX.Element;
  tiers: Tier[];
}

const plans: Product[] = [
  {
    product: "EvoDine",
    color: "#FF6B2B",
    soft: "rgba(255,107,43,.10)",
    border: "rgba(255,107,43,.2)",
    glow: "rgba(255,107,43,.15)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2h18l-2 7H5L3 2z"/><path d="M5 9l1 9h12l1-9"/><circle cx="9" cy="20" r="1"/><circle cx="15" cy="20" r="1"/>
      </svg>
    ),
    tiers: [
      {
        name: "Basic",
        orig: 10990, price: 7990,
        popular: false,
        features: ["Real-Time Order Sync", "Kitchen & Bar Display", "Cashier & Billing", "Live Dashboard Analytics"],
      },
      {
        name: "Premium",
        badge: "+ Stock Management",
        orig: 15990, price: 12990,
        popular: true,
        features: ["Everything in Basic", "Integrated Stock Management", "Low-Stock Alerts", "Advanced Reporting"],
      },
    ],
  },
  {
    product: "EvoInn",
    color: "#3B82F6",
    soft: "rgba(59,130,246,.10)",
    border: "rgba(59,130,246,.2)",
    glow: "rgba(59,130,246,.15)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    tiers: [
      {
        name: "Basic",
        orig: 34900, price: 29900,
        popular: false,
        features: ["Guest Profile Management", "Real-Time Room Dashboard", "Dynamic Pricing Engine", "Unified Booking System"],
      },
      {
        name: "Premium",
        badge: "Restaurant + Stock",
        orig: 49900, price: 44900,
        popular: true,
        features: ["Everything in Basic", "Full Restaurant Management", "Multi-Outlet Support", "Priority Support"],
      },
    ],
  },
  {
    product: "EvoStock",
    color: "#22C55E",
    soft: "rgba(34,197,94,.10)",
    border: "rgba(34,197,94,.2)",
    glow: "rgba(34,197,94,.15)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    tiers: [
      {
        name: "Essential",
        badge: "Single Location",
        price: 40000,
        oneTime: true,
        popular: false,
        features: ["Real-Time Asset Tracking", "Automated Fulfillment", "Stock Adjustment & GRN", "Barcode POS Billing"],
      },
      {
        name: "Enterprise",
        badge: "Multi-Location + API",
        contactUs: true,
        popular: true,
        features: ["Everything in Essential", "Multi-Warehouse Sync", "API-First Integration", "Priority Support & Onboarding"],
      },
    ],
  },
];

const PricingPreview = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Background orb */}
      <div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,43,.05) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div className="section-header" data-reveal>
          <div className="section-eyebrow">Pricing</div>
          <h2 className="section-title">
            Simple &amp; Transparent<br />
            <span className="gradient-text">Plans for Every Scale</span>
          </h2>
          <p className="section-desc">
            No hidden fees. No lock-in contracts. Pick the plan that fits your operation today and upgrade when you're ready.
          </p>
        </div>

        {/* Product blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {plans.map((p) => (
            <div key={p.product} data-reveal>
              {/* Product label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: p.soft, border: `1px solid ${p.border}`,
                  color: p.color, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {p.icon}
                </div>
                <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.1rem", color: p.color, letterSpacing: "-.01em" }}>
                  {p.product}
                </div>
              </div>

              {/* Tier cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {p.tiers.map((t) => {
                  const hasSave = t.orig != null && t.price != null;
                  const save = hasSave ? savePct(t.orig!, t.price!) : 0;
                  return (
                    <div key={t.name} style={{
                      background: t.popular ? "rgba(255,255,255,.06)" : "var(--ed-bg-card)",
                      border: t.popular ? `1.5px solid ${p.color}` : "1px solid var(--ed-border)",
                      borderRadius: 20, padding: "28px 28px",
                      position: "relative", display: "flex", flexDirection: "column",
                      boxShadow: t.popular ? `0 0 40px ${p.glow}` : "none",
                      transition: "all .3s",
                    }}>
                      {/* Popular badge */}
                      {t.popular && (
                        <div style={{
                          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                          background: p.color, color: "#fff", borderRadius: 9999,
                          padding: "3px 16px", fontSize: ".7rem", fontWeight: 700,
                          letterSpacing: ".08em", textTransform: "uppercase",
                          fontFamily: "var(--font-jakarta)", whiteSpace: "nowrap",
                        }}>
                          Most Popular
                        </div>
                      )}

                      {/* Plan name */}
                      <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: "1rem", color: "var(--ed-text-primary)", marginBottom: 6 }}>
                        {p.product} {t.name}
                      </div>

                      {/* Tier badge */}
                      {t.badge && (
                        <div style={{
                          display: "inline-block", marginBottom: 14,
                          background: p.soft, border: `1px solid ${p.border}`,
                          color: p.color, borderRadius: 8, padding: "3px 10px",
                          fontSize: ".68rem", fontWeight: 700,
                          fontFamily: "var(--font-jakarta)", letterSpacing: ".04em",
                        }}>
                          {t.badge}
                        </div>
                      )}

                      {/* Save badge (only if discounted) */}
                      {hasSave && (
                        <div style={{
                          display: "inline-flex", alignItems: "center", marginBottom: 10,
                          background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.2)",
                          color: "#22C55E", borderRadius: 9999,
                          padding: "2px 10px", fontSize: ".68rem", fontWeight: 700,
                          fontFamily: "var(--font-jakarta)",
                        }}>
                          SAVE {save}%
                        </div>
                      )}

                      {/* Original price (struck through) */}
                      {t.orig != null && (
                        <div style={{ fontSize: ".82rem", color: "#EF4444", textDecoration: "line-through", fontWeight: 500, marginBottom: 4 }}>
                          {fmt(t.orig)}/mo
                        </div>
                      )}

                      {/* Price display */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                        {t.contactUs ? (
                          <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "1.6rem", color: p.color }}>
                            Contact Us
                          </span>
                        ) : (
                          <>
                            <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "1.8rem", color: p.color }}>
                              {fmt(t.price!)}
                            </span>
                            <span style={{ fontSize: ".82rem", color: "var(--ed-text-secondary)" }}>
                              {t.oneTime ? "one-time" : "/month"}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Feature list */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 9, flex: 1, marginBottom: 20 }}>
                        {t.features.map((f) => (
                          <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: ".82rem", color: "var(--ed-text-secondary)" }}>
                            <div style={{
                              width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                              background: `${p.color}20`, border: `1px solid ${p.color}30`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => navigate("/pricing")}
                        style={{
                          width: "100%", padding: "10px 0",
                          borderRadius: 10, fontSize: ".82rem", fontWeight: 700,
                          background: t.popular ? p.color : "transparent",
                          color: t.popular ? "#fff" : p.color,
                          border: `1.5px solid ${p.color}`,
                          cursor: "pointer", fontFamily: "var(--font-jakarta)",
                          transition: "all .25s",
                          boxShadow: t.popular ? `0 0 20px ${p.glow}` : "none",
                        }}
                        onMouseEnter={(e) => {
                          const btn = e.currentTarget;
                          btn.style.transform = "translateY(-2px)";
                          if (!t.popular) btn.style.background = p.soft;
                        }}
                        onMouseLeave={(e) => {
                          const btn = e.currentTarget;
                          btn.style.transform = "none";
                          if (!t.popular) btn.style.background = "transparent";
                        }}
                      >
                        {t.contactUs ? "Contact for Pricing →" : "Get Started →"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 56 }} data-reveal data-delay="100">
          <p style={{ color: "var(--ed-text-muted)", fontSize: ".9rem", marginBottom: 20 }}>
            All plans include setup support. Add-ons &amp; integrations available separately.
          </p>
          <button
            onClick={() => navigate("/pricing")}
            className="btn-primary-glow"
            style={{ padding: "12px 32px", fontSize: ".9rem" }}
          >
            View Full Pricing →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
