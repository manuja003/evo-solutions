const benefits = [
  {
    color: "orange",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Reliable Engineering",
    body: "Every product is built with production-grade architecture — stable, tested, and ready for real-world operation from day one.",
  },
  {
    color: "blue",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    title: "Premium UI/UX",
    body: "Clean, modern interfaces that delight users and reduce training time. Our products look and feel world-class because they are.",
  },
  {
    color: "orange",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Scalable Architecture",
    body: "From a single outlet to a multi-location operation — our systems are designed to scale effortlessly as your business grows.",
  },
  {
    color: "blue",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: "Modern Technology Stack",
    body: "Built on Angular, .NET, SignalR, and cloud-ready infrastructure — always using the right technology for the job.",
  },
  {
    color: "orange",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Ongoing Support",
    body: "We don't disappear after delivery. Our team provides continuous support, updates, and enhancements for every product we build.",
  },
  {
    color: "blue",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
    title: "Business-First Mindset",
    body: "We start by understanding your operations and goals. Every feature we build has a clear business purpose and measurable impact.",
  },
  {
    color: "orange",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Secure by Design",
    body: "Role-based access control, structured audit trails, and encrypted data handling built into every system from the ground up.",
  },
  {
    color: "blue",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Web-Based & Accessible",
    body: "All our platforms run directly in the browser — no installation, no IT overhead. Access them from any device on your network.",
  },
];

const WhyChoose = () => {
  return (
    <section
      id="why-us"
      style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 80% 50%, rgba(37,99,235,.05) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="section-header" data-reveal>
          <div className="section-eyebrow">Why EvoSolutions</div>
          <h2 className="section-title">
            Built for Businesses That<br />
            <span className="gradient-text">Demand the Best</span>
          </h2>
          <p className="section-desc">
            From small cafés to multi-location enterprises — we build software that works, scales,
            and delivers lasting value for your business.
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}
          className="benefits-grid">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="benefit-item"
              data-reveal
              data-delay={["0", "80", "160", "240"][i % 4]}
            >
              <div className={`bi-icon ${b.color}`}>{b.icon}</div>
              <h4 style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 700,
                fontSize: ".95rem",
                color: "var(--ed-text-white)",
                marginBottom: 6,
              }}>
                {b.title}
              </h4>
              <p style={{ fontSize: ".85rem", color: "var(--ed-text-secondary)", lineHeight: 1.65 }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom highlight bar */}
        <div
          data-reveal
          data-delay="200"
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
            padding: "32px 40px",
            background: "rgba(255,107,43,.06)",
            border: "1px solid rgba(255,107,43,.15)",
            borderRadius: 20,
          }}
        >
          {[
            { val: "3+", label: "Products Launched" },
            { val: "100%", label: "Web-Based" },
            { val: "<1s", label: "Real-Time Sync" },
            { val: "24/7", label: "Ongoing Support" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "2rem",
                fontWeight: 900,
                color: "var(--ed-orange)",
                lineHeight: 1,
                marginBottom: 4,
              }}>{s.val}</div>
              <div style={{ fontSize: ".72rem", color: "var(--ed-text-muted)", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1000px) {
          .benefits-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
