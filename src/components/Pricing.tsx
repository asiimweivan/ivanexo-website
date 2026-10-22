import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Ibanze",
    kiny: "Basic",
    monthlyPrice: "1,000",
    yearlyPrice: "10,000",
    monthlyDaily: "33",
    yearlyDaily: "27",
    yearlySaving: "2,000",
    color: "#0B1F3A",
    features: ["Up to 50 products", "Sales tracking", "Basic reports", "1 user", "Kinyarwanda support", "MTN MoMo payment"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Iterambere",
    kiny: "Growth",
    monthlyPrice: "5,000",
    yearlyPrice: "50,000",
    monthlyDaily: "167",
    yearlyDaily: "137",
    yearlySaving: "10,000",
    color: "#00B4A6",
    features: ["Unlimited products", "Advanced reports", "Cashflow tracking", "3 users", "All 3 languages", "Customer records"],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Inkunga",
    kiny: "Premium",
    monthlyPrice: "10,000",
    yearlyPrice: "100,000",
    monthlyDaily: "333",
    yearlyDaily: "274",
    yearlySaving: "20,000",
    color: "#F0A500",
    features: ["Everything in Growth", "Priority support", "Data export", "5 users", "Agent support", "Early features"],
    cta: "Go Premium",
    highlight: false,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "100px 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            Simple Pricing
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Plans for Every <span style={{ color: "#00B4A6" }}>Business</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.1rem", color: "rgba(11,31,58,0.6)", maxWidth: 520, margin: "0 auto 2rem" }}>
            Pay via MTN MoMo. Cancel anytime. Save 2 months with annual billing.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#f0f4f8", borderRadius: "100px", padding: "0.3rem", border: "1px solid rgba(11,31,58,0.08)" }}>
            <button
              onClick={() => setBilling("monthly")}
              style={{
                padding: "0.55rem 1.5rem", borderRadius: "100px", border: "none",
                backgroundColor: billing === "monthly" ? "#0B1F3A" : "transparent",
                color: billing === "monthly" ? "#ffffff" : "rgba(11,31,58,0.5)",
                fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.25s",
              }}>
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              style={{
                padding: "0.55rem 1.5rem", borderRadius: "100px", border: "none",
                backgroundColor: billing === "yearly" ? "#0B1F3A" : "transparent",
                color: billing === "yearly" ? "#ffffff" : "rgba(11,31,58,0.5)",
                fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.25s",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
              Yearly
              <span style={{
                backgroundColor: billing === "yearly" ? "#00B4A6" : "rgba(0,180,166,0.15)",
                color: billing === "yearly" ? "#ffffff" : "#00B4A6",
                fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.5rem",
                borderRadius: "100px", letterSpacing: "0.03em",
                transition: "all 0.25s",
              }}>
                SAVE 2 MONTHS
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "start" }}>
          {plans.map((p, i) => {
            const price = billing === "monthly" ? p.monthlyPrice : p.yearlyPrice;
            const daily = billing === "monthly" ? p.monthlyDaily : p.yearlyDaily;
            return (
              <div key={p.name} style={{
                backgroundColor: p.highlight ? "#0B1F3A" : "#ffffff",
                border: p.highlight ? "2px solid #00B4A6" : "1px solid rgba(11,31,58,0.1)",
                borderRadius: "20px", padding: "2.5rem 2rem",
                position: "relative",
                transform: p.highlight ? "scale(1.05)" : "scale(1)",
                boxShadow: p.highlight ? "0 24px 60px rgba(0,180,166,0.2)" : "0 4px 20px rgba(11,31,58,0.08)",
                transition: "all 0.3s",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.15}s`,
              }}
                onMouseEnter={e => { if (!p.highlight) { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,180,166,0.15)"; } }}
                onMouseLeave={e => { if (!p.highlight) { e.currentTarget.style.borderColor = "rgba(11,31,58,0.1)"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,31,58,0.08)"; } }}>

                {p.highlight && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                    backgroundColor: "#00B4A6", color: "#0B1F3A",
                    padding: "0.3rem 1.2rem", borderRadius: "100px",
                    fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.8rem", whiteSpace: "nowrap",
                  }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Annual saving badge */}
                {billing === "yearly" && (
                  <div style={{
                    position: "absolute", top: p.highlight ? "1rem" : "0.75rem", right: "1rem",
                    backgroundColor: "rgba(240,165,0,0.12)", border: "1px solid rgba(240,165,0,0.3)",
                    color: "#C98A00", padding: "0.2rem 0.6rem", borderRadius: "6px",
                    fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.72rem",
                  }}>
                    Save RWF {p.yearlySaving}
                  </div>
                )}

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.4rem", fontWeight: 700, color: p.highlight ? "#ffffff" : "#0B1F3A" }}>{p.name}</div>
                  <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "rgba(11,31,58,0.5)", marginTop: "0.2rem" }}>{p.kiny}</div>
                </div>

                {/* Price */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.9rem", color: p.color, fontWeight: 600, paddingBottom: "0.5rem" }}>RWF</span>
                    <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "3rem", fontWeight: 700, color: p.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{price}</span>
                    <span style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "rgba(11,31,58,0.5)", paddingBottom: "0.4rem" }}>
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: p.highlight ? "rgba(255,255,255,0.4)" : "rgba(11,31,58,0.4)" }}>
                    RWF {daily}/day
                    {billing === "yearly" && (
                      <span style={{ marginLeft: "0.5rem", color: "#00B4A6", fontWeight: 600 }}>— 2 months free</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: "2rem" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "rgba(0,180,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6" }} />
                      </div>
                      <span style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: p.highlight ? "rgba(255,255,255,0.8)" : "rgba(11,31,58,0.7)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="#contact" style={{
                  display: "block", textAlign: "center",
                  backgroundColor: p.highlight ? "#00B4A6" : "transparent",
                  color: p.highlight ? "#ffffff" : "#0B1F3A",
                  padding: "0.85rem", borderRadius: "8px",
                  fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.95rem",
                  textDecoration: "none",
                  border: p.highlight ? "none" : "1px solid rgba(11,31,58,0.2)",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = p.highlight ? "#008F84" : "#0B1F3A"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = p.highlight ? "#00B4A6" : "transparent"; e.currentTarget.style.color = p.highlight ? "#ffffff" : "#0B1F3A"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(11,31,58,0.45)", marginTop: "2.5rem" }}>
          All plans paid via MTN MoMo. No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
