import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "2026", label: "Founded" },
  { value: "3", label: "Languages" },
  { value: "RWF", label: "Local Currency" },
  { value: "SMEs", label: "Target Market" },
];

const values = [
  { icon: "🌍", title: "Built for Africa", desc: "Designed from the ground up for African businesses - local currency, local languages, local needs." },
  { icon: "⚡", title: "Simple & Fast", desc: "No training needed. Trackly works the way your business works - intuitive, fast, and reliable." },
  { icon: "🔒", title: "Secure & Compliant", desc: "Ivanexo LTD is registered with the Rwanda Data Protection Office, and Trackly is built with data privacy in mind." },
  { icon: "🚀", title: "Built to Scale", desc: "From a single shop to a growing enterprise - Ivanexo grows with you." },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => { observer.disconnect(); window.removeEventListener("resize", check); };
  }, []);

  return (
    <section id="about" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: isMobile ? "60px 1.25rem" : "100px 2.5rem",
      position: "relative", overflow: "hidden",
    }}>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "1rem" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Who We Are
          </span>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.1s", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: isMobile ? "2rem" : "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.4, letterSpacing: "0.01em" }}>
            Powering Growth Across<br />
            <span style={{ color: "#00B4A6" }}>African Business.</span>
          </h2>
        </div>

        {/* Two column */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          alignItems: "center", marginBottom: "4rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.2s",
        }}>
          <div>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.05rem", color: "rgba(11,31,58,0.7)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Ivanexo Ltd is a Rwandan software company on a mission to empower small and medium businesses across Africa with technology that actually works for them.
            </p>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.05rem", color: "rgba(11,31,58,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Our flagship product, Trackly, is a mobile business management app that helps SMEs track inventory, manage sales, monitor cashflow, and grow - available in English, Kinyarwanda, and French.
            </p>
            <a href="#trackly" style={{
              display: "inline-block", backgroundColor: "#00B4A6", color: "#ffffff",
              padding: "0.75rem 2rem", borderRadius: "6px",
              fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(0)"; }}>
              See Trackly
            </a>
          </div>

          {/* Stats — stunning on mobile */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: "linear-gradient(135deg, #0B1F3A 0%, #132947 100%)",
                borderRadius: "16px", padding: isMobile ? "1.5rem 1rem" : "1.75rem 1.5rem",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(11,31,58,0.15)",
                border: "1px solid rgba(0,180,166,0.15)",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,180,166,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(0,180,166,0.15)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,31,58,0.15)"; }}>
                <div style={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontSize: isMobile ? "2rem" : "2.4rem",
                  fontWeight: 700, color: "#00B4A6",
                  letterSpacing: "-0.02em", marginBottom: "0.4rem",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: '"Satoshi", sans-serif',
                  fontSize: "0.75rem", color: "rgba(255,255,255,0.6)",
                  fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>
          <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.5rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "2rem" }}>Our Values</h3>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1.25rem" }}>
            {values.map(v => (
              <div key={v.title} style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(11,31,58,0.1)",
                borderRadius: "12px", padding: isMobile ? "1.25rem" : "1.5rem",
                transition: "all 0.3s",
                boxShadow: "0 2px 12px rgba(11,31,58,0.06)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,180,166,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,31,58,0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(11,31,58,0.06)"; }}>
                <div style={{ fontSize: isMobile ? "1.5rem" : "2rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                <h4 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.95rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.5rem" }}>{v.title}</h4>
                <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.82rem", color: "rgba(11,31,58,0.6)", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
