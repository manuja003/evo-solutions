const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    color: "orange",
    title: "Real-Time Systems",
    body: "All our platforms are engineered with live data sync, giving every user instant operational visibility.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: "blue",
    title: "Enterprise Security",
    body: "Role-based access control and full audit trails across every module keep your data secure.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: "orange",
    title: "100% Web-Based",
    body: "No installation needed. Access all our products from any browser on any device, anywhere.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      style={{ padding: "100px 0", background: "var(--ed-bg-deep)", position: "relative" }}
    >
      {/* Subtle background accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 20% 50%, rgba(37,99,235,.05) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="about-grid-cols">

          {/* Left: Card Stack */}
          <div style={{ position: "relative" }} data-reveal>
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 16,
                  padding: "18px 20px",
                  marginBottom: i < cards.length - 1 ? 14 : 0,
                  marginLeft: i === 1 ? 24 : 0,
                  boxShadow: "0 4px 24px rgba(0,0,0,.2)",
                }}
                className={`about-card-hover`}
              >
                <div
                  className={`about-icon-wrap ${card.color}`}
                  style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: card.color === "orange" ? "var(--ed-orange-soft)" : "var(--ed-blue-soft)",
                    color: card.color === "orange" ? "var(--ed-orange)" : "var(--ed-blue-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: ".9rem", fontWeight: 700, color: "var(--ed-text-white)", fontFamily: "var(--font-jakarta)", marginBottom: 4 }}>
                    {card.title}
                  </strong>
                  <span style={{ fontSize: ".82rem", color: "var(--ed-text-secondary)", lineHeight: 1.5 }}>
                    {card.body}
                  </span>
                </div>
              </div>
            ))}

            {/* Brand badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginTop: 20,
              background: "rgba(255,107,43,.08)",
              border: "1px solid rgba(255,107,43,.2)",
              borderRadius: 12, padding: "10px 16px",
            }}>
              <img
                src="/icon.png"
                alt="EvoSolutions"
                style={{ width: 32, height: 32, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(255,107,43,.4))" }}
              />
              <div>
                <span style={{ display: "block", fontSize: ".65rem", color: "var(--ed-text-muted)", fontWeight: 500 }}>Built by</span>
                <strong style={{ fontSize: ".85rem", color: "var(--ed-orange)", fontWeight: 700, fontFamily: "var(--font-jakarta)" }}>EvoSolutions</strong>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div data-reveal data-delay="150">
            <div className="section-eyebrow">About EvoSolutions</div>
            <h2 className="section-title">
              One Company.<br />
              <span className="gradient-text">Multiple Smart Products.</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--ed-text-secondary)", lineHeight: 1.75, marginBottom: 20 }}>
              EvoSolutions is the technology arm of TagTeam Engineering — a team of passionate engineers
              dedicated to building premium digital products that solve real business problems.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--ed-text-secondary)", lineHeight: 1.75, marginBottom: 28 }}>
              We design, develop, and deliver end-to-end business software that is fast, beautiful, and built
              to last. From restaurant management to property systems, our products power modern businesses
              with the technology they deserve.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {[
                "Business Software",
                "Restaurant Systems",
                "POS Solutions",
                "Reservation Systems",
                "Web Applications",
                "Digital Transformation",
              ].map((tag) => (
                <span key={tag} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: ".8rem", fontWeight: 500,
                  color: "var(--ed-text-secondary)",
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid var(--ed-border)",
                  borderRadius: 9999, padding: "5px 12px",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px",
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 14,
            }}>
              <img
                src="/icon.png"
                alt="EvoSolutions"
                style={{ width: 42, height: 42, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(255,107,43,.3))", flexShrink: 0 }}
              />
              <div>
                <strong style={{ display: "block", fontSize: ".9rem", color: "var(--ed-text-white)", fontWeight: 700, fontFamily: "var(--font-jakarta)" }}>TagTeam Engineering</strong>
                <span style={{ fontSize: ".78rem", color: "var(--ed-text-muted)" }}>Parent Company — Building Future-Ready Technology</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;
