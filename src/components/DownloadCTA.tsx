import { useEffect, useRef, useState } from "react";

const DISPLAY = '"Jost", sans-serif';
const BODY = '"Manrope", sans-serif';

function PlayGlyph() {
  return (
    <svg width="26" height="28" viewBox="0 0 24 26" aria-hidden="true">
      <path d="M1.4 1.1c-.2.3-.3.7-.3 1.2v21.4c0 .5.1.9.3 1.2L13.2 13 1.4 1.1z" fill="#00C3FF" />
      <path d="M17 16.8 13.2 13 17 9.2l4.6 2.6c1.3.7 1.3 1.9 0 2.6L17 16.8z" fill="#FFD400" />
      <path d="M1.4 24.9c.3.3.8.4 1.4.1l14.2-8.2-3.8-3.8L1.4 24.9z" fill="#FF3A44" />
      <path d="M1.4 1.1 13.2 13 17 9.2 2.8 1C2.2.7 1.7.8 1.4 1.1z" fill="#00F076" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="#ffffff">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function StoreButton({ glyph, small, big }: { glyph: JSX.Element; small: string; big: string }) {
  return (
    <div role="img" aria-label={`${big}, coming soon`} style={{
      display: "inline-flex", alignItems: "center", gap: "0.85rem",
      backgroundColor: "#000000", border: "1px solid rgba(255,255,255,0.35)",
      borderRadius: 12, padding: "0.7rem 1.4rem 0.7rem 1.1rem", minWidth: 200,
      textAlign: "left", cursor: "default",
    }}>
      {glyph}
      <div>
        <div style={{ fontFamily: BODY, fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>{small}</div>
        <div style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 500, color: "#ffffff", lineHeight: 1.1 }}>{big}</div>
      </div>
    </div>
  );
}

export default function DownloadCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="download" ref={ref} style={{ backgroundColor: "#0B1F3A", padding: "100px 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        maxWidth: 750, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1,
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.9s cubic-bezier(.2,.7,.2,1)",
      }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 500, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.4rem" }}>
          Start managing your business with Trackly.
        </h2>
        <p style={{ fontFamily: BODY, fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 2.75rem" }}>
          Start free with the Ubuntu plan. Upgrade only when your business needs more.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <StoreButton glyph={<PlayGlyph />} small="Coming soon on" big="Google Play" />
          <StoreButton glyph={<AppleGlyph />} small="Coming soon on the" big="App Store" />
        </div>

        <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
          Want early access? <a href="#contact" style={{ color: "#00B4A6", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(0,180,166,0.5)" }}>Contact us</a>.
        </p>

        <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
          Free to start. No credit card. Pay with MTN MoMo or Airtel Money when you upgrade.
        </p>
      </div>
    </section>
  );
}
