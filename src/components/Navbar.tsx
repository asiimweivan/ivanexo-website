import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  {
    label: "Company", children: [
      { label: "About Us", href: "#about" },
    ]
  },
  {
    label: "Trackly", children: [
      { label: "Trackly App", href: "#trackly" },
      { label: "How It Works", href: "#how" },
      { label: "Download App", href: "#download" },
    ]
  },
  {
    label: "Trackly Plans", children: [
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ]
  },
  {
    label: "Legal", children: [
      { label: "Privacy Policy", href: "https://trackly.ivanexo.com/privacy" },
      { label: "Delete Account", href: "https://trackly.ivanexo.com/delete-account" },
      { label: "Terms of Service", href: "#terms" },
    ]
  },
  { label: "Contact", href: "#contact" },
];

function DropdownMenu({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  if (!item.children) {
    return (
      <a href={item.href}
        style={{ color: "#0B1F3A", textDecoration: "none", fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.02em", transition: "color 0.2s", whiteSpace: "nowrap" }}
        onMouseEnter={e => { e.currentTarget.style.color = "#00B4A6"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#0B1F3A"; }}>
        {item.label}
      </a>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button style={{
        display: "flex", alignItems: "center", gap: "0.3rem",
        color: open ? "#00B4A6" : "#0B1F3A",
        background: "none", border: "none", cursor: "pointer",
        fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "0.95rem",
        letterSpacing: "0.02em", transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
      }}>
        {item.label}
        <ChevronDown size={15} style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
          backgroundColor: "#ffffff", border: "1px solid rgba(11,31,58,0.08)",
          borderRadius: "12px", boxShadow: "0 16px 48px rgba(11,31,58,0.12)",
          padding: "0.5rem", minWidth: 200, zIndex: 100, animation: "fadeIn 0.15s ease",
        }}>
          <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 12, height: 6, overflow: "hidden" }}>
            <div style={{ width: 12, height: 12, backgroundColor: "#ffffff", border: "1px solid rgba(11,31,58,0.08)", transform: "rotate(45deg)", transformOrigin: "center", marginTop: 3 }} />
          </div>
          {item.children.map(child => (
            <a key={child.label} href={child.href}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1rem", borderRadius: "8px", color: "#0B1F3A", textDecoration: "none", fontFamily: '"Manrope", sans-serif', fontWeight: 500, fontSize: "0.9rem", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.08)"; e.currentTarget.style.color = "#00B4A6"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0B1F3A"; }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6", flexShrink: 0 }} />
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mobileMenuIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: isMobile ? "70px" : "80px",
        paddingLeft: isMobile ? "1rem" : "1.5rem",
        paddingRight: isMobile ? "1rem" : "2rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 20px rgba(11,31,58,0.12)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease", overflow: "visible",
      }}>

        {/* LOGO */}
        <div style={{ cursor: "pointer", flexShrink: 0, width: isMobile ? "160px" : "260px" }}>
          <img src="/logo.png" alt="Ivanexo Ltd"
            style={{
              height: isMobile ? 36 : 42,
              width: "auto", objectFit: "contain",
              transform: isMobile ? "scale(3.2)" : "scale(4.5)",
              transformOrigin: "left center",
            }} />
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1, justifyContent: "center" }}>
            {NAV_ITEMS.map(item => (
              <DropdownMenu key={item.label} item={item} />
            ))}
          </div>
        )}

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          {!isMobile && (
            <a href="#contact"
              style={{ backgroundColor: "#00B4A6", color: "#ffffff", padding: "0.6rem 1.4rem", borderRadius: "6px", fontFamily: '"Manrope", sans-serif', fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#008F84"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#00B4A6"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Contact Us
            </a>
          )}

          {/* HAMBURGER — mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 44, height: 44, borderRadius: "10px",
                backgroundColor: menuOpen ? "#0B1F3A" : "rgba(11,31,58,0.06)",
                border: menuOpen ? "none" : "1px solid rgba(11,31,58,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.25s",
                color: menuOpen ? "#ffffff" : "#0B1F3A",
                flexShrink: 0,
              }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && isMobile && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0, bottom: 0,
          backgroundColor: "#ffffff", zIndex: 999,
          overflowY: "auto",
          animation: "mobileMenuIn 0.3s ease",
          boxShadow: "0 8px 32px rgba(11,31,58,0.15)",
        }}>
          {/* Logo in menu */}
          <div style={{ padding: "1.5rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(11,31,58,0.06)" }}>
            <img src="/logo.png" alt="Ivanexo" style={{ height: 36, objectFit: "contain" }} />
          </div>

          {/* Nav items */}
          <div style={{ padding: "0.75rem" }}>
            {NAV_ITEMS.map(item => (
              <div key={item.label}>
                {!item.children ? (
                  <a href={item.href} onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center",
                      padding: "0.9rem 1rem", color: "#0B1F3A",
                      textDecoration: "none", fontFamily: '"Jost", sans-serif',
                      fontWeight: 700, fontSize: "1.1rem", borderRadius: "10px",
                      transition: "all 0.2s", marginBottom: "0.2rem",
                    }}
                    onTouchStart={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.06)"; }}
                    onTouchEnd={e => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                    {item.label}
                  </a>
                ) : (
                  <div style={{ marginBottom: "0.2rem" }}>
                    <button
                      onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        width: "100%", padding: "0.9rem 1rem",
                        background: mobileOpen === item.label ? "rgba(0,180,166,0.06)" : "none",
                        border: "none", cursor: "pointer",
                        fontFamily: '"Jost", sans-serif', fontWeight: 700, fontSize: "1.1rem",
                        color: mobileOpen === item.label ? "#00B4A6" : "#0B1F3A",
                        borderRadius: "10px", transition: "all 0.2s",
                      }}>
                      {item.label}
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        backgroundColor: mobileOpen === item.label ? "#00B4A6" : "rgba(11,31,58,0.06)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.25s",
                      }}>
                        <ChevronDown size={14} style={{
                          color: mobileOpen === item.label ? "#ffffff" : "#0B1F3A",
                          transform: mobileOpen === item.label ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.25s",
                        }} />
                      </div>
                    </button>

                    {mobileOpen === item.label && (
                      <div style={{
                        margin: "0.25rem 0 0.5rem 1rem",
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px", overflow: "hidden",
                        border: "1px solid rgba(11,31,58,0.06)",
                      }}>
                        {item.children.map((child, i) => (
                          <a key={child.label} href={child.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              display: "flex", alignItems: "center", gap: "0.75rem",
                              padding: "0.85rem 1.25rem",
                              color: "#0B1F3A", textDecoration: "none",
                              fontFamily: '"Manrope", sans-serif', fontWeight: 600, fontSize: "0.95rem",
                              borderBottom: i < item.children.length - 1 ? "1px solid rgba(11,31,58,0.05)" : "none",
                              transition: "all 0.15s",
                            }}
                            onTouchStart={e => { e.currentTarget.style.backgroundColor = "rgba(0,180,166,0.06)"; e.currentTarget.style.color = "#00B4A6"; }}
                            onTouchEnd={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0B1F3A"; }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00B4A6", flexShrink: 0 }} />
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: "1rem 1.25rem 2rem", borderTop: "1px solid rgba(11,31,58,0.06)", marginTop: "0.5rem" }}>
            <a href="#contact" onClick={() => setMenuOpen(false)}
              style={{
                display: "block", textAlign: "center",
                backgroundColor: "#00B4A6", color: "#ffffff",
                padding: "1rem", borderRadius: "12px",
                fontFamily: '"Manrope", sans-serif', fontWeight: 700, fontSize: "1rem",
                textDecoration: "none", marginBottom: "0.75rem",
                boxShadow: "0 4px 16px rgba(0,180,166,0.3)",
              }}>
              Contact Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
