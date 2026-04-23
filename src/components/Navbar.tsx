import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const navLinks = [
  { label: "Home",    href: "home" },
  { label: "About",   href: "about" },
  { label: "Products",href: "products" },
  { label: "Why Us",  href: "why-us" },
  { label: "Contact", href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="navbar"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "18px 0",
        background: scrolled ? "rgba(4,12,24,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "none",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.4)" : "none",
        transition: "all .5s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 32 }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <img
            src="/icon.png"
            alt="EvoSolutions"
            style={{
              width: 40, height: 40,
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(255,107,43,.35))",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              fontFamily: "var(--font-jakarta)",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "#fff",
              letterSpacing: "-.01em",
              lineHeight: 1.1,
            }}>
              Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
            </span>
            <span style={{ fontSize: ".6rem", color: "rgba(148,163,184,.5)", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
              TagTeam Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, margin: 0, padding: 0, listStyle: "none" }}
          className="hidden lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontSize: ".9rem",
                  fontWeight: 500,
                  color: "rgba(148,163,184,.9)",
                  padding: "7px 14px",
                  borderRadius: 9999,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all .25s",
                  fontFamily: "var(--font-jakarta)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(148,163,184,.9)";
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }} className="hidden lg:flex">
          <button
            onClick={() => handleNavClick("contact")}
            style={{
              fontSize: ".875rem",
              fontWeight: 600,
              color: "rgba(148,163,184,.8)",
              padding: "8px 18px",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 9999,
              background: "none",
              cursor: "pointer",
              transition: "all .25s",
              fontFamily: "var(--font-jakarta)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(148,163,184,.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(148,163,184,.8)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.08)";
            }}
          >
            Contact Us
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="btn-primary-glow"
            style={{ padding: "8px 20px", fontSize: ".875rem" }}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
          style={{
            marginLeft: "auto",
            width: 40, height: 40,
            borderRadius: 10,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 5, cursor: "pointer", padding: 8,
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22, height: 2,
                background: "#F0F4FF",
                borderRadius: 2,
                transition: "all .3s",
                transform: mobileOpen
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 1 ? "scaleX(0)"
                  : "translateY(-7px) rotate(-45deg)"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(4,12,24,.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,.08)",
          padding: "20px 24px 24px",
        }}
          className="lg:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: 10,
                color: "rgba(148,163,184,.9)",
                fontSize: ".95rem",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-jakarta)",
                transition: "all .2s",
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "12px 0" }} />
          <button
            onClick={() => handleNavClick("contact")}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
