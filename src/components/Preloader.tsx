import { useState, useEffect } from "react";

const Preloader = () => {
  const [hide, setHide]       = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true),    1800);
    const t2 = setTimeout(() => setRemoved(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader${hide ? " preloader-hide" : ""}`}>
      <div className="preloader-logo-row">
        <img
          src="/icon.png"
          alt="EvoSolutions"
          style={{
            width: 52, height: 52,
            objectFit: "contain",
            filter: "drop-shadow(0 0 16px rgba(255,107,43,.8))",
          }}
        />
        <span style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "2rem",
          fontWeight: 800,
          color: "var(--ed-text-white)",
        }}>
          Evo<span style={{ color: "#FF6B2B" }}>Solutions</span>
        </span>
      </div>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar-fill" />
      </div>
    </div>
  );
};

export default Preloader;
