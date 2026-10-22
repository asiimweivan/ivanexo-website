import { useEffect, useRef, useState } from "react";

export default function DownloadCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      backgroundColor: "#0B1F3A",
      padding: "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,180,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,166,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{
        maxWidth: 750, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(0,180,166,0.1)", border: "1px solid rgba(0,180,166,0.3)", borderRadius: "100px", padding: "0.4rem 1rem", marginBottom: "2rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6" }} />
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}>FREE TO DOWNLOAD</span>
        </div>

        <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Start Managing Your<br />
          <span style={{ background: "linear-gradient(135deg, #00B4A6 0%, #00D4C4 50%, #F0A500 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Business Today.
          </span>
        </h2>

        <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.15rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 500, margin: "0 auto 3rem" }}>
          Join hundreds of Rwandan businesses already using Trackly to grow smarter every day.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
          <a href="https://play.google.com/store" target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            backgroundColor: "#00B4A6", color: "#ffffff",
            padding: "1rem 2rem", borderRadius: "10px",
            fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "1rem",
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,180,166,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l12.24-11.96L13.05 8.64 3.18 23.76zm17.28-10.8c.32-.28.54-.7.54-1.2s-.22-.92-.54-1.2l-2.7-1.56-3.18 3.18 3.18 3.18 2.7-1.4zM2.1.48C1.86.76 1.68 1.12 1.68 1.56v20.88c0 .44.18.8.42 1.08l.06.06 11.7-11.7v-.24L2.16.42l-.06.06zm10.32 10.68l3.18-3.18-10.2-5.88L2.1.48l10.32 10.68z"/></svg>
            Download on Google Play
          </a>
          <a href="#contact" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            backgroundColor: "transparent", color: "#ffffff",
            padding: "1rem 2rem", borderRadius: "10px",
            fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "1rem",
            textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.color = "#00B4A6"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
            Contact Us
          </a>
        </div>

        <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}>
          Free to start. No credit card. Pay via MTN MoMo.
        </p>
      </div>
    </section>
  );
}
