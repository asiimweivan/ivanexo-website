import { useEffect, useRef, useState } from "react";

export default function Team() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            The People
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Meet the <span style={{ color: "#00B4A6" }}>Team</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.1rem", color: "rgba(11,31,58,0.6)", maxWidth: 560, margin: "0 auto" }}>
            One mission. Two teams. Infinite drive. From the streets of Kigali to the screens that power it all — we are Ivanexo.
          </p>
        </div>

        {/* Field Team */}
        <div style={{ marginBottom: "5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(0,180,166,0.08)", border: "1px solid rgba(0,180,166,0.2)", borderRadius: "100px", padding: "0.3rem 0.9rem", marginBottom: "0.6rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6" }} />
              <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>FIELD TEAM</span>
            </div>
            <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.6rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.4rem" }}>Out in the Field</h3>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(11,31,58,0.6)", maxWidth: 600, lineHeight: 1.7 }}>
              These are the faces behind the hustle. Our field agents wear their navy blue with pride, walking into every shop, market, and business in Rwanda to show owners what Trackly can do. They do not just sell software — they change businesses.
            </p>
          </div>

          <div style={{
            width: "100%",
            height: 580,
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(11,31,58,0.08)",
            boxShadow: "0 12px 48px rgba(11,31,58,0.12)",
            backgroundImage: "url(/team-field.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }} />
        </div>

        {/* Office Team */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.2s" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(11,31,58,0.06)", border: "1px solid rgba(11,31,58,0.12)", borderRadius: "100px", padding: "0.3rem 0.9rem", marginBottom: "0.6rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#0B1F3A" }} />
              <span style={{ color: "#0B1F3A", fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>OFFICE TEAM</span>
            </div>
            <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.6rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.4rem" }}>Behind the Screens</h3>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(11,31,58,0.6)", maxWidth: 600, lineHeight: 1.7 }}>
              Every line of code, every design decision, every feature in Trackly starts here. Our office team shows up in crisp white, thinks hard, moves fast, and builds technology that actually works for African businesses. Quiet. Focused. Unstoppable.
            </p>
          </div>

          <div style={{
            width: "100%",
            height: 580,
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(11,31,58,0.08)",
            boxShadow: "0 12px 48px rgba(11,31,58,0.12)",
            backgroundImage: "url(/team-office.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }} />
        </div>

      </div>
    </section>
  );
}
