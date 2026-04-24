import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const navLinks = [
  { label: "Home",     href: "home" },
  { label: "About",    href: "about" },
  { label: "Products", href: "products" },
  { label: "Why Us",   href: "why-us" },
  { label: "Contact",  href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  /* Scroll → glassmorphism */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "home";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("#navbar")) setMobileOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [mobileOpen]);

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
            style={{ width: 40, height: 40, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(255,107,43,.35))" }}
          />
          <div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.25rem", color: "#fff", letterSpacing: "-.01em", lineHeight: 1.1 }}>
              Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
            </div>
            <div style={{ fontSize: ".6rem", color: "rgba(148,163,184,.5)", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
              TagTeam Engineering
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links — controlled purely via CSS class */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`nav-link-btn${activeSection === link.href ? " nav-link-active" : ""}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — controlled purely via CSS class */}
        <div className="nav-cta-desktop">
          <button onClick={() => handleNavClick("contact")} className="btn-outline-nav-main">
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

        {/* Hamburger — shown only on mobile/tablet via CSS */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="nav-hamburger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span style={{
            display: "block", width: 22, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 22, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "scaleX(0)" : "none",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: 22, height: 2, background: "#F0F4FF", borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer${mobileOpen ? " nav-mobile-open" : ""}`}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className={`nav-mobile-link${activeSection === link.href ? " nav-mobile-active" : ""}`}
          >
            {link.label}
          </button>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "8px 0" }} />
        <button
          onClick={() => handleNavClick("contact")}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Navbar;
