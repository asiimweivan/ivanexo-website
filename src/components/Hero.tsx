import { useEffect, useRef, useState } from "react";
import { Smartphone, Layers, LifeBuoy, Lightbulb } from "lucide-react";

const DISPLAY = '"Jost", sans-serif';
const BODY = '"Manrope", sans-serif';

const prefersReducedMotion = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const services = [
  { Icon: Smartphone, title: "Web and mobile apps", text: "Websites, web apps and Android and iOS apps, designed to work well on the phones your customers already use." },
  { Icon: Layers, title: "Custom business software", text: "Booking, ticketing, stock, dashboards and the back-end systems behind them, built around how your business already works." },
  { Icon: LifeBuoy, title: "IT and technical support", text: "Practical help when software, devices or accounts stop working: setup, troubleshooting and ongoing support." },
  { Icon: Lightbulb, title: "Technology consulting", text: "Straight advice for small and mid-size businesses on what to build, what to buy and what to skip." },
];

/* IX mark: flat, two solid colours (white + teal on the dark hero) */
const MARK_I = "240,328 387,328 448,391 448,770 346,869 346,441";
const MARK_X = "475,415 588,415 680,507 859,328 1014,328 753,590 1042,882 880,882 702,695 521,882 368,882 629,626 475,466";

const NODE_ICONS: Record<string, JSX.Element> = {
  phone: (<><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>),
  layers: (<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>),
  buoy: (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></>),
  bulb: (<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>),
  trend: (<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>),
};

const NODES = [
  { x: 115, y: 115, label: "Web and mobile", icon: "phone", color: "#00B4A6", top: true },
  { x: 405, y: 115, label: "Software", icon: "layers", color: "#00B4A6", top: true },
  { x: 115, y: 405, label: "IT support", icon: "buoy", color: "#00B4A6", top: false },
  { x: 405, y: 405, label: "Consulting", icon: "bulb", color: "#00B4A6", top: false },
  { x: 260, y: 468, label: "Our product: Trackly", icon: "trend", color: "#F0A500", top: false },
];

const CSS = `
.ix-line{stroke-dasharray:300;stroke-dashoffset:300;animation:ixDraw 1.3s cubic-bezier(.4,0,.2,1) forwards}
.ix-node{opacity:0;animation:ixIn .9s ease-out forwards}
.ix-i{animation:ixRise 1.1s cubic-bezier(.2,.8,.2,1) .15s both}
.ix-spin{animation:ixSpin 140s linear infinite}
.ix-float{animation:ixFloat 8s ease-in-out 2.6s infinite}
@keyframes ixDraw{to{stroke-dashoffset:0}}
@keyframes ixIn{to{opacity:1}}
@keyframes ixRise{from{opacity:0;transform:translateY(80px)}to{opacity:1;transform:none}}
@keyframes ixSpin{to{transform:rotate(360deg)}}
@keyframes ixFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
`;

