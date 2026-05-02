import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#00C853",
  primaryDark: "#1B5E20",
  accent: "#FFD600",
  orange: "#FF6D00",
  teal: "#00BCD4",
  purple: "#7C4DFF",
  bg: "#0A0F0A",
  card: "#111A11",
  cardBorder: "#1E2D1E",
  text: "#F0FFF0",
  textMuted: "#7A9A7A",
};

const crops = [
  { id: 1, name: "Gehu", hindi: "गेहूं", farmer: "Ramesh Kumar", village: "Sonipat, HR", price: 2200, qty: 50, emoji: "🌾", verified: true, rating: 4.8, tag: "Trending", tagColor: "#FF6D00", reviews: 124 },
  { id: 2, name: "Dhan", hindi: "धान", farmer: "Suresh Patel", village: "Patna, BR", price: 1800, qty: 100, emoji: "🌾", verified: true, rating: 4.6, tag: "Best Price", tagColor: "#00C853", reviews: 89 },
  { id: 3, name: "Makka", hindi: "मक्का", farmer: "Mohan Singh", village: "Ludhiana, PB", price: 1600, qty: 30, emoji: "🌽", verified: false, rating: 4.2, tag: "Fresh", tagColor: "#00BCD4", reviews: 56 },
  { id: 4, name: "Soyabean", hindi: "सोयाबीन", farmer: "Vijay Yadav", village: "Indore, MP", price: 4200, qty: 20, emoji: "🫘", verified: true, rating: 4.9, tag: "Premium", tagColor: "#7C4DFF", reviews: 201 },
  { id: 5, name: "Sarson", hindi: "सरसों", farmer: "Deepak Sharma", village: "Jaipur, RJ", price: 5100, qty: 15, emoji: "🌻", verified: true, rating: 4.7, tag: "Organic", tagColor: "#FFD600", reviews: 167 },
  { id: 6, name: "Chana", hindi: "चना", farmer: "Raju Verma", village: "Nagpur, MH", price: 5500, qty: 25, emoji: "🫘", verified: true, rating: 4.5, tag: "Export", tagColor: "#FF6D00", reviews: 93 },
  { id: 7, name: "Bajra", hindi: "बाजरा", farmer: "Amit Rawat", village: "Jodhpur, RJ", price: 1900, qty: 40, emoji: "🌾", verified: true, rating: 4.4, tag: "New", tagColor: "#00BCD4", reviews: 34 },
  { id: 8, name: "Arhar Dal", hindi: "अरहर दाल", farmer: "Santosh Gupta", village: "Varanasi, UP", price: 6800, qty: 10, emoji: "🫘", verified: true, rating: 4.9, tag: "Rare", tagColor: "#7C4DFF", reviews: 78 },
];

const categories = ["All", "Gehu", "Dhan", "Daal", "Oilseed", "Spices"];
const banners = [
  { bg: "linear-gradient(135deg,#00C853,#004D20)", title: "Kisan Se Seedha", sub: "Best daam guaranteed", icon: "🌾" },
  { bg: "linear-gradient(135deg,#FF6D00,#BF360C)", title: "Aaj Ki Mandi Rate", sub: "Real-time prices live", icon: "📊" },
  { bg: "linear-gradient(135deg,#7C4DFF,#311B92)", title: "Export Quality", sub: "Global buyers available", icon: "🌍" },
];

const myOrders = [
  { id: "AI-001", crop: "Gehu 🌾", qty: "10 Quintal", status: "Delivered", amount: 22000, buyer: "Sharma Traders", date: "28 Apr" },
  { id: "AI-002", crop: "Dhan 🌾", qty: "20 Quintal", status: "In Transit", amount: 36000, buyer: "Punjab Exports", date: "30 Apr" },
  { id: "AI-003", crop: "Soyabean 🫘", qty: "5 Quintal", status: "Pending", amount: 21000, buyer: "India Foods Ltd", date: "2 May" },
];

