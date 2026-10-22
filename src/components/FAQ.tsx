import { useEffect, useRef, useState } from "react";

const faqs = [
  { q: "How much does Trackly cost?", a: "Trackly has three plans. Ibanze starts at RWF 1,000/month — the most affordable way to get your business organized. Iterambere is RWF 5,000/month and Inkunga is RWF 10,000/month. All plans are paid monthly via MTN Mobile Money." },
  { q: "Does Trackly work without internet?", a: "Trackly is a mobile app that requires internet for initial setup, login, and data sync. Some basic features may work with limited connectivity. Full offline mode is on our roadmap and coming in a future update." },
  { q: "Which languages does Trackly support?", a: "Trackly supports English, Kinyarwanda, and French. You can switch languages anytime from the settings menu." },
  { q: "How do I pay for my subscription?", a: "All payments are made via MTN Mobile Money. No bank card needed. You pay monthly and can cancel anytime with no penalties." },
  { q: "Is my business data secure?", a: "Yes. Ivanexo Ltd is registered with the Rwanda Data Protection Office (DPO) as both a Data Controller and Data Processor. Your data is encrypted and never shared with third parties." },
  { q: "Can I use Trackly on multiple phones?", a: "Yes depending on your plan. Iterambere supports up to 3 users and Inkunga supports up to 5 users on the same business account." },
  { q: "What kind of businesses can use Trackly?", a: "Trackly is built for Rwandan small and medium businesses — shops, boutiques, salons, groceries, electronics stores, pharmacies, restaurants and more." },
  { q: "How do I download Trackly?", a: "Trackly is available on the Google Play Store for Android. Search for Trackly or visit our website to get the direct download link." },
  { q: "Can I become a Trackly agent?", a: "Yes. We are building an agent network across Rwanda. Agents earn commissions for every business they onboard. Contact us via the form on this website to apply." },
  { q: "How do I get support?", a: "You can reach us via the contact form on this website, by email at hello@ivanexo.rw, or through WhatsApp. Our team responds within 24 hours." },
];

export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} style={{
      backgroundColor: "#ffffff",
      padding: "100px 2.5rem",
      position: "relative",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "4rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0B1F3A", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Frequently Asked <span style={{ color: "#00B4A6" }}>Questions</span>
          </h2>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.2s" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderBottom: "1px solid rgba(11,31,58,0.1)",
              overflow: "hidden",
              transition: "all 0.3s",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", padding: "1.5rem 0",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left",
              }}>
                <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.05rem", fontWeight: 700, color: open === i ? "#00B4A6" : "#0B1F3A", transition: "color 0.2s", paddingRight: "2rem" }}>
                  {faq.q}
                </span>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  backgroundColor: open === i ? "#00B4A6" : "rgba(0,180,166,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  <span style={{ color: open === i ? "#ffffff" : "#00B4A6", fontSize: "1.2rem", lineHeight: 1, transform: open === i ? "rotate(45deg)" : "rotate(0)", display: "block", transition: "transform 0.3s" }}>+</span>
                </div>
              </button>
              {open === i && (
                <div style={{ paddingBottom: "1.5rem" }}>
                  <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(11,31,58,0.7)", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
