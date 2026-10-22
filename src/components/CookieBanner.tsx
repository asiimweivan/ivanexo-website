import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ivanexo_cookies");
    if (!accepted) setTimeout(() => setVisible(true), 2500);
  }, []);

  const accept = () => { localStorage.setItem("ivanexo_cookies", "true"); setVisible(false); };
  const decline = () => { localStorage.setItem("ivanexo_cookies", "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: "2rem", left: "2rem",
      zIndex: 998, maxWidth: 420,
      backgroundColor: "#0B1F3A",
      border: "1px solid rgba(0,180,166,0.3)",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
      animation: "slideUp 0.4s ease",
    }}>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.5rem" }}>🍪</span>
        <div>
          <h4 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>We use cookies</h4>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            We use cookies to improve your experience. By using Ivanexo, you agree to our{" "}
            <a href="#privacy" style={{ color: "#00B4A6", textDecoration: "none" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button onClick={accept} style={{
          flex: 1, padding: "0.6rem", borderRadius: "8px",
          backgroundColor: "#00B4A6", color: "#ffffff", border: "none",
          fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.9rem",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; }}>
          Accept All
        </button>
        <button onClick={decline} style={{
          flex: 1, padding: "0.6rem", borderRadius: "8px",
          backgroundColor: "transparent", color: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.9rem",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.color = "#00B4A6"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
          Decline
        </button>
      </div>
    </div>
  );
}
