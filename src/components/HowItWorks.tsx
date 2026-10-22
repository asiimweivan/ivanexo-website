import { useEffect, useRef, useState } from "react";

const steps = [
  { number: "01", title: "Download Trackly", desc: "Get the app free from Google Play Store. Works on any Android phone.", color: "#00B4A6" },
  { number: "02", title: "Set Up Your Shop", desc: "Add your products, set prices, and configure your business in minutes.", color: "#F0A500" },
  { number: "03", title: "Start Selling", desc: "Record sales, track stock, and monitor your cashflow in real time.", color: "#00B4A6" },
  { number: "04", title: "Grow Your Business", desc: "Use reports and insights to make smarter decisions every day.", color: "#F0A500" },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            Simple Process
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Up and Running in <span style={{ color: "#00B4A6" }}>Minutes</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.1rem", color: "rgba(11,31,58,0.6)", maxWidth: 520, margin: "0 auto" }}>
            No training needed. No tech skills required. Just download and start.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", position: "relative" }}>
          {/* Connector line */}
          <div style={{ position: "absolute", top: "40px", left: "12.5%", right: "12.5%", height: "2px", background: "linear-gradient(90deg, #00B4A6, #F0A500, #00B4A6, #F0A500)", opacity: 0.3, zIndex: 0 }} />

          {steps.map((s, i) => (
            <div key={s.number} style={{
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s ease ${i * 0.15}s`,
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                backgroundColor: s.color === "#00B4A6" ? "rgba(0,180,166,0.1)" : "rgba(240,165,0,0.1)",
                border: `2px solid ${s.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = s.color; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = s.color === "#00B4A6" ? "rgba(0,180,166,0.1)" : "rgba(240,165,0,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}>
                <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.3rem", fontWeight: 700, color: s.color }}>{s.number}</span>
              </div>
              <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.1rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.6rem" }}>{s.title}</h3>
              <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(11,31,58,0.6)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
