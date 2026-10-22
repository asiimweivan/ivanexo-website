export default function PrivacyPolicy() {
  return (
    <section id="privacy" style={{ backgroundColor: "#ffffff", padding: "120px 2.5rem 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <span style={{ color: "#00B4A6", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>Legal</span>
        <h1 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(11,31,58,0.5)", marginBottom: "3rem" }}>Last updated: May 2026</p>

        {[
          { title: "1. Who We Are", content: "Ivanexo Ltd is a software company registered in Rwanda. We build and operate Trackly, a mobile business management application. We are registered as both a Data Controller and Data Processor with the Rwanda Data Protection Office (DPO)." },
          { title: "2. Data We Collect", content: "We collect information you provide when registering for Trackly, including your name, phone number, and business details. We also collect usage data to improve our services, such as features used and app performance metrics." },
          { title: "3. How We Use Your Data", content: "Your data is used to provide and improve the Trackly service, process payments via MTN Mobile Money, send important service notifications, and comply with Rwandan law. We do not sell your personal data to third parties." },
          { title: "4. Data Storage & Security", content: "All data is stored securely and encrypted. We follow industry best practices for data security. Your business data belongs to you and you can request deletion at any time." },
          { title: "5. Your Rights", content: "Under Rwandan data protection law, you have the right to access, correct, or delete your personal data. You may also object to certain types of processing. Contact us at hello@ivanexo.rw to exercise these rights." },
          { title: "6. Contact", content: "For any privacy-related questions, contact our Data Protection Officer at hello@ivanexo.rw or visit our offices in Kigali, Rwanda." },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.2rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "2px solid rgba(0,180,166,0.2)" }}>{section.title}</h2>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "1rem", color: "rgba(11,31,58,0.7)", lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
