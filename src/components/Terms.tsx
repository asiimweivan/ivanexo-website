export default function Terms() {
  return (
    <section id="terms" style={{ backgroundColor: "#0B1F3A", padding: "120px 2.5rem 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>Legal</span>
        <h1 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>Terms of Service</h1>
        <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>Last updated: May 2026</p>

        {[
          { title: "1. Acceptance of Terms", content: "By downloading or using Trackly, you agree to these Terms of Service. If you do not agree, please do not use our service. These terms apply to all users of the Trackly application and Ivanexo Ltd website." },
          { title: "2. Use of Service", content: "Trackly is provided for legitimate business management purposes. You agree not to misuse the service, attempt to reverse engineer the application, or use it for any unlawful purpose under Rwandan law." },
          { title: "3. Subscriptions & Payments", content: "Trackly offers free and paid subscription plans. Paid plans are billed monthly via MTN Mobile Money. You may cancel at any time. Refunds are handled on a case-by-case basis. Prices are in Rwandan Francs (RWF)." },
          { title: "4. Your Data", content: "You own your business data. Ivanexo Ltd acts as a data processor on your behalf. We will never sell, share, or misuse your business information. See our Privacy Policy for full details." },
          { title: "5. Service Availability", content: "We strive for 99% uptime but cannot guarantee uninterrupted service. We reserve the right to perform maintenance, which we will communicate in advance where possible." },
          { title: "6. Limitation of Liability", content: "Ivanexo Ltd is not liable for any indirect or consequential losses arising from use of Trackly. Our total liability shall not exceed the amount paid by you in the last 30 days." },
          { title: "7. Changes to Terms", content: "We may update these terms from time to time. We will notify users of significant changes via the app or email. Continued use after changes constitutes acceptance." },
          { title: "8. Contact", content: "For questions about these terms, contact us at hello@ivanexo.rw." },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "2px solid rgba(0,180,166,0.2)" }}>{section.title}</h2>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
