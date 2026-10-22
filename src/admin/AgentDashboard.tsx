import { useEffect, useState } from "react";
import { authService, agentService, tokenStorage } from "../services/api";

export default function AgentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = tokenStorage.getUser();
    if (!u) { window.location.href = "/admin/login"; return; }
    if (u.role?.toLowerCase() !== "agent") { window.location.href = "/admin/login"; return; }
    setUser(u);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, subsRes, commRes] = await Promise.allSettled([
        agentService.getMyProfile(),
        agentService.getSubscribers(),
        agentService.getCommissions(),
      ]);
      if (profileRes.status === "fulfilled") setProfile(profileRes.value);
      if (subsRes.status === "fulfilled") setSubscribers(subsRes.value);
      if (commRes.status === "fulfilled") setCommissions(commRes.value);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "subscribers", label: "My Subscribers", icon: "👥" },
    { id: "commissions", label: "Commissions", icon: "💰" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#070F1D", display: "flex", fontFamily: '"Satoshi", sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 260, backgroundColor: "#0B1F3A", borderRight: "1px solid rgba(0,180,166,0.15)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(0,180,166,0.15)" }}>
          <img src="/logo.png" alt="Ivanexo" style={{ height: 36, filter: "brightness(0) invert(1)" }} />
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#F0A500", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Agent Portal</div>
        </div>
        <nav style={{ flex: 1, padding: "1rem" }}>
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.75rem 1rem", borderRadius: "10px", border: "none",
              backgroundColor: activeTab === item.id ? "rgba(240,165,0,0.15)" : "transparent",
              color: activeTab === item.id ? "#F0A500" : "rgba(255,255,255,0.6)",
              fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.95rem",
              cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              marginBottom: "0.25rem",
              borderLeft: activeTab === item.id ? "3px solid #F0A500" : "3px solid transparent",
            }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem", borderTop: "1px solid rgba(0,180,166,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(240,165,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F0A500", fontWeight: 700 }}>
              {user?.fullName?.[0] || "A"}
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>{user?.fullName}</div>
              <div style={{ fontSize: "0.75rem", color: "#F0A500" }}>Agent — {profile?.agentCode || "..."}</div>
            </div>
          </div>
          <button onClick={() => authService.logout()} style={{
            width: "100%", padding: "0.6rem", borderRadius: "8px",
            backgroundColor: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)",
            color: "#ff6b6b", cursor: "pointer", fontFamily: '"Satoshi", sans-serif',
            fontWeight: 600, fontSize: "0.85rem",
          }}>Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 260, flex: 1, padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.8rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.25rem" }}>
            {activeTab === "overview" && "My Dashboard"}
            {activeTab === "subscribers" && "My Subscribers"}
            {activeTab === "commissions" && "My Commissions"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>Welcome back, {user?.fullName}.</p>
        </div>

        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
              {[
                { label: "Total Signups", value: profile?.totalSignups ?? 0, icon: "👥", color: "#00B4A6" },
                { label: "Active Clients", value: profile?.activeClients ?? 0, icon: "✅", color: "#F0A500" },
                { label: "Total Earnings", value: `${(profile?.totalEarnings ?? 0).toLocaleString()} RWF`, icon: "💰", color: "#00B4A6" },
                { label: "Pending Payout", value: `${(profile?.pendingPayout ?? 0).toLocaleString()} RWF`, icon: "⏳", color: "#F0A500" },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.5rem" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.5rem", fontWeight: 700, color: s.color }}>{loading ? "..." : s.value}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#ffffff", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Profile Info</h3>
              {profile && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { label: "Agent Code", value: profile.agentCode },
                    { label: "Status", value: profile.status },
                    { label: "Province", value: profile.province },
                    { label: "District", value: profile.district },
                    { label: "MoMo Number", value: profile.momoNumber },
                    { label: "MoMo Provider", value: profile.momoProvider },
                  ].map(item => (
                    <div key={item.label} style={{ padding: "0.75rem", backgroundColor: "rgba(0,180,166,0.05)", borderRadius: "8px" }}>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>{item.value || "—"}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "subscribers" && (
          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(0,180,166,0.05)" }}>
                  {["Business", "Phone", "Plan", "Status"].map(h => (
                    <th key={h} style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Loading...</td></tr>
                  : subscribers.length === 0 ? <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No subscribers yet</td></tr>
                  : subscribers.map((s: any) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "1rem 1.5rem", color: "#ffffff", fontWeight: 600 }}>{s.businessName || s.fullName}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)" }}>{s.phone}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "#00B4A6", fontWeight: 600 }}>{s.plan || "—"}</td>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <span style={{ backgroundColor: "rgba(0,180,166,0.15)", color: "#00B4A6", padding: "0.2rem 0.6rem", borderRadius: "100px", fontSize: "0.8rem" }}>{s.status || "active"}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "commissions" && (
          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(0,180,166,0.05)" }}>
                  {["Date", "Business", "Amount (RWF)", "Status"].map(h => (
                    <th key={h} style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Loading...</td></tr>
                  : commissions.length === 0 ? <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No commissions yet</td></tr>
                  : commissions.map((c: any) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)" }}>{c.date || "—"}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "#ffffff", fontWeight: 600 }}>{c.businessName || "—"}</td>
                      <td style={{ padding: "1rem 1.5rem", color: "#F0A500", fontWeight: 700 }}>{(c.amount || 0).toLocaleString()}</td>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <span style={{
                          backgroundColor: c.status === "paid" ? "rgba(0,180,166,0.15)" : "rgba(240,165,0,0.15)",
                          color: c.status === "paid" ? "#00B4A6" : "#F0A500",
                          padding: "0.2rem 0.6rem", borderRadius: "100px", fontSize: "0.8rem",
                        }}>{c.status || "pending"}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
