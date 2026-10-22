import { useEffect, useRef, useState } from "react";
import { X, Check, AlertCircle, Lock } from "lucide-react";

declare const process: any;

export const PAY_API: string =
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_PAY_API) ||
  "https://trackly-backend-1.onrender.com/api/v1/pay";

export type PayPlan = {
  key: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  chargeMonthly: number;
  chargeYearly: number;
};

type View = "form" | "wait" | "ok" | "fail" | "late";

const NAVY = "#0B1F3A";
const TEAL = "#00B4A6";
const HEAD = '"Jost", sans-serif';
const BODY = '"Manrope", sans-serif';

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

function cleanPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("250")) d = d.slice(3);
  if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 9);
}
function networkOf(d: string): "MTN" | "Airtel" | "" {
  if (/^7[89]/.test(d)) return "MTN";
  if (/^7[23]/.test(d)) return "Airtel";
  return "";
}

async function call(path: string, opt?: RequestInit, timeoutMs = 90000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(PAY_API + path, { ...opt, signal: ctl.signal });
    let j: any = {};
    try { j = await r.json(); } catch (e) { j = {}; }
    if (!r.ok) throw new Error(j.message || j.error || "Something went wrong. Please try again.");
    return j;
  } catch (e: any) {
    if (e && e.name === "AbortError") throw new Error("The server took too long to answer. Please try again.");
    if (e instanceof TypeError) throw new Error("Could not reach the server. Check your internet and try again.");
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export default function PayModal({ plan, onClose }: { plan: PayPlan; onClose: () => void }) {
  const [view, setView] = useState<View>("form");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [waking, setWaking] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paidUntil, setPaidUntil] = useState("");
  const alive = useRef(true);
  const poll = useRef<number | null>(null);

  useEffect(() => {
    alive.current = true;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      alive.current = false;
      if (poll.current) window.clearInterval(poll.current);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const digits = cleanPhone(phone);
  const net = networkOf(digits);
  const phoneOk = /^7[2389]\d{7}$/.test(digits);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const yearlyOk = plan.priceYearly > 0;
  const price = cycle === "yearly" && yearlyOk ? plan.priceYearly : plan.priceMonthly;
  const charge = cycle === "yearly" && yearlyOk ? plan.chargeYearly : plan.chargeMonthly;
  const fee = charge > price ? charge - price : 0;
  const saving = yearlyOk ? plan.priceMonthly * 12 - plan.priceYearly : 0;

  const startPolling = (ref: string, mail: string) => {
    const t0 = Date.now();
    poll.current = window.setInterval(async () => {
      if (!alive.current) return;
      if (Date.now() - t0 > 180000) {
        if (poll.current) window.clearInterval(poll.current);
        setView("late");
        return;
      }
      try {
        const r = await call("/web/status?email=" + encodeURIComponent(mail) + "&ref=" + encodeURIComponent(ref), undefined, 20000);
        if (!alive.current) return;
        if (r.status === "paid") {
          if (poll.current) window.clearInterval(poll.current);
          setPaidUntil(r.paidUntil ? String(r.paidUntil).slice(0, 10) : "");
          setView("ok");
        } else if (r.status === "failed") {
          if (poll.current) window.clearInterval(poll.current);
          setView("fail");
        }
      } catch (e) { /* keep waiting; next tick retries */ }
    }, 3000);
  };

  const submit = async () => {
    setErr("");
    if (!emailOk) { setErr("Enter the e-mail you registered with in Trackly."); return; }
    if (!phoneOk) { setErr("Enter a valid MTN or Airtel number, for example 078 123 4567."); return; }
    setBusy(true);
    const wake = window.setTimeout(() => alive.current && setWaking(true), 5000);
    try {
      const mail = email.trim();
      const r = await call("/web/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, phone: "0" + digits, planKey: plan.key, billingCycle: cycle }),
      });
      if (!alive.current) return;
      setAmount(Number(r.amount) || charge);
      setView("wait");
      startPolling(String(r.ref), mail);
    } catch (e: any) {
      if (alive.current) setErr(e.message || "Something went wrong. Please try again.");
    } finally {
      window.clearTimeout(wake);
      if (alive.current) { setBusy(false); setWaking(false); }
    }
  };

  const retry = () => { setErr(""); setView("form"); };

  const label: React.CSSProperties = { fontFamily: BODY, fontSize: "0.82rem", fontWeight: 600, color: "rgba(11,31,58,0.65)", display: "block", marginBottom: 6 };
  const input: React.CSSProperties = { width: "100%", boxSizing: "border-box", padding: "0.8rem 0.9rem", borderRadius: 10, border: "1px solid rgba(11,31,58,0.2)", fontFamily: BODY, fontSize: "1rem", color: NAVY, background: "#fff", outline: "none" };
  const primary: React.CSSProperties = { width: "100%", padding: "0.95rem", borderRadius: 10, border: "none", background: TEAL, color: NAVY, fontFamily: BODY, fontWeight: 800, fontSize: "1rem", cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1 };
  const ghost: React.CSSProperties = { ...primary, background: "transparent", border: "1px solid rgba(11,31,58,0.2)", color: NAVY, fontWeight: 700, marginTop: 10 };

  return (
    <div role="dialog" aria-modal="true" aria-label={"Pay for " + plan.name}
      onMouseDown={(e) => { if (e.target === e.currentTarget && view !== "wait") onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(11,31,58,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
      <style>{"@keyframes ixspin{to{transform:rotate(360deg)}}@keyframes ixpop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.ixsheet{animation:none!important}.ixspin{animation-duration:3s!important}}"}</style>
      <div className="ixsheet" style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 440, padding: "1.6rem 1.5rem", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.35)", animation: "ixpop .25s ease" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 12, right: 12, border: "none", background: "transparent", cursor: "pointer", color: "rgba(11,31,58,0.5)", padding: 6, display: "flex" }}>
          <X size={20} />
        </button>

        {view === "form" && (
          <div>
            <h3 style={{ fontFamily: HEAD, fontSize: "1.5rem", fontWeight: 600, color: NAVY, margin: "0 0 0.25rem" }}>Pay for {plan.name}</h3>
            <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: "rgba(11,31,58,0.6)", margin: "0 0 1.2rem" }}>
              Use the e-mail of your Trackly account. Pay with MTN Mobile Money or Airtel Money.
            </p>

            {yearlyOk && (
              <div style={{ display: "flex", gap: 6, background: "rgba(11,31,58,0.06)", padding: 4, borderRadius: 12, marginBottom: "1.1rem" }}>
                {(["monthly", "yearly"] as const).map((c) => (
                  <button key={c} onClick={() => setCycle(c)} style={{ flex: 1, padding: "0.6rem 0.4rem", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 700, fontSize: "0.88rem", background: cycle === c ? "#fff" : "transparent", color: NAVY, boxShadow: cycle === c ? "0 1px 6px rgba(11,31,58,0.15)" : "none" }}>
                    {c === "monthly" ? "Monthly" : "Yearly"}
                    {c === "yearly" && saving > 0 && <span style={{ display: "block", fontSize: "0.72rem", color: "#0a8f84", fontWeight: 700 }}>Save RWF {fmt(saving)}</span>}
                  </button>
                ))}
              </div>
            )}

            <label style={label} htmlFor="ix-email">Trackly account e-mail</label>
            <input id="ix-email" style={input} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <div style={{ height: 14 }} />
            <label style={label} htmlFor="ix-phone">Mobile money number</label>
            <div style={{ position: "relative" }}>
              <input id="ix-phone" style={{ ...input, paddingRight: net ? 80 : undefined }} type="tel" inputMode="tel" autoComplete="tel" placeholder="078 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {net && (
                <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontFamily: BODY, fontWeight: 800, fontSize: "0.75rem", padding: "0.25rem 0.6rem", borderRadius: 100, background: net === "MTN" ? "#FFCC00" : "#E4002B", color: net === "MTN" ? "#111" : "#fff" }}>{net}</span>
              )}
            </div>

            <div style={{ margin: "1.2rem 0", padding: "0.9rem 1rem", borderRadius: 12, background: "rgba(0,180,166,0.08)", fontFamily: BODY, fontSize: "0.9rem", color: NAVY }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>{plan.name} ({cycle})</span><strong>RWF {fmt(price)}</strong></div>
              {fee > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(11,31,58,0.6)", marginTop: 4 }}><span>Mobile money fee</span><span>RWF {fmt(fee)}</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(11,31,58,0.1)" }}><span>You pay</span><strong>RWF {fmt(charge)}</strong></div>
            </div>

            {err && (
              <div role="alert" style={{ display: "flex", gap: 8, alignItems: "flex-start", color: "#B42318", fontFamily: BODY, fontSize: "0.88rem", marginBottom: 12 }}>
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} /><span>{err}</span>
              </div>
            )}

            <button style={primary} onClick={submit} disabled={busy}>
              {busy ? (waking ? "Connecting to the server..." : "Sending request...") : "Pay RWF " + fmt(charge)}
            </button>
            {waking && <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(11,31,58,0.55)", textAlign: "center", margin: "10px 0 0" }}>The server is waking up. This can take up to a minute.</p>}
            <p style={{ fontFamily: BODY, fontSize: "0.78rem", color: "rgba(11,31,58,0.5)", textAlign: "center", margin: "12px 0 0", display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
              <Lock size={13} /> Secure payment by Paypack
            </p>
          </div>
        )}

        {view === "wait" && (
          <div style={{ textAlign: "center", padding: "1rem 0 0.5rem" }}>
            <div className="ixspin" style={{ width: 54, height: 54, margin: "0 auto 1.2rem", borderRadius: "50%", border: "4px solid rgba(0,180,166,0.2)", borderTopColor: TEAL, animation: "ixspin 1s linear infinite" }} />
            <h3 style={{ fontFamily: HEAD, fontSize: "1.45rem", fontWeight: 600, color: NAVY, margin: "0 0 0.5rem" }}>Approve on your phone</h3>
            <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(11,31,58,0.65)", lineHeight: 1.6, margin: 0 }}>
              We sent a request for RWF {fmt(amount)} to 0{digits}. Enter your {net || "mobile money"} PIN to confirm. Keep this window open.
            </p>
          </div>
        )}

        {view === "ok" && (
          <div style={{ textAlign: "center", padding: "0.75rem 0 0" }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: TEAL, margin: "0 auto 1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Check size={30} strokeWidth={3} /></div>
            <h3 style={{ fontFamily: HEAD, fontSize: "1.5rem", fontWeight: 600, color: NAVY, margin: "0 0 0.5rem" }}>Payment received</h3>
            <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(11,31,58,0.65)", lineHeight: 1.6, margin: "0 0 1.2rem" }}>
              {plan.name} is now active on your Trackly account{paidUntil ? " until " + paidUntil : ""}. Open the app to see it.
            </p>
            <button style={primary} onClick={onClose}>Done</button>
          </div>
        )}

        {(view === "fail" || view === "late") && (
          <div style={{ textAlign: "center", padding: "0.75rem 0 0" }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: "#B42318", margin: "0 auto 1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><AlertCircle size={30} /></div>
            <h3 style={{ fontFamily: HEAD, fontSize: "1.5rem", fontWeight: 600, color: NAVY, margin: "0 0 0.5rem" }}>{view === "fail" ? "Payment not completed" : "Still waiting"}</h3>
            <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(11,31,58,0.65)", lineHeight: 1.6, margin: "0 0 1.2rem" }}>
              {view === "fail"
                ? "The payment was not completed. You have not been charged unless you approved it."
                : "We have not received a confirmation yet. If you approved the payment, your plan will activate within a few minutes. If not, try again."}
            </p>
            <button style={primary} onClick={retry}>Try again</button>
            <button style={ghost} onClick={onClose}>Close</button>
            <p style={{ fontFamily: BODY, fontSize: "0.78rem", color: "rgba(11,31,58,0.5)", margin: "12px 0 0" }}>Need help? support@ivanexo.com</p>
          </div>
        )}
      </div>
    </div>
  );
}
