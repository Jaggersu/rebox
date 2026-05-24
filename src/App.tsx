import { useState, useEffect, useRef } from "react";
import ViBrandSection from "./ViBrandSection";

/* ════════════════════════════════════════════════
   BRAND TOKENS
════════════════════════════════════════════════ */
const C = {
  cyberGreen:   "#39FF14",
  shopeeOrange: "#EE4D2D",
  warmWhite:    "#FFF4E0",
  gold:         "#D4AF37",
};

/* ════════════════════════════════════════════════
   NEW NAVBAR - 毛玻璃 + 錨點導航
════════════════════════════════════════════════ */
type NavMode = "product" | "admin";

interface NavbarProps {
  mode: NavMode;
  setMode: (mode: NavMode) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

function Navbar({ mode, setMode, activeSection, scrollToSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const productNavItems = [
    { id: "hero", label: "首頁" },
    { id: "vibrand", label: "VI品牌識別" },
    { id: "spec", label: "機身規格" },
    { id: "demo", label: "後台監控 Demo" },
    { id: "contact", label: "聯繫我們" },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 h-16 md:h-20 backdrop-blur-md bg-zinc-950/70 border-b border-white/10">
      {/* 左側：LOGO */}
      <div className="flex items-center">
        <img src="/logo.png" alt="RE:BOX" className="h-6 md:h-10 w-auto" />
      </div>

      {/* 右側：錨點選單 + 大分頁切換 */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* 桌面版：產品提案模式時顯示錨點選單 */}
        {mode === "product" && (
          <div className="hidden lg:flex items-center gap-1">
            {productNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-[#39FF14] bg-[#39FF14]/10 font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* 大分頁切換 */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => setMode("product")}
            className={`px-3 md:px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === "product" ? "text-black bg-[#39FF14]" : "text-white/60 hover:text-white"
            }`}
          >
            <span className="hidden md:inline">產品提案</span>
            <span className="md:hidden">產品</span>
          </button>
          <button
            onClick={() => setMode("admin")}
            className={`px-3 md:px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === "admin" ? "text-black bg-[#39FF14]" : "text-white/60 hover:text-white"
            }`}
          >
            <span className="hidden md:inline">商業數據</span>
            <span className="md:hidden">數據</span>
          </button>
        </div>

        {/* 手機版：漢堡選單按鈕（僅產品模式顯示） */}
        {mode === "product" && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
            aria-label="開啟選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* 手機版下拉選單 */}
      {mobileMenuOpen && mode === "product" && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-b border-white/10 py-4 px-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {productNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-xl text-left text-base transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-[#39FF14] bg-[#39FF14]/10 font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ════════════════════════════════════════════════
   SCROLL REVEAL HOOK - 滾動淡入動畫
════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ════════════════════════════════════════════════
   GLASS CARD PRIMITIVES
════════════════════════════════════════════════ */
function GlassCard({ children, accent, className = "" }: { children: React.ReactNode; accent?: string; className?: string }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: `1px solid ${accent ? accent + "40" : "rgba(255,255,255,0.1)"}`,
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════
   HERO SECTION - 首頁 (帶入場動畫)
════════════════════════════════════════════════ */
function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 100ms 延遲觸發入場動畫，確保瀏覽器已渲染
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 動畫狀態類別 - 使用完整字串避免 Tailwind purge
  const fadeInUp = mounted 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-8";
  const fadeIn = mounted 
    ? "opacity-100" 
    : "opacity-0";
  const scaleIn = mounted 
    ? "opacity-100 scale-100" 
    : "opacity-0 scale-95";

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 md:px-8 relative overflow-hidden scroll-mt-20">
      {/* 背景發光效果 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* 標籤 */}
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-[#39FF14]/30 bg-[#39FF14]/10 transition-all duration-700 ease-out ${fadeInUp}`}>
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <span className="text-sm font-medium text-[#39FF14]">ESG × 單向純回收 × 無人智取站</span>
        </div>
        
        {/* 主標題 */}
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 transition-all duration-1000 delay-150 ease-out ${fadeInUp}`}>
          RE:BOX 智能循環機
          <br />
          <span className="text-[#39FF14]">啟動無人店的綠色微循環</span>
        </h1>
        
        {/* 副標題 */}
        <p className={`text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed transition-all duration-1000 delay-300 ease-out ${fadeInUp}`}>
          零髒亂、真回收，為智取店量身打造的 ESG 智能寄取站
        </p>
        
        {/* 特色標籤 */}
        <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 delay-500 ease-out ${fadeInUp}`}>
          {["2700K 暖白光", "內凹防呆工作台", "單向純回收"].map((tag, i) => (
            <span 
              key={tag} 
              className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Hero 圖片區域 */}
        <div className={`relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black transition-all duration-1200 delay-700 ease-out ${scaleIn}`}>
          <img src="/hero.png" alt="RE:BOX" className={`w-full h-full object-cover transition-all duration-1000 delay-1000 ${fadeIn}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* 底部發光線條 */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFF4E0] to-transparent transition-all duration-1000 delay-1200 ${fadeIn}`}
               style={{ boxShadow: "0 0 30px 5px rgba(255, 244, 224, 0.3)" }} />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PAIN & SOLUTION - Modern Grid
════════════════════════════════════════════════ */
function PainSolutionSection() {
  const pains = [
    { icon: "📦", title: "紙箱爆滿佔空間", desc: "門市廢紙箱無處堆放，嚴重影響動線" },
    { icon: "💸", title: "清運成本不透明", desc: "自行委外清運頻率高、費用模糊難管控" },
    { icon: "😤", title: "個資外洩客訴多", desc: "拆箱區凌亂、面單隨意棄置引發隱私疑慮" },
  ];
  
  const solutions = [
    { icon: "🔒", title: "單向純回收機制", desc: "物理防呆設計，紙箱只進不出不設共享" },
    { icon: "🖊️", title: "個資亂碼滾輪章", desc: "內凹工作台內建亂碼章，一滾即去個資" },
    { icon: "📊", title: "ESG 減碳數據報告", desc: "即時產出精準回收數據協助永續揭露" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 區塊標題 */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
            Problem & Solution
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">痛點與解法</h2>
          <p className="text-lg text-white/50">現況問題一次解決，從源頭重新設計循環邏輯</p>
        </div>
        
        {/* 雙欄佈局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 痛點 */}
          <GlassCard accent="#ef4444">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-8 bg-red-500 rounded-full" />
                <h3 className="text-xl font-bold text-red-400">現況痛點</h3>
              </div>
              <div className="space-y-4">
                {pains.map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
          
          {/* 解法 */}
          <GlassCard accent={C.cyberGreen}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-8 bg-[#39FF14] rounded-full" />
                <h3 className="text-xl font-bold text-[#39FF14]">RE:BOX 解法</h3>
              </div>
              <div className="space-y-4">
                {solutions.map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   FEATURES - Glass Cards Grid
════════════════════════════════════════════════ */
function FeaturesSection() {
  const features = [
    { tag: "硬體", title: "薄型 60cm 機身", desc: "110V 隨插即用，極致坪效不擋動線", icon: "📐" },
    { tag: "防呆", title: "內凹式工作台", desc: "安全割刀・亂碼滾輪章・2700K 暖白光", icon: "🛡️" },
    { tag: "純回收", title: "無共享・無現金", desc: "嚴格單向純回收，確保 ESG 數據乾淨", icon: "♻️" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 text-sm text-[#39FF14] mb-4">
            Hardware Features
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">硬體與防呆亮點</h2>
          <p className="text-lg text-white/50">每一個設計細節，都是為了讓站點零客訴、零管理成本</p>
        </div>
        
        {/* 特色卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <GlassCard key={f.title} accent={C.cyberGreen}>
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#39FF14]/10 text-xs font-medium text-[#39FF14] mb-3">
                  {f.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PARTNERSHIP - Clean Pricing Cards
════════════════════════════════════════════════ */
function PartnershipSection() {
  const plans = [
    {
      badge: "標配",
      title: "方案 A",
      subtitle: "一條龍標配版",
      desc: "設備・補貨・清運全包，換取零場地租金",
      features: ["設備採購安裝維護全包", "Town Ace 短租靈活調度", "廢紙清運定時排程", "店家零操心"],
      color: C.cyberGreen,
    },
    {
      badge: "選配",
      title: "方案 B",
      subtitle: "ESG 逆物流版",
      desc: "蝦皮物流順載・零額外成本",
      features: ["蝦皮物流回程順載廢紙", "整合既有路線零額外成本", "免費 ESG 回收數據報告", "供 CSR 報告使用"],
      color: C.shopeeOrange,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">雙贏合作方案</h2>
          <p className="text-lg text-white/50">靈活組合最適模式，共同推動綠色循環</p>
        </div>
        
        {/* 方案卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {plans.map((p) => (
            <GlassCard key={p.title} accent={p.color}>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    {p.badge}
                  </span>
                  <span className="text-3xl">{p.title === "方案 A" ? "🚀" : "🌱"}</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{p.subtitle}</h3>
                <p className="text-white/50 mb-6">{p.desc}</p>
                <ul className="space-y-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <span style={{ color: p.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {/* CTA - 只保留 PDF 下載，玻璃擬態高級感 */}
        <div className="flex justify-center">
          <a 
            href="/REBOX_Proposal.pdf" 
            download
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-white transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(57, 255, 20, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(57, 255, 20, 0.3)';
            }}
          >
            <svg className="w-5 h-5 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>下載完整提案 PDF</span>
            <span className="text-[#39FF14]/60 text-sm">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   ADMIN PAGE - Simplified
════════════════════════════════════════════════ */
function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthed(true);
    }, 1500);
  };

  if (authed) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-[#39FF14]/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📊</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">營運儀表板</h2>
            <p className="text-white/50 mb-8">數據正在載入中...</p>
            <button
              onClick={() => setAuthed(false)}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">內部管理系統</h2>
            <p className="text-white/50">登入以存取營運後台</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="admin@rebox.tw"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#39FF14]/50"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密碼"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#39FF14]/50"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-black bg-[#39FF14] hover:bg-[#39FF14]/90 transition-all disabled:opacity-50"
            >
              {loading ? "驗證中..." : "登入"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-white/40">
          © 2025 RE:BOX 智能綠色寄取循環站 · 保留一切權利
        </p>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════
   SPEC SECTION - 機身規格 (含 3D X-RAY 預留區)
════════════════════════════════════════════════ */
function SpecSection() {
  const { ref, visible } = useScrollReveal();

  const specs = [
    { label: "機身高度", value: "180 cm", desc: "符合人體工學，輕鬆投遞" },
    { label: "機身寬度", value: "60 cm", desc: "薄型設計，極致坪效" },
    { label: "機身深度", value: "75 cm", desc: "內凹防呆工作台" },
    { label: "材質", value: "SGCC 鍍鋅鋼板", desc: "消光金屬鐵灰烤漆" },
    { label: "容量", value: "約 200 個紙箱", desc: "單次清運週期約 3-5 天" },
    { label: "電力需求", value: "110V / 200W", desc: "隨插即用，無須改電" },
    { label: "去個資滾輪", value: "亂碼覆蓋章", desc: "一滾遮蔽面單個資" },
    { label: "照明系統", value: "2700K 暖白光", desc: "溫潤不刺眼" },
  ];

  return (
    <section id="spec" ref={ref} className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
            Hardware Specs
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">機身規格</h2>
          <p className="text-lg text-white/50">極致工藝打造，每一個細節都為實戰而生</p>
        </div>
        
        <div className="flex flex-col items-center gap-8">
          {/* 上方：3D X-RAY 實圖放大展示 */}
          <div 
            className={`w-full max-w-4xl transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <img 
              src="/spec-xray.png" 
              alt="RE:BOX 機身 3D 分解透視圖" 
              className="w-full h-auto rounded-xl"
              style={{
                boxShadow: '0 0 50px rgba(57, 255, 20, 0.15), 0 0 100px rgba(57, 255, 20, 0.05)',
              }}
            />
          </div>

          {/* 下方：硬體規格表 - 四欄佈局 */}
          <div 
            className={`w-full max-w-4xl transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div 
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#39FF14] rounded-full" />
                硬體規格
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((spec) => (
                  <div 
                    key={spec.label}
                    className="rounded-xl p-4"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="text-white/50 text-xs mb-1">{spec.label}</p>
                    <p className="text-white font-bold text-base mb-1">{spec.value}</p>
                    <p className="text-white/30 text-xs">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DEMO SECTION - 桃園試點監控中心 (10家店鋪)
════════════════════════════════════════════════ */
interface StoreData {
  name: string;
  fullness: number;
  alert: "正常" | "擠壓中" | "滿載警戒";
  inkLevel: number;
  glueBottles: number;
  labelRolls: number;
}

function DemoSection() {
  const { ref, visible } = useScrollReveal();

  // 桃園試點 10 家智取店完整監控數據
  const stores: StoreData[] = [
    { name: "桃園總店", fullness: 92, alert: "滿載警戒", inkLevel: 85, glueBottles: 24, labelRolls: 8 },
    { name: "中壢店", fullness: 78, alert: "擠壓中", inkLevel: 62, glueBottles: 18, labelRolls: 12 },
    { name: "八德店", fullness: 45, alert: "正常", inkLevel: 91, glueBottles: 32, labelRolls: 15 },
    { name: "平鎮店", fullness: 88, alert: "滿載警戒", inkLevel: 15, glueBottles: 9, labelRolls: 6 },
    { name: "楊梅店", fullness: 52, alert: "正常", inkLevel: 73, glueBottles: 28, labelRolls: 10 },
    { name: "大溪店", fullness: 67, alert: "擠壓中", inkLevel: 48, glueBottles: 21, labelRolls: 7 },
    { name: "蘆竹店", fullness: 35, alert: "正常", inkLevel: 88, glueBottles: 35, labelRolls: 18 },
    { name: "大園店", fullness: 81, alert: "擠壓中", inkLevel: 55, glueBottles: 16, labelRolls: 5 },
    { name: "龜山店", fullness: 95, alert: "滿載警戒", inkLevel: 32, glueBottles: 12, labelRolls: 4 },
    { name: "龍潭店", fullness: 58, alert: "正常", inkLevel: 77, glueBottles: 29, labelRolls: 11 },
  ];

  const getAlertColor = (alert: string) => {
    switch (alert) {
      case "滿載警戒": return "#EE4D2D";
      case "擠壓中": return "#FFA500";
      default: return "#39FF14";
    }
  };

  const getInkStatus = (level: number) => {
    if (level < 20) return { text: "補件提醒", color: "#EE4D2D" };
    if (level < 50) return { text: "偏低", color: "#FFA500" };
    return { text: "充足", color: "#39FF14" };
  };

  return (
    <section id="demo" ref={ref} className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 text-sm text-[#39FF14] mb-4">
            Live Dashboard
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">桃園試點監控中心</h2>
          <p className="text-lg text-white/50">即時掌握 10 家智取店營運狀態</p>
        </div>
        
        <div 
          className={`rounded-3xl overflow-hidden transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(57,255,20,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="p-6 md:p-8">
            {/* 頂部：減碳數據大卡 */}
            <div 
              className="rounded-2xl p-6 md:p-8 mb-8 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.1) 0%, rgba(20,20,20,0.8) 100%)',
                border: '1px solid rgba(57,255,20,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/5 via-transparent to-[#39FF14]/5" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                  <p className="text-white/60 text-sm">桃園區智取店累計減碳量</p>
                </div>
                <p 
                  className="text-4xl md:text-6xl font-black tracking-tight"
                  style={{ 
                    color: '#39FF14',
                    textShadow: '0 0 30px rgba(57,255,20,0.5)',
                  }}
                >
                  45,280 <span className="text-2xl md:text-3xl">kg</span>
                </p>
                <p className="text-white/40 text-xs mt-3">10 家試點店鋪共同達成 | 相當於種植 2,260 棵樹</p>
              </div>
            </div>

            {/* 監控數據標題 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/80 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#39FF14] rounded-full" />
                即時店鋪監控列表
              </h3>
              <span className="text-xs text-white/40">共 10 家 | 更新於 2 分鐘前</span>
            </div>

            {/* 10家店鋪滾動列表 */}
            <div 
              className="max-h-[400px] overflow-y-auto pr-2 space-y-3"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.2) transparent',
              }}
            >
              {stores.map((store) => {
                const alertColor = getAlertColor(store.alert);
                const inkStatus = getInkStatus(store.inkLevel);
                
                return (
                  <div 
                    key={store.name}
                    className="rounded-xl p-4 md:p-5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${store.alert === "滿載警戒" ? 'rgba(238,77,45,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {/* 第一行：店名 + 滿載率 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🏪</span>
                        <span className="font-bold text-white">{store.name}</span>
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ 
                            background: `${alertColor}20`,
                            color: alertColor,
                          }}
                        >
                          {store.alert}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold" style={{ color: alertColor }}>
                          {store.fullness}%
                        </span>
                        <p className="text-white/30 text-xs">回收箱滿載率</p>
                      </div>
                    </div>

                    {/* 進度條 */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${store.fullness}%`,
                          background: alertColor,
                          boxShadow: `0 0 10px ${alertColor}50`,
                        }}
                      />
                    </div>

                    {/* 第二行：詳細監控數據 */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {/* 油墨剩餘量 */}
                      <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-white/40 text-xs mb-1">🖨️ 除個資油墨</p>
                        <p className="text-base font-bold" style={{ color: inkStatus.color }}>
                          {store.inkLevel}%
                        </p>
                        <p className="text-white/30 text-[10px]">{inkStatus.text}</p>
                      </div>
                      
                      {/* 除膠劑 */}
                      <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-white/40 text-xs mb-1">🧴 除膠劑</p>
                        <p className="text-base font-bold text-white">
                          {store.glueBottles} <span className="text-xs font-normal text-white/50">瓶</span>
                        </p>
                        <p className="text-white/30 text-[10px]">
                          {store.glueBottles < 15 ? "低庫存" : "庫存正常"}
                        </p>
                      </div>
                      
                      {/* 標籤捲 */}
                      <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-white/40 text-xs mb-1">🏷️ 條碼標籤</p>
                        <p className="text-base font-bold text-white">
                          {store.labelRolls} <span className="text-xs font-normal text-white/50">捲</span>
                        </p>
                        <p className="text-white/30 text-[10px]">
                          {store.labelRolls < 6 ? "需補充" : "充足"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 底部統計 */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-[#EE4D2D] font-bold text-xl">
                    {stores.filter(s => s.alert === "滿載警戒").length}
                  </p>
                  <p className="text-white/40 text-xs">滿載警戒</p>
                </div>
                <div>
                  <p className="text-[#FFA500] font-bold text-xl">
                    {stores.filter(s => s.alert === "擠壓中").length}
                  </p>
                  <p className="text-white/40 text-xs">擠壓中</p>
                </div>
                <div>
                  <p className="text-[#39FF14] font-bold text-xl">
                    {stores.filter(s => s.inkLevel < 20).length}
                  </p>
                  <p className="text-white/40 text-xs">油墨待補</p>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">
                    {stores.filter(s => s.glueBottles < 15 || s.labelRolls < 6).length}
                  </p>
                  <p className="text-white/40 text-xs">耗材待補</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CONTACT SECTION - 聯繫我們 (含 B2B 表單)
════════════════════════════════════════════════ */
function ContactSection() {
  const { ref, visible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("表單已送出！我們將盡快與您聯繫。");
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
            Get in Touch
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">聯繫我們</h2>
          <p className="text-lg text-white/50">有任何問題或合作意向，歡迎與我們聯繫</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* 左側：科技感聯絡渠道 */}
          <div 
            className={`space-y-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Email 卡片 - 可點擊 */}
            <a 
              href="mailto:jaggersu@gmail.com"
              className="block group"
            >
              <div 
                className="rounded-2xl p-5 transition-all duration-300 group-hover:border-[#39FF14]/50"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                    style={{ background: 'rgba(57,255,20,0.15)' }}
                  >
                    <svg className="w-7 h-7 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">商務電子郵件</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#39FF14]/20 text-[#39FF14]">推薦</span>
                    </div>
                    <p className="text-[#39FF14] text-sm font-mono mt-1">jaggersu@gmail.com</p>
                    <p className="text-white/40 text-xs mt-1">點擊直接發送郵件 →</p>
                  </div>
                </div>
              </div>
            </a>

            {/* Telegram 卡片 - 可點擊 */}
            <a 
              href="https://t.me/rebox99"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div 
                className="rounded-2xl p-5 transition-all duration-300 group-hover:border-[#39FF14]/50"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                    style={{ background: 'rgba(57,255,20,0.15)' }}
                  >
                    <svg className="w-7 h-7 text-[#39FF14]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Telegram 官方頻道</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#39FF14]/20 text-[#39FF14]">即時</span>
                    </div>
                    <p className="text-[#39FF14] text-sm font-mono mt-1">@rebox99</p>
                    <p className="text-white/40 text-xs mt-1">點擊開啟 Telegram →</p>
                  </div>
                </div>
              </div>
            </a>

            {/* 快速響應承諾 */}
            <div 
              className="rounded-2xl p-4 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.05) 0%, rgba(20,20,20,0.3) 100%)',
                border: '1px solid rgba(57,255,20,0.15)',
              }}
            >
              <p className="text-white/60 text-sm">
                <span className="text-[#39FF14]">⚡</span> 工作日 24 小時內響應
              </p>
            </div>
          </div>

          {/* 右側：B2B 商務諮詢表單 */}
          <div 
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div 
              className="rounded-2xl p-6 md:p-8 h-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#39FF14] rounded-full" />
                B2B 商務諮詢
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">姓名 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-[#39FF14] transition-colors"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">公司名稱 *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-[#39FF14] transition-colors"
                      placeholder="公司名稱"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">聯絡電話 *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-[#39FF14] transition-colors"
                      placeholder="09xx-xxx-xxx"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">合作意向 *</label>
                    <select
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white text-base focus:outline-none focus:border-[#39FF14] transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">請選擇</option>
                      <option value="設備租賃">設備租賃</option>
                      <option value="場地合作">場地合作</option>
                      <option value="清運服務">清運服務</option>
                      <option value="ESG 專案">ESG 專案</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">留言內容</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-[#39FF14] transition-colors resize-none"
                    placeholder="請描述您的需求或問題..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-black bg-[#39FF14] transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  確認送出
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   GLOBAL PARALLAX GLOW - 全局滑鼠視差光暈
════════════════════════════════════════════════ */
function GlobalParallaxGlow({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  // 將滑鼠座標轉換為視差偏移 (限制在 30px 範圍內)
  const offsetX = (mouseX - 0.5) * 40; // -20px ~ +20px
  const offsetY = (mouseY - 0.5) * 40; // -20px ~ +20px

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {/* 左上紅橘光暈 */}
      <div
        className="absolute animate-glow-slow-1"
        style={{
          top: '-100px',
          left: '-100px',
          width: '600px',
          height: '600px',
          background: '#EE4D2D',
          borderRadius: '50%',
          filter: 'blur(180px)',
          opacity: 0.15,
          transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
      {/* 右下螢光綠光暈 */}
      <div
        className="absolute animate-glow-slow-2"
        style={{
          bottom: '-100px',
          right: '-100px',
          width: '700px',
          height: '700px',
          background: '#39FF14',
          borderRadius: '50%',
          filter: 'blur(160px)',
          opacity: 0.12,
          transform: `translate(${-offsetX * 1.2}px, ${-offsetY * 1.2}px)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PROPOSAL PAGE - 產品提案 (客戶) + 全局光暈
════════════════════════════════════════════════ */
function ProposalPage({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="scroll-smooth relative">
      {/* 全局滑鼠視差光暈背景層 */}
      <GlobalParallaxGlow mouseX={mouseX} mouseY={mouseY} />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      {/* VI品牌識別 */}
      <section id="vibrand">
        <ViBrandSection />
      </section>
      
      {/* 機身規格 - 移到VI之後 */}
      <section id="spec">
        <SpecSection />
      </section>
      
      <PainSolutionSection />
      <FeaturesSection />
      
      <DemoSection />
      <PartnershipSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT - 整合平滑滾動、錨點追蹤與滑鼠視差
════════════════════════════════════════════════ */
export default function App() {
  const [mode, setMode] = useState<NavMode>("product");
  const [activeSection, setActiveSection] = useState("hero");
  
  // 滑鼠視差追蹤 (0~1 正規化座標)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // 監聽滑鼠移動
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 平滑滾動到指定區塊
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // 監聽滾動更新當前區塊
  useEffect(() => {
    if (mode !== "product") return;

    const sections = ["hero", "vibrand", "spec", "demo", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [mode]);

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
      }}
    >
      <Navbar 
        mode={mode} 
        setMode={setMode} 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      {mode === "product" ? <ProposalPage mouseX={mousePos.x} mouseY={mousePos.y} /> : <AdminPage />}
    </div>
  );
}
