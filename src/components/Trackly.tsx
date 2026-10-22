import { useEffect, useRef, useState } from "react";
import { Package, Banknote, TrendingUp, Users, MessageCircle, Globe } from "lucide-react";

const features = [
  { Icon: Package, title: "Inventory Management", desc: "Track all your products, set low stock alerts, and never run out of your best sellers again." },
  { Icon: Banknote, title: "Sales Tracking", desc: "Record every sale instantly. See daily, weekly and monthly revenue at a glance." },
  { Icon: TrendingUp, title: "Cashflow Monitor", desc: "Know exactly what is coming in and going out. Stay on top of your business finances." },
  { Icon: Users, title: "Customer Records", desc: "Build your customer list, track purchases, and manage credit with ease." },
  { Icon: MessageCircle, title: "WhatsApp Receipts", desc: "Send receipts to your customers on WhatsApp straight from the sale." },
  { Icon: Globe, title: "3 Languages", desc: "Switch between English, Kinyarwanda and French anytime. Built for every Rwandan." },
];

export default function Trackly() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trackly" ref={ref} style={{
      backgroundColor: "#0B1F3A",
      padding: "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            Our Product
          </span>
          <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Meet <span style={{ color: "#00B4A6" }}>Trackly</span>
          </h2>
          <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto" }}>
            A mobile app for small businesses in Rwanda: stock, sales, customers and cash in one place.
          </p>
        </div>

        {/* Features grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px", padding: "2rem",
              transition: "all 0.3s",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.1}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; }}>
              <div style={{ marginBottom: "1.1rem" }}><f.Icon size={30} color="#00B4A6" strokeWidth={1.5} /></div>
              <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,180,166,0.15) 0%, rgba(0,180,166,0.05) 100%)",
          border: "1px solid rgba(0,180,166,0.25)",
          borderRadius: "20px", padding: "3rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "2rem",
          opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.6s",
        }}>
          <div>
            <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.8rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
              Ready to grow your business?
            </h3>
            <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>
              Download Trackly free today. No credit card required.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#pricing" style={{
              backgroundColor: "#00B4A6", color: "#ffffff",
              padding: "0.85rem 2rem", borderRadius: "8px",
              fontFamily: '"Manrope", sans-serif', fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(0)"; }}>
              See Pricing
            </a>
            <a href="#contact" style={{
              backgroundColor: "transparent", color: "#ffffff",
              padding: "0.85rem 2rem", borderRadius: "8px",
              fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "1rem",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.color = "#00B4A6"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
