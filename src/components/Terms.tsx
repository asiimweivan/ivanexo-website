export default function Terms() {
  return (
    <section id="terms" style={{ backgroundColor: "#0B1F3A", padding: "120px 1.5rem 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <span style={{ color: "#00B4A6", fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>Legal</span>
        <h1 style={{ fontFamily: '"Jost", sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>Terms of Service</h1>
        <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>Last updated: October 2026</p>

        {[
          { title: "1. Who we are", content: "Trackly is operated by Ivanexo LTD, a company registered in Rwanda, with its office at KG 647, Kacyiru, Gasabo, Kigali, Rwanda." },
          { title: "2. Acceptance of terms", content: "By downloading or using Trackly, you agree to these Terms of Service. If you do not agree, please do not use the service. These terms apply to the Trackly application and this website." },
          { title: "3. Use of the service", content: "Trackly is provided for legitimate business management. You agree not to misuse the service, try to reverse engineer the application, or use it for anything unlawful under Rwandan law. You are responsible for keeping your login details private." },
          { title: "4. Plans and payments", content: "Trackly has a free plan (Ubuntu) and paid plans (Ibanze, Iterambere and Agaciro). Paid plans can be billed monthly or yearly and are paid with MTN Mobile Money or Airtel Money through a secure payment link. Payments are processed by our payment partner Paypack. Prices are in Rwandan Francs (RWF) and are shown in the app and on the payment page. You can stop renewing at any time. For a refund request, contact support@ivanexo.com and we will review it case by case." },
          { title: "5. Your data", content: "You own your business data. Ivanexo processes it on your behalf to provide Trackly. We do not sell your business information. See our Privacy Policy at trackly.ivanexo.com/privacy for details, including how to delete your account." },
          { title: "6. Availability", content: "We work to keep Trackly available, but we cannot promise uninterrupted service. We may carry out maintenance and will tell you in advance where we can." },
          { title: "7. Limitation of liability", content: "To the extent allowed by law, Ivanexo is not liable for indirect or consequential losses arising from your use of Trackly. Our total liability is limited to the amount you paid us in the 30 days before the claim." },
          { title: "8. Changes to these terms", content: "We may update these terms from time to time. We will tell you about significant changes in the app or by e-mail. Continuing to use Trackly after a change means you accept it." },
          { title: "9. Contact", content: "Questions about these terms: support@ivanexo.com, or +250 785 004 175." },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "2px solid rgba(0,180,166,0.2)" }}>{section.title}</h2>
            <p style={{ fontFamily: '"Manrope", sans-serif', fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
