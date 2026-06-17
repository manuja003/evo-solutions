import { useNavigate } from "react-router-dom";

const BAR_H = 52;

/* ── helpers ── */
const fmt = (n: number) => "LKR " + n.toLocaleString("en-LK");
const savePct = (orig: number, now: number) =>
  Math.round(((orig - now) / orig) * 100);

/* ── data ── */
const evoDinePlans = [
  {
    name: "EvoDine Basic",
    orig: 10990,
    price: 7990,
    period: "/month",
    color: "#FF6B2B",
    soft: "rgba(255,107,43,.10)",
    features: [
      "Real-Time Order Sync",
      "Kitchen & Bar Display",
      "Cashier & Billing",
      "Live Dashboard Analytics",
      "7 Role-Based Access",
      "6 Order Stages",
    ],
    popular: false,
  },
  {
    name: "EvoDine Premium",
    badge: "+ Stock Management",
    orig: 15990,
    price: 12990,
    period: "/month",
    color: "#FF6B2B",
    soft: "rgba(255,107,43,.10)",
    features: [
      "Everything in Basic",
      "Integrated Stock Management",
      "Supplier & Purchase Orders",
      "Wastage & Cost Tracking",
      "Low-Stock Alerts",
      "Advanced Reporting",
    ],
    popular: true,
  },
];

const evoInnPlans = [
  {
    name: "EvoInn Basic",
    orig: 34900,
    price: 29900,
    period: "/month",
    color: "#3B82F6",
    soft: "rgba(59,130,246,.10)",
    features: [
      "Guest Profile Management",
      "Real-Time Room Dashboard",
      "Dynamic Pricing Engine",
      "Unified Booking System",
      "Automated Workflows",
      "Revenue Analytics",
    ],
    popular: false,
  },
  {
    name: "EvoInn Premium",
    badge: "Restaurant + Stock",
    orig: 49900,
    price: 44900,
    period: "/month",
    color: "#3B82F6",
    soft: "rgba(59,130,246,.10)",
    features: [
      "Everything in Basic",
      "Full Restaurant Management",
      "Integrated Stock Control",
      "Multi-Outlet Support",
      "Advanced Guest Concierge",
      "Priority Support",
    ],
    popular: true,
  },
];

const addons = [
  {
    product: "EvoDine",
    color: "#FF6B2B",
    soft: "rgba(255,107,43,.08)",
    border: "rgba(255,107,43,.2)",
    integrations: ["Uber Eats", "PickMe Food"],
    note: "Connect your online delivery channels directly into EvoDine orders in real time.",
  },
  {
    product: "EvoInn",
    color: "#3B82F6",
    soft: "rgba(59,130,246,.08)",
    border: "rgba(59,130,246,.2)",
    integrations: ["Booking.com", "Airbnb"],
    note: "Sync reservations from major booking platforms automatically into EvoInn.",
  },
];

