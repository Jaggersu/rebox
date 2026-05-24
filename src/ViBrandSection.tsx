import { useEffect, useRef, useState } from "react";

// 色彩 Token
const colors = [
  { name: "Cyber Green", hex: "#39FF14", role: "UI 主色" },
  { name: "Shopee Orange", hex: "#EE4D2D", role: "品牌連結" },
  { name: "Warm White", hex: "#FFF4E0", role: "照明設計" },
];

// LOGO 分析資料
const logoAnalysis = [
  {
    icon: "⭕",
    title: "幾何無襯線",
    highlight: ":)",
    color: "#39FF14",
    desc: "兩顆發光正圓，厚實筆劃與金屬工藝完美呼應。",
  },
  {
    icon: "♻️",
    title: "循環科技",
    highlight: "RE:",
    color: "#39FF14",
    desc: "數據網絡間的溫暖微光，串聯循環理念。",
  },
  {
    icon: "✨",
    title: "溫暖冒號",
    highlight: ":",
    color: "#D4AF37",
    desc: "純粹數位細節，象徵友善潔淨的互動體驗。",
  },
];

// 滾動動畫 Hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
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

export default function ViBrandSection() {
  const { ref: sectionRef, visible } = useScrollReveal();

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        
        {/* 區塊標題 */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-[#39FF14]/10 text-[#39FF14] text-xs font-medium mb-3">
            Brand Identity
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            品牌識別系統
          </h2>
          <p className="text-white/50">極簡科技美學，一眼即識別</p>
        </div>

        {/* LOGO 展示區 */}
        <div 
          className={`mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* LOGO 大圖 */}
          <div className="relative rounded-2xl overflow-hidden mb-6 group">
            {/* 發光背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#39FF14]/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            
            {/* 內容 */}
            <div 
              className="relative p-10 md:p-16 flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, rgba(212,175,55,0.05) 0%, rgba(20,20,20,0.6) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <img 
                src="/logo.png" 
                alt="RE:BOX" 
                className="w-[85%] md:w-[70%] lg:w-[60%] max-w-[400px] h-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* LOGO 分析 - 三欄卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {logoAnalysis.map((item, i) => (
              <div 
                key={item.title}
                className={`rounded-xl p-4 transition-all duration-500 hover:border-white/20 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  transitionDelay: `${150 + i * 100}ms`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {item.title} <span style={{ color: item.color }}>{item.highlight}</span>
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 精簡色彩系統 - Pill Tags */}
        <div 
          className={`mb-10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h3 className="text-sm font-bold text-white/60 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#39FF14] rounded-full" />
            標準色彩
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <div 
                key={c.hex}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* 小圓盤色塊 */}
                <div 
                  className="w-6 h-6 rounded-full border border-white/20 shadow-lg"
                  style={{ 
                    background: c.hex,
                    boxShadow: `0 0 10px ${c.hex}40`,
                  }}
                />
                <div>
                  <p className="text-xs font-bold text-white">{c.name}</p>
                  <p className="text-[10px] text-white/40 font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 字體 & 材質 - 雙欄 */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* 字體 */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">🔤</span>
              <span className="text-xs text-white/40">Typeface</span>
            </div>
            <p className="text-2xl font-black text-white mb-1">RE:BOX</p>
            <p className="text-xs text-white/50">幾何無襯線粗體 · 穩固信賴感</p>
          </div>

          {/* 材質 */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">🏗️</span>
              <span className="text-xs text-white/40">Material</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4A4A4A] border border-white/10" />
              <div>
                <p className="text-sm font-bold text-white">消光鐵灰</p>
                <p className="text-xs text-white/50">抗刮防指紋金屬烤漆</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