function Constellation({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 520 540" role="img" aria-label="The Ivanexo IX mark connected to web and mobile apps, software, IT support, consulting and the Trackly product" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <style>{CSS}</style>
      <defs>
        <clipPath id="ixReveal">
          <rect x="340" y="300" width={animated ? 0 : 720} height="620">
            {animated && <animate attributeName="width" from="0" to="720" dur="1.1s" begin="0.75s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />}
          </rect>
        </clipPath>
      </defs>

      <circle cx="260" cy="260" r="205" fill="none" stroke="#00B4A6" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="1 10" strokeLinecap="round" className={animated ? "ix-spin" : undefined} style={{ transformOrigin: "260px 260px" }} />
      <circle cx="260" cy="260" r="150" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" />

      {NODES.map((n, i) => (
        <line key={n.label} x1="260" y1="260" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity="0.5" strokeWidth="1.2" className={animated ? "ix-line" : undefined} style={animated ? { animationDelay: `${1.6 + i * 0.15}s` } : { strokeDasharray: "none" }} />
      ))}

      {animated && NODES.map((n, i) => (
        <circle key={"d" + n.label} r="2.8" fill={n.color} opacity="0">
          <set attributeName="opacity" to="1" begin={`${3 + i * 0.35}s`} fill="freeze" />
          <animateMotion dur={`${3.4 + i * 0.45}s`} begin={`${3 + i * 0.35}s`} repeatCount="indefinite" path={`M260,260 L${n.x},${n.y}`} />
        </circle>
      ))}

      <g className={animated ? "ix-float" : undefined}>
        <circle cx="260" cy="260" r="112" fill="#0B1F3A" stroke="#00B4A6" strokeOpacity="0.4" strokeWidth="1.2" />
        <g transform="translate(260 260) scale(0.235) translate(-641 -605)">
          <polygon points={MARK_I} fill="#ffffff" className={animated ? "ix-i" : undefined} />
          <g clipPath="url(#ixReveal)">
            <polygon points={MARK_X} fill="#00B4A6" />
          </g>
        </g>
      </g>

      {NODES.map((n, i) => (
        <g key={"n" + n.label} className={animated ? "ix-node" : undefined} style={animated ? { animationDelay: `${2 + i * 0.15}s` } : undefined}>
          <circle cx={n.x} cy={n.y} r="26" fill="#0B1F3A" stroke={n.color} strokeWidth="1.6" />
          <g transform={`translate(${n.x - 12} ${n.y - 12})`} fill="none" stroke={n.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {NODE_ICONS[n.icon]}
          </g>
          <text x={n.x} y={n.top ? n.y - 40 : n.y + 54} textAnchor="middle" fontFamily={BODY} fontWeight="600" fontSize="15" fill={n.color === "#F0A500" ? "#F0A500" : "#ffffff"} letterSpacing="0.2">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function Services({ isMobile }: { isMobile: boolean }) {
  const reduce = prefersReducedMotion();
  const [visible, setVisible] = useState(reduce);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduce]);

  const ease = "cubic-bezier(.2,.7,.2,1)";
  return (
    <section id="services" ref={ref} style={{ backgroundColor: "#ffffff", padding: isMobile ? "70px 1.25rem" : "110px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: isMobile ? "2.1rem" : "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 500, color: "#0B1F3A", lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 640, marginBottom: "1.1rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: `all 0.9s ${ease}` }}>
          What we build and support
        </h2>
        <p style={{ fontFamily: BODY, fontSize: "1.05rem", color: "rgba(11,31,58,0.62)", lineHeight: 1.8, maxWidth: 580, marginBottom: "3.5rem", opacity: visible ? 1 : 0, transition: `opacity 0.9s ${ease} 0.1s` }}>
          We work with small and mid-size businesses in Rwanda. You tell us the problem; we tell you honestly what it takes to solve it.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "3.5rem 5rem" }}>
          {services.map((s, i) => (
            <div key={s.title}>
              <div style={{ height: 1, backgroundColor: "rgba(11,31,58,0.14)", marginBottom: "1.75rem", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: -1, height: 3, width: "100%", backgroundColor: "#00B4A6", transformOrigin: "left", transform: visible ? "scaleX(0.16)" : "scaleX(0)", transition: `transform 1.1s ${ease} ${0.25 + i * 0.14}s` }} />
              </div>
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transition: `all 0.9s ${ease} ${0.35 + i * 0.14}s` }}>
                <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: "50%", border: "1px solid rgba(0,180,166,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.Icon size={22} color="#00B4A6" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 500, color: "#0B1F3A", letterSpacing: "-0.01em", marginBottom: "0.6rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.98rem", color: "rgba(11,31,58,0.68)", lineHeight: 1.8 }}>{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4.5rem", backgroundColor: "#0B1F3A", borderRadius: 16, padding: isMobile ? "2rem 1.5rem" : "2.75rem 3.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", opacity: visible ? 1 : 0, transition: `opacity 1s ease 0.9s` }}>
          <div style={{ maxWidth: 560 }}>
            <h3 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 500, color: "#ffffff", marginBottom: "0.5rem" }}>Have a project in mind?</h3>
            <p style={{ fontFamily: BODY, fontSize: "0.98rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              Tell us what you need. We will say honestly whether we can help and what it would cost.
            </p>
          </div>
          <a href="#contact" style={{ backgroundColor: "#00B4A6", color: "#ffffff", padding: "0.9rem 1.9rem", borderRadius: 8, fontFamily: BODY, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Request a quote
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animated = !prefersReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => { clearTimeout(t); window.removeEventListener("resize", check); };
  }, []);

  return (
    <>
      <section style={{ minHeight: isMobile ? "auto" : "100vh", backgroundColor: "#0B1F3A", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingTop: "80px" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          maxWidth: 1200, margin: "0 auto", width: "100%",
          padding: isMobile ? "2.5rem 1.25rem 3rem" : "4rem 2.5rem",
          gap: isMobile ? "2.5rem" : "3rem",
          opacity: visible ? 1 : 0, transition: "opacity 0.9s ease",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: DISPLAY, fontSize: isMobile ? "clamp(2.1rem, 9vw, 2.7rem)" : "clamp(2.8rem, 4.6vw, 4.4rem)", fontWeight: 500, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#ffffff", marginBottom: "1.6rem" }}>
              Powering business<br />with technology.
            </h1>
            <p style={{ fontFamily: BODY, fontSize: isMobile ? "1rem" : "1.12rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, maxWidth: 520, marginBottom: "2.4rem" }}>
              Ivanexo builds websites, mobile apps and business software, and gives IT support to businesses in Rwanda. We also make our own products, starting with Trackly.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.75rem" }}>
              <a href="#contact" style={{ backgroundColor: "#00B4A6", color: "#ffffff", padding: "0.9rem 1.9rem", borderRadius: 8, fontFamily: BODY, fontWeight: 700, fontSize: "0.96rem", textDecoration: "none", display: "inline-block" }}>
                Talk to us
              </a>
              <a href="#services" style={{ backgroundColor: "transparent", color: "#ffffff", padding: "0.9rem 1.9rem", borderRadius: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.96rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", display: "inline-block" }}>
                See what we do
              </a>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem 2rem", fontFamily: BODY, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)" }}>
              <span>Based in Kacyiru, Kigali</span>
              <span>Registered with Rwanda's Data Protection Office</span>
              <span>English, Kinyarwanda, Français</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0, width: "100%", maxWidth: isMobile ? 400 : 540 }}>
            <Constellation animated={animated} />
          </div>
        </div>
      </section>

      <Services isMobile={isMobile} />
    </>
  );
}
