import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
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

  const send = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, e-mail and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid e-mail address.");
      return;
    }
    setError("");
    const subject = form.subject.trim() || "Message from the Ivanexo website";
    const body = form.message.trim() + "\n\n" + form.name.trim() + "\n" + form.email.trim();
    window.location.href = "mailto:support@ivanexo.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", color: "#ffffff",
    fontFamily: '"Satoshi", sans-serif', fontSize: "0.95rem",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{
      backgroundColor: "#0B1F3A",
      padding: isMobile ? "60px 1.25rem" : "100px 2.5rem",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "20%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: isMobile ? "2rem" : "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Let us Work <span style={{ color: "#00B4A6" }}>Together</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto" }}>
            Questions about Trackly, your account or a partnership? Send us a message or reach us directly. We reply as soon as we can.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.2s",
        }}>

          {/* Left - Info */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              {[
                { label: "Support e-mail", value: "support@ivanexo.com", icon: "✉", href: "mailto:support@ivanexo.com" },
                { label: "General enquiries", value: "info@ivanexo.com", icon: "✉", href: "mailto:info@ivanexo.com" },
                { label: "Phone and WhatsApp", value: "+250 785 004 175", icon: "📞", href: "https://wa.me/250785004175" },
                { label: "Office", value: "KG 647, Kacyiru, Gasabo, Kigali, Rwanda", icon: "📍", href: "" },
                { label: "Company", value: "Ivanexo LTD, company code 156251164", icon: "🏢", href: "" },
                { label: "Data protection", value: "Registered with the Rwanda Data Protection Office", icon: "🔒", href: "" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(0,180,166,0.1)", border: "1px solid rgba(0,180,166,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{item.label}</div>
                    <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.95rem", color: "#ffffff", fontWeight: 500 }}>
                      {item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "1px solid rgba(0,180,166,0.5)" }}>{item.value}</a> : item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "rgba(0,180,166,0.08)", border: "1px solid rgba(0,180,166,0.2)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1rem", fontWeight: 700, color: "#00B4A6", marginBottom: "0.5rem" }}>Become an Agent</div>
              <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Interested in helping businesses get started on Trackly? Write to info@ivanexo.com and tell us about yourself.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: isMobile ? "1.5rem" : "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉</div>
                <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.5rem", color: "#ffffff", marginBottom: "0.5rem" }}>Almost done</h3>
                <p style={{ fontFamily: '"Satoshi", sans-serif', color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Your e-mail app should now be open. Press send there to reach us. If nothing opened, write to <a href="mailto:support@ivanexo.com" style={{ color: "#00B4A6" }}>support@ivanexo.com</a>.</p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.5rem" }}>Send a Message</h3>
                {[
                  { label: "Your Name", key: "name", type: "text", placeholder: "Write your name here" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "email@example.com" },
                  { label: "Subject", key: "subject", type: "text", placeholder: "I want to try Trackly" },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} style={inputStyle}
                      value={form[field.key as "name" | "email" | "subject"]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={e => { e.currentTarget.style.borderColor = "#00B4A6"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                  </div>
                ))}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>Message</label>
                  <textarea placeholder="Tell us about your business..." rows={4} style={{ ...inputStyle, resize: "vertical" }}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => { e.currentTarget.style.borderColor = "#00B4A6"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} />
                </div>
                {error && <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "#FF8A80", marginBottom: "1rem" }}>{error}</p>}
                <button onClick={send} style={{
                  width: "100%", padding: "0.9rem",
                  backgroundColor: "#00B4A6", color: "#ffffff",
                  border: "none", borderRadius: "8px",
                  fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "1rem",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; }}>
                  Send by e-mail
                </button>
                <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.9rem", lineHeight: 1.6 }}>This opens your e-mail app with your message ready to send to support@ivanexo.com.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
