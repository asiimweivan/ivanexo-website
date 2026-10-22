import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      backgroundColor: "#0B1F3A",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      paddingTop: "80px",
    }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,180,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,166,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{
        flex: 1, display: "flex",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: isMobile ? "2rem 1.25rem" : "4rem 2.5rem",
        gap: isMobile ? "2rem" : "4rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
        position: "relative", zIndex: 1,
      }}>

        {/* LEFT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            backgroundColor: "rgba(0,180,166,0.1)",
            border: "1px solid rgba(0,180,166,0.3)",
            borderRadius: "100px", padding: "0.4rem 1rem", marginBottom: "1.5rem",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6" }} />
            <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              PROUDLY RWANDAN SOFTWARE
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: isMobile ? "2.4rem" : "clamp(2.8rem, 5.5vw, 5rem)",
            fontWeight: 700, lineHeight: 1.08,
            letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.25rem",
          }}>
            Run Your Business<br />
            Smarter.<br />
            <span style={{
              background: "linear-gradient(135deg, #00B4A6 0%, #00D4C4 60%, #F0A500 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              From Your Phone.
            </span>
          </h1>

          <p style={{
            fontFamily: '"Satoshi", sans-serif', fontSize: isMobile ? "1rem" : "1.15rem",
            color: "rgba(255,255,255,0.65)", lineHeight: 1.75,
            maxWidth: 480, marginBottom: "2rem",
          }}>
            Trackly by Ivanexo helps African small businesses manage inventory, track sales, and grow - in English, Kinyarwanda, and French.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a href="#trackly" style={{
              backgroundColor: "#00B4A6", color: "#ffffff",
              padding: "0.85rem 1.75rem", borderRadius: "8px",
              fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none", transition: "all 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Download Trackly Free
            </a>
            <a href="#about" style={{
              backgroundColor: "transparent", color: "#ffffff",
              padding: "0.85rem 1.75rem", borderRadius: "8px",
              fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.95rem",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.color = "#00B4A6"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
              Learn More
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "1.5rem" : "2rem", flexWrap: "wrap" }}>
            {[
              { value: "RWF 1K", label: "Starting Price" },
              { value: "3", label: "Languages" },
              { value: "MTN", label: "MoMo Ready" },
              { value: "DPO", label: "Compliant" },
            ].map(b => (
              <div key={b.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.3rem", fontWeight: 700, color: "#00B4A6" }}>{b.value}</div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Hero Image */}
        {!isMobile && (
          <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(0,180,166,0.2) 0%, transparent 70%)", borderRadius: "24px" }} />
            <div style={{
              width: "100%", maxWidth: 520, borderRadius: "24px", overflow: "hidden",
              border: "1px solid rgba(0,180,166,0.2)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              position: "relative", zIndex: 1, aspectRatio: "4/3",
              backgroundImage: "url(/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center",
              backgroundColor: "rgba(0,180,166,0.05)",
            }} />
            <div style={{ position: "absolute", bottom: "8%", left: "-8%", backgroundColor: "#ffffff", borderRadius: "12px", padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 2 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#00B4A6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.75rem" }}>RWF</div>
              <div>
                <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.85rem", fontWeight: 700, color: "#0B1F3A" }}>Sales Today</div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", fontWeight: 700, color: "#00B4A6" }}>RWF 48,500</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: "8%", right: "-5%", backgroundColor: "#0B1F3A", borderRadius: "12px", padding: "0.75rem 1rem", border: "1px solid rgba(0,180,166,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 2 }}>
              <div style={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "rgba(240,165,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F0A500", fontWeight: 700, fontSize: "0.72rem" }}>LOW</div>
              <div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Stock Alert</div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", fontWeight: 600, color: "#F0A500" }}>3 items low</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
