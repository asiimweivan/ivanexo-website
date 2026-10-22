import { useEffect, useRef, useState } from "react";

const faqs = [
  { q: "How much does Trackly cost?", a: "The Ubuntu plan is free forever and includes up to 20 products. Paid plans are Ibanze at RWF 3,000 per month, Iterambere at RWF 6,000 per month and Agaciro at RWF 10,000 per month. Yearly billing includes 2 months free." },
  { q: "Do I need internet to use Trackly?", a: "Trackly needs an internet connection to sign in and to keep your data safely saved online. Check the app for the latest on working with a weak connection." },
  { q: "Which languages does Trackly support?", a: "Trackly supports English, Kinyarwanda and French. You can switch language any time in the app settings." },
  { q: "How do I pay for a plan?", a: "You pay with MTN Mobile Money or Airtel Money. After you sign up, we e-mail you a secure payment link where you choose a plan and billing period. There are no contracts and you can cancel any time. Payments are processed by Paypack." },
  { q: "Is my business data safe?", a: "Ivanexo LTD is registered with the Rwanda Data Protection Office (DPO). Your business data belongs to you. Our Privacy Policy explains what we collect and why, and you can ask us to delete your account and data at any time." },
  { q: "Can my staff use Trackly too?", a: "Yes, on paid plans. Iterambere includes up to 2 staff accounts and Agaciro includes unlimited staff accounts. The free Ubuntu plan and Ibanze are for the business owner only." },
  { q: "What kind of businesses can use Trackly?", a: "Trackly is built for small and medium businesses in Rwanda: shops, boutiques, salons, groceries, electronics stores, pharmacies, restaurants and more." },
  { q: "How do I get Trackly?", a: "Trackly is an Android app. We are releasing it on Google Play. Write to support@ivanexo.com or message us on WhatsApp and we will tell you as soon as it is ready for you." },
  { q: "Can I become a Trackly agent?", a: "We are planning an agent programme for people who help businesses get started on Trackly. Write to info@ivanexo.com to register your interest." },
  { q: "How do I delete my account?", a: "Open the delete account page at trackly.ivanexo.com/delete-account and follow the steps, or write to support@ivanexo.com from the e-mail address you registered with." },
  { q: "How do I get support?", a: "E-mail support@ivanexo.com, message us on WhatsApp at +250 785 004 175, or use the contact form on this website." },
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
