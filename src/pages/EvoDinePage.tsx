import { useNavigate } from "react-router-dom";

const EvoDinePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "fixed", inset: 0, background: "#040C18", zIndex: 0 }}>
      {/* Back Navigation Bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        background: "rgba(4,12,24,.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,.4)",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(148,163,184,.85)",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 9999,
            padding: "6px 14px",
            fontSize: ".82rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .25s",
            fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#FF6B2B";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,43,.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(148,163,184,.85)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.08)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to EvoSolutions
        </button>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "rgba(148,163,184,.5)" }}>
          <span>EvoSolutions</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span style={{ color: "#FF6B2B", fontWeight: 600 }}>EvoDine</span>
        </div>

        {/* Logo */}
        <div style={{
          marginLeft: "auto",
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
          fontWeight: 700, fontSize: ".95rem", color: "#fff",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#FF6B2B,#E55A1F)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: ".7rem", color: "#fff",
          }}>E</div>
          Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
        </div>
      </div>

      {/* EvoDine HTML iframe */}
      <iframe
        src="/EvoDine/index.html"
        title="EvoDine — Smart Restaurant Management"
        style={{
          position: "absolute",
          top: 49,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "calc(100% - 49px)",
          border: "none",
          background: "#040C18",
        }}
        allow="autoplay"
      />
    </div>
  );
};

export default EvoDinePage;
