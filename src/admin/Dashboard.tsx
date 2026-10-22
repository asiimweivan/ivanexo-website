import { useEffect, useState } from "react";
import { authService, api, tokenStorage } from "../services/api";

function AuditTrail() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<any[]>("/admin/audit").then(data => {
      setLogs(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case "USER_SUSPENDED": return { bg: "rgba(255,80,80,0.08)", color: "#cc4444", border: "1px solid rgba(255,80,80,0.2)" };
      case "ROLE_CHANGE": return { bg: "rgba(240,165,0,0.08)", color: "#C98A00", border: "1px solid rgba(240,165,0,0.2)" };
      default: return { bg: "rgba(0,180,166,0.08)", color: "#007A70", border: "1px solid rgba(0,180,166,0.2)" };
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid rgba(11,31,58,0.08)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(11,31,58,0.06)" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>
          Audit Trail <span style={{ color: "#00B4A6", marginLeft: "0.4rem" }}>{logs.length}</span>
        </h3>
        <button onClick={() => { setLoading(true); api.get<any[]>("/admin/audit").then(d => { setLogs(d); setLoading(false); }).catch(() => setLoading(false)); }}
          style={{ background: "none", border: "none", color: "#00B4A6", cursor: "pointer", fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem" }}>
          Refresh
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              {["Time", "Actor", "Action", "Target", "Details"].map(h => (
                <th key={h} style={{ padding: "0.875rem 1.25rem", textAlign: "left", fontSize: "0.72rem", color: "rgba(11,31,58,0.4)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid rgba(11,31,58,0.06)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>Loading audit logs...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>
                No audit logs yet. Actions like suspending users or changing roles will appear here.
              </td></tr>
            ) : logs.map((log: any) => {
              const ac = getActionColor(log.action);
              return (
                <tr key={log.id} style={{ borderBottom: "1px solid rgba(11,31,58,0.05)", transition: "background 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.5)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    {new Date(log.createdAt).toLocaleString("en-RW")}
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ color: "#0B1F3A", fontSize: "0.875rem", fontWeight: 600 }}>{log.actorName}</div>
                    <div style={{ color: "rgba(11,31,58,0.4)", fontSize: "0.72rem" }}>{log.actorRole}</div>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ backgroundColor: ac.bg, color: ac.color, border: ac.border, padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>
                      {log.action?.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.5)", fontSize: "0.8rem" }}>
                    {log.targetType} {log.targetId?.slice(0, 8)}...
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.65)", fontSize: "0.85rem", maxWidth: 300 }}>
                    {log.details}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("all");

  useEffect(() => {
    const u = tokenStorage.getUser();
    if (!u) { window.location.href = "/admin/login"; return; }
    if (u.role?.toLowerCase() !== "admin") { window.location.href = "/admin/login"; return; }
    setUser(u);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, bizRes, agentsRes] = await Promise.allSettled([
        api.get<any[]>("/admin/users"),
        api.get<any[]>("/admin/businesses"),
        api.get<any[]>("/agents/admin/all"),
      ]);
      if (usersRes.status === "fulfilled") setUsers(usersRes.value);
      if (bizRes.status === "fulfilled") setBusinesses(bizRes.value);
      if (agentsRes.status === "fulfilled") setAgents(agentsRes.value);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const suspendUser = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/suspend`);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
    } catch (e) { console.error(e); }
  };

  const reviewAgent = async (agentId: string, status: string) => {
    try {
      await api.patch(`/agents/admin/${agentId}/review`, { status, note: `${status} by admin` });
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status } : a));
    } catch (e) { console.error(e); }
  };

  const filteredUsers = users.filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAgents = agents.filter(a => agentFilter === "all" || a.status?.toLowerCase() === agentFilter);

  const stats = [
    { label: "Total Users", value: users.length, icon: "U", color: "#00B4A6", bg: "rgba(0,180,166,0.08)", border: "rgba(0,180,166,0.2)" },
    { label: "Businesses", value: businesses.length, icon: "B", color: "#F0A500", bg: "rgba(240,165,0,0.08)", border: "rgba(240,165,0,0.2)" },
    { label: "Agents", value: agents.length, icon: "AG", color: "#00B4A6", bg: "rgba(0,180,166,0.08)", border: "rgba(0,180,166,0.2)" },
    { label: "Active Users", value: users.filter(u => u.isActive).length, icon: "AC", color: "#F0A500", bg: "rgba(240,165,0,0.08)", border: "rgba(240,165,0,0.2)" },
  ];

  const sidebarItems = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users", count: users.length },
    { id: "businesses", label: "Businesses", count: businesses.length },
    { id: "agents", label: "Agents", count: agents.length },
    { id: "audit", label: "Audit Trail" },
  ];

  const getRoleColor = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN": return { bg: "rgba(240,165,0,0.1)", color: "#C98A00", border: "1px solid rgba(240,165,0,0.25)" };
      case "BUSINESS_OWNER": return { bg: "rgba(0,180,166,0.1)", color: "#007A70", border: "1px solid rgba(0,180,166,0.25)" };
      case "STAFF": return { bg: "rgba(11,31,58,0.06)", color: "#4A6A8A", border: "1px solid rgba(11,31,58,0.12)" };
      default: return { bg: "rgba(11,31,58,0.04)", color: "#7A9AB0", border: "1px solid rgba(11,31,58,0.08)" };
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved": return { bg: "rgba(0,180,166,0.08)", color: "#007A70", border: "1px solid rgba(0,180,166,0.2)" };
      case "pending": return { bg: "rgba(240,165,0,0.08)", color: "#C98A00", border: "1px solid rgba(240,165,0,0.2)" };
      case "rejected": return { bg: "rgba(255,80,80,0.08)", color: "#cc4444", border: "1px solid rgba(255,80,80,0.2)" };
      case "suspended": return { bg: "rgba(255,80,80,0.08)", color: "#cc4444", border: "1px solid rgba(255,80,80,0.2)" };
      default: return { bg: "rgba(11,31,58,0.06)", color: "#4A6A8A", border: "1px solid rgba(11,31,58,0.1)" };
    }
  };

  const card: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid rgba(11,31,58,0.08)",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(11,31,58,0.06)",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f8", display: "flex", fontFamily: '"Satoshi", sans-serif' }}>

      {/* SIDEBAR */}
      <div style={{ width: 260, backgroundColor: "#0B1F3A", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100, boxShadow: "4px 0 24px rgba(11,31,58,0.2)" }}>

        <div style={{ padding: "1.75rem 1.5rem 1rem", overflow: "visible", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ cursor: "pointer", height: 64, display: "flex", alignItems: "center" }}>
            <img src="/logo.png" alt="Ivanexo Ltd"
              style={{ height: 42, width: "auto", objectFit: "contain", transform: "scale(4.5)", transformOrigin: "left center", marginLeft: "-20px", filter: "brightness(0) invert(1)" }} />
          </div>
          <div style={{ marginTop: "2.8rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "rgba(0,180,166,0.12)", border: "1px solid rgba(0,180,166,0.2)", borderRadius: "100px", padding: "0.25rem 0.8rem", fontSize: "0.68rem", color: "#00B4A6", fontWeight: 700, letterSpacing: "0.1em" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#00B4A6", display: "inline-block" }} />
              ADMIN PORTAL
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "1.25rem 0.75rem", overflowY: "auto" }}>
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.75rem 1rem", borderRadius: "10px", border: "none",
              backgroundColor: activeTab === item.id ? "rgba(0,180,166,0.14)" : "transparent",
              borderLeft: activeTab === item.id ? "3px solid #00B4A6" : "3px solid transparent",
              color: activeTab === item.id ? "#00B4A6" : "rgba(255,255,255,0.55)",
              fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", transition: "all 0.2s", textAlign: "left", marginBottom: "0.2rem",
            }}
              onMouseEnter={e => { if (activeTab !== item.id) { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#ffffff"; } }}
              onMouseLeave={e => { if (activeTab !== item.id) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}>
              {item.label}
              {item.count !== undefined && (
                <span style={{ backgroundColor: "rgba(0,180,166,0.2)", color: "#00B4A6", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "100px" }}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "10px", marginBottom: "0.75rem" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #00B4A6, #007A70)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#ffffff", fontSize: "1.1rem", flexShrink: 0 }}>
              {user?.fullName?.[0] || "A"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: "0.875rem", color: "#ffffff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.fullName}</div>
              <div style={{ fontSize: "0.72rem", color: "#00B4A6", fontWeight: 600 }}>Super Admin</div>
            </div>
          </div>
          <button onClick={() => authService.logout()} style={{
            width: "100%", padding: "0.6rem", borderRadius: "8px",
            backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)", cursor: "pointer",
            fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,80,80,0.4)"; e.currentTarget.style.color = "#ff6b6b"; e.currentTarget.style.backgroundColor = "rgba(255,80,80,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.backgroundColor = "transparent"; }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft: 260, flex: 1, padding: "2.5rem", minHeight: "100vh" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(11,31,58,0.08)" }}>
          <div>
            <h1 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "1.8rem", fontWeight: 700, color: "#0B1F3A", marginBottom: "0.2rem" }}>
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "users" && "User Management"}
              {activeTab === "businesses" && "Businesses"}
              {activeTab === "agents" && "Agent Management"}
              {activeTab === "audit" && "Audit Trail"}
            </h1>
            <p style={{ color: "rgba(11,31,58,0.45)", fontSize: "0.875rem" }}>
              {new Date().toLocaleDateString("en-RW", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button onClick={loadData} style={{
            backgroundColor: "#0B1F3A", border: "none", color: "#ffffff",
            padding: "0.65rem 1.5rem", borderRadius: "8px",
            fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.875rem",
            cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(11,31,58,0.2)",
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#0B1F3A"; }}>
            Refresh
          </button>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
              {stats.map(s => (
                <div key={s.label} style={{ ...card, padding: "1.5rem", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(11,31,58,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,31,58,0.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(11,31,58,0.06)"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", backgroundColor: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", fontWeight: 700, color: s.color, fontSize: "0.82rem" }}>{s.icon}</div>
                  <div style={{ fontFamily: '"Clash Display", sans-serif', fontSize: "2.4rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>{loading ? "—" : s.value}</div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(11,31,58,0.5)", marginTop: "0.4rem", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div style={{ ...card, overflow: "hidden" }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>Recent Users</h3>
                  <button onClick={() => setActiveTab("users")} style={{ background: "none", border: "none", color: "#00B4A6", cursor: "pointer", fontSize: "0.8rem", fontFamily: '"Satoshi", sans-serif', fontWeight: 600 }}>View all</button>
                </div>
                <div style={{ padding: "0.5rem" }}>
                  {loading ? <p style={{ padding: "1rem", color: "rgba(11,31,58,0.35)", fontSize: "0.875rem" }}>Loading...</p> :
                    users.slice(-6).reverse().map((u: any) => {
                      const rc = getRoleColor(u.role);
                      return (
                        <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1rem", borderRadius: "8px", transition: "background 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.04)"; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #00B4A6, #0B1F3A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", flexShrink: 0 }}>
                              {u.fullName?.[0]}
                            </div>
                            <div>
                              <div style={{ color: "#0B1F3A", fontSize: "0.875rem", fontWeight: 600 }}>{u.fullName}</div>
                              <div style={{ color: "rgba(11,31,58,0.4)", fontSize: "0.75rem" }}>{u.phone}</div>
                            </div>
                          </div>
                          <span style={{ backgroundColor: rc.bg, color: rc.color, border: rc.border, padding: "0.2rem 0.65rem", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 700 }}>
                            {u.role?.replace("_", " ")}
                          </span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              <div style={{ ...card, overflow: "hidden" }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>Businesses</h3>
                  <button onClick={() => setActiveTab("businesses")} style={{ background: "none", border: "none", color: "#00B4A6", cursor: "pointer", fontSize: "0.8rem", fontFamily: '"Satoshi", sans-serif', fontWeight: 600 }}>View all</button>
                </div>
                <div style={{ padding: "0.5rem" }}>
                  {loading ? <p style={{ padding: "1rem", color: "rgba(11,31,58,0.35)", fontSize: "0.875rem" }}>Loading...</p> :
                    businesses.length === 0 ?
                      <p style={{ padding: "1.5rem", color: "rgba(11,31,58,0.35)", fontSize: "0.875rem", textAlign: "center" }}>No businesses yet</p> :
                      businesses.slice(0, 6).map((b: any) => (
                        <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1rem", borderRadius: "8px", transition: "background 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(240,165,0,0.04)"; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <div style={{ width: 34, height: 34, borderRadius: "8px", backgroundColor: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#F0A500", fontSize: "0.8rem" }}>B</div>
                            <div>
                              <div style={{ color: "#0B1F3A", fontSize: "0.875rem", fontWeight: 600 }}>{b.name || b.businessName || "Business"}</div>
                              <div style={{ color: "rgba(11,31,58,0.4)", fontSize: "0.75rem" }}>{b.plan || "Free plan"}</div>
                            </div>
                          </div>
                          <span style={{ backgroundColor: "rgba(0,180,166,0.08)", color: "#007A70", border: "1px solid rgba(0,180,166,0.2)", padding: "0.2rem 0.65rem", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 700 }}>Active</span>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div>
            <input type="text" placeholder="Search users by name, phone or role..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 420, padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid rgba(11,31,58,0.12)", borderRadius: "10px", color: "#0B1F3A", fontFamily: '"Satoshi", sans-serif', fontSize: "0.9rem", outline: "none", boxSizing: "border-box", boxShadow: "0 1px 4px rgba(11,31,58,0.06)", marginBottom: "1.5rem" }}
              onFocus={e => { e.currentTarget.style.borderColor = "#00B4A6"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,180,166,0.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(11,31,58,0.12)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(11,31,58,0.06)"; }} />
            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)" }}>
                <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>
                  All Users <span style={{ color: "#00B4A6", marginLeft: "0.4rem" }}>{filteredUsers.length}</span>
                </h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      {["User", "Phone", "Role", "App Role", "Status", "Verified", "Actions"].map(h => (
                        <th key={h} style={{ padding: "0.875rem 1.25rem", textAlign: "left", fontSize: "0.72rem", color: "rgba(11,31,58,0.4)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid rgba(11,31,58,0.06)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <tr><td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>Loading...</td></tr>
                      : filteredUsers.map((u: any) => {
                        const rc = getRoleColor(u.role);
                        return (
                          <tr key={u.id} style={{ borderBottom: "1px solid rgba(11,31,58,0.05)", transition: "background 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.02)"; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #00B4A6, #0B1F3A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", flexShrink: 0 }}>{u.fullName?.[0]}</div>
                                <div>
                                  <div style={{ color: "#0B1F3A", fontSize: "0.875rem", fontWeight: 600 }}>{u.fullName}</div>
                                  <div style={{ color: "rgba(11,31,58,0.35)", fontSize: "0.72rem" }}>{u.id?.slice(0, 8)}...</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.6)", fontSize: "0.875rem", whiteSpace: "nowrap" }}>{u.phone}</td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <span style={{ backgroundColor: rc.bg, color: rc.color, border: rc.border, padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>{u.role?.replace("_", " ")}</span>
                            </td>
                            <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.5)", fontSize: "0.8rem" }}>{u.appRole || "—"}</td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <span style={{ backgroundColor: u.isActive ? "rgba(0,180,166,0.08)" : "rgba(255,80,80,0.08)", color: u.isActive ? "#007A70" : "#cc4444", border: u.isActive ? "1px solid rgba(0,180,166,0.2)" : "1px solid rgba(255,80,80,0.2)", padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>
                                {u.isActive ? "Active" : "Suspended"}
                              </span>
                            </td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <span style={{ color: u.isVerified ? "#007A70" : "rgba(11,31,58,0.25)", fontSize: "0.9rem", fontWeight: 700 }}>{u.isVerified ? "Yes" : "No"}</span>
                            </td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              {u.isActive && u.role !== "ADMIN" && (
                                <button onClick={() => suspendUser(u.id)} style={{ padding: "0.3rem 0.8rem", borderRadius: "6px", backgroundColor: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.2)", color: "#cc4444", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: '"Satoshi", sans-serif', transition: "all 0.2s" }}
                                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,80,80,0.14)"; }}
                                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,80,80,0.06)"; }}>
                                  Suspend
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BUSINESSES */}
        {activeTab === "businesses" && (
          <div style={{ ...card, overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)" }}>
              <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>
                All Businesses <span style={{ color: "#F0A500", marginLeft: "0.4rem" }}>{businesses.length}</span>
              </h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    {["Business", "ID", "Plan", "Status"].map(h => (
                      <th key={h} style={{ padding: "0.875rem 1.25rem", textAlign: "left", fontSize: "0.72rem", color: "rgba(11,31,58,0.4)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid rgba(11,31,58,0.06)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>Loading...</td></tr>
                    : businesses.length === 0 ? <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>No businesses found</td></tr>
                    : businesses.map((b: any) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid rgba(11,31,58,0.05)", transition: "background 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(240,165,0,0.02)"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                        <td style={{ padding: "1rem 1.25rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "10px", backgroundColor: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#F0A500", fontSize: "0.8rem" }}>B</div>
                            <div style={{ color: "#0B1F3A", fontWeight: 600, fontSize: "0.875rem" }}>{b.name || b.businessName || "Unnamed Business"}</div>
                          </div>
                        </td>
                        <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.35)", fontSize: "0.75rem", fontFamily: "monospace" }}>{b.id?.slice(0, 14)}...</td>
                        <td style={{ padding: "1rem 1.25rem" }}>
                          <span style={{ backgroundColor: "rgba(0,180,166,0.08)", color: "#007A70", border: "1px solid rgba(0,180,166,0.2)", padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>{b.plan || "Free"}</span>
                        </td>
                        <td style={{ padding: "1rem 1.25rem" }}>
                          <span style={{ backgroundColor: "rgba(0,180,166,0.08)", color: "#007A70", border: "1px solid rgba(0,180,166,0.2)", padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>Active</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AGENTS */}
        {activeTab === "agents" && (
          <div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {["all", "pending", "approved", "rejected", "suspended"].map(f => (
                <button key={f} onClick={() => setAgentFilter(f)} style={{
                  padding: "0.5rem 1.25rem", borderRadius: "100px",
                  backgroundColor: agentFilter === f ? "#0B1F3A" : "#ffffff",
                  color: agentFilter === f ? "#ffffff" : "rgba(11,31,58,0.6)",
                  fontFamily: '"Satoshi", sans-serif', fontWeight: 600, fontSize: "0.85rem",
                  cursor: "pointer", transition: "all 0.2s",
                  border: agentFilter === f ? "none" : "1px solid rgba(11,31,58,0.1)",
                  boxShadow: agentFilter === f ? "0 2px 8px rgba(11,31,58,0.2)" : "0 1px 4px rgba(11,31,58,0.06)",
                  textTransform: "capitalize" as any,
                }}>
                  {f === "all" ? "All Agents" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(11,31,58,0.06)" }}>
                <h3 style={{ fontFamily: '"Clash Display", sans-serif', color: "#0B1F3A", fontSize: "0.95rem", fontWeight: 700 }}>
                  Agents <span style={{ color: "#00B4A6", marginLeft: "0.4rem" }}>{filteredAgents.length}</span>
                </h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      {["Agent", "Phone", "Location", "Status", "Signups", "Earnings (RWF)", "Actions"].map(h => (
                        <th key={h} style={{ padding: "0.875rem 1.25rem", textAlign: "left", fontSize: "0.72rem", color: "rgba(11,31,58,0.4)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid rgba(11,31,58,0.06)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <tr><td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>Loading agents...</td></tr>
                      : filteredAgents.length === 0 ? <tr><td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "rgba(11,31,58,0.3)" }}>No agents found</td></tr>
                      : filteredAgents.map((a: any) => {
                        const sc = getAgentStatusColor(a.status);
                        return (
                          <tr key={a.id} style={{ borderBottom: "1px solid rgba(11,31,58,0.05)", transition: "background 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.02)"; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #F0A500, #C98A00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", flexShrink: 0 }}>{a.fullName?.[0]}</div>
                                <div>
                                  <div style={{ color: "#0B1F3A", fontSize: "0.875rem", fontWeight: 600 }}>{a.fullName}</div>
                                  <div style={{ color: "rgba(11,31,58,0.35)", fontSize: "0.72rem" }}>{a.agentCode || "—"}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.6)", fontSize: "0.875rem" }}>{a.phone}</td>
                            <td style={{ padding: "1rem 1.25rem", color: "rgba(11,31,58,0.6)", fontSize: "0.875rem" }}>{a.district}, {a.province}</td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <span style={{ backgroundColor: sc.bg, color: sc.color, border: sc.border, padding: "0.25rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>{a.status}</span>
                            </td>
                            <td style={{ padding: "1rem 1.25rem", color: "#00B4A6", fontWeight: 700 }}>{a.totalSignups ?? 0}</td>
                            <td style={{ padding: "1rem 1.25rem", color: "#F0A500", fontWeight: 700 }}>{(a.totalEarnings ?? 0).toLocaleString()}</td>
                            <td style={{ padding: "1rem 1.25rem" }}>
                              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                {a.status === "pending" && <>
                                  <button onClick={() => reviewAgent(a.id, "approved")} style={{ padding: "0.3rem 0.75rem", borderRadius: "6px", backgroundColor: "rgba(0,180,166,0.08)", border: "1px solid rgba(0,180,166,0.2)", color: "#007A70", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: '"Satoshi", sans-serif' }}>Approve</button>
                                  <button onClick={() => reviewAgent(a.id, "rejected")} style={{ padding: "0.3rem 0.75rem", borderRadius: "6px", backgroundColor: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.2)", color: "#cc4444", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: '"Satoshi", sans-serif' }}>Reject</button>
                                </>}
                                {a.status === "approved" && (
                                  <button onClick={() => reviewAgent(a.id, "suspended")} style={{ padding: "0.3rem 0.75rem", borderRadius: "6px", backgroundColor: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.2)", color: "#C98A00", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: '"Satoshi", sans-serif' }}>Suspend</button>
                                )}
                                {(a.status === "rejected" || a.status === "suspended") && (
                                  <button onClick={() => reviewAgent(a.id, "approved")} style={{ padding: "0.3rem 0.75rem", borderRadius: "6px", backgroundColor: "rgba(0,180,166,0.06)", border: "1px solid rgba(0,180,166,0.2)", color: "#007A70", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, fontFamily: '"Satoshi", sans-serif' }}>Re-activate</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AUDIT */}
        {activeTab === "audit" && <AuditTrail />}
      </div>
    </div>
  );
}