/* ── component ── */
const PricingPage = () => {
  const navigate = useNavigate();
  const bg = "#EEF2FB";
  const textPrimary = "#0F172A";
  const textSecondary = "#475569";
  const textMuted = "#94A3B8";
  const cardBg = "rgba(0,0,0,.03)";
  const cardBorder = "rgba(0,0,0,.08)";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: textPrimary, fontFamily: "var(--font-body)" }}>

      {/* ── Top bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        height: BAR_H,
        background: "rgba(238,242,251,.97)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${cardBorder}`,
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
        display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            color: textSecondary, background: cardBg,
            border: `1px solid ${cardBorder}`, borderRadius: 9999,
            padding: "6px 14px", fontSize: ".8rem", fontWeight: 600,
            cursor: "pointer", transition: "all .25s",
            fontFamily: "var(--font-jakarta)", flexShrink: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#FF6B2B"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,43,.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = textSecondary; (e.currentTarget as HTMLButtonElement).style.borderColor = cardBorder; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".78rem", color: textMuted, whiteSpace: "nowrap" }}>
          <span>EvoSolutions</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span style={{ color: "#FF6B2B", fontWeight: 600 }}>Pricing</span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: ".9rem", color: textPrimary }}>
          <img src="/icon.png" alt="EvoSolutions" style={{ width: 26, height: 26, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(255,107,43,.4))" }} />
          <span>Evo<span style={{ color: "#FF6B2B" }}>Solutions</span></span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ paddingTop: BAR_H + 80, paddingBottom: 100, maxWidth: 1120, margin: "0 auto", padding: `${BAR_H + 80}px 24px 100px` }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px", borderRadius: 9999,
            background: "rgba(255,107,43,.10)", border: "1px solid rgba(255,107,43,.2)",
            color: "#FF6B2B", fontSize: ".72rem", fontWeight: 700,
            letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 24,
            fontFamily: "var(--font-jakarta)",
          }}>
            Simple & Transparent
          </div>
          <h1 style={{
            fontFamily: "var(--font-jakarta)", fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-.03em",
            lineHeight: 1.05, marginBottom: 20, color: textPrimary,
          }}>
            Plans Built for<br />
            <span style={{ color: "#FF6B2B" }}>Real Operations</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: textSecondary, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            No hidden fees. No lock-in contracts. Choose the plan that fits your business and scale when you're ready.
          </p>
        </div>

        {/* ── EvoDine section ── */}
        <SectionLabel color="#FF6B2B" icon="🍽️" label="EvoDine" sub="Smart Restaurant Management" />
        <PlanGrid plans={evoDinePlans} textPrimary={textPrimary} textSecondary={textSecondary} cardBg={cardBg} cardBorder={cardBorder} />

        {/* ── EvoInn section ── */}
        <SectionLabel color="#3B82F6" icon="🏨" label="EvoInn" sub="Smart Hospitality Management" style={{ marginTop: 80 }} />
        <PlanGrid plans={evoInnPlans} textPrimary={textPrimary} textSecondary={textSecondary} cardBg={cardBg} cardBorder={cardBorder} />

        {/* ── Add-ons ── */}
        <div style={{ marginTop: 80 }}>
          <SectionLabel color="#94A3B8" icon="🔌" label="Add-Ons" sub="Optional integrations to extend your platform" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {addons.map((a) => (
              <div key={a.product} style={{
                background: a.soft, border: `1px solid ${a.border}`,
                borderRadius: 20, padding: "28px 28px",
              }}>
                <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: a.color, marginBottom: 14, fontFamily: "var(--font-jakarta)" }}>
                  {a.product} Add-On
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                  {a.integrations.map((int) => (
                    <span key={int} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "rgba(0,0,0,.05)",
                      border: `1px solid ${a.border}`, borderRadius: 9999,
                      padding: "5px 14px", fontSize: ".8rem", fontWeight: 600,
                      color: a.color, fontFamily: "var(--font-jakarta)",
                    }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {int}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: ".85rem", color: "#475569", lineHeight: 1.65 }}>{a.note}</p>
                <div style={{ marginTop: 18, fontSize: ".78rem", color: "#94A3B8", fontStyle: "italic" }}>
                  Pricing on request — contact us for a quote.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EvoStock standalone ── */}
        <div style={{ marginTop: 80 }}>
          <SectionLabel color="#22C55E" icon="📦" label="EvoStock" sub="Standalone Inventory & Stock Management System" />

          {/* Two-tier cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>

            {/* Essential */}
            <div style={{
              background: cardBg, border: `1px solid ${cardBorder}`,
              borderRadius: 24, padding: "36px 32px",
              position: "relative", display: "flex", flexDirection: "column",
            }}>
              <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.2rem", color: textPrimary, marginBottom: 6 }}>
                EvoStock Essential
              </div>
              <div style={{
                display: "inline-block", marginBottom: 20,
                background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.2)",
                color: "#22C55E", borderRadius: 8, padding: "3px 10px",
                fontSize: ".7rem", fontWeight: 700, fontFamily: "var(--font-jakarta)",
              }}>
                Single Location
              </div>
              <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#22C55E", marginBottom: 8, fontFamily: "var(--font-jakarta)" }}>
                One-Time Investment
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#22C55E" }}>
                  LKR 40,000
                </span>
                <span style={{ fontSize: ".88rem", color: textSecondary }}>and upwards</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {["Real-Time Asset Tracking", "Predictive Stock Intelligence", "Automated Fulfillment", "Stock Adjustment & GRN", "Basic Reporting & Analytics", "Barcode POS Billing"].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: ".88rem", color: textSecondary }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.location.href = "/#contact"}
                style={{
                  marginTop: 32, width: "100%", padding: "13px 0",
                  borderRadius: 12, fontSize: ".88rem", fontWeight: 700,
                  background: "transparent", color: "#22C55E",
                  border: "1.5px solid #22C55E",
                  cursor: "pointer", fontFamily: "var(--font-jakarta)", transition: "all .25s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,197,94,.12)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
              >
                Get a Quote →
              </button>
            </div>

            {/* Enterprise */}
            <div style={{
              background: "rgba(0,0,0,.04)", border: "1.5px solid #22C55E",
              borderRadius: 24, padding: "36px 32px",
              position: "relative", display: "flex", flexDirection: "column",
              boxShadow: "0 0 40px rgba(34,197,94,.12)",
            }}>
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: "#22C55E", color: "#fff", borderRadius: 9999,
                padding: "4px 18px", fontSize: ".72rem", fontWeight: 700,
                letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "var(--font-jakarta)",
                whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(34,197,94,.25)",
              }}>
                Most Popular
              </div>
              <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.2rem", color: textPrimary, marginBottom: 6 }}>
                EvoStock Enterprise
              </div>
              <div style={{
                display: "inline-block", marginBottom: 20,
                background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.3)",
                color: "#22C55E", borderRadius: 8, padding: "3px 10px",
                fontSize: ".7rem", fontWeight: 700, fontFamily: "var(--font-jakarta)",
              }}>
                Multi-Location + API
              </div>
              <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#22C55E", marginBottom: 8, fontFamily: "var(--font-jakarta)" }}>
                Custom Pricing
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#22C55E" }}>
                  Contact Us
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {["Everything in Essential", "Multi-Warehouse Sync", "Immutable Audit Trails", "API-First Integration", "Advanced Reporting Suite", "Priority Support & Onboarding"].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: ".88rem", color: textSecondary }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.location.href = "/#contact"}
                style={{
                  marginTop: 32, width: "100%", padding: "13px 0",
                  borderRadius: 12, fontSize: ".88rem", fontWeight: 700,
                  background: "#22C55E", color: "#fff",
                  border: "1.5px solid #22C55E",
                  cursor: "pointer", fontFamily: "var(--font-jakarta)", transition: "all .25s",
                  boxShadow: "0 0 24px rgba(34,197,94,.25)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(34,197,94,.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(34,197,94,.25)"; }}
              >
                Contact for Pricing →
              </button>
            </div>
          </div>

          {/* Industry tags */}
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: ".72rem", fontWeight: 700, color: textSecondary, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "var(--font-jakarta)", marginRight: 4 }}>
              Perfect for:
            </span>
            {["Retail Shops", "Pharmacies", "Supermarkets", "Hardware Stores", "Wholesalers"].map((ind) => (
              <span key={ind} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)",
                color: "#22C55E", borderRadius: 9999,
                padding: "5px 14px", fontSize: ".78rem", fontWeight: 600,
                fontFamily: "var(--font-jakarta)",
              }}>
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          marginTop: 80, textAlign: "center",
          padding: "60px 40px",
          background: "rgba(0,0,0,.02)",
          border: `1px solid ${cardBorder}`, borderRadius: 28,
        }}>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", letterSpacing: "-.02em", marginBottom: 14, color: textPrimary }}>
            Not sure which plan fits?
          </h2>
          <p style={{ color: textSecondary, fontSize: "1rem", marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>
            Talk to us — we'll walk you through the right solution for your business size and goals.
          </p>
          <button
            onClick={() => navigate("/#contact")}
            style={{
              padding: "14px 36px", borderRadius: 12, fontSize: ".9rem", fontWeight: 700,
              background: "#FF6B2B", color: "#fff", border: "none",
              cursor: "pointer", fontFamily: "var(--font-jakarta)",
              boxShadow: "0 0 30px rgba(255,107,43,.35)",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 45px rgba(255,107,43,.55)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(255,107,43,.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
          >
            Contact Us →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── sub-components ── */

interface SectionLabelProps {
  color: string;
  icon: string;
  label: string;
  sub: string;
  style?: React.CSSProperties;
}
const SectionLabel = ({ color, icon, label, sub, style: extraStyle }: SectionLabelProps) => (
  <div style={{ marginBottom: 32, ...extraStyle }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: "1.4rem" }}>{icon}</span>
      <div>
        <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "1.6rem", color, margin: 0, letterSpacing: "-.02em" }}>
          {label}
        </h2>
        <p style={{ margin: 0, fontSize: ".8rem", color: "#94A3B8", fontWeight: 500 }}>{sub}</p>
      </div>
    </div>
  </div>
);

interface Plan {
  name: string;
  badge?: string;
  orig: number;
  price: number;
  period: string;
  color: string;
  soft: string;
  features: string[];
  popular: boolean;
}

interface PlanGridProps {
  plans: Plan[];
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  cardBorder: string;
}

const PlanGrid = ({ plans, textPrimary, textSecondary, cardBg, cardBorder }: PlanGridProps) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
    {plans.map((plan) => {
      const save = savePct(plan.orig, plan.price);
      return (
        <div key={plan.name} style={{
          background: plan.popular ? "rgba(0,0,0,.04)" : cardBg,
          border: plan.popular
            ? `1.5px solid ${plan.color}`
            : `1px solid ${cardBorder}`,
          borderRadius: 24, padding: "36px 32px",
          position: "relative", display: "flex", flexDirection: "column",
          boxShadow: plan.popular ? `0 0 40px ${plan.soft}` : "none",
          transition: "all .3s",
        }}>

          {/* Popular badge */}
          {plan.popular && (
            <div style={{
              position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              background: plan.color, color: "#fff", borderRadius: 9999,
              padding: "4px 18px", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "var(--font-jakarta)",
              whiteSpace: "nowrap", boxShadow: `0 4px 16px ${plan.soft}`,
            }}>
              Most Popular
            </div>
          )}

          {/* Plan name + badge */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.2rem", color: textPrimary }}>
              {plan.name}
            </div>
            {plan.badge && (
              <div style={{
                display: "inline-block", marginTop: 6,
                background: plan.soft, border: `1px solid ${plan.color}40`,
                color: plan.color, borderRadius: 8, padding: "3px 10px",
                fontSize: ".7rem", fontWeight: 700, fontFamily: "var(--font-jakarta)",
                letterSpacing: ".04em",
              }}>
                {plan.badge}
              </div>
            )}
          </div>

          {/* Save badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 12px" }}>
            <div style={{
              background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.25)",
              color: "#22C55E", borderRadius: 9999,
              padding: "3px 12px", fontSize: ".72rem", fontWeight: 700,
              fontFamily: "var(--font-jakarta)",
            }}>
              SAVE {save}%
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: ".88rem", color: "#EF4444", textDecoration: "line-through", fontWeight: 500, marginBottom: 4 }}>
              {fmt(plan.orig)}{plan.period}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: plan.color }}>
                {fmt(plan.price)}
              </span>
              <span style={{ fontSize: ".88rem", color: textSecondary }}>{plan.period}</span>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            {plan.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: ".88rem", color: textSecondary }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: `${plan.color}20`, border: `1px solid ${plan.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {f}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => window.location.href = "/#contact"}
            style={{
              marginTop: 32, width: "100%", padding: "13px 0",
              borderRadius: 12, fontSize: ".88rem", fontWeight: 700,
              background: plan.popular ? plan.color : "transparent",
              color: plan.popular ? "#fff" : plan.color,
              border: `1.5px solid ${plan.color}`,
              cursor: "pointer", fontFamily: "var(--font-jakarta)",
              transition: "all .25s",
              boxShadow: plan.popular ? `0 0 24px ${plan.soft}` : "none",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "translateY(-2px)";
              btn.style.boxShadow = `0 0 32px ${plan.soft}`;
              if (!plan.popular) btn.style.background = `${plan.color}18`;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "none";
              btn.style.boxShadow = plan.popular ? `0 0 24px ${plan.soft}` : "none";
              if (!plan.popular) btn.style.background = "transparent";
            }}
          >
            Get Started →
          </button>
        </div>
      );
    })}
  </div>
);

export default PricingPage;
