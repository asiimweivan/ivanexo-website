import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1800);
    const timer2 = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      backgroundColor: "#0B1F3A",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.5s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <img src="/logo.png" alt="Ivanexo" style={{ height: 60, filter: "brightness(0) invert(1)", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 3, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "100px", overflow: "hidden" }}>
        <div style={{
          height: "100%", backgroundColor: "#00B4A6", borderRadius: "100px",
          animation: "loadBar 1.8s ease forwards",
        }} />
      </div>

      <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "1rem", letterSpacing: "0.1em" }}>
        POWERING BUSINESS WITH TECHNOLOGY
      </p>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes loadBar { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
