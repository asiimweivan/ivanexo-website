import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "MTN MoMo", desc: "Payment Partner" },
  { name: "Google Play", desc: "App Distribution" },
  { name: "DPO Rwanda", desc: "Data Compliance" },
  { name: "RDB", desc: "Registered Business" },
  { name: "IremboGov", desc: "Gov Integration" },
  { name: "Android", desc: "Mobile Platform" },
];

export default function Partners() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "60px 2.5rem",
      borderTop: "1px solid rgba(11,31,58,0.06)",
      borderBottom: "1px solid rgba(11,31,58,0.06)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(11,31,58,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5rem", fontWeight: 600 }}>
          Trusted Partners & Integrations
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {partners.map((p, i) => (
            <div key={p.name} style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "1rem 1.5rem",
              border: "1px solid rgba(11,31,58,0.08)",
              borderRadius: "12px",
              minWidth: 130,
              transition: "all 0.3s",
              cursor: "default",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${i * 0.08}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,180,166,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,31,58,0.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.2rem" }}>{p.name}</div>
              <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.75rem", color: "#00B4A6", fontWeight: 500 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
