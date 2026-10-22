import { useEffect, useRef, useState } from "react";

const testimonials = [
  { name: "Uwimana Grace", role: "Boutique Owner, Nyamirambo", text: "Trackly changed how I run my shop. I know exactly what I have in stock and how much I made today. It is like having an assistant in my pocket.", initials: "UG" },
  { name: "Habimana Eric", role: "Electronics Shop, Kimironko", text: "Before Trackly I was writing everything in a notebook. Now I open the app and everything is there. My customers even notice I am more organized.", initials: "HE" },
  { name: "Mukamana Alice", role: "Salon Owner, Remera", text: "The Kinyarwanda version makes it so easy. I did not need anyone to teach me. I just downloaded it and started using it the same day.", initials: "MA" },
  { name: "Nzeyimana Jean", role: "Grocery Store, Gikondo", text: "I can see my cashflow now. I know which days are busy and which products sell most. This is the tool every small business in Rwanda needs.", initials: "NJ" },
];

export default function Testimonials() {
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
    <section id="testimonials" ref={ref} style={{
      backgroundColor: "#0B1F3A",
      padding: isMobile ? "60px 1.25rem" : "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            What People Say
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: isMobile ? "2rem" : "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Loved by <span style={{ color: "#00B4A6" }}>Business Owners</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto" }}>
            Real stories from real Rwandan entrepreneurs using Trackly every day.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "1.25rem" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px", padding: isMobile ? "1.5rem" : "2rem",
              transition: "all 0.3s",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.1}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.05)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}>

              <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: "#F0A500", fontSize: "1rem" }}>★</span>
                ))}
              </div>

              <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: isMobile ? "0.95rem" : "1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#00B4A6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: "0.85rem", color: "#0B1F3A", flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>{t.name}</div>
                  <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
