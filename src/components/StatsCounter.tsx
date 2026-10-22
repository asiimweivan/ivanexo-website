import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { value: 500, suffix: "+", label: "Businesses Onboarded", icon: "🏪" },
  { value: 3, suffix: "", label: "Languages Supported", icon: "🌍" },
  { value: 10000, suffix: "+", label: "Sales Recorded", icon: "💰" },
  { value: 99, suffix: "%", label: "Uptime Guaranteed", icon: "⚡" },
];

export default function StatsCounter() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const counts = [
    useCounter(stats[0].value, 2000, visible),
    useCounter(stats[1].value, 1000, visible),
    useCounter(stats[2].value, 2500, visible),
    useCounter(stats[3].value, 2000, visible),
  ];

  return (
    <section ref={ref} style={{
      backgroundColor: "#0B1F3A",
      padding: "80px 2.5rem",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(0,180,166,0.1)",
      borderBottom: "1px solid rgba(0,180,166,0.1)",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,180,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,166,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", position: "relative", zIndex: 1 }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.7s ease ${i * 0.1}s`,
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#00B4A6", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {counts[i].toLocaleString()}{stat.suffix}
            </div>
            <div style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginTop: "0.5rem", fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
