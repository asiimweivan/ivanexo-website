import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Ubuntu",
    kiny: "Free",
    price: "0",
    note: "Free forever",
    color: "#7C3AED",
    features: [
      "Up to 20 products",
      "Today's sales report",
      "Invoice history, last 30 days",
      "Inventory and low-stock alerts",
      "Customer records",
      "Receipts on WhatsApp",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Ibanze",
    kiny: "Starter",
    price: "3,000",
    note: "per month",
    color: "#0B1F3A",
    features: [
      "Up to 100 products",
      "Invoice history, last 90 days",
      "Weekly sales report",
      "Barcode scanning",
      "Credit sales and rentals",
      "Clean receipts, no Trackly footer",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Iterambere",
    kiny: "Growth",
    price: "6,000",
    note: "per month",
    color: "#00B4A6",
    features: [
      "Everything in Ibanze",
      "Unlimited products and invoice history",
      "Reports, profit and loss, cash flow",
      "Expense tracking and business goals",
      "Suppliers and purchase orders",
      "Quotations, returns and discounts",
      "Layaway, loans and cash desk",
      "Up to 2 staff accounts",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Agaciro",
    kiny: "Pro",
    price: "10,000",
    note: "per month",
    color: "#D4860A",
    features: [
      "Everything in Iterambere",
      "Unlimited staff accounts",
      "RRA tax and VAT reports",
      "Bank reconciliation",
      "Shift management",
      "Asset tracking",
      "Stock transfers between branches",
    ],
    cta: "Get started",
    highlight: false,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "100px 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            Simple Pricing
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Plans for Every <span style={{ color: "#00B4A6" }}>Business</span>
          </h2>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1.1rem", color: "rgba(11,31,58,0.6)", maxWidth: 560, margin: "0 auto" }}>
            Start free with Ubuntu. Upgrade when your business needs more. Pay with MTN Mobile Money or Airtel Money. Yearly billing includes 2 months free.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", alignItems: "stretch" }}>
          {plans.map((p, i) => (
            <div key={p.name} style={{
              backgroundColor: p.highlight ? "#0B1F3A" : "#ffffff",
              border: p.highlight ? "2px solid #00B4A6" : "1px solid rgba(11,31,58,0.1)",
              borderRadius: "20px", padding: "2.25rem 1.75rem",
              position: "relative",
              boxShadow: p.highlight ? "0 24px 60px rgba(0,180,166,0.2)" : "0 4px 20px rgba(11,31,58,0.08)",
              transition: "all 0.3s",
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 0.12}s`,
              display: "flex", flexDirection: "column",
            }}>
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

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.4rem", fontWeight: 700, color: p.highlight ? "#ffffff" : "#0B1F3A" }}>{p.name}</div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "rgba(11,31,58,0.5)", marginTop: "0.2rem" }}>{p.kiny}</div>
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.3rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "0.9rem", color: p.highlight ? "#00B4A6" : p.color, fontWeight: 600, paddingBottom: "0.5rem" }}>RWF</span>
                  <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "2.6rem", fontWeight: 700, color: p.highlight ? "#00B4A6" : p.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.price}</span>
                </div>
                <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "rgba(11,31,58,0.5)", marginTop: "0.3rem" }}>{p.note}</div>
              </div>

              <div style={{ marginBottom: "2rem", flexGrow: 1 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.7rem" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "rgba(0,180,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6" }} />
                    </div>
                    <span style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: p.highlight ? "rgba(255,255,255,0.8)" : "rgba(11,31,58,0.7)", lineHeight: 1.45 }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="#download" style={{
                display: "block", textAlign: "center",
                backgroundColor: p.highlight ? "#00B4A6" : "transparent",
                color: p.highlight ? "#ffffff" : "#0B1F3A",
                padding: "0.85rem", borderRadius: "8px",
                fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "0.95rem",
                textDecoration: "none",
                border: p.highlight ? "none" : "1px solid rgba(11,31,58,0.2)",
              }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 760, margin: "3rem auto 0", textAlign: "center" }}>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.95rem", color: "rgba(11,31,58,0.6)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            After you sign up, we e-mail you a secure payment link where you pick a plan, choose monthly or yearly billing, and pay with MTN Mobile Money or Airtel Money. No contracts. Cancel anytime.
          </p>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.8rem", color: "rgba(11,31,58,0.4)" }}>
            Prices in Rwandan Francs (RWF). Payments are processed by Paypack.
          </p>
        </div>
      </div>
    </section>
  );
}
