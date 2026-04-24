import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={{ background: "var(--ed-bg-dark)", borderTop: "1px solid var(--ed-border)" }}>
      {/* Top */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div className="footer-grid-cols">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img
                src="/icon.png"
                alt="EvoSolutions"
                style={{
                  width: 44, height: 44,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 10px rgba(255,107,43,.4))",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.2rem", color: "#fff", lineHeight: 1.1 }}>
                  Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
                </div>
                <div style={{ fontSize: ".6rem", color: "rgba(148,163,184,.4)", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
                  TagTeam Engineering
                </div>
              </div>
            </div>
            <p style={{ fontSize: ".88rem", color: "var(--ed-text-secondary)", lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Building smart digital products and business solutions that power modern enterprises.
              A product family by TagTeam Engineering.
            </p>
            <div className="footer-social" style={{ display: "flex", gap: 10 }}>
              {[
                { label: "LinkedIn", icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>, d: <rect x="2" y="9" width="4" height="12"/> },
              ].map((_, i) => (
                <a key={i} href="#" aria-label="Social" style={{ display: "inline-flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              ))}
              <a href="mailto:infotagteamengineering@gmail.com" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontFamily: "var(--font-jakarta)", fontSize: ".72rem", fontWeight: 700, color: "var(--ed-orange)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 20 }}>
              Products
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
              {[
                { label: "EvoDine", to: "/products/evodine" },
                { label: "EvoPos", to: null, section: "contact" },
                { label: "EvoReservation", to: null, section: "contact" },
              ].map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} style={{ fontSize: ".9rem", color: "var(--ed-text-secondary)", fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B2B")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ed-text-secondary)")}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button onClick={() => item.section && scrollTo(item.section)}
                      style={{ fontSize: ".9rem", color: "var(--ed-text-secondary)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)", transition: "color .2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF6B2B")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--ed-text-secondary)")}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "var(--font-jakarta)", fontSize: ".72rem", fontWeight: 700, color: "var(--ed-orange)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 20 }}>
              Company
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
              {[
                { label: "About Us", section: "about" },
                { label: "Our Products", section: "products" },
                { label: "Why Us", section: "why-us" },
                { label: "Contact", section: "contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => scrollTo(item.section)}
                    style={{ fontSize: ".9rem", color: "var(--ed-text-secondary)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)", transition: "color .2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF6B2B")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--ed-text-secondary)")}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-jakarta)", fontSize: ".72rem", fontWeight: 700, color: "var(--ed-orange)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 20 }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:infotagteamengineering@gmail.com"
                  style={{ fontSize: ".82rem", color: "var(--ed-text-secondary)", textDecoration: "none", wordBreak: "break-word", transition: "color .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B2B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ed-text-secondary)")}
                >
                  infotagteamengineering@gmail.com
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span style={{ fontSize: ".82rem", color: "var(--ed-text-secondary)" }}>
                  TagTeam Engineering
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid var(--ed-border)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "20px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: ".8rem", color: "var(--ed-text-muted)", margin: 0 }}>
            © 2026 <strong style={{ color: "var(--ed-text-secondary)" }}>EvoSolutions</strong> — A TagTeam Engineering Product. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".78rem", color: "var(--ed-text-muted)" }}>
            Built with
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B2B" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            by TagTeam Engineering
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
