import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/* Fixed bar height shared between the bar div and the iframe top offset */
const BAR_H = 52;

const EvoDinePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = !mounted || theme === "dark";

  return (
    <div style={{ position: "fixed", inset: 0, background: isDark ? "#040C18" : "#EEF2FB", zIndex: 0 }}>

      {/* ── Overlay navigation bar ── */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        height: BAR_H,
        background: isDark ? "rgba(4,12,24,.97)" : "rgba(238,242,251,.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)",
        boxShadow: isDark ? "0 4px 24px rgba(0,0,0,.4)" : "0 4px 24px rgba(0,0,0,.08)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        overflow: "hidden",
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: isDark ? "rgba(148,163,184,.85)" : "rgba(71,85,105,.85)",
            background: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
            border: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)",
            borderRadius: 9999,
            padding: "6px 12px",
            fontSize: ".8rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .25s",
            fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
            whiteSpace: "nowrap",
            flexShrink: 0,
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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        {/* Breadcrumb — hidden on very small screens via inline media-query workaround */}
        <div className="evodine-breadcrumb" style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: ".78rem", color: isDark ? "rgba(148,163,184,.5)" : "rgba(71,85,105,.5)",
          whiteSpace: "nowrap", overflow: "hidden",
        }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>EvoSolutions</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span style={{ color: "#FF6B2B", fontWeight: 600 }}>EvoDine</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7, flexShrink: 0,
          fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
          fontWeight: 700, fontSize: ".9rem", color: isDark ? "#fff" : "#0F172A",
        }}>
          <img
            src="/icon.png"
            alt="EvoSolutions"
            style={{ width: 26, height: 26, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(255,107,43,.4))" }}
          />
          <span className="evodine-logo-text">Evo<span style={{ color: "#FF6B2B" }}>Solutions</span></span>
        </div>
      </div>

      {/* EvoDine iframe — starts exactly below the bar */}
      <iframe
        src="/EvoDine/index.html"
        title="EvoDine — Smart Restaurant Management"
        style={{
          position: "absolute",
          top: BAR_H,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: `calc(100% - ${BAR_H}px)`,
          border: "none",
          background: "#040C18",
        }}
        allow="autoplay"
      />
    </div>
  );
};

export default EvoDinePage;
