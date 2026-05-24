import { useState } from "react";

export default function ViBrandSection() {
  const [isOpen, setIsOpen] = useState(false);

  // 品牌色彩系統
  const colors = [
    {
      name: 'Cyber Green',
      hex: '#39FF14',
      desc: '綠色循環的視覺指引',
      usage: 'UI 主色・互動提示'
    },
    {
      name: 'Shopee Orange',
      hex: '#EE4D2D',
      desc: '品牌識別的色彩連結',
      usage: '合作象徵・品牌共鳴'
    },
    {
      name: 'Warm White',
      hex: '#FFF4E0',
      desc: '2700K 溫潤陪伴光',
      usage: '照明設計・溫度感知'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* 可收合的品牌識別系統卡片 */}
        <div 
          className="rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            backdropFilter: 'blur(10px)',
            boxShadow: isOpen ? '0 0 40px rgba(57, 255, 20, 0.15)' : '0 0 20px rgba(57, 255, 20, 0.05)'
          }}
        >
          {/* 標題區塊 - Cyber Green 背景區分 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full relative overflow-hidden"
          >
            {/* 發光背景 */}
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.15) 0%, rgba(57, 255, 20, 0.05) 100%)',
                opacity: isOpen ? 1 : 0.6
              }}
            />
            
            {/* 頂部發光線 */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, #39FF14, transparent)',
                opacity: isOpen ? 1 : 0.5,
                boxShadow: isOpen ? '0 0 20px #39FF14' : '0 0 10px #39FF14'
              }}
            />
            
            {/* 內容 */}
            <div className="relative z-10 flex items-center justify-between p-5 md:p-6">
              <div className="flex items-center gap-4">
                {/* Logo 圖標 */}
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isOpen ? 'rgba(57, 255, 20, 0.2)' : 'rgba(57, 255, 20, 0.1)',
                    boxShadow: isOpen ? '0 0 20px rgba(57, 255, 20, 0.3)' : 'none'
                  }}
                >
                  <span className="text-2xl md:text-3xl">🔮</span>
                </div>
                
                <div className="text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#39FF14]/20 text-[#39FF14] text-xs font-medium mb-1.5">
                    Brand Identity
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white">
                    品牌識別系統
                  </h2>
                  <p className="text-white/50 text-sm mt-1 hidden md:block">
                    點擊展開查看完整品牌規範
                  </p>
                </div>
              </div>
              
              {/* 展開/收合箭頭 */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isOpen ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isOpen ? 'rgba(57, 255, 20, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`
                }}
              >
                <svg 
                  className={`w-5 h-5 text-[#39FF14] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>

          {/* 可收合內容區 */}
          <div 
            className={`overflow-hidden transition-all duration-700 ease-out ${
              isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-white/10">
              
              {/* 內容滾動區 */}
              <div className="p-5 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* 設計理念 */}
                <div className="bg-white/[0.03] rounded-2xl p-5 md:p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#39FF14] rounded-full" />
                    設計哲學
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    RE:BOX 以溫和低調的消光深灰為基底，融合高對比的品牌發光線條。
                    雙正圓發光冒號是靈魂細節，象徵數據網絡間互通的溫暖微光。
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['幾何無襯線字體', '高對比配色', '消光金屬質感'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 色彩系統 */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#39FF14] rounded-full" />
                    色彩系統
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {colors.map((color) => (
                      <div 
                        key={color.name}
                        className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                      >
                        {/* 色塊 */}
                        <div 
                          className="h-24 md:h-28 w-full relative"
                          style={{ backgroundColor: color.hex }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <span 
                              className="text-xs font-mono px-2 py-1 rounded bg-black/30 text-white"
                            >
                              {color.hex}
                            </span>
                          </div>
                        </div>
                        {/* 色塊資訊 */}
                        <div className="p-4">
                          <h4 className="font-bold text-white mb-1">{color.name}</h4>
                          <p className="text-white/50 text-sm mb-2">{color.desc}</p>
                          <p className="text-white/30 text-xs">{color.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 字體與機身 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 字體 */}
                  <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/10">
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#39FF14] rounded-full" />
                      字體系統
                    </h3>
                    <div className="bg-black/30 rounded-xl p-4 mb-3">
                      <p className="text-2xl font-black text-white mb-1">RE:BOX</p>
                      <p className="text-white/40 text-sm">幾何無襯線粗體</p>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      筆劃厚實飽滿、結構均衡，與實體機身的金屬工藝完美呼應。
                    </p>
                  </div>

                  {/* 機身 */}
                  <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/10">
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#EE4D2D] rounded-full" />
                      機身塗裝
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-[#4A4A4A] border border-white/10" />
                      <div>
                        <p className="text-white font-medium text-sm">消光金屬鐵灰</p>
                        <p className="text-white/40 text-xs">抗刮防指紋烤漆</p>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      微沙粒底漆質感，優雅收納門市日常繁雜視覺。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
