import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; r: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.1,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,43,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 0 80px",
        position: "relative",
        overflow: "hidden",
        background: "var(--ed-bg-deep)",
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />

      {/* Orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="hero-grid">

          {/* Left: Content */}
          <div data-reveal>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: ".8rem", fontWeight: 600,
              color: "var(--ed-text-secondary)",
              background: "rgba(255,255,255,.05)",
              border: "1px solid var(--ed-border)",
              borderRadius: 9999, padding: "7px 16px",
              marginBottom: 28, backdropFilter: "blur(8px)",
              fontFamily: "var(--font-jakarta)",
            }}>
              <span className="badge-dot" />
              Powered by TagTeam Engineering
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: "var(--ed-text-white)",
              marginBottom: 20,
              letterSpacing: "-.025em",
            }}>
              Smart Digital<br />
              <span className="gradient-text">Solutions</span> That<br />
              Drive Growth.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "1.1rem",
              color: "var(--ed-text-secondary)",
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 500,
              fontFamily: "var(--font-body)",
            }}>
              EvoSolutions builds premium business software — from restaurant
              management to property systems — purpose-engineered for the modern
              digital enterprise.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <button onClick={() => scrollTo("products")} className="btn-primary btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 7-7 7 7M12 5v14"/></svg>
                View Products
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-ghost btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Contact Us
              </button>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {[
                { val: "3+", label: "Products" },
                { val: "100%", label: "Web-Based" },
                { val: "24/7", label: "Support" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && <div style={{ width: 1, height: 36, background: "var(--ed-border)", margin: "0 4px" }} />}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px" }}>
                    <strong style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ed-text-white)" }}>{s.val}</strong>
                    <span style={{ fontSize: ".7rem", color: "var(--ed-text-muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 500 }}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Browser Mockup */}
          <div style={{ position: "relative" }} data-reveal data-delay="200" className="hidden lg:block">
            {/* Glow */}
            <div style={{
              position: "absolute", inset: -30,
              background: "radial-gradient(ellipse at center, rgba(37,99,235,.12) 0%, transparent 70%)",
              pointerEvents: "none", borderRadius: 30,
            }} />

            <div className="mockup-browser">
              <div className="browser-topbar">
                <div className="browser-dots">
                  <span className="bd-red" /><span className="bd-yellow" /><span className="bd-green" />
                </div>
                <div className="browser-url">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" style={{ marginRight: 4 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  app.evosolutions.com / dashboard
                </div>
              </div>

              {/* Dashboard Interior */}
              <div style={{ display: "flex", height: 340 }}>
                {/* Sidebar */}
                <div style={{
                  width: 48, background: "rgba(4,12,24,.8)",
                  borderRight: "1px solid var(--ed-border)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", padding: "12px 0", gap: 6,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: "linear-gradient(135deg,#FF6B2B,#E55A1F)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".65rem", fontWeight: 800, color: "#fff", marginBottom: 8,
                    fontFamily: "var(--font-jakarta)",
                  }}>ES</div>
                  {[
                    <path key="g" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
                    <><rect key="r1" x="9" y="9" width="6" height="6"/><path key="p1" d="M9 3H5a2 2 0 0 0-2 2v4m6 0h6m0 0h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4m0 6v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9"/></>,
                    <path key="c" d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>,
                    <path key="u" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>,
                  ].map((icon, i) => (
                    <div key={i} style={{
                      width: 32, height: 32, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: i === 0 ? "#FF6B2B" : "var(--ed-text-muted)",
                      background: i === 0 ? "var(--ed-orange-soft)" : "none",
                      fontSize: ".8rem", cursor: "pointer",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
                    </div>
                  ))}
                </div>

                {/* Main Area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px 12px", gap: 10, overflow: "hidden" }}>
                  {/* Top Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--ed-text-primary)", fontFamily: "var(--font-jakarta)" }}>EvoSolutions Dashboard</span>
                    <span style={{
                      display: "flex", alignItems: "center", gap: 5,
                      fontSize: ".65rem", fontWeight: 600, color: "var(--ed-green)",
                      background: "var(--ed-green-soft)", padding: "3px 8px", borderRadius: 9999,
                    }}>
                      <span className="live-dot" /> Live
                    </span>
                  </div>

                  {/* KPI Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {[
                      { label: "Active Products", val: "3", delta: "↑ 1", up: true, color: "orange" },
                      { label: "Clients Served", val: "12+", delta: "↑ 4", up: true, color: "blue" },
                      { label: "Uptime", val: "99.9%", delta: "Stable", up: true, color: "green" },
                    ].map((k, i) => (
                      <div key={i} style={{
                        background: "rgba(255,255,255,.05)",
                        borderRadius: 10, padding: "8px 10px",
                        border: "1px solid var(--ed-border)",
                        position: "relative", overflow: "hidden",
                      }}>
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: 2,
                          background: k.color === "orange" ? "linear-gradient(90deg,#FF6B2B,#FF8C42)"
                            : k.color === "blue" ? "linear-gradient(90deg,#2563EB,#3B82F6)"
                            : "linear-gradient(90deg,#22C55E,#4ade80)",
                        }} />
                        <div style={{ fontSize: ".78rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-jakarta)" }}>{k.val}</div>
                        <div style={{ fontSize: ".58rem", color: "var(--ed-text-muted)", margin: "2px 0" }}>{k.label}</div>
                        <div style={{ fontSize: ".6rem", fontWeight: 600, color: "var(--ed-green)" }}>{k.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Product Status Rows */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ fontSize: ".65rem", fontWeight: 600, color: "var(--ed-text-muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Products</div>
                    {[
                      { name: "EvoDine", desc: "Restaurant Mgmt", status: "live" },
                      { name: "EvoPos", desc: "POS & Billing", status: "dev" },
                      { name: "EvoReservation", desc: "Booking System", status: "dev" },
                    ].map((p, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 8px",
                        background: "rgba(255,255,255,.04)",
                        borderRadius: 7,
                        border: "1px solid var(--ed-border)",
                      }}>
                        <span style={{ fontSize: ".65rem", fontWeight: 600, color: "var(--ed-text-secondary)", flex: 1, fontFamily: "var(--font-jakarta)" }}>{p.name}</span>
                        <span style={{ fontSize: ".6rem", color: "var(--ed-text-muted)" }}>{p.desc}</span>
                        <span className={`status-chip ${p.status}`}>{p.status === "live" ? "Live" : "In Dev"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notif Cards */}
            <div className="float-notif fn-1">
              <div className="fn-icon green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: ".78rem", fontWeight: 600, color: "var(--ed-text-white)" }}>EvoDine Live</strong>
                <span style={{ fontSize: ".68rem", color: "var(--ed-text-muted)" }}>System operational</span>
              </div>
            </div>
            <div className="float-notif fn-2">
              <div className="fn-icon blue">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: ".78rem", fontWeight: 600, color: "var(--ed-text-white)" }}>New Project</strong>
                <span style={{ fontSize: ".68rem", color: "var(--ed-text-muted)" }}>EvoPos in progress</span>
              </div>
            </div>
            <div className="float-notif fn-3">
              <div className="fn-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: ".78rem", fontWeight: 600, color: "var(--ed-text-white)" }}>Demo Ready</strong>
                <span style={{ fontSize: ".68rem", color: "var(--ed-text-muted)" }}>Book a session today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint">
        <span>Scroll to explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
