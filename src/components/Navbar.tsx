import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home",     href: "home" },
  { label: "About",    href: "about" },
  { label: "Products", href: "products" },
  { label: "Why Us",   href: "why-us" },
  { label: "Pricing",  href: "pricing" },
  { label: "Contact",  href: "contact" },
];

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location  = useLocation();
  const navigate  = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

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

  const handleNavClick = (sectionId: string, route?: string) => {
    setMobileOpen(false);
    if (route) {
      navigate(route);
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navBg = scrolled
    ? (isDark ? "rgba(4,12,24,.95)" : "rgba(255,255,255,.97)")
    : "transparent";

  const navBorder = scrolled
    ? `1px solid ${isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"}`
    : "none";

  const navShadow = scrolled
    ? (isDark ? "0 4px 32px rgba(0,0,0,.4)" : "0 4px 24px rgba(0,0,0,.08)")
    : "none";

  const textColor       = isDark ? "#F0F4FF" : "#0F172A";
  const subTextColor    = isDark ? "rgba(148,163,184,.5)" : "rgba(71,85,105,.5)";
  const toggleBg        = isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)";
  const toggleBorder    = isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)";
  const toggleColor     = isDark ? "#F0F4FF" : "#475569";
  const hamburgerColor  = isDark ? "#F0F4FF" : "#1E293B";
  const drawerDivider   = isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";

  return (
    <header
      id="navbar"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "18px 0",
        background: navBg,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: navBorder,
        boxShadow: navShadow,
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
            <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.25rem", color: textColor, letterSpacing: "-.01em", lineHeight: 1.1 }}>
              Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
            </div>
            <div style={{ fontSize: ".6rem", color: subTextColor, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
              TagTeam Engineering
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href, link.route)}
                className={`nav-link-btn${location.pathname === (link.route ?? "") || activeSection === link.href ? " nav-link-active" : ""}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Theme Toggle */}
        <div className="nav-cta-desktop" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 36, height: 36, borderRadius: "50%",
              background: toggleBg,
              border: `1px solid ${toggleBorder}`,
              color: toggleColor,
              cursor: "pointer", transition: "all .25s", flexShrink: 0,
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

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
            display: "block", width: 22, height: 2, background: hamburgerColor, borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 22, height: 2, background: hamburgerColor, borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "scaleX(0)" : "none",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: 22, height: 2, background: hamburgerColor, borderRadius: 2, transition: "all .3s",
            transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer${mobileOpen ? " nav-mobile-open" : ""}`}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href, link.route)}
            className={`nav-mobile-link${location.pathname === (link.route ?? "") || activeSection === link.href ? " nav-mobile-active" : ""}`}
          >
            {link.label}
          </button>
        ))}
        <div style={{ height: 1, background: drawerDivider, margin: "8px 0" }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: toggleBg,
              border: `1px solid ${toggleBorder}`,
              color: toggleColor,
              cursor: "pointer", transition: "all .25s",
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
