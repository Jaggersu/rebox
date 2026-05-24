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
  const productNavItems = [
    { id: "hero", label: "首頁" },
    { id: "vibrand", label: "VI品牌識別" },
    { id: "spec", label: "機身規格" },
    { id: "demo", label: "後台監控 Demo" },
    { id: "contact", label: "聯繫我們" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 h-16 md:h-20 backdrop-blur-md bg-zinc-950/70 border-b border-white/10">
      {/* 左側：LOGO */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="RE:BOX" className="h-8 md:h-10 w-auto" />
        <span className="hidden md:block text-white/60 text-sm font-medium">RE:BOX</span>
      </div>

      {/* 右側：錨點選單 + 大分頁切換 */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* 產品提案模式時顯示錨點選單 */}
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
      </div>
    </nav>
  );
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
   HERO SECTION - 首頁 (帶 id 支援錨點)
════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 md:px-8 relative overflow-hidden scroll-mt-20">
      {/* 背景發光效果 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* 標籤 */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-[#39FF14]/30 bg-[#39FF14]/10">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <span className="text-sm font-medium text-[#39FF14]">ESG × 單向純回收 × 無人智取站</span>
        </div>
        
        {/* 主標題 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          RE:BOX 智能循環機
          <br />
          <span className="text-[#39FF14]">啟動無人店的綠色微循環</span>
        </h1>
        
        {/* 副標題 */}
        <p className="text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
          零髒亂、真回收，為智取店量身打造的 ESG 智能寄取站
        </p>
        
        {/* 特色標籤 */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["2700K 暖白光", "內凹防呆工作台", "單向純回收"].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Hero 圖片區域 */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
          <img src="/hero.png" alt="RE:BOX" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* 底部發光線條 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#FFF4E0] to-transparent" 
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
        
        {/* CTA 按鈕 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-full font-bold text-black bg-[#39FF14] hover:bg-[#39FF14]/90 transition-all">
            立即洽談合作
          </button>
          <button className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-all">
            下載完整提案 PDF
          </button>
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
   SPEC SECTION - 機身規格
════════════════════════════════════════════════ */
function SpecSection() {
  return (
    <section id="spec" className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
            Hardware Specs
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">機身規格</h2>
          <p className="text-lg text-white/50">極致工藝打造，每一個細節都為實戰而生</p>
        </div>
        
        {/* 規格卡片外殼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4">機身尺寸</h3>
              <p className="text-white/50">規格內容待補充...</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4">電力系統</h3>
              <p className="text-white/50">規格內容待補充...</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DEMO SECTION - 後台監控 Demo
════════════════════════════════════════════════ */
function DemoSection() {
  return (
    <section id="demo" className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 text-sm text-[#39FF14] mb-4">
            Live Demo
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">後台監控 Demo</h2>
          <p className="text-lg text-white/50">即時數據掌握，營運狀態一目瞭然</p>
        </div>
        
        {/* Demo 外殼 */}
        <GlassCard accent={C.cyberGreen}>
          <div className="p-6 md:p-8">
            <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
              <p className="text-white/30">監控面板 Demo 內容待補充...</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CONTACT SECTION - 聯繫我們
════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
            Get in Touch
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">聯繫我們</h2>
          <p className="text-lg text-white/50">有任何問題或合作意向，歡迎與我們聯繫</p>
        </div>
        
        {/* 聯繫資訊外殼 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">電子郵件</h3>
              <p className="text-white/50 text-sm">hello@rebox.tw</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">電話</h3>
              <p className="text-white/50 text-sm">+886 2-xxxx-xxxx</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">地址</h3>
              <p className="text-white/50 text-sm">台北市 xxxx 區</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   PROPOSAL PAGE - 產品提案 (客戶)
════════════════════════════════════════════════ */
function ProposalPage() {
  return (
    <div className="scroll-smooth">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="vibrand">
        <ViBrandSection />
      </section>
      <PainSolutionSection />
      <FeaturesSection />
      <SpecSection />
      <DemoSection />
      <PartnershipSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT - 整合平滑滾動與錨點追蹤
════════════════════════════════════════════════ */
export default function App() {
  const [mode, setMode] = useState<NavMode>("product");
  const [activeSection, setActiveSection] = useState("hero");

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
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar 
        mode={mode} 
        setMode={setMode} 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      {mode === "product" ? <ProposalPage /> : <AdminPage />}
    </div>
  );
}
