import { useEffect, useRef, useState } from "react";
import { Eye, Target, ShieldCheck, MessageCircle, Lock, Globe } from "lucide-react";

const DISPLAY = '"Jost", sans-serif';
const BODY = '"Manrope", sans-serif';

const values = [
  { Icon: ShieldCheck, title: "Honesty first", text: "We tell you what is possible, what it costs and how long it takes. If we cannot do something well, we say so." },
  { Icon: MessageCircle, title: "Plain communication", text: "No jargon and no surprises. You always know what we are working on and what comes next." },
  { Icon: Lock, title: "Respect for your data", text: "We collect only what a project needs, and Ivanexo is registered with Rwanda's Data Protection Office." },
  { Icon: Globe, title: "Built for Rwanda", text: "Products and support in English, Kinyarwanda and French, designed around how Rwandan businesses work and pay." },
];

const pillars = [
  { Icon: Eye, title: "Our vision", text: "To be the technology partner that African businesses trust to grow." },
  { Icon: Target, title: "Our mission", text: "To build honest, practical software and provide dependable IT support that helps small and mid-size businesses in Rwanda and across Africa work better and grow." },
];

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => { window.removeEventListener("resize", check); obs.disconnect(); };
  }, []);

  const ease = "cubic-bezier(.2,.7,.2,1)";
  const rise = (d: number): React.CSSProperties => ({ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transition: `all 0.9s ${ease} ${d}s` });

  return (
    <section id="about" ref={ref} style={{ backgroundColor: "#F4F7FA", padding: isMobile ? "70px 1.25rem" : "110px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.15fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "start", marginBottom: "5rem" }}>
          <div style={rise(0)}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: isMobile ? "2.1rem" : "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 500, color: "#0B1F3A", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: "1.6rem" }}>
              About Ivanexo
            </h2>
            <p style={{ fontFamily: BODY, fontSize: "1.05rem", color: "rgba(11,31,58,0.72)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Ivanexo is a software company in Kigali. We build websites, mobile apps and business software for clients, provide IT and technical support, and create products of our own.
            </p>
            <p style={{ fontFamily: BODY, fontSize: "1.05rem", color: "rgba(11,31,58,0.72)", lineHeight: 1.85, marginBottom: "2rem" }}>
              Our first product, Trackly, helps small businesses manage stock, sales, customers and cash from one mobile app.
            </p>
            <a href="#trackly" style={{ display: "inline-block", backgroundColor: "#0B1F3A", color: "#ffffff", padding: "0.85rem 1.9rem", borderRadius: 8, fontFamily: BODY, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
              See Trackly
            </a>
          </div>

          <div>
            {pillars.map((p, i) => (
              <div key={p.title} style={{ borderTop: "1px solid rgba(11,31,58,0.14)", padding: "1.75rem 0", display: "flex", gap: "1.25rem", ...rise(0.15 + i * 0.15) }}>
                <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: "50%", border: "1px solid rgba(0,180,166,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p.Icon size={21} color="#00B4A6" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 500, color: "#0B1F3A", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.98rem", color: "rgba(11,31,58,0.7)", lineHeight: 1.8 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 500, color: "#0B1F3A", marginBottom: "2rem", ...rise(0.3) }}>How we work</h3>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "2rem" }}>
          {values.map((v, i) => (
            <div key={v.title} style={{ borderLeft: "2px solid #00B4A6", paddingLeft: "1.1rem", ...rise(0.4 + i * 0.1) }}>
              <v.Icon size={22} color="#00B4A6" strokeWidth={1.6} />
              <h4 style={{ fontFamily: DISPLAY, fontSize: "1.1rem", fontWeight: 500, color: "#0B1F3A", margin: "0.75rem 0 0.5rem" }}>{v.title}</h4>
              <p style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(11,31,58,0.68)", lineHeight: 1.75 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
