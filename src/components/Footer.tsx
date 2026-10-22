import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer style={{
      backgroundColor: "#070F1D",
      borderTop: "3px solid #00B4A6",
      padding: isMobile ? "3rem 1.25rem 2rem" : "4rem 2.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "2rem" : "3rem",
          marginBottom: "3rem",
        }}>

          {/* Brand — full width on mobile */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ marginBottom: "1.5rem", cursor: "pointer" }}>
              <img
                src="/logo.png"
                alt="Ivanexo Ltd"
                style={{
                  height: 42, width: "auto", objectFit: "contain",
                  transform: "scale(4.5)", transformOrigin: "left center",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: isMobile ? "100%" : 280, marginTop: "3rem" }}>
              Ivanexo Ltd builds smart software for African businesses. Proudly registered in Rwanda.
            </p>

            {/* Quick Actions */}
            <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="#download" style={{
                  display: "inline-flex", alignItems: "center",
                  backgroundColor: "#00B4A6", color: "#0B1F3A",
                  padding: "0.5rem 1rem", borderRadius: "6px",
                  fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.82rem",
                  textDecoration: "none", transition: "all 0.2s", width: "fit-content",
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; }}>
                  Get Trackly
                </a>
              </div>
            </div>

          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Company</h4>
            {[
              { label: "About Us", href: "#about" },
              { label: "Trackly App", href: "#trackly" },
              { label: "Contact Us", href: "#contact" },
              { label: "Become an Agent", href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00B4A6"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Product</h4>
            {[
              { label: "How It Works", href: "#how" },
              { label: "Plans & Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00B4A6"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Legal</h4>
            {[
              { label: "Privacy Policy", href: "https://trackly.ivanexo.com/privacy" },
              { label: "Terms of Service", href: "#terms" },
              { label: "Delete Account", href: "https://trackly.ivanexo.com/delete-account" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00B4A6"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "rgba(0,180,166,0.06)", border: "1px solid rgba(0,180,166,0.15)", borderRadius: "10px" }}>
              <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: "#00B4A6", fontWeight: 600, marginBottom: "0.4rem" }}>Contact</div>
              <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                support@ivanexo.com<br />info@ivanexo.com<br />+250 785 004 175<br />Ivanexo LTD, KG 647, Kacyiru<br />Gasabo, Kigali, Rwanda<br />Company code 156251164
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(0,180,166,0.12)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.82rem", color: "rgba(255,255,255,0.3)" }}>
            &copy; {year} Ivanexo LTD. All rights reserved. Registered in Rwanda.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.82rem", color: "#00B4A6" }}>
              Built with love in Kigali, Rwanda
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