const buyerOrders = [
  { id: "BO-101", crop: "Sarson 🌻", qty: "8 Quintal", status: "Delivered", amount: 40800, seller: "Deepak Sharma", date: "27 Apr" },
  { id: "BO-102", crop: "Chana 🫘", qty: "12 Quintal", status: "In Transit", amount: 66000, seller: "Raju Verma", date: "1 May" },
  { id: "BO-103", crop: "Arhar Dal 🫘", qty: "3 Quintal", status: "Pending", amount: 20400, seller: "Santosh Gupta", date: "2 May" },
];

const statusStyle = {
  Delivered: { bg: "#00C85322", color: "#00C853", label: "✓ Delivered" },
  "In Transit": { bg: "#FFD60022", color: "#FFD600", label: "⟳ In Transit" },
  Pending: { bg: "#7C4DFF22", color: "#7C4DFF", label: "◌ Pending" },
};

const mandiRates = [
  { name: "गेहूं", price: 2200, change: +45, trend: "↑" },
  { name: "धान", price: 1800, change: -20, trend: "↓" },
  { name: "मक्का", price: 1600, change: +10, trend: "↑" },
  { name: "सोयाबीन", price: 4200, change: +120, trend: "↑" },
  { name: "सरसों", price: 5100, change: -80, trend: "↓" },
  { name: "चना", price: 5500, change: +200, trend: "↑" },
];

