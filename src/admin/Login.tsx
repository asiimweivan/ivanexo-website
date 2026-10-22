import { useState } from "react";
import { authService } from "../services/api";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await authService.login(phone, password);
      const role = res.user.role?.toLowerCase();
      if (role === "admin" || role === "super_admin") {
        window.location.href = "/admin/dashboard";
      } else if (role === "agent") {
        window.location.href = "/admin/agent";
      } else if (role === "business_owner") {
        window.location.href = "/admin/business";
      } else {
        setError("Unauthorized role.");
      }
    } catch (e: any) {
      setError(e.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", color: "#ffffff",
    fontFamily: '"Satoshi", sans-serif', fontSize: "1rem",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0B1F3A",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,166,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,180,166,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,166,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{
        width: "100%", maxWidth: 440,
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,180,166,0.2)",
        borderRadius: "24px", padding: "3rem 2.5rem",
        position: "relative", zIndex: 1,
        boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <img src="/logo.png" alt="Ivanexo" style={{ height: 50, filter: "brightness(0) invert(1)", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.3rem" }}>Admin Portal</h1>
          <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Sign in to your Ivanexo account</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", color: "#ff6b6b" }}>{error}</p>
          </div>
        )}

        {/* Phone */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>Phone Number</label>
          <input
            type="tel" placeholder="+250 7XX XXX XXX"
            value={phone} onChange={e => setPhone(e.target.value)}
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = "#00B4A6"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>Password</label>
          <input
            type="password" placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = "#00B4A6"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            onKeyDown={e => { if (e.key === "Enter") handleLogin(); }}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "0.95rem",
            backgroundColor: loading ? "rgba(0,180,166,0.5)" : "#00B4A6",
            color: "#ffffff", border: "none", borderRadius: "10px",
            fontFamily: '"Satoshi", sans-serif', fontWeight: 700, fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#008F84"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#00B4A6"; }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", fontFamily: '"Satoshi", sans-serif', fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginTop: "1.5rem" }}>
          Ivanexo Ltd Admin Portal — Authorized Access Only
        </p>
      </div>
    </div>
  );
}
