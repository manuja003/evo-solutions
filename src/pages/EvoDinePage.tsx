import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const BAR_H = 52;

const EvoDinePage = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const barBg       = isDark ? "rgba(4,12,24,.97)"       : "rgba(255,255,255,.97)";
  const barBorder   = isDark ? "rgba(255,255,255,.08)"   : "rgba(0,0,0,.08)";
  const barShadow   = isDark ? "0 4px 24px rgba(0,0,0,.35)" : "0 4px 24px rgba(0,0,0,.08)";
  const btnColor    = isDark ? "rgba(240,244,255,.85)"   : "rgba(71,85,105,.85)";
  const btnBg       = isDark ? "rgba(255,255,255,.07)"   : "rgba(0,0,0,.04)";
  const btnBorder   = isDark ? "rgba(255,255,255,.10)"   : "rgba(0,0,0,.08)";
  const crumbColor  = isDark ? "rgba(240,244,255,.4)"    : "rgba(71,85,105,.5)";
  const logoColor   = isDark ? "#F0F4FF"                 : "#0F172A";
  const pageBg      = isDark ? "#040C18"                 : "#FFFFFF";

  return (
    <div style={{ position: "fixed", inset: 0, background: pageBg, zIndex: 0 }}>

      {/* ── Overlay navigation bar ── */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        height: BAR_H,
        background: barBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${barBorder}`,
        boxShadow: barShadow,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        overflow: "hidden",
        transition: "background .3s, border-color .3s",
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: btnColor,
            background: btnBg,
            border: `1px solid ${btnBorder}`,
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
            (e.currentTarget as HTMLButtonElement).style.color = btnColor;
            (e.currentTarget as HTMLButtonElement).style.borderColor = btnBorder;
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        {/* Breadcrumb */}
        <div className="evodine-breadcrumb" style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: ".78rem", color: crumbColor,
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
          fontWeight: 700, fontSize: ".9rem", color: logoColor,
          transition: "color .3s",
        }}>
          <img
            src="/icon.png"
            alt="EvoSolutions"
            style={{ width: 26, height: 26, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(255,107,43,.4))" }}
          />
          <span className="evodine-logo-text">Evo<span style={{ color: "#FF6B2B" }}>Solutions</span></span>
        </div>
      </div>

      {/* EvoDine iframe — passes current theme so it can style accordingly */}
      <iframe
        src={`/EvoDine/index.html?theme=${resolvedTheme ?? "light"}`}
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
          background: pageBg,
        }}
        allow="autoplay"
      />
    </div>
  );
};

export default EvoDinePage;