export default function AgriIndia() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [selCrop, setSelCrop] = useState(null);
  const [prevTab, setPrevTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const [orderDone, setOrderDone] = useState(false);
  const [form, setForm] = useState({ name: "", qty: "", price: "", village: "", desc: "", mobile: "" });
  const [listed, setListed] = useState(false);
  const [splashPhase, setSplashPhase] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [payMethod, setPayMethod] = useState("upi");
  const [kisanListings, setKisanListings] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    if (screen !== "splash") return;
    const timers = [
      setTimeout(() => setSplashPhase(1), 400),
      setTimeout(() => setSplashPhase(2), 1200),
      setTimeout(() => setSplashPhase(3), 2000),
      setTimeout(() => setScreen("role"), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [screen]);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 3200);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const addCart = (crop) => { setCart(c => c.find(x => x.id === crop.id) ? c : [...c, { ...crop, cartQty: 1 }]); showToast("🛒 Cart mein add kiya!"); };
  const removeCart = (id) => { setCart(c => c.filter(x => x.id !== id)); showToast("Cart se hataya"); };
  const toggleWish = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    showToast(wishlist.includes(id) ? "Wishlist se hataya" : "❤️ Wishlist mein add!");
  };
  const goDetail = (crop) => { setPrevTab(tab); setSelCrop(crop); setTab("detail"); setOrderDone(false); };

  const filtered = crops.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.village.toLowerCase().includes(search.toLowerCase()) || c.hindi.includes(search)) &&
    (category === "All" || c.name.toLowerCase().includes(category.toLowerCase()))
  );

  const searchResults = crops.filter(c =>
    searchQuery.length > 0 &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hindi.includes(searchQuery) ||
      c.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.farmer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const cartTotal = cart.reduce((s, c) => s + c.price * (c.cartQty || 1), 0);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap');
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
    @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
    @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes glow { 0%,100%{filter:drop-shadow(0 0 8px #00C853)} 50%{filter:drop-shadow(0 0 28px #00C853)} }
    @keyframes ripple { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.8);opacity:0} }
    @keyframes slideBar { from{width:0} to{width:100%} }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes checkPop { 0%{transform:scale(0)} 60%{transform:scale(1.3)} 100%{transform:scale(1)} }
    * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
    input,textarea { color: #F0FFF0 !important; }
    ::-webkit-scrollbar { display:none; }
    input::placeholder,textarea::placeholder { color: #7A9A7A; }
    button:active { opacity:0.8; transform:scale(0.97); }
  `;

  // ── SPLASH ──
  if (screen === "splash") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 30% 20%,#003300,#000d00 55%,#000000)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <style>{css}</style>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, borderRadius: "50%", background: i % 4 === 0 ? "#FFD600" : "#00C853", left: `${5 + i * 5.2}%`, top: `${10 + (i * 13) % 80}%`, opacity: 0.4 + (i % 3) * 0.2, animation: `float ${2 + (i % 3)}s ${i * 0.3}s infinite` }} />
      ))}
      {splashPhase >= 1 && [0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", width: 140, height: 140, border: "1.5px solid #00C853", borderRadius: "50%", animation: `ripple 2.5s ${i * 0.6}s infinite`, opacity: 0.6 }} />
      ))}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ fontSize: 76, animation: splashPhase >= 1 ? "scaleIn 0.6s ease, glow 2.5s 0.6s infinite, pulse 3s infinite" : "none", opacity: splashPhase >= 1 ? 1 : 0, marginBottom: 18, display: "block" }}>🌿</div>
        <div style={{ fontSize: 50, fontWeight: 900, fontFamily: "Georgia,serif", background: "linear-gradient(135deg,#00C853,#FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: splashPhase >= 2 ? 1 : 0, transform: splashPhase >= 2 ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>AgriIndia</div>
        <div style={{ color: "#7A9A7A", fontSize: 13, letterSpacing: 3, marginTop: 8, opacity: splashPhase >= 2 ? 1 : 0, transition: "all 0.7s ease 0.15s" }}>कृषि भारत • KISAN SE SEEDHA</div>
        {splashPhase >= 3 && (
          <>
            <div style={{ width: 200, height: 3, background: "#1a2a1a", borderRadius: 10, overflow: "hidden", margin: "44px auto 0" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#00C853,#FFD600)", borderRadius: 10, animation: "slideBar 1.2s ease forwards" }} />
            </div>
            <div style={{ color: "#7A9A7A", fontSize: 11, letterSpacing: 4, marginTop: 10 }}>LOADING...</div>
          </>
        )}
      </div>
    </div>
  );

  // ── ROLE SELECTION ──
  if (screen === "role") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top,#001500,#000800 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{css}</style>
      <div style={{ textAlign: "center", marginBottom: 44, animation: "fadeUp 0.6s ease" }}>
        <div style={{ fontSize: 44, animation: "float 3s infinite" }}>🌿</div>
        <div style={{ fontSize: 30, fontWeight: 900, fontFamily: "Georgia,serif", background: "linear-gradient(135deg,#00C853,#FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginTop: 8 }}>AgriIndia</div>
        <div style={{ color: "#7A9A7A", fontSize: 14, marginTop: 6, letterSpacing: 1 }}>Aap kaun hain?</div>
      </div>
      <div style={{ width: "100%", maxWidth: 340, background: "linear-gradient(135deg,#002a00,#001200)", border: "1px solid #00C853", borderRadius: 20, padding: "22px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", animation: "fadeUp 0.6s 0.1s ease both" }}
        onClick={() => { setRole("kisan"); setScreen("main"); setTab("sell"); }}>
        <div style={{ fontSize: 44, animation: "float 3s 0.5s infinite" }}>👨‍🌾</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#00C853" }}>Kisan हूं</div>
          <div style={{ fontSize: 13, color: "#7A9A7A", marginTop: 3 }}>Apni fasal becho — best daam pe</div>
        </div>
        <div style={{ background: "#00C853", color: "#000", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>→</div>
      </div>
      <div style={{ width: "100%", maxWidth: 340, background: "linear-gradient(135deg,#2a1200,#140800)", border: "1px solid #FF6D00", borderRadius: 20, padding: "22px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", animation: "fadeUp 0.6s 0.22s ease both", marginTop: 16 }}
        onClick={() => { setRole("buyer"); setScreen("main"); setTab("home"); }}>
        <div style={{ fontSize: 44, animation: "float 3s 1s infinite" }}>🛒</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#FF6D00" }}>Buyer हूं</div>
          <div style={{ fontSize: 13, color: "#7A9A7A", marginTop: 3 }}>Seedha kisan se kharido</div>
        </div>
        <div style={{ background: "#FF6D00", color: "#000", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>→</div>
      </div>
      <div style={{ color: "#7A9A7A", fontSize: 12, marginTop: 32, textAlign: "center" }}>✅ 1,20,000+ kisanon ka bharosa</div>
    </div>
  );

  // ── MAIN APP ──
  const buyerTabs = [["home","🏠","Home"],["search","🔍","Khojo"],["cart","🛒","Cart"],["orders","📦","Orders"],["profile","👤","Profile"]];
  const kisanTabs = [["sell","🌾","Becho"],["mandi","📊","Mandi"],["orders","📦","Orders"],["profile","👤","Profile"]];
  const navTabs = role === "buyer" ? buyerTabs : kisanTabs;

  return (
    <div style={{ fontFamily: "'Trebuchet MS',sans-serif", maxWidth: 420, margin: "0 auto", background: "#0A0F0A", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#F0FFF0" }}>
      <style>{css}</style>
      {toast && <div style={{ position: "fixed", top: 68, left: "50%", transform: "translateX(-50%)", background: "#111", color: "white", padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, zIndex: 999, whiteSpace: "nowrap", border: "1px solid #1E2D1E", boxShadow: "0 4px 20px rgba(0,200,83,0.25)", animation: "fadeIn 0.3s ease" }}>{toast}</div>}

      {/* Notification Panel */}
      {notifOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 500 }} onClick={() => setNotifOpen(false)}>
          <div style={{ position: "absolute", top: 56, right: 12, width: 300, background: "#111A11", border: "1px solid #1E2D1E", borderRadius: 16, padding: 16, animation: "fadeUp 0.3s ease" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: "#F0FFF0" }}>🔔 Notifications</div>
            {[
              { msg: "Ramesh Kumar ne aapki inquiry ka jawab diya", time: "2 min", color: "#00C853" },
              { msg: "Aapka order AI-002 dispatch ho gaya!", time: "1 hr", color: "#FFD600" },
              { msg: "New: Sarson ka rate badh gaya ₹5100", time: "3 hr", color: "#FF6D00" },
              { msg: "Verification complete! Aapka account verify hua", time: "1 day", color: "#7C4DFF" },
            ].map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid #1E2D1E" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#F0FFF0" }}>{n.msg}</div>
                  <div style={{ fontSize: 10, color: "#7A9A7A", marginTop: 2 }}>{n.time} pehle</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "rgba(10,15,10,0.96)", backdropFilter: "blur(12px)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1E2D1E", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, animation: "float 3s infinite" }}>🌿</span>
          <span style={{ fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg,#00C853,#FFD600)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Georgia,serif" }}>AgriIndia</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: "#111A11", border: "1px solid #1E2D1E", color: "#7A9A7A", padding: "4px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer" }} onClick={() => { setScreen("role"); setRole(null); }}>
            {role === "buyer" ? "🛒" : "👨‍🌾"} Switch
          </div>
          {role === "buyer" && (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setTab("cart")}>
              <span style={{ fontSize: 22 }}>🛒</span>
              {cart.length > 0 && <div style={{ position: "absolute", top: -4, right: -4, background: "#FF6D00", color: "white", fontSize: 9, fontWeight: 800, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.length}</div>}
            </div>
          )}
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => setNotifOpen(o => !o)}>🔔</span>
            <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#FF6D00" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 80px" }}>

        {/* ── HOME TAB ── */}
        {tab === "home" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ background: "#111A11", border: "1px solid #1E2D1E", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span>🔍</span>
              <input style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14 }} placeholder="Fasal ya kisan dhundo..." value={search} onChange={e => setSearch(e.target.value)} />
              {search && <span style={{ cursor: "pointer", color: "#7A9A7A" }} onClick={() => setSearch("")}>✕</span>}
            </div>
            <div style={{ background: banners[bannerIdx].bg, borderRadius: 16, padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, minHeight: 110, transition: "background 0.5s ease" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{banners[bannerIdx].title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{banners[bannerIdx].sub}</div>
                <div style={{ marginTop: 12, background: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, display: "inline-block", cursor: "pointer" }}>Explore →</div>
              </div>
              <div style={{ fontSize: 56 }}>{banners[bannerIdx].icon}</div>
            </div>
            <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 14 }}>
              {banners.map((_, i) => <div key={i} style={{ height: 4, borderRadius: 4, background: i === bannerIdx ? "#00C853" : "#1E2D1E", width: i === bannerIdx ? 22 : 8, transition: "all 0.3s" }} />)}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["1.2L+","Kisa
