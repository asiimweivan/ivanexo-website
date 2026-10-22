import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999, display: "flex", flexDirection: "column", gap: "0.75rem" }}>

      {/* WhatsApp */}
      <button
        onClick={() => window.open("https://wa.me/250700000000", "_blank")}
        title="Chat on WhatsApp"
        style={{
          width: 52, height: 52, borderRadius: "50%",
          backgroundColor: "#25D366", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          cursor: "pointer", transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}>
        <FaWhatsapp size={26} color="#ffffff" />
      </button>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          style={{
            width: 52, height: 52, borderRadius: "50%",
            backgroundColor: "#0B1F3A",
            border: "2px solid #00B4A6",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(11,31,58,0.3)",
            cursor: "pointer", transition: "all 0.3s",
            color: "#ffffff", fontSize: "1.3rem",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#0B1F3A"; e.currentTarget.style.transform = "translateY(0)"; }}>
          ↑
        </button>
      )}
    </div>
  );
}
